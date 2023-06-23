// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAh5L3pZoTDM1d--RrZyxduDXZmt1R7jhw",
  authDomain: "zambet-web-otp.firebaseapp.com",
  projectId: "zambet-web-otp",
  storageBucket: "zambet-web-otp.appspot.com",
  messagingSenderId: "890299905173",
  appId: "1:890299905173:web:d61afe7f9a114aff7ed79c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const authentication = getAuth(app);
