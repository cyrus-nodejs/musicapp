
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { Container, Button, Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/app/hook';
import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { fetchResetPassword, getMessage } from '../../redux/features/auth/authSlice';


const ResetPassword = () => {
  const {uid, token} = useParams()
  const dispatch = useAppDispatch()
  const message = useAppSelector(getMessage)
  const [submitting, setSubmitting] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let data;

interface FormValues {
  password: string;
  confirmPassword: string;
 
}




  const validationSchema = Yup.object().shape({
  
   password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
    confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required'),
   });

  const handleSubmit = async (values: FormValues) => {
    try {
      setSubmitting(true);
      const password = values.password
      dispatch(fetchResetPassword(data={password, uid, token}))
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
      confirmPassword:"",

    },
    validationSchema,
    onSubmit: handleSubmit,
  });


         
         
  return (
   
    <section>
    <Container className="vh-100 pt-5  mainCenter" fluid>
   

<div   className="d-flex justify-content-center">

         
<p className="text-center  fs-5 fw-normal">Reset your password.</p>           
  <p className="text-center text-dark fs-5 fw-normal">Reset your password.
  Last step. Enter your password, and you are set. Thanks!</p>
  <Form onSubmit={formik.handleSubmit}>
      <Form.Control size="lg"  required   value={formik.values.password}  onChange={formik.handleChange} style={{}} name="password"     type="password" placeholder="Password" />
      {formik.touched.password && formik.errors.password && (
            <div className="error">{formik.errors.password}</div>
          )}
      <br />
      <Form.Control size="lg"  required className="shadow-none"   value={formik.values.confirmPassword}  onChange={formik.handleChange} style={{}} name="confirmPassword"     type="password" placeholder="Confirm Password" />
       {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <div className="error">{formik.errors.confirmPassword}</div>
          )}
      <br />
                <div className="d-grid gap-2">
             <Button type="submit" disabled={submitting}  variant="success" style={{margin:"20px 0px"}} size="lg"  >Reset Password</Button>
               </div> 

               </Form>
    <div class="ms-auto fs-4 p-2"><p className="fs-6 mr-4 ">  <a href="/Login" className="text-decoration-none text-reset fs-5">Login</a></p></div>
    <p className="text-danger text-center">{message}</p>
   
</div>
    
    

     
      




</Container>

    </section>
 )
}

export default ResetPassword;


