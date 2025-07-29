import { ALBUM } from "../../../../utils/@types";
import { Row,  Container  } from "react-bootstrap"
import { LazyLoadImage } from "react-lazy-load-image-component";

import { Link } from "react-router-dom";

import NavSearchResults from "../../../../components/NavBar/NavSearch/NavSearchResults";
import NavIndex from "../../../../components/NavBar/NavIndex";
import HomeLeft from "../../LeftSidebar";
import HomeRight from "../../RightSidebar";
import Audioplayer from "../../../../components/Player/Audioplayer";
import { useAppSelector } from "../../../../redux/app/hook";
import { getAlbums, getSearchTerm } from "../../../../redux/features/audio/audioSlice";
const AllAlbums = () => {
  const albums =  useAppSelector(getAlbums)
  const searchterm = useAppSelector(getSearchTerm)
    console.log(albums)
  return (
    
    <Container className="" fluid>
    <NavIndex />
        <div className="row mt-5">
            <HomeLeft />
            <Row  className='m-1 mt-3 CenterScroll   col' >
        {searchterm ? (<NavSearchResults />) : (<div>
           <div className="d-inline-flex my-3  fs-4 border-info position-sticky border-bottom">ALBUMS</div>
        
            <div className="col   ">
       {albums?.map((album:ALBUM) =>{
          return (
        <figure className="figure col ">
            <Link to={`/album/${album.title}`} className="text-decoration-none ">   
  
                 <LazyLoadImage className=" rounded-circle  m-3 "  effect="blur" src={`${import.meta.env.VITE_APP_CLOUD_URL}/${album.cover_image}`}   style={{ width: '120px', height: '130px' }} />
             
             </Link>
                 <figcaption className="  ">{album.title}</figcaption> 
                </figure>
              )
       })}
    
       </div>
      
      
        </div>)}
          
    
       
</Row>
            <HomeRight />
    </div>
    <Audioplayer />
      </Container>   
           
     
  )
}

export default AllAlbums;