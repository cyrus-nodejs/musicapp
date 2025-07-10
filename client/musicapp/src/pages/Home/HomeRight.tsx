
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import {  Row } from "react-bootstrap";

import { useAppSelector } from "../../redux/app/hook";
import {  getCurrentTrack, getNextTrack } from "../../redux/features/audio/audioSlice";

import { timeConverter } from "../../utils/helpers/utilities";
import { LazyLoadImage } from 'react-lazy-load-image-component';
const HomeRight = () => {

//  const artists = useAppSelector(getArtists)
const currentTrack = useAppSelector(getCurrentTrack)
const nextTrack = useAppSelector(getNextTrack)

console.log(currentTrack)
console.log(nextTrack)

  return (

    <div className="col-2 pb-5  artist-bg d-none d-lg-block mt-1  rounded ms-1 homeRight px-3  ">
   
        <Row className='py-5 artist-bg mt-2 mb-5 '>
        <div className="d-flex artist-bg ">
    <div className="py-3 artist-bg">Chill Mixs</div>
    <div className="ms-auto p-3 artist-bg">  <i className='bx me-1 bx-dots-horizontal-rounded' ></i> <i className='bx bx-x'></i></div>
  </div>

  <div className="d-flex artist-bg">
  <figure className="figure col artist-bg">

                  <LazyLoadImage  className="artist-bg rounded"  effect="blur" src={`${import.meta.env.VITE_APP_CLOUD_URL}/${currentTrack?.cover_image}`}   width='200px' height='200px'    />
                <figcaption className="artist-bg ">{currentTrack?.title}</figcaption> 
                 <figcaption className="artist-bg">{currentTrack?.artist.name}, {currentTrack?.album.title}</figcaption>  
                </figure>
    
</div>
    


<div className=" pb-5 mb-5">
  {nextTrack ? ( <figure className="figure   col mb-5  "> 
    <div className="p-2">Next: From Chill Mix</div>

                 
                  <LazyLoadImage  className="artist-bg rounded"  effect="blur" src={`${import.meta.env.VITE_APP_CLOUD_URL}/${nextTrack?.cover_image}`}   width='200px' height='150px'    />
                <figcaption className="   ">{nextTrack?.title}</figcaption>  
                <figcaption className="   ">{nextTrack?.artist.name}, {nextTrack?.album.title}</figcaption>
                <figcaption className="  ">genre:{nextTrack.genre.title}</figcaption>  
                <figcaption className="   ">Duration:{timeConverter(nextTrack?.duration)}</figcaption>  
                
                </figure>  ) : (         <Row className='pb-5 artist-bg mt-2 '><figure className="figure  artist-bg col  "> 
                  <div className="p-2 artist-bg  ">About Artist</div>

                 
                  <LazyLoadImage  className="artist-bg rounded"  effect="blur" src={`${import.meta.env.VITE_APP_CLOUD_URL}/${currentTrack?.artist.cover_image}`}   width='200px' height='150px'    />
                <figcaption className="artist-bg ">{currentTrack?.artist.name}</figcaption>
                <figcaption className=" artist-bg ">Following:{currentTrack?.artist.followers}</figcaption>
                <figcaption className="artist-bg  ">Biography</figcaption> 
                 <div className="artist-bg">{currentTrack?.artist.bio}</div> 
                 
                </figure> </Row> )}
   
   
</div>

       </Row>
    
    </div>
  

)
}

export default HomeRight;