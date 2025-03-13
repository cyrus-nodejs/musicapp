
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import {  Row , Image} from "react-bootstrap";

import { useAppSelector } from "../../redux/app/hook";
import {  getCurrentTrack, getNextTrack } from "../../redux/features/audio/audioSlice";



const HomeRight = () => {

//  const artists = useAppSelector(getArtists)
const currentTrack = useAppSelector(getCurrentTrack)
const nextTrack = useAppSelector(getNextTrack)
// const currentArtist = useAppSelector(getCurrentArtist)
// console.log(currentArtist)
console.log(currentTrack)
console.log(nextTrack)
  // const filterCurrentArtist = (current:string) => {
  //   return  artists.filter(artist =>  artist.name === current );
  // };
  // const artist  =currentTrack?.artist
//   const Artist = filterCurrentArtist(artist)
//   console.log(Artist)
    
// console.log(currentTrack)
  // const menuItems = [...new Set(Tracks.filter((Val) => Val.artist === artist))];
  return (

    <div className="col-2 pb-5 d-none d-lg-block mt-3 vh-100 rounded ms-1 homeRight p-3  text-light ">
        <Row className='pb-5'>
        <div className="d-flex mb-3">
    <div className="p-2">Chill Mixs</div>
    
    <div className="ms-auto p-2">  <i className='bx me-1 bx-dots-horizontal-rounded' ></i> <i className='bx bx-x'></i></div>
  </div>

  <div className="d-flex ">
  <figure className="figure col ">
                <Image src={`${import.meta.env.VITE_APP_CLOUD_URL}/${currentTrack?.cover_image}`}  className=" rounded-3" fluid  rounded/>
                <figcaption className="figure-caption fw-bold f5-4 text-light  ">{currentTrack?.title}</figcaption> 
                 <figcaption className="figure-caption text-light  ">{currentTrack?.artist.name}, {currentTrack?.album.title}</figcaption>  
                </figure>
    
</div>
    
<div className="p-2">Next: From Chill Mix</div>

<div className=" ">
    <figure className="figure col "> 
        

       
                 <Image src={`${import.meta.env.VITE_APP_CLOUD_URL}/${currentTrack?.artist.cover_image}`}  className=" rounded-3" fluid  rounded/>
                <figcaption className="figure-caption fw-bold f5-4 text-light  ">{currentTrack?.artist.name}</figcaption> 
                <figcaption className="figure-caption fw-bold f5-4 text-light  ">Biography</figcaption> 
                 <div className="figure-caption text-light    ">{currentTrack?.artist.bio}</div> 
                </figure>  
   
</div>

       </Row>
    </div>
  
  
)
}

export default HomeRight;