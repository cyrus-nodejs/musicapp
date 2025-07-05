
import RecentlyPlayed from "./RecentlyPlayed";
import { useAppDispatch, useAppSelector } from "../../../../redux/app/hook";
import {  useEffect } from "react";
import { getRecentlyPlayed, fetchRecentlyplayed } from "../../../../redux/features/audio/audioSlice";
import { TRACK } from "../../../../utils/@types";
const   RecentlyPlayedMenu = () => {

    const dispatch = useAppDispatch()
    const recentlyplayed = useAppSelector(getRecentlyPlayed)
  
useEffect(() =>{
    dispatch(fetchRecentlyplayed())
      }, [dispatch])
  
  return (
    <div className='row artist-bg'>
               <div className="d-flex artist-bg">

<div className="d-inline-flex my-3 fs-4 border-info artist-bg border-bottom">Recently Played </div>

</div>

  {recentlyplayed?.map((track:TRACK )=> <RecentlyPlayed  track={track} />  )}
    
    </div>
  )
}

export default RecentlyPlayedMenu;