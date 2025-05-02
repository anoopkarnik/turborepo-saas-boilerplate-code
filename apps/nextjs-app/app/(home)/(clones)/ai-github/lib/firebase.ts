// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAf51lbUreytRvxiftLKV4nTK-NwgMwT6s",
  authDomain: "saas-boilerplate-code-d2041.firebaseapp.com",
  projectId: "saas-boilerplate-code-d2041",
  storageBucket: "saas-boilerplate-code-d2041.firebasestorage.app",
  messagingSenderId: "441791457215",
  appId: "1:441791457215:web:bb3dc12df6cd4f9e6ca30a",
  measurementId: "G-6D78ZQMEE6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export async function uploadFile(file: File, setProgress?: (progress:number)=> void) {
    return new Promise((resolve,reject)=>{
        try{
            const storageRef = ref(storage, file.name);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on('state_changed', (snapshot) => {
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
                if(setProgress){
                    setProgress(progress)
                }
                switch(snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');break;
                    case 'running':
                        console.log('Upload is running');break;
                }
            },error =>{
                console.log(error)
                reject(error)
            },()=>{
                getDownloadURL(uploadTask.snapshot.ref).then(downloadUrl=>{
                    resolve(downloadUrl)
                }) 
            } )

        }catch(e){
            console.log(e)
            reject(e)
        }
    })
}