import React, { useState, useCallback, useEffect } from 'react';
import styles from './EditFile.module.css';
import Modal from 'react-modal';
import { createFile } from '../api/discover';
import { toast } from 'react-toastify';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { convertFromHTML, convertToRaw, EditorState, ContentState} from 'draft-js';
import draftToHtml from 'draftjs-to-html';

const EditFile = (props) => {
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

    async function handleAddClick(){
        if(!editorState.getCurrentContent().getPlainText('\u0001')){
            toast("File shouldn't be empty.");
            return;
        } else {
            const content = draftToHtml(convertToRaw(editorState.getCurrentContent()));
            await createFile(props.fileName, props.folderName, encodeURIComponent(content));
            props.setToggler(!props.toggler);
            toast("File created.");
            props.setEditFile(false);
        }
    }

    async function handleEditClick(){
        if(!editorState.getCurrentContent().getPlainText('\u0001')){
            toast("File shouldn't be empty.");
            return;
        } else {
            const content = draftToHtml(convertToRaw(editorState.getCurrentContent()));
            await createFile(props.fileName, props.folderName, encodeURIComponent(content));
            toast("File saved.");
            props.setOpenFile(false);
            props.setToggler(!props.toggler);
        }
    }

    function handleClose(){
        !props.content ? props.setEditFile(false) : props.setOpenFile(false);
        props.setSelectedFile && props.setSelectedFile("");
    }

    async function handleAutoSave(editorState){
        const content = draftToHtml(convertToRaw(editorState.getCurrentContent()));
        await createFile(props.fileName, props.folderName, encodeURIComponent(content));
        props.setToggler(!props.toggler);
        setShowElement(true);
    }

    const debounce = (func) => {
        let timer;
        return function (...args) {
          const context = this;
          if (timer) clearTimeout(timer);
          timer = setTimeout(() => {
            timer = null;
            func.apply(context, args);
          }, 500);
        };
      };

      const optimizedFn = useCallback(debounce(handleAutoSave), []);

      const [showElement,setShowElement] = useState(false);

      useEffect(()=>{
        setTimeout(function() {
          setShowElement(false)
             }, 2000);
           },
       [showElement]);

    const [editorState, setEditorState] = useState("");

    useEffect(()=>{
        const blocks = props.content ? convertFromHTML(props.content) : "";
        props.content && setEditorState(EditorState.createWithContent(ContentState.createFromBlockArray(blocks.contentBlocks, blocks.entityMap)));
    },[])

    return (
        <div>
            <Modal
                isOpen={true}
                style={customStyles}
                onRequestClose={handleClose}
            >
            <div className={styles.container}>
                <div className={styles.title}>{props.role} File</div>
                <div className={styles.subtitleContainer}>
                    <div className={styles.subtitle}>File name: {props.fileName}</div>
                    {showElement && <div className={styles.autoSave}>. . . auto saving</div>}
                </div>

                    <div className={styles.editorContainer} onKeyUp={()=>optimizedFn(editorState)}>
                        <Editor
                            editorState={editorState}
                            toolbarClassName="toolbarClassName"
                            wrapperClassName='wrapperClassName'
                            editorClassName='editorClassName'
                            onEditorStateChange={setEditorState}
                            toolbar={{
                                options: ['inline'],
                                inline: { inDropdown: false, options: ['bold', 'italic', 'underline'] }
                            }}
                        />
                    </div>

                <button className={styles.btn} onClick={!props.content ? handleAddClick : handleEditClick}>Save File</button>
            </div>
            </Modal>
        </div>
    );
};

export default EditFile;