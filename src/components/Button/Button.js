import React from 'react';
import styles from './Button.module.css';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const Button = (props) => {
    function handleFolderClick(){
        props.setState(true);
    }

    const {folderName} = useParams();

    function handleFileClick(){
        if(!folderName){
            toast("Please select a folder.");
            return;
        }
        props.setState(true);
    }

    return (
        <div className={styles.container} onClick={props.name === "Folder" ? handleFolderClick : handleFileClick}>
            <div className={styles.icon}>
                <img src={props.icon} alt="error" height="17px" width="20px"></img>
            </div>Add {props.name}
        </div>
    );
};

export default Button;