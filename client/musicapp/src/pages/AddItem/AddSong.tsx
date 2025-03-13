
import { useEffect, useState} from 'react';

import { Form, Row, Col, Button, Container } from "react-bootstrap";
import { useAppDispatch } from '../../redux/app/hook';
import { fetchAddSong } from '../../redux/features/admin/adminSlice';
const AddSong = () => {



const dispatch = useAppDispatch()
    const [state, setState] = useState({
     title:"",
       image:"",
        artistname:"", 
        genre:"",
         topten: "",
         songfile:"",
         year:"",
         status:"",
         album:"",
    duration:"",
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

//  const handleImage = (e) => {
//   setState({...state, image : e.target.files})
//  }

  // const handleAvatar = (e) => {
  //  setState({...state, avatar : e.target.files[0]})
  // }

 
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleImage = (e:any) => {
    setState({...state, image : e.target.files[0]})
   }
 

   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   const handleSongFile= (e:any) => {
    setState({...state, songfile : e.target.files[0]})
   }
 
 




   const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
   
    setLoading(true)
   
   
    const formData = new FormData;
    formData.append("title", state.title)
      formData.append("image", state.image);
    
      formData.append("songfile", state.songfile);
  formData.append("artistname", state.artistname)
     formData.append("genre", state.genre)
     formData.append("topten", state.topten)
        formData.append("year",  state.year)
        formData.append("status", state.status)
        formData.append("album", state.album)
        formData.append("duration", state.duration)
  
           // formData.append("avatar", state.avatar);
      // for (let i = 0; i < state.image.length; i++) {
      //   formData.append('image', state.image[i]);
      // }
       
      
       
  dispatch(fetchAddSong(formData))
    .then(response => {
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
    <section className="col-7 mainCenter order rounded  ">
     <Container fluid>

      <p className="fs-3 text-center">ADD TRACK</p>
   <Form encType="multipart/form-data">
    <Row className="mb-3">
      <Form.Group as={Col} controlId="title">
        <Form.Label>Title</Form.Label>
        <Form.Control size="sm" type="text" placeholder="Title"  onChange={handleChange}  name="title"  />
      </Form.Group>
      <Form.Group as={Col} controlId="Description">
      <Form.Label>Artist</Form.Label>
      <Form.Control size="sm" type="text" placeholder="Artist name" onChange={handleChange} name="artistname"    />
    </Form.Group>
      <Form.Group as={Col} controlId="Category">
        <Form.Label>Genre</Form.Label>
        <Form.Select className="bg-secondary" size="sm" defaultValue="Select category"  onChange={handleChange}  name="genre"  >
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
     
    </Row>
    <Row className="mb-3">
      <Form.Group as={Col} controlId="title">
        <Form.Label>Album</Form.Label>
        <Form.Control size="sm" type="text" placeholder="Album"  onChange={handleChange}  name="album"  />
      </Form.Group>
      {/* <Form.Group as={Col} controlId="Description">
      <Form.Label>Biography</Form.Label>
      <Form.Control size="sm" type="text" placeholder="Biography" onChange={handleChange} name="biography"    />
    </Form.Group> */}
      
    </Row>
    <Row className="mb-2">
  
    <Form.Group as={Col} controlId="Image">
      <Form.Label>Image</Form.Label>
      <Form.Control  size="sm" type="file"  name="image" placeholder="Track mage" onChange={handleImage}  accept=".png, .jpg, .jpeg, avif" />
    </Form.Group>

    {/* <Form.Group as={Col} controlId="Image">
      <Form.Label>Avatar</Form.Label>
      <Form.Control  size="sm" type="file"  name="avatar" placeholder="Artist Avatar" onChange={handleAvatar}  accept=".png, .jpg, .jpeg, avif" />
    </Form.Group>
    <Form.Group as={Col} controlId="Image">
      <Form.Label>Genre Image</Form.Label>
      <Form.Control  size="sm" type="file"  name="genrebg" placeholder="Genre Image" onChange={handleGenreBg}  accept=".png, .jpg, .jpeg, avif" />
    </Form.Group> */}
    <Form.Group as={Col} controlId="Image">
      <Form.Label>Track file</Form.Label>
      <Form.Control  size="sm" type="file"  name="songfile" placeholder="Track file" onChange={handleSongFile}  />
    </Form.Group>

  
    
      </Row >
   

    <Row className="mb-3">
    <Form.Group as={Col} controlId="Status">
        <Form.Label>Status</Form.Label>
        
        <Form.Control size="sm" type="text" placeholder="Status"  onChange={handleChange}  name="status"  />
      </Form.Group>
     
      <Form.Group as={Col} controlId="Top 10">
        <Form.Label>Top 10</Form.Label>
        <Form.Select  defaultValue="Select Top 10"    onChange={handleChange}  name="topten">
          <option>true</option>
          <option>false</option>
        </Form.Select>
      </Form.Group>
      
      
      <Form.Group as={Col} controlId="Quantity">
        <Form.Label>Release Year</Form.Label>
        <Form.Control size="sm" type="text" placeholder="Release Year"   name="year" onChange={handleChange}  />
      </Form.Group>

      <Form.Group as={Col} controlId="Quantity">
        <Form.Label>Duration</Form.Label>
        <Form.Control size="sm" type="text" placeholder="Duration"   name="duration" onChange={handleChange}  />
      </Form.Group>

    </Row>
    

    <div className="d-grid gap-2 col-2 mx-auto">
    <Button className="" onClick={handleSubmit}      variant="outline-light" type="submit">
    {isLoading ? 'Loading…' : 'Click to Add Song'}
    </Button>
    </div>
  </Form>
  </Container>
   
      </section>
  )
}

export default AddSong