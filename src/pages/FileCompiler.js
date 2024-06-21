import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import { java } from '@codemirror/lang-java';
import { cpp } from '@codemirror/lang-cpp';
import { amy } from 'thememirror';
import { autocompletion, completeFromList } from '@codemirror/autocomplete';
import './styles/FileCompiler-modal.css';

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
  const [output, setOutput] = useState('');
  const [interpreterInput, setInterpreterInput] = useState('');
  const [inputQueue, setInputQueue] = useState([]);
  const [isCompiled, setIsCompiled] = useState(false);
  const [requiresInput, setRequiresInput] = useState(false);
  const location = useLocation();
  const [fileName, setFileName]= useState('');
  const [fileType, setFileType] = useState('');

  useEffect(() => {
    if (location.state) {
        setFileName(location.state.fileName);
        setFileType(location.state.fileType);
        setCode(location.state.content);
    }
    }, [location.state]);


  // 컴파일 실행
  const compileCode = async () => {
    try {
      const response = await fetch('http://localhost:8080/code/compile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code : code, language : fileType }),
      });

      if (!response.ok) {
        throw new Error('백엔드 서버 연결 실패');
      }

      const result = await response.text();
      setOutput(result);
      console.log('컴파일 결과:', result);
      setIsCompiled(true);

      // 각 언어에 대한 입력 여부 체크
      if (fileType === 'python' && code.includes('input(')) {
        setRequiresInput(true);
      } else if (fileType === 'java' && code.includes('new Scanner') || code.includes('new BufferedReader')) {
        setRequiresInput(true);
      } else if (fileType === 'cpp' && code.includes('cin')) {
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
    switch (fileType) {
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

  const saveCode = async (code) => {
    try {
        const response = await fetch('http://localhost:8080/file/update', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ fileName : fileName, content : code }),
        });

        if (!response.ok) {
            throw new Error('서버 요청 실패');
        }

        const result = await response.json();
        console.log('코드 업데이트 결과:', result);

    } catch (error) {
        console.error('코드 업데이트 오류:', error);
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
                    <h3>{`${fileName}.${fileType}`}</h3>
                    <div className="button-container">
                        <button className="compile-button" onClick={compileCode}>
                            <p className="text">Compile</p>
                        </button>
                        <button className="save-button" onClick={() => saveCode(code)}>
                            <p className="text">Save</p>
                        </button>
                    </div>
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
