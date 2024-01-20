
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

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
