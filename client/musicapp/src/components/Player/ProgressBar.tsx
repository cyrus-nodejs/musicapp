/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { useContext } from "react"

import { AudioPlayerContext } from "../../context/audioPlayer";
import { Row,  } from "react-bootstrap"

import "./Player.css"

const ProgressBarDiv = () => {

    const {timeProgress,duration,audioRef, progressBarRef } = useContext(AudioPlayerContext) 
   
    const handleProgressChange = () => {
      audioRef.current.currentTime = progressBarRef.current.value
       }
       const formatTime = (time: number) => {
          if (time && !isNaN(time)) {
              const minutes = Math.floor(time / 60);
              const formatMinutes =
                minutes < 10 ? `0${minutes}` : `${minutes}`;
              const seconds = Math.floor(time % 60);
              const formatSeconds =
                seconds < 10 ? `0${seconds}` : `${seconds}`;
              return `${formatMinutes}:${formatSeconds}`;
            }
            return '00:00';
          };
       
     

  return (
    <Row className=" ">
      <div class="d-flex mb-3">
  <div class="p-1 "><span className="time   current">{formatTime(timeProgress)}</span></div>
  <div class=" flex-fill"> <input 
      ref={progressBarRef}
      defaultValue="0"
      onChange={handleProgressChange}
      className="progressbar"
       type="range"
        
      /></div>
  <div class=" p-1"><span className="time current ">{formatTime(duration)}</span></div>
</div>
    </Row>
  )
}

export default ProgressBarDiv;