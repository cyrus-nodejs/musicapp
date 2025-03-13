
import { useEffect, useState} from 'react';

import { Form, Row, Col, Button, Container } from "react-bootstrap";
import { useAppDispatch } from '../../redux/app/hook';
import { fetchAddPrice } from '../../redux/features/admin/adminSlice';

const AddPricing = () => {
const dispatch = useAppDispatch()

      
  const [plan, setPlan] = useState("")
  const [price, setPrice] = useState("") 
  const [duration, setDuration] = useState("")
  const [active, setActive] = useState("")

  
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
 
 


 
  

 
 
 




   const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
   
    setLoading(true)
   
   const data = {price, plan, duration, active}
      
dispatch(fetchAddPrice(data)).then(response => {
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

      <p className="fs-3 text-center">Add Pricing</p>
   <Form >
    <Row className="mb-3">
    <Form.Group as={Col} >
        <Form.Label>Plan</Form.Label>
        <Form.Select size="sm" defaultValue="Select category" className="bg-dark text-white"  onChange={e => {setPlan(e.target.value)}} name="plan"  >
          <option>Free</option>
          <option>Pro</option>
          <option>Premium</option>
        </Form.Select>
      </Form.Group>

      <Form.Group as={Col} >
        <Form.Label>Active</Form.Label>
        <Form.Select size="sm" defaultValue="Select category" className="bg-dark text-white"  onChange={e => {setActive(e.target.value)}} name="active"  >
          <option>true</option>
          <option>false</option>
        
        </Form.Select>
      </Form.Group>
     </Row>
     <Row>
    <Form.Group as={Col} >
      <Form.Label>Price</Form.Label>
      <Form.Control  size="sm" type="text"  name="price" placeholder="price" onChange={e => {setPrice(e.target.value)}}  />
    </Form.Group>
    <Form.Group as={Col} >
      <Form.Label>Duration</Form.Label>
      <Form.Control  size="sm" type="text"  name="duration" placeholder="duration" onChange={e => {setDuration(e.target.value)}}   />
    </Form.Group>
 

  
    
      </Row >
   

    

    <div className="d-grid pt-5 gap-2 col-2 mx-auto">
    <Button className="" onClick={handleSubmit}      variant="outline-light" type="submit">
    {isLoading ? 'Loading…' : 'Add Price'}
    </Button>
    </div>
  </Form>
  </Container>
   
      </section>
  )
}

export default AddPricing;