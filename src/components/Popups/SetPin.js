import React,{useState} from 'react';
import styles from './Popups.module.css';
import eye from '../assets/eyeIcon.svg';
import Modal from 'react-modal';
import { setPin } from '../api/discover';
import { toast } from 'react-toastify';


const SetPin = (props) => {

    const [errorMessage, setErrorMessage] = useState({
        inputPin: "",
        confirmPin: ""
    });

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

    const [type, setType] = useState("password");
    const [ctype, setcType] = useState("password");


    function handleInputPinChange(e){
        setInputPin(e.target.value);
    }

    function handleConfirmPinChange(e){
        setConfirmPin(e.target.value);
    }

    function handleClick(e){
        if(e.target.id === "pin"){
            setType(type === "text" ? "password" : "text");
        } else {
            setcType(ctype === "text" ? "password" : "text");
        }
    }

    const [inputPin, setInputPin] = useState("");
    const [confirmPin, setConfirmPin] = useState("");

    function handleKeyPress(e){
        if(e.code === "Enter"){
            handleSet();
        }
    }

    async function handleSet(){
        if(!inputPin){
            setErrorMessage({inputPin: "** Enter pin first."});
            return;
        }
        if(inputPin.length !== 4){
            setErrorMessage({inputPin: "** Enter a 4 digit pin."});
            return;
        }

        for(var i=0;i<inputPin.length;i++){
            if(isNaN(parseInt(inputPin[i]))){
                setErrorMessage({inputPin: "** Pin must have digits only."});
                return;
            }
        }
        
        if(!confirmPin){
            setErrorMessage({confirmPin: "** Confirm pin first."});
            return;
        }
        if(confirmPin !== inputPin){
            setErrorMessage({confirmPin: "** Pin didn't match."});
            return;
        }
        setErrorMessage({});
        if(setPin(inputPin)){
            toast("New Pin Set");
            props.setIsLoggedIn(true);
            localStorage.isPinSet = true;
            localStorage.isLoggedIn = true;
            props.setIsLoggedIn(true);
            props.setIsPasswordSet(true);
        }

        setInputPin("");
        setConfirmPin("");
    }

    const check = localStorage.getItem("isPinSet");

    return (
        <div className={styles.parent}>
            <Modal
                isOpen={true}
                style={customStyles}
                onRequestClose={()=> check === "true" && props.setIsPasswordSet(true)}
            >
            <div className={styles.popupContainer}>
                <div className={styles.title}>Set Pin</div>
                <div className={styles.content}>
                    <span>Enter New Pin</span><br></br>
                    <div className={styles.inputContainer}>
                        <input type={type} value={inputPin} name="pin" maxLength="4" pattern="\d{4}"  className={styles.inputField} onChange= 
                          {handleInputPinChange} onKeyPress={handleKeyPress} required autoFocus/>
                        <span onClick={handleClick} className={styles.eye}>
                            <img src={eye} alt="error" id="pin"></img>
                        </span>
                    </div>
                    <div className={styles.errorMessage}>
                        {errorMessage.inputPin}
                    </div>
                </div>
                <div className={styles.content}>
                    <span>Confirm New Pin</span><br></br>
                    <div className={styles.inputContainer}>
                        <input type={ctype} value={confirmPin}  name="pincon" maxLength="4"  pattern="\d{4}" className={styles.inputField} 
                         onChange={handleConfirmPinChange} onKeyPress={handleKeyPress} required/>
                        <span onClick={handleClick} className={styles.eye} >
                            <img src={eye} alt="error" id="pincon"></img>
                        </span>
                    </div>
                    <div className={styles.errorMessage}>
                        {errorMessage.confirmPin}
                    </div>
                </div>
                <button className={styles.lockBtn} onClick={handleSet}>Save Changes</button>
            </div>
            </Modal>
        </div>
    );
};

export default SetPin;