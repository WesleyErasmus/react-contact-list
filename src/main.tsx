import ReactDOM from 'react-dom/client';
import App from './App.tsx';

// BASE STYLES
import './styles/base.css';

// ROBOTO FONT
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAuk_YmQ5sKBeMcW-CjCS1sKo-kgQ4JIVA",
  authDomain: "contact-directory-62644.firebaseapp.com",
  projectId: "contact-directory-62644",
  storageBucket: "contact-directory-62644.appspot.com",
  messagingSenderId: "397833339473",
  appId: "1:397833339473:web:c7fbc4ae127d4b7f0f6e70"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);


ReactDOM.createRoot(document.getElementById('root')!).render(
  /* Removed React.StrictMode as it was causing the useEffect data fetch twice due to component re-rendering. 
  >>
  https://github.com/axios/axios/issues/2825#issuecomment-883635938
  <<
  */
  <>
    <App />
  </>
);
