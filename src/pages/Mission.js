import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import { java } from '@codemirror/lang-java';
import { cpp } from '@codemirror/lang-cpp';
import { amy } from 'thememirror';
import { autocompletion, completeFromList } from '@codemirror/autocomplete';
import SubmissionResult from './SubmissionResult';
import './styles/Mission.css';

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

const customJavaCompletion = completeFromList(javaKeywords.map(keyword => ({ label: keyword, type: "keyword" })));
const customPythonCompletion = completeFromList(pythonKeywords.map(keyword => ({ label: keyword, type: "keyword" })));
const customCppCompletion = completeFromList(cppKeywords.map(keyword => ({ label: keyword, type: "keyword" })));

function Mission() {
  const { id } = useParams();
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('java');
  const [problem, setProblem] = useState(null);
//   const navigate = useNavigate();
const [submissionResults, setSubmissionResults] = useState(null);

  useEffect(() => {
    fetchProblem();
  }, [id]);

  const fetchProblem = async () => {
    try {
      const response = await fetch(`http://43.203.243.249:8080/mission/${id}`);
      if (!response.ok) {
        throw new Error('문제 가져오기 실패');
      }
      const problemData = await response.json();
      setProblem(problemData);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  const submitSolution = async () => {
    try {
      const response = await fetch(`http://43.203.243.249:8080/mission/${id}/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, language }),
      });

      if (!response.ok) {
        throw new Error('제출 실패');
      }

      const result = await response.json();
      console.log('제출 결과:', result);
      setSubmissionResults(result.results);  // 제출 결과를 상태로 설정


      // 제출 결과 페이지로 이동
    //   navigate('/result', { state: { result } });

    } catch (error) {
      console.error('Fetch error:', error);
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
        <div className="problem-container">
          {problem && (
            <>
              <h1>{problem.title}</h1>
              <p>{problem.description}</p>
              <pre>{problem.inputDescription}</pre>
              <pre>{problem.outputDescription}</pre>
            </>
          )}
        </div>
        <div className="code-editor-container">
          <select id="language" value={language} onChange={(e) => setLanguage(e.target.value)} className="language-select">
            <option value="java">Java</option>
            <option value="python">Python</option>
            <option value="cpp">C++</option>
          </select>
          <button className="compile-button" onClick={submitSolution}>
            <p className="text">Submit</p>
          </button>
          <CodeMirror
            value={code}
            height="500px"
            extensions={getLanguageExtension()}
            theme={amy}
            onChange={(value) => setCode(value)}
          />
        </div>
      </div>
      {submissionResults && <SubmissionResult results={submissionResults} />}
    </div>
  );
}

export default Mission;
