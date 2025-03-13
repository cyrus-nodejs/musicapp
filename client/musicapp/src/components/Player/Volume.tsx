/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import { Row , Col} from 'react-bootstrap'
import {  useContext, useEffect } from 'react'
import { AudioPlayerContext } from '../../context/audioPlayer';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { MuteTooltip, LowVolumeTooltip, HighVolumeTooltip } from './Control/Overlay';

const Volume = () => {
    const {volume, mutevolume, audioRef, setVolume, setMuteVolume }= useContext(AudioPlayerContext)
  
    useEffect(() =>{
      if (audioRef) {
          audioRef.current.volume = volume / 100
          audioRef.current.muted = mutevolume
      }
  
   }, [volume, audioRef, mutevolume])
    
  return (
    <Row>
        <Col className="d-flex align-items-stretch ">
        <div className="pt-3 flex-shrink-1" onClick={() => setMuteVolume((prev) => !prev)}>
          {mutevolume || volume < 5 ? (
            <OverlayTrigger
            placement="top"
            delay={{ show: 250, hide: 400 }}
            overlay={MuteTooltip}
          >
               <i className='bx bxs-volume-mute bx-xs'></i>
          </OverlayTrigger>
           
           
          ) : volume < 40 ? (
            <OverlayTrigger
            placement="top"
            delay={{ show: 250, hide: 400 }}
            overlay={LowVolumeTooltip}
          >
               <i className='bx bxs-volume-low bx-sm text-light'></i>
          </OverlayTrigger>
            
          ) : (
            <OverlayTrigger
            placement="top"
            delay={{ show: 250, hide: 400 }}
            overlay={HighVolumeTooltip}
          >
                <i className='bx bx-volume-full  bx-sm' ></i>
          </OverlayTrigger>
           
          )}
        </div>
        <div className="p-2 flex-grow-1">
   
   <input
          min={0}
          max={100}
          value={volume}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onChange={(e:any)  => setVolume(e.target.value)}
          className="volume"
          type="range"
    />


        </div>
        </Col>
    </Row>
  )
}

export default Volume