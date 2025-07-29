import { JSX } from "react/jsx-runtime";
import { PLAYLIST } from "../../utils/@types";
import "../../index.css"

import { useNavigate } from "react-router-dom";
import { useEffect,  useState, RefAttributes } from "react";

import { OverlayTrigger,  Button,  Form,  TooltipProps } from "react-bootstrap";

import { useFormik } from 'formik';
import * as Yup from 'yup';

import { RightClickTooltip } from "../../components/Player/Control/Overlay";

import {fetchUpdateTitle, handleOnInput, fetchPlaylist, getMessage, getPlaylists, fetchDeletePlaylist, fetchCreatePlaylist } from "../../redux/features/playlist/playlistSlice";
import { useAppSelector, useAppDispatch } from "../../redux/app/hook";
import {getAuthUser, fetchAsyncUser, getIsAuthenticated } from "../../redux/features/auth/authSlice";

import { capitalizeFirstLetter } from "../../utils/helpers/utilities";

import { useLeftSideContextMenu } from "../../context/contextmenu/leftsidebarcontextmenu";
import { MenuItem } from "../../context/contextmenu/leftsidebarcontextmenu";


const LeftSidebar = () => {

const navigate = useNavigate()
let data;
console.log(data)
  
let data2;
console.log(data2)

const { showMenu } = useLeftSideContextMenu();

const dispatch = useAppDispatch()

const authUser = useAppSelector(getAuthUser)
const isauthenticated = useAppSelector(getIsAuthenticated)

const Playlist = useAppSelector(getPlaylists)
console.log(Playlist)
const message = useAppSelector(getMessage)

const [show, setShow] = useState(false)
//  const target = useRef(null);
console.log(Playlist)

const showForm = () => {
  setShow((prev) => !prev)
}


useEffect(() => {
  dispatch(fetchPlaylist())
}, [dispatch])
 
useEffect(() => {
  dispatch(fetchAsyncUser())
}, [dispatch])
 


const renderTooltip1 = (props: JSX.IntrinsicAttributes & TooltipProps & RefAttributes<HTMLDivElement>) => (
  <div id="button-tooltip  " {...props}>
    Login 
  </div>
);

const [submitting, setSubmitting] = useState(false);



interface FormValues {
title: string
}




const validationSchema = Yup.object().shape({
  title: Yup.string().min(2, 'Name must be minimum 2').max(100, 'Name must not be more than 100 characters').required('Name is required'),
 })



const handleSubmit = async (values: FormValues) => {
  try {
    setSubmitting(true);
    dispatch(fetchCreatePlaylist(values))
    console.log(values);
    // Set submitting to false after successful submission
    setSubmitting(false);
  } catch (error) {
    // Handle form submission error
    console.error(error);
    setSubmitting(false);
  }
};

const formik = useFormik({
  initialValues: {
    title: ''
  
  },
  validationSchema,
  onSubmit: handleSubmit,
});




const handleContextMenu = (e: React.MouseEvent, playlist: PLAYLIST) => {
  e.preventDefault();

  const items: MenuItem[] = [
    {
      label: `Go to ${playlist.title}`,
      onClick: () => navigate(`/playlist/${playlist.id}`),
    },
    {
      label: 'Go to Artist Radio',
      onClick: () => navigate(`/allartists`),
    },
    {
      label: 'Edit Playlist',
      onClick: () => {
        const title = prompt("Enter new title", playlist.title);
        if (title) {
          dispatch(fetchUpdateTitle({ playlist, title }));
        }
      },
    },
    {
      label: 'Delete Playlist',
      onClick: () => dispatch(fetchDeletePlaylist({ playlist })),
    },
    {
      label: 'Report',
      onClick: () => navigate(`/report`),
    },
  ];

  showMenu(e.pageX, e.pageY, items);
};

return (

    
    <div  className="mt-3 d-none d-lg-block  homeleft col-2 me-1   ">
    

    <div className="d-flex mb-3 artist-bg">
    <div className="p-2 artist-bg">Your Library</div>
    
    
          <div  className="ms-auto artist-bg  " >
    
      </div> 
        <div className="p-2 artist-bg"><i className='bx artist-bg bx-sm bx-right-arrow-alt'></i></div>
      
  </div>

  { authUser && isauthenticated  ? (
  
    <div  className="">
        {Playlist?.length !== 0    ? ( 
          
          <div>
          <div className="text-start mb-3">My Playlist(s)</div>
{Playlist?.map((playlist:PLAYLIST) =>{
          return (
  <div
  key={playlist.id}
  onContextMenu={(e) => handleContextMenu(e, playlist)}
  className="d-flex mb-2 rounded-2 align-items-center"
>
  <div className="flex-shrink-0">
    <i className="bx bx-music bg-secondary bx-border bx-sm" />
  </div>
  <div className="flex-grow-1 ms-3">
    <OverlayTrigger placement="top" overlay={RightClickTooltip}>
      <div>
        <div>{capitalizeFirstLetter(playlist.title)}</div>
        <div className="">Playlist. {capitalizeFirstLetter(authUser?.first_name)}</div>
      </div>
    </OverlayTrigger>
  </div>
</div>

  
       
          
              )
       })}

</div>

) : (<div className="  homeleft-text flex-column mb-3">
 
 <div className='rounded-3 py-3 px-1 '>
  <p className="mt-2 fw-medium  ">Create Your First Playlist</p>
   <p className="  ">It's is easy we will help you </p> 
  <div className="d-flex   mb-3 flex-column">
           
  {show && ( <div className="my-2 ">
    <Form className='d-flex justify-content-evenly shadow-none form-font ' onSubmit={formik.handleSubmit}>
  <div className="">     <Form.Control size="sm" className='form-text shadow-none'  required  value={formik.values.title} onChange={formik.handleChange} onInput={() => dispatch(handleOnInput())}   name="title"   type="text" placeholder="title" />
      {formik.touched.title && formik.errors.title && (
            <div className="error ">{formik.errors.title} {message}</div>
            
          )}</div>
  <div className="m-1 "     ><Button type="submit" size="sm" className="create-button"  disabled={submitting}  >Save</Button></div>
  </Form>
 
</div>)}
  <div  className="me-auto   p-2  " >
 <Button onClick={showForm} className={show ? (" text-center  create-button   ") : ("  text-center create-button  ") }>Create  Playlist</Button>
 </div>
    </div>
    </div>
  <div className="homeleft-text my-2  rounded-3 ">
 
<div className=' py-3 px-2 rounded-3'>
  <p className="fw-medium   ">Lets find some more pod</p>
  <p className="  "> We will keep you updated on new episode </p>
  <div  className="ms-auto   p-2  " >

       <Button    className=" create-button rounded-3  gap-2 mb-2">Browse Podcast</Button>
   
          
        </div>
        </div>
  </div>
   <div className="p-2 homeleft-text">{message  &&  (<p className="text-warning" >{message}</p>)}</div>

</div>)}
    
   
</div>
) : (
 <div className=" rounded-5  homeleft-text flex-column my-5">

  <div className='rounded-2 py-3 px-1'>
  <p className="fw-medium ">Create Your First Playlist</p>
  <p className="  ">It's is easy we will help you </p>
  <div  className="ms-auto   p-2  " >
    <OverlayTrigger
      placement="right"
      delay={{ show: 250, hide: 400 }}
      overlay={renderTooltip1}
    >
       <Button    className="  variant=''  create-button rounded-3  gap-2 mb-2">Create Playlist</Button>
    </OverlayTrigger>
          
        </div>
        </div>
       
         <div className='rounded-2 my-3 py-3 px-1'>
  <p className=" fw-medium  ">Lets find some more podcast</p>
  <p className=""> We will keep you updated on new episode </p>
  <div  className="ms-auto  p-2  " >
    <OverlayTrigger
      placement="right"
      delay={{ show: 250, hide: 400 }}
      overlay={renderTooltip1}
    >
       <Button   className=" create-button rounded-3   gap-2 mb-2">Browse Podcast</Button>
    </OverlayTrigger>
          
        </div>
        </div>
        

</div>

  
) }  
<div
  onContextMenu={(e) => {
    e.preventDefault();
    showMenu(e.pageX, e.pageY, [
      {
        label: 'Go to Artist Radio',
        onClick: () => navigate(`/allartists`),
      },
      {
        label: 'Create Playlist',
        onClick: () => setShow(true),
      },
      {
        label: 'Report',
        onClick: () => navigate(`/report`),
      },
    ]);
  }}
  style={{ height: '100%' }}
>
  {/* Optional empty div for right-click capture */}
</div>

</div>
  )
}

export default LeftSidebar;