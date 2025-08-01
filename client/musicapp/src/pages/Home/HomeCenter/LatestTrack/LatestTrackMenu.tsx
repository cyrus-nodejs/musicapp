
import NewTrack from "./LatestTrack";
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
    <div className='row artist-bg'>
               <div className="d-flex artist-bg">

<div className="d-inline-flex my-3 fs-4 border-info artist-bg  border-bottom">Latest Track</div>

</div>

  {newtracks?.map((track:TRACK )=> <NewTrack  track={track} />  )}
    
    </div>
  )
}

export default NewTrackMenu;