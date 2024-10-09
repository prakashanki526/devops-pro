import React, {useEffect, useState} from 'react';
import styles from './DisplayFile.module.css';
import fileIcon from '../assets/FileIcon.svg';
import EditFile from '../EditFile/EditFile';

const DisplayFile = (props) => {
    const [openFile, setOpenFile] = useState(false);

    function handleClick(){
        setOpenFile(true);
    }
    
    useEffect(()=>{
        openFile ? props.setCurrentFile(props.fileData.name) : props.setCurrentFile("");
    },[openFile]);

    return (
        <div className={styles.container} onDoubleClick={handleClick}>
            <div className={styles.iconContainer}>
                <img src={fileIcon}></img>
            </div>
            <div className={styles.fileName}>
                {props.fileData.name}
            </div>
            {openFile && <EditFile role="Edit" setOpenFile={setOpenFile} fileName={props.fileData.name} folderName={props.fileData.folder} content={props.fileData.content} toggler={props.toggler} setToggler={props.setToggler} />}
        </div>
    );
};

export default DisplayFile;