
import { Row, Form } from 'react-bootstrap'
import { useAppDispatch } from '../../../redux/app/hook'
import { fetchSearchResult } from '../../../redux/features/audio/audioSlice'

import { useState, useEffect } from 'react'
const NavbarSearch = () => {
  const [searchterm, setSearchTerm] = useState('')
    const dispatch = useAppDispatch()
     
 
  useEffect(() =>{
    dispatch(fetchSearchResult(searchterm))
        }, [dispatch, searchterm])
         

  return (
   
<div>
        <Row style={{margin:""}} >
        <Form className="d-flex "  >
     <Form.Label htmlFor="inlineFormInput" visuallyHidden>
    Search
   </Form.Label>
   <Form.Control
   className="border border-0  navform  shadow-none  me-2"
     size="lg"
    id="inlineFormInput"
     placeholder="Search items"
     onChange = {e => setSearchTerm(e.target.value)}
     type="text"
   />
  <a href="/search"><div className=" m-1 border-0 px-2 bg-info rounded-2 border "><i className='bx bx-search bx-md  text-light'></i></div></a>

 </Form>
</Row>
    </div>
  )
}

export default NavbarSearch