import React, { useEffect } from 'react';
import styles from './FolderTab.module.css';
import FolderIcon from '../assets/FolderIcon.svg';
import { useNavigate, useParams } from 'react-router-dom';

const FolderTab = (props) => {

    const navigate = useNavigate();
    const {folderName} = useParams();

    function handleClick(){
        props.setIsActive(props.name);
        navigate(`/${props.name}`);
    }

    useEffect(()=>{
        if(!folderName){
            navigate('/');
        } else {
            navigate(`/${folderName}`);
        }
        props.setIsActive(folderName);
    },[folderName])

    return (
        <div className={props.isActive === props.name ? styles.containerSelected : styles.container} onClick={handleClick}>
            <img src={FolderIcon} alt="error"></img>&nbsp;&nbsp;
            {props.name}
        </div>
    );
};

export default FolderTab;