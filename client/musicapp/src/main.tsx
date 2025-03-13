import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { AudioPlayerProvider } from './context/audioPlayer.tsx';
import { GoogleOAuthProvider } from '@react-oauth/google';

import 'react-contexify/ReactContexify.css';
import { Provider } from 'react-redux';

import {store} from "./redux/app/store.tsx"



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AudioPlayerProvider>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_APP_GOOGLE_CLIENT_ID}>
      <Provider store={store}>
 
    <App />
  
    </Provider>
    </GoogleOAuthProvider>
    </AudioPlayerProvider>
  </StrictMode>,
)
