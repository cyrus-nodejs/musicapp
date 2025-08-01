/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import { Row , Col} from 'react-bootstrap'
import { useContext, useEffect, useCallback, useRef } from 'react'
import { AudioPlayerContext } from '../../../context/audioPlayer'
import { useAppDispatch, useAppSelector } from '../../../redux/app/hook'
import { fetchAllTracks, getIsShuffle, getIsRepeat,   getIsPlaying, handleRepeat } from '../../../redux/features/audio/audioSlice'
import { handleNext, handlePrevious, togglePlayPause, handleShuffle } from '../../../redux/features/audio/audioSlice'
import { ShuffleTooltip, RepeatTooltip, NextTooltip,
PrevTooltip, PlayTooltip, PauseTooltip,
 ForwardTooltip,BackwardTooltip,
 } from './Overlay'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

const Control = () => {
const dispatch = useAppDispatch()


   
   const isplaying = useAppSelector(getIsPlaying)
    const isShuffle = useAppSelector(getIsShuffle)
    const isRepeat = useAppSelector(getIsRepeat)




  const {audioRef, duration, setTimeProgress, progressBarRef,volume, mutevolume
    } = useContext(AudioPlayerContext)

  useEffect(() =>{
    dispatch(fetchAllTracks());
      }, [dispatch])

     
      const updateProgress = useCallback(() => {
        if (audioRef.current && progressBarRef.current && duration) {
          const currentTime = audioRef.current.currentTime;
          setTimeProgress(currentTime);
    
          progressBarRef.current.value = currentTime.toString();
          progressBarRef.current.style.setProperty(
            '--range-progress',
            `${(currentTime / duration) * 100}%`
          );
        }
      }, [duration, setTimeProgress, audioRef, progressBarRef]);
    
      const startAnimation = useCallback(() => {
        if (audioRef.current && progressBarRef.current && duration) {
          const animate = () => {
            updateProgress();
            playAnimationRef.current = requestAnimationFrame(animate);
          };
          playAnimationRef.current = requestAnimationFrame(animate);
        }
      }, [updateProgress, duration, audioRef, progressBarRef]);
    
 

 
  
   
  
  
    
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const playAnimationRef:any  = useRef();
  

  
  useEffect(() => {
    if (isplaying) {
      audioRef.current?.play();
      startAnimation();
    } else {
      audioRef.current?.pause();
      if (playAnimationRef.current !== null) {
        cancelAnimationFrame(playAnimationRef.current);
        playAnimationRef.current = null;
      }
      updateProgress(); // Ensure progress is updated immediately when paused
    }

    return () => {
      if (playAnimationRef.current !== null) {
        cancelAnimationFrame(playAnimationRef.current);
      }
    };
  }, [isplaying, startAnimation, updateProgress, audioRef]);


   const skipForward = () => {
      audioRef.current.currentTime += 15;
   }
  
   const skipBackward = () => {
      audioRef.current.currentTime += 15;
   }
  
   useEffect(() =>{
      if (audioRef) {
          audioRef.current.volume = volume / 100
          audioRef.current.muted = mutevolume
      }
  
   }, [volume, audioRef, mutevolume])
   
  
   useEffect(() => {
    const currentAudioRef = audioRef.current;

    if (currentAudioRef) {
      currentAudioRef.onended = () => {
        if (isRepeat) {
          currentAudioRef.play();
        } else {
          dispatch(handleNext()); // This function should handle both shuffle and non-shuffle scenarios
        }
      };
    }

    return () => {
      if (currentAudioRef) {
        currentAudioRef.onended = null;
      }
    };
  }, [isRepeat, audioRef, dispatch]);

  
  // const togglePlayPause = () => {
  //   setIsPlaying((prev) => !prev)
  // }
    
  
  
   

  

     
   
   



  
  return (
    <Row className="pt-3 ">
        <Col className="d-flex  justify-content-center">
        <div  onClick={() => dispatch(handleShuffle())}>
        <OverlayTrigger
      placement="top"
      delay={{ show: 250, hide: 400 }}
      overlay={ShuffleTooltip}
    >
       <i  className={!isShuffle  ? 'bx  me-1 bx-shuffle bx-sm' : 'bx me-1 bx-shuffle text-secondary bx-sm'}></i>
    </OverlayTrigger>
       
        </div>
        <div onClick={() => dispatch(handlePrevious())}>
        <OverlayTrigger
      placement="top"
      delay={{ show: 250, hide: 400 }}
      overlay={PrevTooltip}
    >
          <i className='bx me-1 bxs-skip-previous-circle  bx-sm'></i>
    </OverlayTrigger>
     
        </div>
        <div onClick={skipBackward}>
        <OverlayTrigger
      placement="top"
      delay={{ show: 250, hide: 400 }}
      overlay={BackwardTooltip}
    >
             <i className='bx me-1 bx-skip-previous-circle  bx-sm'></i>
    </OverlayTrigger>
     
        </div>

        <div onClick={() => dispatch(togglePlayPause())} >
          {isplaying ? 
            <OverlayTrigger
            placement="top"
            delay={{ show: 250, hide: 400 }}
            overlay={PauseTooltip}
          >
                    <i className='bx me-1 bx-pause-circle  bx-sm' ></i> 
          </OverlayTrigger>
           
          :
          <OverlayTrigger
          placement="top"
          delay={{ show: 250, hide: 400 }}
          overlay={PlayTooltip}
        >
            <i className='bx me-1 bx-play-circle  bx-sm' ></i>
        </OverlayTrigger>
           }
        </div>
        <div onClick={skipForward}>
        <OverlayTrigger
          placement="top"
          delay={{ show: 250, hide: 400 }}
          overlay={ForwardTooltip}
        >
            <i className='bx me-1 bx-fast-forward-circle  bx-sm' ></i>
        </OverlayTrigger>
        
        </div>
        <div onClick={() => dispatch(handleNext())}>
        <OverlayTrigger
          placement="top"
          delay={{ show: 250, hide: 400 }}
          overlay={NextTooltip}
        >
            <i className='bx bxs-fast-forward-circle  bx-sm' ></i>
        </OverlayTrigger>
      
        </div>
        <div onClick={() => dispatch(handleRepeat())}>
        <OverlayTrigger
          placement="top"
          delay={{ show: 250, hide: 400 }}
          overlay={RepeatTooltip}
        >
           <i className={isRepeat ? 'bx bx-repeat bx-sm' : 'bx bx-repeat text-secondary bx-sm'}></i>
        </OverlayTrigger>
       
        </div>
        


        
        </Col>

    </Row>
  )
}

export default Control