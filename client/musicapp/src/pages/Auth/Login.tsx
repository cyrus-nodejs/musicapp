


import {  redirect, Navigate, useNavigate} from 'react-router-dom';
import "../../App.css"
import {Button, Container, Form} from 'react-bootstrap'
import "../../App.css"



import { useFormik } from 'formik';
import * as Yup from 'yup';


import {  useState, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../redux/app/hook';
import {  getMessage,    fetchLogin, getAuthUser,   getIsAuthenticated } from '../../redux/features/auth/authSlice';


const Login = () => {
  const navigate = useNavigate()
  
  
    const isAuthenticated = useAppSelector(getIsAuthenticated)
      const user = useAppSelector(getAuthUser)
    

      
    const dispatch = useAppDispatch()
  const message = useAppSelector(getMessage)
  const [submitting, setSubmitting] = useState(false);



interface FormValues {
  password: string;
  username:string,
}




  const validationSchema = Yup.object().shape({
   username: Yup.string().email('Invalid email').required('Email is required'),
   password: Yup.string()
    .min(6, 'Password must be at least 9 characters')
    .required('Password is required'),
   });

  const handleSubmit = async (values: FormValues) => {
    try {
      setSubmitting(true);
      dispatch(fetchLogin(values))
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
      password: '',
      username:"",
    },
    validationSchema,
    onSubmit: handleSubmit,
  });


      useEffect(() =>{
        if (isAuthenticated && user){
          navigate('/')
        }else{
          redirect("/login")
        }

          }, [isAuthenticated, user, navigate])
  
      //  const  handleGoogleLogin = () => {
      //   window.location.href = "http://localhost:3000/auth/google";
      //  }
          
         
         

  return (
  

        <Container className="pt-5 vh-100  mainCenter" fluid> 
          
          <div className=" d-flex justify-content-center ">
      {!isAuthenticated && !user &&(
          <Navigate to="/login" replace={true} />
        )} 
          
          
         
              <div className="">
          
                   
            <h2 className="text-center   my-3  ">Login</h2>
            <Form className='' onSubmit={formik.handleSubmit}>
      <Form.Control size="lg"  className='shadow-none form-font text-white'  required  value={formik.values.username} onChange={formik.handleChange} style={{}} name="username"   type="email" placeholder="Enter Email" />
      {formik.touched.username && formik.errors.username && (
            <div className="error ">{formik.errors.username}</div>
          )}
     
      <br />
      <Form.Control size="lg"  required  className='shadow-none form-font text-white'  value={formik.values.password}  onChange={formik.handleChange} style={{}} name="password"     type="password" placeholder="Enter Password" />
      {formik.touched.password && formik.errors.password && (
            <div className="error">{formik.errors.password}</div>
          )}
      <br />
                <div className="d-grid gap-2">
             <Button type="submit" disabled={submitting}  className='create-button ' style={{margin:"20px 0px"}} size="lg"  >Sign in</Button>
               </div> 

               </Form>
               {/* <div>
      <Button variant='success'  className='' onClick={handleGoogleLogin}>Login with Google</Button>
    </div>
            */}
              
              <div className="d-flex mb-3">
           <div className="p-2"><a href="/forgotpassword" style={{color:'red', textDecoration:'none'}}><p style={{color:'red', textDecoration:'none'}}>Forgot password?</p></a></div>
           
           <div className="ms-auto p-2"><p className="fs-6 mr-4 "> Don't have an account?  <a href="/register" style={{color:'red', textDecoration:'none'}}>Sign up</a></p></div>

          </div>
             
              
          
          <p className="text-danger mt-2 fs-5 text-center">{message}</p>  
          </div>    
          </div>
     
          </Container>
        
      
 )
}

export default Login;



