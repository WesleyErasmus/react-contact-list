import ReactDOM from 'react-dom/client';
import App from './App.tsx';

// BASE STYLES
import './styles/base.css';

// ROBOTO FONT
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

// FIREBASE IMPORT
import { initializeApp } from 'firebase/app';

// FIREBASE CONFIGURATION
const firebaseConfig = {
  apiKey: 'AIzaSyAuk_YmQ5sKBeMcW-CjCS1sKo-kgQ4JIVA',
  authDomain: 'contact-directory-62644.firebaseapp.com',
  projectId: 'contact-directory-62644',
  storageBucket: 'contact-directory-62644.appspot.com',
  messagingSenderId: '397833339473',
  appId: '1:397833339473:web:c7fbc4ae127d4b7f0f6e70',
};

// INITIALIZE FIREBASE
export const app = initializeApp(firebaseConfig);

ReactDOM.createRoot(document.getElementById('root')!).render(
  /* REMOVED React.StrictMode AS IT WAS CAUSING THE USEEFFECT DATA FETCH TWICE DUE TO COMPONENT RE-RENDERING
  >>
  https://github.com/axios/axios/issues/2825#issuecomment-883635938
  <<
  */
  <>
    <App />
  </>
);
