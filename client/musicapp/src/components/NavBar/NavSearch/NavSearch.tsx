
// import { Form } from 'react-bootstrap'

import { useAppDispatch, useAppSelector } from '../../../redux/app/hook'
import { fetchSearchResult, handleSearchterm,  getSearchTerm } from '../../../redux/features/audio/audioSlice'
import { useEffect } from 'react'
const NavSearch = () => {
  const searchterm = useAppSelector(getSearchTerm)
  const dispatch = useAppDispatch()
   

useEffect(() =>{
  dispatch(fetchSearchResult(searchterm))
      }, [dispatch, searchterm])
       
     
  return (
    <div className="d-flex  " >
        <a href="/" className="text-decoration-none text-light">
          <div className=" ">
          <i className='bx bx-home d-none d-lg-block mt-2 bx-md '></i>
          </div>
          </a>
        <div className="p-2 me-3 col-12 ">
    
 <input onChange = {(e) => dispatch(handleSearchterm(e.target.value))}  type="text" className=" navform form-control form-control-lg  w-100  border rounded-4  shadow-none d-none d-lg-block" placeholder="What do you want to play?" /> 
 {/* <Form.Control onChange = {(e) => dispatch(handleSearchterm(e.target.value))} placeholder="Enter search" type="text"  className="d-lg-none form-control bg-dark navform shadow-none" />  */}
  <span className='fs-6 d-lg-none '>Stream on large device!</span>
</div> 


    </div>
  )
}

export default NavSearch