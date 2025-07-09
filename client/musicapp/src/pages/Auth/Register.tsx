
// import {  Link } from 'react-router-dom';
import { Button, Form, Container } from 'react-bootstrap';

import {useState} from 'react';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from '../../redux/app/hook';
import { fetchRegister, getMessage } from '../../redux/features/auth/authSlice';

import Stack from 'react-bootstrap/Stack';



const Register = ( ) => {
  const dispatch = useAppDispatch()
  const message = useAppSelector(getMessage)
  const [submitting, setSubmitting] = useState(false);



interface FormValues {
  first_name: string;
  last_name: string;
  username: string;
  password: string;
  confirmPassword: string;
}




  const validationSchema = Yup.object().shape({
   first_name: Yup.string()
   .min(2, 'Name must be minimum 2')
   .max(100, 'Name must not be more than 100 characters')
   .required('Name is required'),
   last_name: Yup.string()
   .min(2, 'Name must be minimum 2')
   .max(100, 'Name must not be more than 100 characters')
   .required('Name is required'),
   username: Yup.string().email('Invalid email').required('email is required'),
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
      dispatch(fetchRegister(values))
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
      first_name: '',
      last_name: '',
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

 

  return (
    
    <section className="  ">
      <Container className="vh-100 pt-5 mainCenter" fluid>
{/* <Link to="/" className="p-2 navbar fs-3 text-decoration-none text-reset text-danger">SOUND PLANET</Link> */}

 <div className=" d-flex justify-content-center ">
 <div className="ms-auto  me-auto">

                
  <h2 className="text-center" >Register </h2>
  <Form className='text-light' onSubmit={formik.handleSubmit}>
  <Form.Control className='shadow-none form-font text-white'  size="lg"  required  onChange={formik.handleChange} value={formik.values.first_name} style={{}}  name="first_name"type="text"  placeholder="Enter first_name" />
  {formik.touched.first_name && formik.errors.first_name && (
            <div className="error ">{formik.errors.first_name}</div>
          )}
      <br /> 
      <Form.Control className='shadow-none form-font text-white' size="lg"  required onChange={formik.handleChange} value={formik.values.last_name}  style={{}}  name="last_name"   type="text"  placeholder="last_name" />
      {formik.touched.last_name && formik.errors.last_name && (
            <div className="error ">{formik.errors.last_name}</div>
          )}
      <br />
      <Form.Control className='shadow-none form-font text-white' size="lg"  required  value={formik.values.username} onChange={formik.handleChange} style={{}} name="username"   type="email" placeholder="email" />
      {formik.touched.username && formik.errors.username && (
            <div className="error ">{formik.errors.username}</div>
          )}
      <br />
      <Form.Control className='shadow-none form-font text-white' size="lg" hidden  required  value={formik.values.username} onChange={formik.handleChange} style={{}} name="username"   type="email" placeholder="email" />
      {formik.touched.username && formik.errors.username && (
            <div className="error ">{formik.errors.username}</div>
          )}
      <br />
      <Form.Control className='shadow-none form-font text-white' size="lg"  required   value={formik.values.password}  onChange={formik.handleChange} style={{}} name="password"     type="password" placeholder="Password" />
      {formik.touched.password && formik.errors.password && (
            <div className="error">{formik.errors.password}</div>
          )}
      <br />
       <Form.Control className='shadow-none form-font text-white' size="lg"  required   value={formik.values.confirmPassword}  onChange={formik.handleChange} style={{}} name="confirmPassword"     type="password" placeholder="Confirm Password" />
       {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <div className="error">{formik.errors.confirmPassword}</div>
          )}
      <br />
     
      <div className="d-grid gap-2">
    
    <Button className='create-button custom-button' type="submit" disabled={submitting} style={{margin:"20px 0px"}} size="lg"      >Sign up</Button>
   
     </div>
     </Form>
     <Stack direction="horizontal" gap={1}>
      <div className="p-2 loginp"  > <p className="fs-6 "> Already registered? {message && (<span className="text-danger  fs-6 text-center">{message}</span> )}   <a href="/login" style={{color:'red', textDecoration:'none', }}>  Please sign in</a></p></div>
      
    </Stack>

</div>

</div>

</Container>

    </section>
  )
}

export default Register;