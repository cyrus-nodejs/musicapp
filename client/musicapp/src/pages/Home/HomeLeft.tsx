


import { OverlayTrigger,  Button,  Form,  TooltipProps } from "react-bootstrap";
import "../../index.css"
import { Link } from "react-router-dom";
import { PLAYLIST } from "../../utils/@types";
import { useEffect,useRef,  useState, RefAttributes } from "react";
import {fetchUpdateTitle, handleOnInput, fetchPlaylist, getMessage, getPlaylists, fetchDeletePlaylist, fetchCreatePlaylist } from "../../redux/features/playlist/playlistSlice";
import { useAppSelector, useAppDispatch } from "../../redux/app/hook";
 import {getAuthUser, fetchAsyncUser, getIsAuthenticated } from "../../redux/features/auth/authSlice";
import { JSX } from "react/jsx-runtime";
import { useFormik } from 'formik';
import * as Yup from 'yup';

import * as ContextMenu from "@radix-ui/react-context-menu";

const HomeLeft = () => {
  
  
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let data;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let data2;

  const dispatch = useAppDispatch()

 const authUser = useAppSelector(getAuthUser)

 const isauthenticated = useAppSelector(getIsAuthenticated)
 console.log(authUser)
 console.log(isauthenticated)
const Playlist = useAppSelector(getPlaylists)
const message = useAppSelector(getMessage)
 const [title, setTitle]  = useState("")
 const [show, setShow] = useState(false)
 const target = useRef(null);
 console.log(Playlist)
const HandleSelect = (e:Event) =>{
e.preventDefault()
}

const showForm = () => {
  setShow((prev) => !prev)
}
// const hideForm = () => {
//   setShow((prev) => !prev)
// }

useEffect(() => {
  dispatch(fetchPlaylist())
}, [dispatch])
 
useEffect(() => {
  dispatch(fetchAsyncUser())
}, [dispatch])
 


const renderTooltip1 = (props: JSX.IntrinsicAttributes & TooltipProps & RefAttributes<HTMLDivElement>) => (
  <div id="button-tooltip  " {...props}>
    Login to Create Playlist
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

    
    <div  className="mt-3 d-none d-lg-block  homeleft col-2 me-1 rounded    text-light ">
    

    <div className="d-flex mb-3">
    <div className="p-2 ">Your Library</div>
    
    
         <div  className="ms-auto  p-1  " >
        <Button size="sm" variant="" ref={target} onClick={() => setShow(!show)}>
        <i    className='bx text-light bx-plus bx-sm'></i>
      </Button>
       {/* <Overlay target={target.current} show={show} placement="bottom">
        {({
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          placement: _placement,
           // eslint-disable-next-line @typescript-eslint/no-unused-vars
          arrowProps: _arrowProps,
           // eslint-disable-next-line @typescript-eslint/no-unused-vars
          show: _show,
           // eslint-disable-next-line @typescript-eslint/no-unused-vars
          popper: _popper,
           // eslint-disable-next-line @typescript-eslint/no-unused-vars
          hasDoneInitialMeasure: _hasDoneInitialMeasure,
          ...props
        }) => (
          <div
            {...props}
            style={{
              position: 'absolute',
              backgroundColor: '',
              padding: '0px 10px',
              color: 'white',
              borderRadius: 3,
              ...props.style,
            }}
            
          >
             {authUser && isauthenticated ?  (<Form className="p-1" onSubmit={formik.handleSubmit}>
          
  
          <div className="d-flex w-75">
        
          <div className="">  <Form.Control type="text" className=" form-control  text-light  rounded-2   border border-0  w-100 h-100  rounded-2  shadow-none " placeholder="Create Playlist" value={formik.values.title} onChange={formik.handleChange} onInput={() => dispatch(handleOnInput())}  name="title" />
          {formik.touched.title && formik.errors.title && (
                    <div className="error text-light">{formik.errors.title} </div>
                  )}
                 
          </div>
          <div className="" onClick={hideForm} ><Button  type="submit" disabled={submitting} variant="dark" >Save</Button></div>
          </div>
        
         
        
                       
        </Form>
        ) : (<p className='text-light'>Login to Create Playlist</p>) } 
             
          </div>
        )}
      </Overlay>  */}
      </div>
        <div className="p-2"><i className='bx  bx-sm bx-right-arrow-alt'></i></div>
      
  </div>

  { authUser && isauthenticated  ? (
  
    <div  className="">
        {Playlist  ? ( <div>
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
      <div key={id} className="d-flex flex-column ">
            <div className="">{playlist?.title}  </div>
            <div className=" text-light">Playlist. {authUser?.first_name.toUpperCase() } </div>
            </div>
       
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
  <div className="">  <input type="text" className="bg-dark  rounded-2  text-light border border-0  w-100 h-100  rounded-2  shadow-none " placeholder="Edit title" onChange={e => {setTitle(e.target.value)}} /></div>
  <div className="" ><Button variant="dark" onClick={() => dispatch(fetchUpdateTitle(data={title,playlist}))}>Save</Button></div>
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
) : (<div className=" rounded-3  flex-column mb-3">
  <h6 className="mt-2 fs-6 text-light  d-inline-flex">Create Your First Playlist</h6>
   <p className="p-2 d-inline-flex">It's is easy we will help you </p> 
  <div className="d-flex flex-column mb-3">
  <div className=" ">
  <div onClick={showForm} className={show ? ("p-2 text-center me-1  text-light bg-success  rounded-3 ") : ("p-2  me-1 text-light text-center bg-success  rounded-3 ") }>Create New Playlist <i className='bx  bxs-playlist bx-sm'></i></div>

  {show && ( <div className="mt-2 ">
    <Form className='d-flex justify-content-evenly ' onSubmit={formik.handleSubmit}>
  <div className="">     <Form.Control size="sm" className='text-light shadow-none'  required  value={formik.values.title} onChange={formik.handleChange} onInput={() => dispatch(handleOnInput())}   name="title"   type="text" placeholder="title" />
      {formik.touched.title && formik.errors.title && (
            <div className="error ">{formik.errors.title} {message}</div>
            
          )}</div>
  <div className="ms-1"     ><Button type="submit" size="sm" className=""  disabled={submitting} variant="dark" >Save</Button></div>

  </Form>
 
</div>)}

  </div>
   <div className="p-2">{message  &&  (<p className="text-warning" >{message}</p>)}</div>
  </div>
</div>)}
    
   
</div>
) : (
 <div className=" rounded-3  flex-column mb-3">
  <div className="p-2 fs-6 d-inline-flex">Create Your First Playlist</div>
  <div className="p-2 d-inline-flex">It's is easy we will help you </div>
  <div  className="ms-auto  p-2  rounded-5" >
    <OverlayTrigger
      placement="bottom"
      delay={{ show: 250, hide: 400 }}
      overlay={renderTooltip1}
    >
       <div  className="p-2 text-light bg-success rounded-3 d-inline-flex">Create Playlist</div>
    </OverlayTrigger>
          
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

  <div className="">  <Form.Control type="text" className="bg-dark  className='text-light'   rounded-2  text-light border border-0  w-100 h-100  rounded-2  shadow-none " placeholder="Edit title" value={formik.values.title} onChange={formik.handleChange} onInput={() => dispatch(handleOnInput())}  name="title" />
  {formik.touched.title && formik.errors.title && (
            <div className="error text-light">{formik.errors.title} </div>
          )}
         
  </div>
  <div className="" ><Button type="submit" disabled={submitting} variant="success" >Save</Button></div>
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