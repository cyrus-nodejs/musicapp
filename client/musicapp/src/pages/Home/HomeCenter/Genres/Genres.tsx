import { GENRE } from "../../../../utils/@types";
import { Row, Image,   } from "react-bootstrap"

import {  useEffect} from "react";
import { fetchGenres, getGenres } from "../../../../redux/features/audio/audioSlice";
import { useAppSelector, useAppDispatch } from "../../../../redux/app/hook";



import { Link } from "react-router-dom";


const Genres = () => {
  

  const genres  = useAppSelector(getGenres)
  const dispatch = useAppDispatch()

  useEffect(() =>{
  dispatch(fetchGenres())
      }, [dispatch])
  
// const {artists} = useContext(AudioPlayerContext)
 
  
    console.log(genres)
 
  return (
    
           
           
      <Row  className='mt-5' >
         {genres && (
          <div>

<div className="d-flex mb-3">
<div className="d-inline-flex my-3 fs-4 border-info text-light  border-bottom">Genres</div>
    
    <div className="ms-auto d-none d-lg-block p-2"><Link to="/allgenres" className="text-decoration-none text-light">Show all</Link>  </div>
  </div>
          
        
            <div className="row   ">
       {genres.slice(0, 5).map((genre:GENRE) =>{
          return (
        <figure className="figure col ">
         <Link to={`/genre/${genre?.title}`} className="text-decoration-none text-light"><Image src={`${import.meta.env.VITE_APP_CLOUD_URL}/${genre.cover_image}`} className=" " width="130" height="120"  rounded/></Link>
                 <figcaption className="figure-caption text-light  ">{genre.title}</figcaption> 
                </figure>
              )
       })}
    
       </div>
      
      
        </div>
         )}
       
</Row>
  )
}

export default Genres;