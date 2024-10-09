import React, {useState} from 'react';
import Modal from 'react-modal';
import styles from './Folder.module.css';
import { createFolder } from '../api/discover';
import { toast } from 'react-toastify';

const Folder = (props) => {
    const [inputName, setInputName] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
        },
        overlay: {
            background: "rgb(30, 39, 46,0.8)"
        },
    };

    // const {folderName} = useParams();

    function handleChange(e){
        setInputName(e.target.value);
    }

    function handleKeypress(e){
        if(e.code === "Enter"){
            props.type === "Folder" ? handleClickFolder() : handleClickFile();
            return;
        }
    }

    async function handleClickFolder(){
        if(!inputName){
            setErrorMessage("** Enter folder name.");
            return;
        }
        const result = await createFolder(inputName);
        
        if(result){
            props.setAddFolder(false);
            props.setToggler(!props.toggler);
            toast("Folder created.");
        } else {
            setErrorMessage("Folder already exist.");
        }
        setInputName("");
    }

    function handleClickFile(){
        if(!inputName){
            setErrorMessage("** Enter file name.");
            return;
        }
        let doFileExist=false;
        props.fileList.map((file,index)=>{
            if(file.name === inputName){
                toast("Filename already exist.");
                doFileExist=true;
                return;
            }
        });
        if(!doFileExist){
            props.setEditFile(true);
            props.setAddFile(false);
            props.setFileName(inputName);
            setInputName("");
            setErrorMessage("");
        }
    }

    return (
        <div>
            <Modal
                isOpen={true}
                style={customStyles}
                onRequestClose={()=> props.type === "Folder" ? props.setAddFolder(false) : props.setAddFile(false)}
            >
            <div className={styles.container}>
                <div className={styles.title}>
                    Create {props.type}
                </div>
                <div className={styles.content}>
                    Enter {props.type} Name
                    <div className={styles.inputContainer}>
                        <input type="text" value={inputName} maxLength="15" className={styles.inputField} onChange= 
                            {handleChange} onKeyPress={handleKeypress} required autoFocus/>
                    </div>
                    <div className={styles.errorMessage} style={{paddingTop: "5px", color: "red"}}>
                        {errorMessage}
                    </div>
                </div>
                <button className={styles.btn} onClick={props.type === "Folder" ? handleClickFolder : handleClickFile}>Create now</button>
            </div>
            </Modal>
        </div>
    );
};

export default Folder;