import { useNavigate } from "react-router-dom";
import { TRACK, PLAYLIST } from "../../../../utils/@types";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Col, OverlayTrigger } from "react-bootstrap"
import { useState } from "react";
import {  fetchAddToPlaylist,  getPlaylists} from "../../../../redux/features/playlist/playlistSlice";
import { getCurrentSub } from "../../../../redux/features/checkout/checkoutSlice";

import { PlayTooltip } from "../../../../components/Player/Control/Overlay";
import { useTrackCustomContextMenu } from "../../../../context/contextmenu/trackcontextmenu";

import { useAppDispatch, useAppSelector } from "../../../../redux/app/hook";

import { playTrack } from "../../../../redux/features/audio/audioSlice";

const MostPlayed= ({track}: {track: TRACK }) => {

const navigate = useNavigate()

const [hidden, setHidden] = useState(false);
   
console.log(track)


let data;
console.log(data)

const dispatch = useAppDispatch()

const Playlist = useAppSelector(getPlaylists)
const currentSub = useAppSelector(getCurrentSub)


const { showMenu } = useTrackCustomContextMenu();

const handleContextMenu = (e: { preventDefault: () => void; pageX: number; pageY: number; }) => {
  e.preventDefault();

  const items = [
    {
      label: `Go to Artists `,
      onClick: () => navigate(`/allartists`),
    },
    {
      label:  'Add to Playlist',
      children:  Playlist?.map((playlist: PLAYLIST) => ({
        label: playlist.title,
        onClick: () => dispatch(fetchAddToPlaylist({ track, playlist })),
      })),
    },
    {
      label: 'Download',
      onClick: () => {
        if (currentSub?.pricing.plans === 'premium' || currentSub?.pricing.plans === 'medium') {
          window.open(`${import.meta.env.VITE_APP_CLOUD_URL}/${track.audio_file}`, '_blank');
        } else {
          alert('Subscribe to download');
        }
      },
    },
    {
      label: 'Report',
      onClick: () => navigate('/report'),
    },
  ];

  showMenu(e.pageX, e.pageY, items);
};
    
  return (
    
           
           
      <Col  className='artist-bg' >
  
          <div
          className='col artist-bg'
          >
            <div
            onMouseOver={() => setHidden(true)}
            onMouseOut={() => setHidden(false)} className="artist-bg rounded-3 d-flex flex-row  mb-3  ">
    
        <figure  className="figure  position-relative artist-bg ">
   
      <div
    onContextMenu={handleContextMenu}
  className="rounded-3 d-flex flex-row mb-3 artist-bg container  "
      >
             
                <LazyLoadImage className="artist-bg rounded-3"  effect="blur" src={`${import.meta.env.VITE_APP_CLOUD_URL}/${track.cover_image}`}   style={{ width: '120px', height: '130px' }}       />
                </div>
              
                <div className="">
                {hidden && (<OverlayTrigger
                    placement="top"
                    delay={{ show: 250, hide: 400 }}
                    overlay={PlayTooltip}
                  ><i onClick={() => dispatch(playTrack(track))} className='bx bx-play-circle top-left    bx-lg' ></i></OverlayTrigger>)}
                {/* {currentplaying ? <i onClick={() => PlayTrack(track)} className='bx bx-play-circle top-left    bx-lg' ></i>:<i className='bx bx-play-circle control-icon top-left  bx-lg' ></i> } */}
                
  </div> 
                 <figcaption className="  artist-bg ">{track.title}</figcaption> 
			

                </figure>




       </div>
      
      
        </div>
         
       
</Col>
  )
}

export default MostPlayed;