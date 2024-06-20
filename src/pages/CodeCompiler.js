import React, { useState, useEffect } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import { java } from '@codemirror/lang-java';
import { cpp } from '@codemirror/lang-cpp';
import { amy } from 'thememirror';
import { autocompletion, completeFromList } from '@codemirror/autocomplete';
import './styles/CodeCompiler-modal.css';

// 자동 완성 배열
const javaKeywords = [
  "abstract", "assert", "boolean", "break", "byte", "case", "catch", "char", "class",
  "const", "continue", "default", "do", "double", "else", "enum", "extends", "final",
  "finally", "float", "for", "goto", "if", "implements", "import", "instanceof", "int",
  "interface", "long", "native", "new", "null", "package", "private", "protected",
  "public", "return", "short", "static", "strictfp", "super", "switch", "synchronized",
  "this", "throw", "throws", "transient", "try", "void", "volatile", "while",
  "BufferedReader", "IOException", "InputStreamReader", "FileReader", "FileWriter", 
  "BufferedWriter", "String", "StringBuilder", "StringBuffer", "Math", "System", "Thread",
  "Runnable", "ArrayList", "LinkedList", "HashMap", "HashSet", "TreeMap", "TreeSet",
  "Collections", "Arrays", "Date", "Calendar", "Scanner", "Optional"
];

const pythonKeywords = [
  "False", "None", "True", "and", "as", "assert", "async", "await", "break", "class",
  "continue", "def", "del", "elif", "else", "except", "finally", "for", "from", "global",
  "if", "import", "in", "is", "lambda", "nonlocal", "not", "or", "pass", "raise", "return",
  "try", "while", "with", "yield",
  "abs", "all", "any", "ascii", "bin", "bool", "bytearray", "bytes", "callable", "chr",
  "classmethod", "compile", "complex", "delattr", "dict", "dir", "divmod", "enumerate",
  "eval", "exec", "filter", "float", "format", "frozenset", "getattr", "globals", "hasattr",
  "hash", "help", "hex", "id", "input", "int", "isinstance", "issubclass", "iter", "len",
  "list", "locals", "map", "max", "memoryview", "min", "next", "object", "oct", "open",
  "ord", "pow", "print", "property", "range", "repr", "reversed", "round", "set", "setattr",
  "slice", "sorted", "staticmethod", "str", "sum", "super", "tuple", "type", "vars", "zip"
];

const cppKeywords = [
  "alignas", "alignof", "and", "and_eq", "asm", "atomic_cancel", "atomic_commit", "atomic_noexcept",
  "auto", "bitand", "bitor", "bool", "break", "case", "catch", "char", "char8_t", "char16_t",
  "char32_t", "class", "compl", "concept", "const", "consteval", "constexpr", "constinit", "const_cast",
  "continue", "co_await", "co_return", "co_yield", "decltype", "default", "delete", "do", "double",
  "dynamic_cast", "else", "enum", "explicit", "export", "extern", "false", "float", "for", "friend",
  "goto", "if", "inline", "int", "long", "mutable", "namespace", "new", "noexcept", "not", "not_eq",
  "nullptr", "operator", "or", "or_eq", "private", "protected", "public", "reflexpr", "register",
  "reinterpret_cast", "requires", "return", "short", "signed", "sizeof", "static", "static_assert",
  "static_cast", "struct", "switch", "synchronized", "template", "this", "thread_local", "throw",
  "true", "try", "typedef", "typeid", "typename", "union", "unsigned", "using", "virtual", "void",
  "volatile", "wchar_t", "while", "xor", "xor_eq",
  "array", "bitset", "deque", "forward_list", "list", "map", "queue", "set", "stack", "unordered_map",
  "unordered_set", "vector", "algorithm", "chrono", "functional", "iostream", "iterator", "memory",
  "random", "regex", "string", "thread", "tuple", "type_traits", "utility", "valarray"
];

const customJavaCompletion = completeFromList(
  javaKeywords.map(keyword => ({ label: keyword, type: "keyword" }))
);

const customPythonCompletion = completeFromList(
  pythonKeywords.map(keyword => ({ label: keyword, type: "keyword" }))
);

const customCppCompletion = completeFromList(
  cppKeywords.map(keyword => ({ label: keyword, type: "keyword" }))
);

function CodeCompiler() {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('java');
  const [output, setOutput] = useState('');
  const [interpreterInput, setInterpreterInput] = useState('');
  const [inputQueue, setInputQueue] = useState([]);
  const [isCompiled, setIsCompiled] = useState(false);
  const [requiresInput, setRequiresInput] = useState(false);

  // 입력된 값 로그
  useEffect(() => {
    console.log('코드:', code);
    console.log('언어:', language);
  }, [code, language]);

  // 컴파일 실행
  const compileCode = async () => {
    try {
      const response = await fetch('http://localhost:8080/code/compile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code, language }),
      });

      if (!response.ok) {
        throw new Error('백엔드 서버 연결 실패');
      }

      const result = await response.text();
      setOutput(result);
      console.log('컴파일 결과:', result);
      setIsCompiled(true);

      // 각 언어에 대한 입력 여부 체크
      if (language === 'python' && code.includes('input(')) {
        setRequiresInput(true);
      } else if (language === 'java' && code.includes('new Scanner') || code.includes('new BufferedReader')) {
        setRequiresInput(true);
      } else if (language === 'cpp' && code.includes('cin')) {
        setRequiresInput(true);
      } else {
        setRequiresInput(false);
        await executeCode('');
      }

    } catch (error) {
      console.error('Fetch error:', error);
      setOutput('코드 컴파일 불가 (리액트). Please check the server.');
    }
  };

  const executeCode = async (input) => {
    try {
      console.log('실행 버튼 클릭 - 입력값:', input);

      const response = await fetch('http://localhost:8080/api/code/execute', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ inputValues: input }),
      });

      if (!response.ok) {
        throw new Error('서버 연결 관련 에러');
      }

      const result = await response.text();
      setOutput(prevOutput => `${prevOutput}\n${result}`);
      console.log('서버 응답:', result);
    } catch (error) {
      console.error('Fetch error:', error);
      setOutput('코드 실행 불가 (리액트). Please check the server.');
    }
  };

  const handleInterpreterInput = async (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      const input = interpreterInput.trim();
      if (input) {
        console.log('입력받은 값:', input);
        setInputQueue(prevQueue => [...prevQueue, input]);
        setInterpreterInput('');
        await executeCode(input);
      }
    }
  };

  const getLanguageExtension = () => {
    switch (language) {
      case 'java':
        return [java(), autocompletion({ override: [customJavaCompletion] })];
      case 'python':
        return [python(), autocompletion({ override: [customPythonCompletion] })];
      case 'cpp':
        return [cpp(), autocompletion({ override: [customCppCompletion] })];
      default:
        return [];
    }
  };

  return (
    <div className="App">
      <header>
        <div className="logo">
          <img src="" alt="F1B4" />
        </div>
        <nav>
          <a href="#">Home</a>
          <a href="#">About Us</a>
          <a href="#">Pricing</a>
          <a href="#">Features</a>
        </nav>
      </header>
      <div className="main-container">
        <div className="code-editor-container">
          <select id="language" value={language} onChange={(e) => setLanguage(e.target.value)} className = "language-select">
            <option value="java">Java</option>
            <option value="python">Python</option>
            <option value="cpp">C++</option>
          </select>
          
          <button className="compile-button" onClick={compileCode}>
            {/* <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 0h24v24H0z" fill="none"></path>
              <path
                d="M24 12l-5.657 5.657-1.414-1.414L21.172 12l-4.243-4.243 1.414-1.414L24 12zM2.828 12l4.243 4.243-1.414 1.414L0 12l5.657-5.657L7.07 7.757 2.828 12zm6.96 9H7.66l6.552-18h2.128L9.788 21z"
                fill="white"
              ></path>
            </svg>     */}
            <p className="text">Compile</p>
          </button>

          <CodeMirror
            value={code}
            height="500px"
            extensions={getLanguageExtension()}
            theme={amy}
            onChange={(value) => setCode(value)}
          />
        </div>
        <div className="console-container">
          <h2>Console</h2>
          <pre>{output}</pre>
          {isCompiled && requiresInput && (
            <div>
              <textarea
                id="interpreterInput"
                value={interpreterInput}
                onChange={(e) => setInterpreterInput(e.target.value)}
                onKeyPress={handleInterpreterInput}
                rows="10"
                cols="50"
                placeholder="입력값을 작성하고 엔터를 눌러 실행하세요"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CodeCompiler;