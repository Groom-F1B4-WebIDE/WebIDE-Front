import React, {useState} from 'react';
import './styles/Containers-modal.css';

function Containers() {

    const [modalOpen, setModalOpen] = useState(false);
    const [fileName, setFileName] = useState('');
    const [fileType, setFileType] = useState('');
    const [files, setFiles] = useState([]);
    const [compiledFiles, setCompiledFiles] = useState([]);


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

            setCompiledFiles([...compiledFiles, { name: fileName, type: fileType }]);


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
    
    const handleFileClick = (file) => {
        // 파일을 클릭했을 때 수행할 작업 구현
        console.log('클릭한 파일 정보:', file);
        // 예를 들어 컴파일러 실행 등의 작업 수행 가능
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
                <button className="file-create-button" onClick={CreateContainerButton}> + 컨테이너 생성하기 </button>
                <div className='container-box-list'>
                    {compiledFiles.map((file, index) => (
                        <div key={index} className="container-box">
                            <div className='container-info'>
                                <h3>{file.type === 'java' ? file.name + '.java' : file.type === 'python' ? file.name + '.py' : file.type === 'cpp' ? file.name + '.cpp' : file.name}</h3>
                            </div>
                            <button className="run-button" onClick={() => handleFileClick(file)}>실행</button>
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

