
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
          <div>
           <div className="d-flex mb-3">

           <div className="d-inline-flex my-3 fs-4 border-info  border-bottom">Search Results</div>
    {/* <div className="ms-auto p-2"><Link to="/newtracks" className="text-decoration-none text-light">Show all</Link>  </div> */}
  </div>
        
            <div className="row   ">
       {searchResult?.slice(0, 20).map((track:TRACK) =>{
          return (
        
          
  <div className="position-relative m-2" style={{width:"180px", height:"150px"}} >
                
                <Image src={track.image.url} width="180" height="150"   rounded />
                <i onClick={() => dispatch(playTrack(track))} className='bx bx-play-circle top-left position-absolute bottom-0 end-0  text-light bx-lg' ></i>
                 <div className="figure-caption text-light  ">{track.title}</div> 
              </div>
              )
       })}



       </div>
      
      
        </div>
         ) : (<div className="fs-1">No Search Results</div>)}
    </div>
    
           
      
  )
}

export default NavSearchResults;