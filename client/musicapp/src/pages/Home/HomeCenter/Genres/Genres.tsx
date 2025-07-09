import { GENRE } from "../../../../utils/@types";
import { Row   } from "react-bootstrap"
import { LazyLoadImage } from "react-lazy-load-image-component";
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
    
           
           
      <Row  className='mt-5 artist-bg' >
         {genres && (
          <div className='artist-bg'>

<div className="d-flex  artist-bg">
<div className="d-inline-flex my-3 fs-4 border-info artist-bg  border-bottom">Genres</div>
    
    <div className="ms-auto d-none artist-bg d-lg-block p-2"><Link to="/allgenres" className="text-decoration-none  text-reset artist-bg">Show all</Link>  </div>
  </div>
          
        
            <div className="row   artist-bg">
       {genres?.slice(0, 5).map((genre:GENRE) =>{
          return (
        <div className=" col artist-bg">
         <Link to={`/genre/${genre?.title}`} className="text-decoration-none  text-reset artist-bg">
         
                         <LazyLoadImage className=" rounded-3 artist-bg"  effect="blur" src={`${import.meta.env.VITE_APP_CLOUD_URL}/${genre.cover_image}`}   style={{ width: '120px', height: '130px' }} />
         </Link>
                 <figcaption className=" artist-bg  ">{genre.title}</figcaption> 
                </div>
              )
       })}
    
       </div>
      
      
        </div>
         )}
       
</Row>
  )
}

export default Genres;