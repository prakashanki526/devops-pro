import React, { useEffect, useState } from 'react';
import styles from './Menulist.module.css';
import Button from '../Button/Button';
import addFileIcon from '../assets/AddFileIcon.svg';
import addFolderIcon from '../assets/AddFolderIcon.svg';
import lockIcon from '../assets/LockIcon.svg';
import logo from '../assets/logo.svg'
import FolderTab from '../FolderTab/FolderTab';
import { getfolders } from '../api/discover';
import { useNavigate } from 'react-router-dom';

const Menulist = (props) => {
    const [folders, setFolders] = useState([]);
    const [isActive, setIsActive] = useState("");

    const navigate = useNavigate();

    async function fetchFolders(){
        const FolderList = await getfolders();
        setFolders(FolderList);
    }

    useEffect(()=>{
        fetchFolders();
    },[props.toggler]);

    return (
        <div className={styles.container} onClick={()=>props.setSearchInputValue("")}>
            <div className={styles.logoContainer}>
                <img src={logo} className={styles.logo} alt="error" onClick={function(){ navigate('/'); setIsActive("");}} ></img>
            </div>
            <div className={styles.buttonsContainer}>
                <Button name="File" icon={addFileIcon} setState={props.setAddFile} />
                <Button name="Folder" icon={addFolderIcon} setState={props.setAddFolder} />
            </div>
            <div className={styles.folderContainer}>
                {folders.map((folderData, index)=>{
                    return(
                        <FolderTab name={folderData.name} key={index} isActive={isActive} setIsActive={setIsActive} />
                    )
                })}
            </div>
            <div className={styles.btnContainer}>
                <button className={styles.lockBtn} onClick={function(){props.setIsLoggedIn(0); localStorage.isLoggedIn = false;}}>
                    <img src={lockIcon} alt="error"></img>
                    Lock Now
                </button>
            </div>
        </div>
    );
};

export default Menulist;