
import NewTrack from "./NewTrack";
import { useAppDispatch, useAppSelector } from "../../../../redux/app/hook";
import {  useEffect } from "react";
import { getLatestTracks, fetchLatestTracks } from "../../../../redux/features/audio/audioSlice";
import { TRACK } from "../../../../utils/@types";
const NewTrackMenu = () => {

    const dispatch = useAppDispatch()
    const newtracks = useAppSelector(getLatestTracks)
  
useEffect(() =>{
    dispatch(fetchLatestTracks())
      }, [dispatch])
  
  return (
    <div className='row'>
               <div className="d-flex ">

<div className="d-inline-flex my-3 fs-4 border-info  border-bottom">Latest Track</div>

</div>

  {newtracks?.slice(0, 5).map((track:TRACK )=> <NewTrack  track={track} />  )}
    
    </div>
  )
}

export default NewTrackMenu;