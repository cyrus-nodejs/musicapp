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
    
           
           
      <Row  className='mt-5 artist-bg ' >
         {artists && (
          <div className='artist-bg '>
           
           <div className="d-flex mb-3 artist-bg">
           <div className="d-inline-flex my-3 fs-4 artist-bg border-bottom">Artists</div>
    
    <div className="ms-auto artist-bg  p-2"><Link to="/allartists" className="text-decoration-none d-none artist-bg d-lg-block text-light">Show all</Link>  </div>
  </div>
            <div className="row  artist-bg  ">
       {artists?.slice(0, 5).map((artist:ARTIST) =>{
          return (
        <div className=" col artist-bg   " key={artist.bio || artist.name}>
      
            <Link to={`/artist/${artist.name}`} className="text-decoration-none artist-bg text-light">     
               
               <LazyLoadImage  className=" rounded-circle artist-image"   effect="blur" src={`${import.meta.env.VITE_APP_CLOUD_URL}/${artist.cover_image}`}   width='150px' height='160px'    />
         </Link>
          
                 <figcaption className="figure-caption text-light  artist-bg">{artist.name}</figcaption> 
                </div>
              )
       })}
    
       </div>
      
      
        </div>
         )}
       
</Row>
  )
}

export default Artists;