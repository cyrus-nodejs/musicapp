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
import { ThemeProvider } from './context/themeContext.tsx';
import {TrackContextMenuProvider} from './context/contextmenu/trackcontextmenu.tsx'
import { LeftSideBarContextMenuProvider } from './context/contextmenu/leftsidebarcontextmenu.tsx';



createRoot(document.getElementById('root')!).render(

  <StrictMode>

  <AudioPlayerProvider>

  <Provider store={store}>

   <ThemeProvider>

  <TrackContextMenuProvider>

   <LeftSideBarContextMenuProvider>

    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      
       <App />
 
 </GoogleOAuthProvider>  

  </LeftSideBarContextMenuProvider>

  </TrackContextMenuProvider>

  </ThemeProvider>

  </Provider>

  </AudioPlayerProvider>

  </StrictMode>,
)
