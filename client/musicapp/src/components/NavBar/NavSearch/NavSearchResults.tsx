
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { playTrack } from "../../../redux/features/audio/audioSlice";
import { useAppDispatch } from "../../../redux/app/hook";
import { TRACK,  } from "../../../utils/@types";
import {  Image,   } from "react-bootstrap"



import {  useAppSelector } from "../../../redux/app/hook";

import { fetchSearchResult, getSearchResult,   getSearchTerm } from '../../../redux/features/audio/audioSlice'
import { useEffect } from 'react'

const  NavSearchResults = () => {
  const dispatch = useAppDispatch()
  const searchResult = useAppSelector(getSearchResult)
  const searchterm = useAppSelector(getSearchTerm)
 
  useEffect(() =>{
    dispatch(fetchSearchResult(searchterm))
        }, [dispatch, searchterm])
       
    
    console.log(searchResult)
  return (
    
        <div  className="     text-light ">
            {searchResult?.length > 0 ? (
          <div className=''>
           

           <div className="d-inline-flex my-3 fs-4 border-info  border-bottom">Search Results</div>
  
  
        
            <div className="row  ">
       {searchResult?.slice(0, 20).map((track:TRACK) =>{
          return (
        
          
  <figure className="position-relative m-4" style={{width:"130px", height:"120px"}} >
                     <div className="container ">
                <Image src={`${import.meta.env.VITE_APP_CLOUD_URL}/${track?.cover_image}`} width="130" height="120"   rounded />
                </div>
                <i onClick={() => dispatch(playTrack(track))} className='bx bx-play-circle top-left position-absolute bottom-0 end-0  text-light bx-lg' ></i>
                 <figcaption className="figure-caption text-light  ">{track?.title}</figcaption> 
              </figure>
              )
       })}



       </div>
      
      
        </div>
         ) : (<div className="fs-1">No Search Results</div>)}
    </div>
    
           
      
  )
}

export default NavSearchResults;