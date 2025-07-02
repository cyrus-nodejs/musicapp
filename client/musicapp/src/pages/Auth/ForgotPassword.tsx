

import Container from 'react-bootstrap/Container';
 
import Button from 'react-bootstrap/Button';

import Form from 'react-bootstrap/Form';

import {  useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../redux/app/hook';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { fetchForgotPassword, getMessage } from '../../redux/features/auth/authSlice';

const ForgotPassword = () => {
  const [submitting, setSubmitting] = useState(false);
  const dispatch = useAppDispatch()
  const message = useAppSelector(getMessage)
  interface FormValues {
    email:string,
  }
  
  
  
  
    const validationSchema = Yup.object().shape({
     email: Yup.string().email('Invalid email').required('Email is required'),
     });
  
    const handleSubmit = async (values: FormValues) => {
      try {
        setSubmitting(true);
        dispatch(fetchForgotPassword(values))
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
        email:"",
      },
      validationSchema,
      onSubmit: handleSubmit,
    });
  

  return (
   
    <section>
    <Container className="vh-100 pt-5 mainCenter" fluid>
   
    <div className=" d-flex justify-content-center">
<div   className="ms-auto my-5 me-auto">

         
    <h2 className=' text-center '>Forgot Password</h2>          
  <p className="text-center  fs-5 fw-normal">Forgot Your Password?No problem! </p>
  <p className='fs-5'>We'll send you instructions on how to reset your password.</p>
  <Form onSubmit={formik.handleSubmit}>
      <Form.Control size="lg" className="shadow-none form-font text-white"  required  value={formik.values.email} onChange={formik.handleChange} style={{}} name="email"   type="email" placeholder="Enter Email" />
      {formik.touched.email && formik.errors.email && (
            <div className="error ">{formik.errors.email}</div>
          )}
     
      <br />
     
                <div className="text-center">
             <Button type="submit" disabled={submitting}  className='create-button' style={{margin:"20px 0px"}} size="lg"  >Send Reset Link</Button>
               </div> 

               </Form>
    
    
    <div className="d-flex mb-3">
 <div className="p-2"><p style={{color:'red', textDecoration:'none'}}>{message}</p></div>
 
 
</div>
    
    

     
      
</div>

</div>

</Container>

    </section>
 )
}

export default ForgotPassword;



