import React, {useState,useEffect} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './styles/Containers-modal.css';

function Containers() {

    const [modalOpen, setModalOpen] = useState(false);
    const [fileName, setFileName] = useState('');
    const [fileType, setFileType] = useState('');
    const [files, setFiles] = useState([]);
    const [compiledFiles, setCompiledFiles] = useState([]);
    const navigate = useNavigate();
    //const location = useLocation();

    //localstorage에서 가져와서 파일 목록 불러옴 
    useEffect(() => {
        console.log('saving data to local storage', compiledFiles);

        const storedFiles = JSON.parse(sessionStorage.getItem('compiledFiles'));
        if (storedFiles) {
            setCompiledFiles(storedFiles);
          }
          
        }, []);
 
    useEffect(() => {
        // 로컬 스토리지에 이미 데이터가 있는지 확인
        if (!sessionStorage.getItem('compiledFiles')) {
            sessionStorage.setItem('compiledFiles', JSON.stringify(compiledFiles));
        }
    }, [compiledFiles]);
    
    const CreateContainerButton = () => {
        setModalOpen(true);
    };
    
    const RealCreateContainer = async () => {
        try {
            const response = await fetch('http://localhost:8080/file/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ fileName, fileType }),
            });
            if (!response.ok) {
                throw new Error('파일 생성 실패');
            }
    
            const result = await response.json();
            console.log('파일 생성 결과:', result);

            const newFile = { name: fileName, type: fileType };
            setCompiledFiles([...compiledFiles, newFile]);
            
            // 로컬 스토리지에도 추가
            sessionStorage.setItem('compiledFiles', JSON.stringify([...compiledFiles, newFile]));

        } catch (error) {
            console.error('파일 생성 오류:', error.message);
            // 파일 생성에 실패하였을 때의 오류 처리 로직 추가
        }

        // 파일 생성 후에 상태 업데이트
        setModalOpen(false);
        setFileName('');
        setFileType('');
        setFiles([...files, { name: fileName, type: fileType }]);

    };    

    const DeleteContainer = async (file) => {
        try {
            const response = await fetch('http://localhost:8080/file/delete', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({fileName : file.name}),
            });
            if (!response.ok) {
                throw new Error('파일 삭제 실패');
            }
    
            const result = await response.json();
            console.log('파일 생성 결과:', result);

            // 삭제된 파일을 상태에서 제거하고
            const updatedFiles = compiledFiles.filter(f => f.name !== file.name);
            setCompiledFiles(updatedFiles);

            // 로컬 스토리지에서도 제거
            sessionStorage.setItem('compiledFiles', JSON.stringify(updatedFiles));

        } catch (error) {
            console.error('파일 삭제 오류:', error.message);
            // 파일 생성에 실패하였을 때의 오류 처리 로직 추가
        }
    };    
    
    const executeContainer = (file) => {
        navigate('/filecompiler', { state: { fileName: file.name, fileType: file.type } });
    };
    
    
    const CloseModal = () => {
        setModalOpen(false);
        setFileName('');
        setFileType('');
    };

    return (
        <div className='files'> 
            <div className='file-sidebar'>
                <h2 className="file-logo"> 내 컨테이너</h2>
            </div>
            <div className="file-main-content">
                <div className="file-top-bar">
                    <h1>모든 컨테이너</h1>
                </div>
                <div className="horizontal-line"></div>
                <button className="file-create-button" onClick={CreateContainerButton}> 
                    <h4>+ 컨테이너 생성하기</h4>
                </button>
                <div className='container-box-list'>
                    {compiledFiles.map((file, index) => (
                        <div key={index} className="container-box">
                            <div className='container-info'>
                                <h3>{file.type === 'java' ? file.name + '.java' : file.type === 'python' ? file.name + '.py' : file.type === 'cpp' ? file.name + '.cpp' : file.name}</h3>
                            </div>
                            <button className="run-button" onClick={() => executeContainer(file)}>실행</button>
                            <button className="run-button" onClick={() => DeleteContainer(file)}>컨테이너 삭제</button>
                        </div>
                    ))}
                </div>
            </div>
            {modalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>새로운 컨테이너 생성하기</h2>
                        <input
                            type="text"
                            placeholder="파일 이름"
                            value={fileName}
                            onChange={(e) => setFileName(e.target.value)}
                        />
                        <select
                            value={fileType}
                            onChange={(e) => setFileType(e.target.value)}
                        >
                            <option value="">파일 타입 선택</option>
                            <option value="java">Java</option>
                            <option value="python">Python</option>
                            <option value="cpp">C++</option>
                        </select>
                        <button onClick={RealCreateContainer}>생성하기</button>
                        <button className="close-button" onClick={() => setModalOpen(false)}>취소</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Containers;

