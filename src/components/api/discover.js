import axios from "axios";

export async function getStatus() {
    const reqUrl = `https://filemanagerbackend.onrender.com/discover/api/status`;
    const result = await axios.get(reqUrl);
    return result;
}

export async function setPin(pin) {
    const reqUrl = `https://filemanagerbackend.onrender.com/discover/api/setpin/${pin}`;
    const result = await axios.post(reqUrl,pin);
    return result;
}

export async function verifyPin(pin) {
    const reqUrl = `https://filemanagerbackend.onrender.com/discover/api/verify/${pin}`;
    const result = await axios.get(reqUrl);
    return result.data;
}

export async function getfolders() {
    const reqUrl = `https://filemanagerbackend.onrender.com/discover/api/getfolders`;
    const result = await axios.get(reqUrl);
    return result.data;
}

export async function createFolder(folderName) {
    const reqUrl = `https://filemanagerbackend.onrender.com/discover/api/createfolder/${folderName}`;
    const result = await axios.post(reqUrl,folderName);
    return result.data;
}

export async function getAllFiles() {
    const reqUrl = `https://filemanagerbackend.onrender.com/discover/api/getallfiles`;
    const result = await axios.get(reqUrl);
    return result.data;
}

export async function getFiles(folderName) {
    const reqUrl = `https://filemanagerbackend.onrender.com/discover/api/getfiles/${folderName}`;
    const result = await axios.get(reqUrl);
    return result.data;
}

export async function createFile(fileName,folderName,content) {
    const reqUrl = `https://filemanagerbackend.onrender.com/discover/api/createfile?folderName=${folderName}&fileName=${fileName}&content=${content}`;
    const result = await axios.post(reqUrl,fileName);
    return result.data;
}