import { LazyLoadImage } from 'react-lazy-load-image-component';
import {  Row,Tooltip, Overlay, OverlayTrigger,  Table, Container } from 'react-bootstrap';
import { PLAYLIST, TRACK } from '../../../../utils/@types';
import { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PlayAllTooltip } from '../../../../components/Player/Control/Overlay';
import NavSearchResults from '../../../../components/NavBar/NavSearch/NavSearchResults';
import Audioplayer from '../../../../components/Player/Audioplayer';
import HomeLeft from '../../HomeLeft';
import HomeRight from '../../HomeRight';
import NavIndex from '../../../../components/NavBar/NavIndex';
import { useEffect } from 'react';
import { useAppDispatch,  useAppSelector } from '../../../../redux/app/hook';
import { getArtists, fetchArtists, getTracks, getSearchTerm } from '../../../../redux/features/audio/audioSlice';
import { playAllTracks } from '../../../../redux/features/audio/audioSlice';
import { Link } from 'react-router-dom';
import { fetchAddToPlaylist, getPlaylists } from '../../../../redux/features/playlist/playlistSlice';
import { getCurrentSub } from '../../../../redux/features/checkout/checkoutSlice';

import * as ContextMenu from "@radix-ui/react-context-menu";
import { timeConverter } from '../../../../utils/helpers/utilities';

const Artistdetails = () => {
  
  let data 
  console.log(data)
     const {id} = useParams()
     const [Show, setShow] = useState(false);
     const target = useRef(null);
  const dispatch = useAppDispatch()
     const artists = useAppSelector(getArtists)
     const songs = useAppSelector(getTracks)
     const Playlist = useAppSelector(getPlaylists)
     const currentSub = useAppSelector(getCurrentSub)
     const searchterm = useAppSelector(getSearchTerm)
     const HandleSelect = (e:Event) =>{
      e.preventDefault()
      }

     useEffect(() =>{
      dispatch(fetchArtists())
          }, [dispatch])
      
      
  const filterTrack = (current: string | undefined) => {
    return  songs.filter((song: { artist: { name: string | undefined; }; }) =>  song.artist.name === current );
  };
  const artistTrack = filterTrack(id)
  console.log(artistTrack)

  console.log(artists)
  const filterArtist = (current: string | undefined) => {
    return  artists.filter(artist=>  artist.name === current );
  };
  const currentArtist = filterArtist(id)
  console.log(currentArtist)
 

  return (
    <Container className="vh-100 overflow-hidden" fluid>
    <NavIndex />
        <div className="row vh-100 overflow-hidden homeRight  mt-5">
            <HomeLeft />
     
            <div  className='mt-5  pb-5   mt-3 rounded  mt-3 rounded   vh-100     text-light  artistbg mx-1 my-2 CenterScroll  col' >
   
      <div  className=" pb-5    mt-3 rounded  mt-3 rounded     text-light ">
      <Row className=" pb-5">
    
        {searchterm ? (<NavSearchResults />) : (  <div className="" >
           
           <div className="" >
        <div className="d-flex align-items-center">
  <div className="flex-shrink-0">

     <LazyLoadImage className="  "  effect="blur" src={`${import.meta.env.VITE_APP_CLOUD_URL}/${currentArtist[0]?.cover_image}`}   style={{ width: '180px', height: '180px' }} />
  </div>
  <div className="flex-grow-1 ms-3">
  <div className="d-flex flex-column mb-3">

  <div className="p-2 fs-3 ">Artist Mix</div>
  <div className="p-2">{currentArtist[0]?.name}</div>
  <div className="p-2">MusicPlanet {artistTrack.length} songs </div>
</div>
</div>
</div>
    </div>
    <div className="d-flex mb-3">
  <div className="p-2">
    <OverlayTrigger
                placement="top"
                delay={{ show: 250, hide: 400 }}
                overlay={PlayAllTooltip}
              >
    <i onClick={() => dispatch(playAllTracks(artistTrack))} className='bx bx-play text-success border border-success  bx-border-circle bx-md' ></i>
    </OverlayTrigger>
    </div>
  <div className="p-2"><i className='bx bx-plus mt-2 border text-success border-success bx-border-circle bx-sm'></i></div>
  <div className="ms-auto p-2"><i className='bx bx-menu mt-3 border text-success border-success'></i></div>
</div>
<ContextMenu.Root>
<ContextMenu.Trigger className="ContextMenuTrigger">
  <div className=" pb-5">
    <Table  className=" custom-table col pb-5     mt-5 rounded     text-light   " responsive   >
      <thead>
        <tr>
        <th>#</th>
          <th>Title</th>
          <th>Album</th>
          <th>Year</th>
          <th><i color='white' className='bx  bx-alarm  text-light bx-sm'></i></th>
        </tr>
      </thead>
 
      <tbody className="">
      
      {artistTrack?.map((track:TRACK, id) =>{
        return (
      
        <tr>
          <td>
           {id}
  
          </td>
          <td>
          <div className="d-flex align-items-center  ">
  <div className="flex-shrink-0">
   
       <LazyLoadImage className=" "  effect="blur" src={`${import.meta.env.VITE_APP_CLOUD_URL}/${track.cover_image}`}   style={{ width: '50px', height: '50px' }} />
  </div>
  <div className="flex-grow-1 ms-3 ">
  {track?.title}
  </div>
</div>
         
          </td>
          <td>{track.album.title}</td>
          <td>
          {track.release_year}
          
          </td>
          <td>
          {timeConverter(track?.duration)}
          
          </td>
          <ContextMenu.Portal>
				<ContextMenu.Content
					className="ContextMenuContent bg-dark"
				
					
				>
					<ContextMenu.Item className="ContextMenuItem">
          <Link to={`/allartists`} className='text-decoration-none d-block text-success '> Go to Artist Radio  </Link> 
					</ContextMenu.Item>
					<ContextMenu.Item className="ContextMenuItem">
						Reload <div className="RightSlot">⌘+R</div>
					</ContextMenu.Item>
					<ContextMenu.Sub>
						<ContextMenu.SubTrigger className="ContextMenuSubTrigger">
							Add to Playlist
							<div className="RightSlot">
              <i className='bx bx-chevron-right'></i>
							</div>
						</ContextMenu.SubTrigger>
						<ContextMenu.Portal>
							<ContextMenu.SubContent
								className="ContextMenuSubContent"
								sideOffset={2}
								alignOffset={-5}
							>

                {Playlist ? (<div>
     {Playlist?.map((playlist:PLAYLIST, id:number) =>{
           return (
            
            <ContextMenu.Item onSelect={HandleSelect} className="ContextMenuItem bg-dark" key={id} id="reload" onClick={() => dispatch(fetchAddToPlaylist(data= {track, playlist}))}> {playlist?.title} 
            </ContextMenu.Item>
        
               )
        })}
   
 </div>
 ) : (
null
 ) }  
								
								
							</ContextMenu.SubContent>
						</ContextMenu.Portal>
					</ContextMenu.Sub>
					<ContextMenu.Separator className="ContextMenuSeparator" />
          <ContextMenu.Sub>
						<ContextMenu.SubTrigger className="ContextMenuSubTrigger">
 Download
							<div className="RightSlot">
              <i className='bx bx-chevron-right'></i>
							</div>
						</ContextMenu.SubTrigger>
						<ContextMenu.Portal>
							<ContextMenu.SubContent
								className="ContextMenuSubContent"
								sideOffset={2}
								alignOffset={-5}
							>
							
                {currentSub?.pricing.plans == "medium" || currentSub?.pricing.plans == "Premium" ? (	<ContextMenu.Item onSelect={HandleSelect} className="ContextMenuItem "><a href={ `${track.audio_file}` } className="text-decoration-none text-light"  target="_blank" download>   <div className="d-flex ">   <div className="me-1">Download</div>
           <div className=""><i className='bx bx-download text-light'></i></div> </div></a></ContextMenu.Item>) : (   <ContextMenu.Item onSelect={HandleSelect} className="ContextMenuItem ">
       <div className="border border-none"    ref={target} onClick={() => setShow(!Show)}>
        Subscribe to Download    </div>
      <Overlay target={target.current} show={Show} placement="top">
         {(props) => (
           <Tooltip id="overlay-example" {...props}>
             Pls Subscribe to Download
           </Tooltip>
         )}
       </Overlay>
       </ContextMenu.Item>) }
								
								
							</ContextMenu.SubContent>
						</ContextMenu.Portal>
					</ContextMenu.Sub>
          <ContextMenu.Item className="ContextMenuItem">
          <Link to={`/report`} className='text-decoration-none d-block text-light '> Report </Link> 
					</ContextMenu.Item>
				</ContextMenu.Content>
			</ContextMenu.Portal>
        </tr>
        
       
      )
    })}
  
      </tbody>
      
    </Table>
    </div>
    </ContextMenu.Trigger>
		</ContextMenu.Root>   
      
      
        </div>)}
        
         
       
        </Row>
         </div>
       
</div>
            <HomeRight />
    </div>
    <Audioplayer />
      </Container>
    
   
  )
}

export default Artistdetails