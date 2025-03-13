
import { useEffect, useState} from 'react';

import { Form, Row, Col, Button, Container } from "react-bootstrap";
import { useAppDispatch } from '../../redux/app/hook';
import { fetchAddArtist } from '../../redux/features/admin/adminSlice';
const AddArtist = () => {
const dispatch = useAppDispatch()
    const [state, setState] = useState({
     artistname:"",
       biography:"",
       avatar:"",
         following:"",
         tour:""  , 
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
   const handleAvatar = (e:any) => {
    setState({...state, avatar : e.target.files[0]})
   }
   
 
 




   const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
   
    setLoading(true)
   
   
    const formData = new FormData;
    formData.append("artistname", state.artistname)
      formData.append("avatar", state.avatar);
        formData.append("biography",  state.biography)
        formData.append("following", state.following)
        formData.append("tour", state.tour)
 
  
       
      
       
dispatch(fetchAddArtist(formData)).then(response => {
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

      <p className="fs-3 text-center">ADD ARTIST</p>
   <Form encType="multipart/form-data">
    <Row className="mb-3">
      <Form.Group as={Col} controlId="title">
        <Form.Label>Artist Name</Form.Label>
        <Form.Control size="sm" type="text" placeholder="artistname"  onChange={handleChange}  name="artistname"  />
      </Form.Group>
      <Form.Group as={Col} controlId="Description">
      <Form.Label>Biography</Form.Label>
      <Form.Control size="sm" type="text" placeholder="biography" onChange={handleChange} name="biography"    />
    </Form.Group>
      
     
    </Row>
    <Row className="mb-3">
      <Form.Group as={Col} controlId="title">
        <Form.Label>Following</Form.Label>
        <Form.Control size="sm" type="text" placeholder="Following"  onChange={handleChange}  name="following"  />
      </Form.Group>
      <Form.Group as={Col} controlId="Description">
      <Form.Label>Tour</Form.Label>
      <Form.Control size="sm" type="text" placeholder="Tour" onChange={handleChange} name="tour"    />
    </Form.Group>
      
    </Row>
    <Row className="mb-2">
  
   

    <Form.Group as={Col} controlId="Image">
      <Form.Label>Avatar</Form.Label>
      <Form.Control  size="sm" type="file"  name="avatar" placeholder="Artist Avatar" onChange={handleAvatar}  accept=".png, .jpg, .jpeg, avif" />
    </Form.Group>
   

  
    
      </Row >
   

    

    <div className="d-grid gap-2 col-2 mx-auto">
    <Button className="" onClick={handleSubmit}      variant="outline-light" type="submit">
    {isLoading ? 'Loading…' : 'Click to Add Artist'}
    </Button>
    </div>
  </Form>
  </Container>
   
      </section>
  )
}

export default AddArtist