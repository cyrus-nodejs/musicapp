import { ARTIST } from "../../../../utils/@types";
import { Row   } from "react-bootstrap"
import { LazyLoadImage } from "react-lazy-load-image-component";
import {useEffect } from "react";


import { Link } from "react-router-dom";
import { fetchArtists, getArtists } from "../../../../redux/features/audio/audioSlice";
import { useAppSelector, useAppDispatch } from "../../../../redux/app/hook";

const Artists = () => {
  const artists  = useAppSelector(getArtists)
  const dispatch = useAppDispatch()

  useEffect(() =>{
  dispatch(fetchArtists())
      }, [dispatch])
  
// const {artists} = useContext(AudioPlayerContext)
 
  
    console.log(artists)
  return (
    
           
           
      <Row  className='mt-5' >
         {artists && (
          <div>
           
           <div className="d-flex mb-3">
           <div className="d-inline-flex my-3 fs-4 border-info  border-bottom">Artists</div>
    
    <div className="ms-auto p-2"><Link to="/allartists" className="text-decoration-none d-none d-lg-block text-light">Show all</Link>  </div>
  </div>
            <div className="row    ">
       {artists?.slice(0, 5).map((artist:ARTIST) =>{
          return (
        <figure className="figure col  ">
            <Link to={`/artist/${artist.name}`} className="text-decoration-none text-light">     
            
               <LazyLoadImage className=" rounded-circle "  effect="blur" src={`${import.meta.env.VITE_APP_CLOUD_URL}/${artist.cover_image}`}   style={{ width: '120px', height: '130px' }} />
            </Link>
                 <figcaption className="figure-caption text-light  ">{artist.name}</figcaption> 
                </figure>
              )
       })}
    
       </div>
      
      
        </div>
         )}
       
</Row>
  )
}

export default Artists;