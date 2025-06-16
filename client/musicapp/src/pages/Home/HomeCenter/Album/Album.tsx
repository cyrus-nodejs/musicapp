import { ALBUM } from "../../../../utils/@types";
import { Row, Image,   } from "react-bootstrap"

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
    
           
           
      <Row  className='mt-5' >
         {albums && (
          <div>

<div className="d-flex mb-3">
<div className="d-inline-flex my-3 fs-4 border-info text-light  border-bottom">Albums</div>
    
    <div className="ms-auto d-none d-lg-block p-2"><Link to="/allalbums" className="text-decoration-none text-light">Show all</Link>  </div>
  </div>
          
        
            <div className="row   ">
       {albums?.slice(0, 5).map((album:ALBUM) =>{
          return (
        <figure className="figure col ">
         <Link to={`/album/${album.title}`} className="text-decoration-none text-light"><Image src={`${import.meta.env.VITE_APP_CLOUD_URL}/${album.cover_image}`} className=" rounded-3" width="130" height="120"  rounded/></Link>
                 <figcaption className="figure-caption text-light  ">{album.title}</figcaption> 
                </figure>
              )
       })}
    
       </div>
      
      
        </div>
         )}
       
</Row>
  )
}

export default Albums;