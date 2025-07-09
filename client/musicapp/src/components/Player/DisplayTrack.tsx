/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import { Row, Col } from 'react-bootstrap'
import { AudioPlayerContext } from '../../context/audioPlayer'
import { useContext } from 'react'
import {useAppSelector} from "../../redux/app/hook"
import { getCurrentTrack } from '../../redux/features/audio/audioSlice'
import { handleNext } from '../../redux/features/audio/audioSlice'
import { useAppDispatch } from '../../redux/app/hook'
import { fetchAddRecentlyPlayed,  } from '../../redux/features/playlist/playlistSlice'
// import { fetchAsyncUser , getAuthUser} from '../../redux/features/auth/authSlice'
import { fetchAddTimesPlayed } from '../../redux/features/audio/audioSlice'
const DisplayTrack = () => {
  const dispatch = useAppDispatch()
  const currentTrack = useAppSelector(getCurrentTrack)
  // const authUser = useAppSelector(getAuthUser)
    
  const { audioRef, progressBarRef,   setDuration } = useContext(AudioPlayerContext)
   // eslint-disable-next-line @typescript-eslint/no-unused-vars
   let data;
   const num_times = 1

   // eslint-disable-next-line @typescript-eslint/no-unused-vars
   let data2;
  
      //   useEffect(() => {
          
      //     dispatch(fetchAsyncUser());
      
      // }, [dispatch])
   const onLoadedMetadata = () => {
    const seconds = audioRef.current.duration;
    setDuration(seconds)
    progressBarRef.current.max = seconds
}
 
  return (
    <Row className="">
       <Col>
       <audio 
       src={`${import.meta.env.VITE_APP_CLOUD_URL}/${currentTrack?.audio_file}`}
       ref={audioRef}
       onLoadedMetadata={onLoadedMetadata}
       onEnded={() =>{ dispatch(handleNext()); dispatch(fetchAddRecentlyPlayed(data2={currentTrack})); dispatch(fetchAddTimesPlayed(data={currentTrack, num_times})); }}
       >
       </audio>
       
        <div  className="d-flex  align-items-center ">
  <div className="d-none d-lg-block flex-shrink-0">{currentTrack ? (
            <img className="rounded-circle mt-1" src={`${import.meta.env.VITE_APP_CLOUD_URL}/${currentTrack?.cover_image}`} height="50" width="50" alt="audio avatar" />
          ) : (
            <div className="icon-wrapper">
              <span className="audio-icon">
              <i className='bx bxs-music' ></i>
              </span>
            </div>
          )}</div>
  <div className="flex-grow-1 d-lg-block ms-3"><div className="  fs-6 fw-normal">{currentTrack?.title}</div><div className=" fs-6 ">{currentTrack?.artist.name}</div></div>
  
</div> 
       </Col> 
    </Row>
  )
}

export default DisplayTrack