import React, {useState, useEffect} from 'react';
import styles from './Home.module.css';
import Menulist from '../Menulist/Menulist';
import WorkFrame from '../WorkFrame/WorkFrame';
import SetPin from '../Popups/SetPin';
import LockNow from '../Popups/LockNow';
import { getStatus } from '../api/discover';
import Folder from '../modals/Folder';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditFile from '../EditFile/EditFile';
import { useParams } from 'react-router-dom';
import { getAllFiles } from '../api/discover';

const Home = () => {
    const [isPasswordSet, setIsPasswordSet] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [addFolder, setAddFolder] = useState(false);
    const [addFile, setAddFile] = useState(false);
    const [editFile, setEditFile] = useState(false);
    const [fileName, setFileName] = useState("");
    const [toggler, setToggler] = useState(true);
    const [fileList, setFileList] = useState([]);
    const [allFilesList, setAllFilesList] = useState([]);
    const [searchInputValue, setSearchInputValue] = useState("");
    const [spinner, setSpinner] = useState(false);
    
    const {folderName} = useParams();

    useEffect(() => {
        async function checkStatus(){
            const pinCheck = localStorage.getItem("isPinSet");
            if(pinCheck !== "true"){
                const status = await getStatus();
                if(status.data){
                    setIsPasswordSet(true);
                } else {
                    setIsPasswordSet(false);
                }
            }
            const loggedInStatus = localStorage.getItem("isLoggedIn");
            if(loggedInStatus !== "true"){
                setIsLoggedIn(false);
            } 
        }
        checkStatus();
    },[isPasswordSet]);

    async function fetchAllFiles(){
        setSpinner(true);
        const FilesList = await getAllFiles();
        setAllFilesList(FilesList);
        setSpinner(false);
    }

    useEffect(()=>{
        fetchAllFiles();
    },[toggler]);

    return (
        <div className={styles.body}>
            <ToastContainer position="top-center"
                    autoClose={1000}
                    hideProgressBar={true}
                    newestOnTop={true}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark" />

            <Menulist setIsLoggedIn={setIsLoggedIn} setAddFolder={setAddFolder} setAddFile={setAddFile} toggler={toggler} setSearchInputValue={setSearchInputValue} />

            <WorkFrame setIsLoggedIn={setIsLoggedIn} setIsPasswordSet={setIsPasswordSet} fileList={fileList} setFileList={setFileList} toggler= 
            {toggler} setToggler={setToggler} spinner={spinner} searchInputValue={searchInputValue} setSearchInputValue={setSearchInputValue} allFilesList={allFilesList} />

            {!isPasswordSet ? <SetPin setIsLoggedIn={setIsLoggedIn} setIsPasswordSet={setIsPasswordSet} /> : !isLoggedIn && <LockNow setIsLoggedIn= 
             {setIsLoggedIn} />}

            {addFolder && <Folder setAddFolder={setAddFolder} type="Folder" toggler={toggler} setToggler={setToggler} /> }

            {addFile && <Folder setAddFile={setAddFile} type="File" setEditFile={setEditFile} fileList={fileList} setFileName={setFileName} 
             folderName={folderName} /> }
             
            {editFile && <EditFile role="Add" setEditFile={setEditFile} fileName={fileName} folderName={folderName} toggler={toggler} setToggler={setToggler} 
             />}
        </div>
    );
};

export default Home;