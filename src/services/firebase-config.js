import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore"
import { getAuth } from "firebase/auth"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration

const firebaseConfig = {
    apiKey: "AIzaSyBF9F-fTrb8ll6kTTpFYA-QhRVJ7uxWXhw",
    authDomain: "moviesandgamesrecap.firebaseapp.com",
    projectId: "moviesandgamesrecap",
    storageBucket: "moviesandgamesrecap.appspot.com",
    messagingSenderId: "673370502466",
    appId: "1:673370502466:web:6368c2a2ce2ff1d21bc4db"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)