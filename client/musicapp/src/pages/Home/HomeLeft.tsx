


import { OverlayTrigger,  Button,  Form,  TooltipProps } from "react-bootstrap";
import { RightClickTooltip } from "../../components/Player/Control/Overlay";
import "../../index.css"
import { Link } from "react-router-dom";
import { PLAYLIST } from "../../utils/@types";
import { useEffect,  useState, RefAttributes } from "react";
import {fetchUpdateTitle, handleOnInput, fetchPlaylist, getMessage, getPlaylists, fetchDeletePlaylist, fetchCreatePlaylist } from "../../redux/features/playlist/playlistSlice";
import { useAppSelector, useAppDispatch } from "../../redux/app/hook";
 import {getAuthUser, fetchAsyncUser, getIsAuthenticated } from "../../redux/features/auth/authSlice";
import { JSX } from "react/jsx-runtime";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { capitalizeFirstLetter } from "../../utils/helpers/utilities";
import * as ContextMenu from "@radix-ui/react-context-menu";

const HomeLeft = () => {
  
  
  
  let data;
  console.log(data)
  
  let data2;
  console.log(data2)

  const dispatch = useAppDispatch()

 const authUser = useAppSelector(getAuthUser)

 const isauthenticated = useAppSelector(getIsAuthenticated)
 console.log(authUser)
 console.log(isauthenticated)
const Playlist = useAppSelector(getPlaylists)
console.log(Playlist)
const message = useAppSelector(getMessage)
 const [title, setTitle]  = useState("")
 const [show, setShow] = useState(false)
//  const target = useRef(null);
 console.log(Playlist)
const HandleSelect = (e:Event) =>{
e.preventDefault()
}

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
{Playlist?.map((playlist:PLAYLIST, id:number) =>{
          return (
    <ContextMenu.Root>
			<ContextMenu.Trigger className="ContextMenuTrigger">
     
      <div  key={playlist?.id}   className="d-flex  mb-2  rounded-2 align-items-center">
            
            <div className="flex-shrink-0">
            <i className='bx bx-music bg-secondary bx-border bx-sm '></i>
            </div>
            <div className="flex-grow-1 rounded ms-3">
                  <OverlayTrigger
                          placement="top"
                          delay={{ show: 250, hide: 400 }}
                          overlay={RightClickTooltip}
                        >
      <div key={id} className="d-flex flex-column ">
            <div className="">{capitalizeFirstLetter(playlist?.title)}  </div>
            <div className=" text-light">Playlist. {capitalizeFirstLetter(authUser?.first_name)} </div>
            </div>
       </OverlayTrigger>
       </div>
     
          </div>
			</ContextMenu.Trigger>
			<ContextMenu.Portal>
				<ContextMenu.Content
					className="ContextMenuContent bg-dark"
					
				>
				
        <ContextMenu.Item className="ContextMenuItem">
          <Link to={`/playlist/${playlist.id}`} className='text-decoration-none d-block text-success'> Go to {playlist?.title}  </Link> 
					</ContextMenu.Item>
					<ContextMenu.Item className="ContextMenuItem">
          <Link to={`/allartists`} className='text-decoration-none d-block text-success'> Go to Artist Radio  </Link> 
					</ContextMenu.Item>
					<ContextMenu.Sub>
						<ContextMenu.SubTrigger className="ContextMenuSubTrigger text-success">
							Edit Playlist
              <div className="RightSlot">
              <i className='bx bx-chevron-right text-success '></i>
							</div>
						</ContextMenu.SubTrigger>
						<ContextMenu.Portal>
							<ContextMenu.SubContent
								className="ContextMenuSubContent w-75"
								sideOffset={2}
								alignOffset={-5}
							>
                
								<ContextMenu.Item onSelect={HandleSelect} className="ContextMenuItem ">
               
                <div className="d-flex ">
  <div className="">  <input type="text" className="bg-dark  rounded-2 border border-0  w-100 h-100  rounded-2  shadow-none " placeholder="Edit title" onChange={e => {setTitle(e.target.value)}} /></div>
  <div className="" ><Button  className='create-button' onClick={() => dispatch(fetchUpdateTitle(data={title,playlist}))}>Save</Button></div>
</div>
								</ContextMenu.Item>
								
							</ContextMenu.SubContent>
						</ContextMenu.Portal>
					</ContextMenu.Sub>
          <ContextMenu.Item className="ContextMenuItem">
          <div onClick={() => dispatch(fetchDeletePlaylist(data2={playlist}))} >Delete Playlist</div>
					</ContextMenu.Item>
          <ContextMenu.Item className="ContextMenuItem">
          <Link to={`/report`} className='text-decoration-none d-block text-success'> Report </Link> 
					</ContextMenu.Item>
				</ContextMenu.Content>
			</ContextMenu.Portal>
		</ContextMenu.Root>
  
       
          
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
<ContextMenu.Root>
<ContextMenu.Trigger className="ContextMenuTrigger">
<div className="h-100">

</div>
</ContextMenu.Trigger>
			<ContextMenu.Portal>
				<ContextMenu.Content
					className="ContextMenuContent bg-dark"
					
				>
				
      
					<ContextMenu.Item className="ContextMenuItem">
          <Link to={`/allartists`} className='text-decoration-none d-block text-success '> Go to Artist Radio  </Link> 
					</ContextMenu.Item>
					<ContextMenu.Sub>
						<ContextMenu.SubTrigger className="ContextMenuSubTrigger text-success">
							Create Playlist
              <div className="RightSlot">
              <i className='bx bx-chevron-right '></i>
							</div>
						</ContextMenu.SubTrigger>
						<ContextMenu.Portal>
							<ContextMenu.SubContent
								className="ContextMenuSubContent w-75"
								sideOffset={2}
								alignOffset={-5}
							>
                {message  &&  (<p className="text-warning" >{message}</p>)}
								<ContextMenu.Item onSelect={HandleSelect} className="ContextMenuItem ">
              
                <Form onSubmit={formik.handleSubmit}>
          
  
  <div className="d-flex ">

  <div className="">  <Form.Control type="text" className="bg-dark form-text  className='text-light'   rounded-2 border border-0  w-100 h-100  rounded-2  shadow-none " placeholder="Edit title" value={formik.values.title} onChange={formik.handleChange} onInput={() => dispatch(handleOnInput())}  name="title" />
  {formik.touched.title && formik.errors.title && (
            <div className="error text-light">{formik.errors.title} </div>
          )}
         
  </div>
  <div className="" ><Button type="submit" disabled={submitting} className='create-button' >Save</Button></div>
  </div>

 

               
</Form>


								</ContextMenu.Item>
								
							</ContextMenu.SubContent>
						</ContextMenu.Portal>
					</ContextMenu.Sub>
          
          <ContextMenu.Item className="ContextMenuItem">
          <Link to={`/report`} className='text-decoration-none d-block text-success '> Report </Link> 
					</ContextMenu.Item>
				</ContextMenu.Content>
			</ContextMenu.Portal>
		</ContextMenu.Root>
</div>
  )
}

export default HomeLeft