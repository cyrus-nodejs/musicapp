
import { useEffect, useState} from 'react';

import { Form, Row, Col, Button, Container } from "react-bootstrap";
import { useAppDispatch } from '../../redux/app/hook';
import { fetchAddGenre } from '../../redux/features/admin/adminSlice';

const AddGenre = () => {
  const dispatch = useAppDispatch()



    const [state, setState] = useState({
     title:"",
       genrebg:"",
   })
   const [isLoading, setLoading] = useState(false);

   useEffect(() => {
     function simulateNetworkRequest() {
       return new Promise((resolve) => setTimeout(resolve, 2000));
     }
 
     if (isLoading) {
       simulateNetworkRequest().then(() => {
         setLoading(false);
       });
     }
   }, [isLoading]);
 
 
 const handleChange = (e: { preventDefault: () => void; target: { name: string; value: string; }; }) => {
e.preventDefault();
setState({...state, [e.target.name] : e.target.value})
 }


 
  

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
   const handleGenreBg = (e:any) => {
    setState({...state, genrebg : e.target.files[0]})
   }
 
 
 




   const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
   
    setLoading(true)
   
   
    const formData = new FormData;
    formData.append("title", state.title)
      formData.append("genrebg", state.genrebg);
    
       
      
       
    dispatch(fetchAddGenre(formData)).then(response => {
      alert(response)
      alert(response)
      alert("Item saved successfully!")
    })
    .catch(err =>{
      alert(err)
      alert('Not saved!')
    })
  }

   
   
  return (
    <section className="col-7 homeCenter order rounded  ">
     <Container fluid>

      <p className="fs-3 text-center">ADD GENRE</p>
   <Form encType="multipart/form-data">
    <Row className="mb-3">
    <Form.Group as={Col} controlId="Category">
        <Form.Label>Title</Form.Label>
        <Form.Select className="bg-secondary" size="sm" defaultValue="Select category"  onChange={handleChange}  name="title"  >
          <option>Blues</option>
          <option>Hip Hop</option>
          <option>Gospel</option>
          <option>Afro Beats</option>
          <option>Rock</option>
          <option>Jazz</option>
          <option>Country</option>
          <option>R & B</option>
          <option>Electronic</option>
        </Form.Select>
      </Form.Group>
    <Form.Group as={Col} controlId="Image">
      <Form.Label>Genre Image</Form.Label>
      <Form.Control  size="sm" type="file"  name="genrebg" placeholder="Genre Image" onChange={handleGenreBg}  accept=".png, .jpg, .jpeg, avif" />
    </Form.Group>
 

  
    
      </Row >
   

    

    <div className="d-grid gap-2 col-2 mx-auto">
    <Button className="" onClick={handleSubmit}      variant="outline-light" type="submit">
    {isLoading ? 'Loading…' : 'Click to Add Genre'}
    </Button>
    </div>
  </Form>
  </Container>
   
      </section>
  )
}

export default AddGenre