import { ARTIST } from "../../../../utils/@types";
import { Row, Image, Container   } from "react-bootstrap"
import NavIndex from "../../../../components/NavBar/NavIndex";
import {  getArtists, getSearchTerm } from "../../../../redux/features/audio/audioSlice";
import { useAppSelector} from "../../../../redux/app/hook";
import HomeLeft from "../../HomeLeft";
import HomeRight from "../../HomeRight";
import Audioplayer from "../../../../components/Player/Audioplayer";
import NavSearchResults from "../../../../components/NavBar/NavSearch/NavSearchResults";
import { Link } from "react-router-dom";



const AllArtists = () => {
  
  const artists  = useAppSelector(getArtists)
 const searchterm = useAppSelector(getSearchTerm)
  
    console.log(artists)
  return (
    
    <Container className="vh-100 overflow-hidden" fluid>
    <NavIndex />
        <div className="row vh-100  overflow-hidden homeRight  mt-5">
            <HomeLeft />
            <Row  className='mx-1 my-2 homeCenter  col' >
     {searchterm ? (< NavSearchResults />) : (  
          <div>
           <div className="d-inline-flex my-3 fs-4 border-info text-light  border-bottom">Artists</div>
        
            <div className="col m-1   ">
       {artists.map((artist:ARTIST) =>{
          return (
        <figure className="figure col ">
              <Link to={`/artist/${artist.name}`} className="text-decoration-none text-light"> <Image src={`${import.meta.env.VITE_APP_CLOUD_URL}/${artist.cover_image}`} className="m-3 rounded-circle" width="130" height="120"  /></Link>
                 <figcaption className="figure-caption text-light  ">{artist.name}</figcaption> 
                </figure>
              )
       })}
    
       </div>
      
      
        </div>
         )}   
       
    
</Row>
            <HomeRight />
    </div>
    <Audioplayer />
      </Container>
           
      
  )
}

export default AllArtists;