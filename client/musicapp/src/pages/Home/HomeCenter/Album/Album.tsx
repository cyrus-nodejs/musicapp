import { ALBUM } from "../../../../utils/@types";
import { Row,   } from "react-bootstrap"
import { LazyLoadImage } from "react-lazy-load-image-component";
import {  useEffect} from "react";
import { fetchAlbums, getAlbums } from "../../../../redux/features/audio/audioSlice";
import { useAppSelector, useAppDispatch } from "../../../../redux/app/hook";



import { Link } from "react-router-dom";


const Albums = () => {
  

  const albums  = useAppSelector(getAlbums)
  const dispatch = useAppDispatch()

  useEffect(() =>{
  dispatch(fetchAlbums())
      }, [dispatch])
  
// const {artists} = useContext(AudioPlayerContext)
 
  
    console.log(albums)
 
  return (
    
           
           
      <Row  className='mt-5 artist-bg' >
         {albums && (
          <div className='artist-bg'>

<div className="d-flex artist-bg mb-3">
<div className="d-inline-flex my-3 fs-4 border-info  artist-bg  border-bottom">Albums</div>
    
    <div className="ms-auto d-none artist-bg d-lg-block p-2"><Link to="/allalbums" className="text-decoration-none  text-reset artist-bg ">Show all</Link>  </div>
  </div>
          
        
            <div className="row  artist-bg ">
       {albums?.slice(0, 5).map((album:ALBUM) =>{
          return (
        <div className="artist-bg col ">
         <Link to={`/album/${album.title}`} className="text-decoration-none ">

               <LazyLoadImage className=" rounded-3 artist-bg"  effect="blur" src={`${import.meta.env.VITE_APP_CLOUD_URL}/${album.cover_image}`}   style={{ width: '130px', height: '130px' }} />
         </Link>
                 <figcaption className=" artist-bg ">{album.title}</figcaption> 
                </div>
              )
       })}
    
       </div>
      
      
        </div>
         )}
       
</Row>
  )
}

export default Albums;