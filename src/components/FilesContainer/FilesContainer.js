import React, { useEffect } from 'react';
import styles from './FilesContainer.module.css';
import DisplayFile from '../DisplayFile/DisplayFile';
import { useParams } from 'react-router-dom';
import { getFiles } from '../api/discover';
import Root from '../Root/Root';
import LoadingSpinner from '../Spinner/Spinner';

const FilesContainer = (props) => {
    const {folderName} = useParams();
    const refresh = props.toggler;
    // const allFilesList = props.allFilesList;

    async function fetchFiles(){
        const files = await getFiles(folderName);
        props.setFileList(files);
    }

    useEffect(()=>{
        fetchFiles();
    },[folderName,refresh]);

    return (
        <div className={styles.container}>
            {props.spinner && <LoadingSpinner />}
            {! folderName && !props.spinner && <Root />}
            {folderName && props.fileList.map((file,index)=>{
                return (
                    <DisplayFile key={index} fileData={file} setCurrentFile={props.setCurrentFile} toggler={props.toggler} setToggler={props.setToggler} />
                )
            })}
        </div>
    );
};

export default FilesContainer;