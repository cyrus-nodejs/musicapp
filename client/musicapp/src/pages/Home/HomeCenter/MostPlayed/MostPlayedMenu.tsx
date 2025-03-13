
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
    <div className='row'>
               <div className="d-flex ">

<div className="d-inline-flex my-3 fs-4 border-info  border-bottom">Most Played</div>

</div>

  {mostPlayed?.slice(0, 5).map((track:TRACK )=> <MostPlayed  track={track} />  )}
    
    </div>
  )
}

export default MostPlayedMenu;