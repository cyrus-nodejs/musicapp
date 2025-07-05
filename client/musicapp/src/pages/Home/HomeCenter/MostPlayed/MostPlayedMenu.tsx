
import { fetchMostplayed , getMostPlayed} from "../../../../redux/features/audio/audioSlice";
import { useAppDispatch, useAppSelector } from "../../../../redux/app/hook";
import {  useEffect } from "react";
import MostPlayed from "./MostPlayed";
import { TRACK } from "../../../../utils/@types";
const MostPlayedMenu = () => {

    const dispatch = useAppDispatch()
    const mostPlayed = useAppSelector(getMostPlayed)
    console.log(mostPlayed)
useEffect(() =>{
    dispatch(fetchMostplayed())
      }, [dispatch])
  
  return (
    <div className='row artist-bg'>
               <div className="d-flex artist-bg">

<div className="d-inline-flex my-3 fs-4 border-info artist-bg border-bottom">Most Played</div>

</div>

  {mostPlayed?.map((track:TRACK )=> <MostPlayed  track={track} />  )}
    
    </div>
  )
}

export default MostPlayedMenu;