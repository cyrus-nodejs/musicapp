

import 'bootstrap/dist/css/bootstrap.min.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import * as ContextMenu from "@radix-ui/react-context-menu";
import './App.css'

import ResetPassword from "./pages/Auth/ResetPassword";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import Report from "./pages/Report";
import Completion from "./pages/Checkout/Completion";
import CurrentOrder from "./pages/Orders/currentOrder";
import ErrorPage from './pages/ErrorPage/Error';
import PrivateRoute from './pages/PrivateRoutes';
import Payment from "./pages/Checkout/Payment";

import Index from "./pages/Home/Index";
import Pricing from "./pages/Pricing/Pricing";


import AllArtists from './pages/Home/HomeCenter/Artists/AllArtists';
import Artistdetails from "./pages/Home/HomeCenter/Artists/Artistdetails";
import AllGenres from "./pages/Home/HomeCenter/Genres/AllGenres";
import Genredetails from "./pages/Home/HomeCenter/Genres/GenreDetails";
import AllAlbums from './pages/Home/HomeCenter/Album/AllAlbums';
import Albumdetails from './pages/Home/HomeCenter/Album/AlbumDetails';



import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";

import 'react-contexify/ReactContexify.css';
import Playlist from "./pages/Playlist/Playlist";

import { useAppDispatch, useAppSelector } from "./redux/app/hook";
import { useEffect } from "react";
import { getAuthUser ,fetchAsyncUser } from "./redux/features/auth/authSlice";
import { getCurrentTrack } from "./redux/features/audio/audioSlice";

function App() {
   const dispatch = useAppDispatch()
  const user = useAppSelector(getAuthUser)
   const currentTrack = useAppSelector(getCurrentTrack)

  const handleContextMenu = (e: { preventDefault: () => void; }) => {
    e.preventDefault(); // prevent the default behavior when right-clicked
    console.log("right click");
  };
console.log(currentTrack)
  useEffect(() => {
    
    dispatch(fetchAsyncUser());

}, [dispatch])
  console.log(user)

  


  const router = createBrowserRouter([
    {
    path: "/",
    element:  (
      
        <Index />
    
    ),
    errorElement: <ErrorPage />
  },
  {
    path: `/register`,
    element: <Register   />,
    errorElement: <ErrorPage />
  },

  {
    path: `/login`,
    element: <Login   />,
    errorElement: <ErrorPage />
  },
  {
    path: `/forgotpassword`,
    element: <ForgotPassword   />,
    errorElement: <ErrorPage />
  },

  {
    path: `/reset-password/:uid/:token`,
    element: <ResetPassword   />,
    errorElement: <ErrorPage />
  },




  {
    path: "/allartists",
    element:  (
      <PrivateRoute>
        <AllArtists />
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />
  },

  {
    path: "/artist/:id",
    element:  (
      <PrivateRoute>
        <Artistdetails />
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />
  },

  {
    path: "/allgenres",
    element:  (
      <PrivateRoute>
        <AllGenres />
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />
  },

 
  {
    path: "/genre/:id",
    element:  (
      <PrivateRoute>
        <Genredetails />
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />
  },

  {
    path: "/allalbums",
    element:  (
      <PrivateRoute>
        <AllAlbums />
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />
  },

 
  {
    path: "/album/:id",
    element:  (
      <PrivateRoute>
        <Albumdetails />
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />
  },


  {
    path: "/pricing",
    element:  (
      <PrivateRoute>
        <Pricing/>
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />
  },
  
  {
    path: "/payment",
    element:  (
      <PrivateRoute>
        <Payment />
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />
  },
  {
    path: "/completion",
    element:  (
      <PrivateRoute>
        <Completion />
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />
  },


  
{
  path: "/currentOrder",
  element:  (
    <PrivateRoute>
      <CurrentOrder />,
    </PrivateRoute>
  ),
  errorElement: <ErrorPage />
},

{
  path: "/playlist/:id",
  element:  (
    <PrivateRoute>
      <Playlist />
    </PrivateRoute>
  ),
  errorElement: <ErrorPage />
},

 {
  path: "/report",
  element:  (
    <PrivateRoute>
      <Report />
    </PrivateRoute>
  ),
  errorElement: <ErrorPage />
},








  

  
 
  
])


  return (
  <section className='apphome' >
    < div onContextMenu={handleContextMenu} className=""  >
  <ContextMenu.Root>
			<ContextMenu.Trigger className="ContextMenuTrigger">
      <RouterProvider router={router}  />
			</ContextMenu.Trigger>
      </ContextMenu.Root>
    

    </div>
   </section>
  )
}

export default App
