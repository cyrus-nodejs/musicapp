

import {  TRACK } from "../../utils/@types";
import "../../index.css"
import * as ContextMenu from "@radix-ui/react-context-menu";
import { Link } from "react-router-dom";
import {  useEffect } from "react";
import { Image, Row, OverlayTrigger, Table, Container } from 'react-bootstrap';
import { PlayAllTooltip } from "../../components/Player/Control/Overlay";
import { useParams } from 'react-router-dom';
import { capitalizeFirstLetter } from "../../utils/helpers/utilities";
import HomeLeft from "../Home/HomeLeft";
import HomeRight from "../Home/HomeRight";
import NavIndex from "../../components/NavBar/NavIndex";
import Audioplayer from "../../components/Player/Audioplayer";

import Login from "../Auth/Login";
import { fetchCurrentPlaylist, getCurrentPlaylist, getCurrentPlaylistTrack } from "../../redux/features/playlist/playlistSlice";
import { useAppDispatch, useAppSelector } from "../../redux/app/hook";
import { playAllTracks } from "../../redux/features/audio/audioSlice";
import { getIsAuthenticated, getAuthUser } from "../../redux/features/auth/authSlice";
import { fetchClearPlaylist, fetchRemoveFromPlaylist } from "../../redux/features/playlist/playlistSlice";
import { timeConverter } from "../../utils/helpers/utilities";
const Playlist = () => {

     
let data;
console.log(data)
    
    const { id } = useParams()
    const dispatch = useAppDispatch()
  const isAuthenticated = useAppSelector(getIsAuthenticated)
  const user = useAppSelector(getAuthUser)
  const currentPlaylist = useAppSelector(getCurrentPlaylist)
  const playlistTracks = useAppSelector(getCurrentPlaylistTrack)

    


   
    useEffect(() =>{
        dispatch(fetchCurrentPlaylist(id))
          }, [dispatch, id])
          



 
    
     

   
          console.log(currentPlaylist)
          console.log(playlistTracks)
  return (
    <section className="artistbg">
    {isAuthenticated  && user ? (  <Container className="vh-100 overflow-hidden" fluid>
        <NavIndex />
            <div className="row vh-100 overflow-hidden  mt-5">
                <HomeLeft />
             
            <div  className='mt-5  pb-5   mt-3 rounded  mt-3 rounded   vh-100     text-light  artistbg mx-1 my-2 homeCenter  col' >
   
   <div  className=" pb-5    mt-3 rounded  mt-3 rounded     text-light ">
   <Row className=" pb-5">
 
              
           
              <div className="">
               
               <div className="" >
            <div className="d-flex align-items-center">
     
      <div className="flex-grow-1 ms-3">
      <div className="d-flex flex-column mb-3">
      <div className="p-2 text-start fs-4">My Playlist ({capitalizeFirstLetter(currentPlaylist?.title)}) </div>
      <div className="p-2">SoundPlanet {currentPlaylist?.tracks?.length} songs </div>
    </div>
    </div>
    </div>
    <div className="d-flex mb-3 ">
      <div className="p-2"><OverlayTrigger
            placement="top"
            delay={{ show: 250, hide: 400 }}
            overlay={PlayAllTooltip}
          ><i onClick={() => dispatch(playAllTracks(currentPlaylist?.tracks))} className='bx bx-play text-success border border-success  bx-border-circle bx-lg' ></i>
          </OverlayTrigger>
          </div>
      <div className="p-2"><i className='bx bx-plus mt-3 border text-success border-success bx-border-circle bx-sm'></i></div>
      <div className="ms-auto p-2"><i className='bx bx-menu mt-3 border text-success border-success'></i></div>
    </div>
        </div>
      
       
        <ContextMenu.Root>
        <ContextMenu.Trigger className="ContextMenuTrigger">
          <div className="pb-5">
          <Table   className="table col pb-5 table-dark table-border    table-hover mt-1" responsive   >
          <thead>
            <tr>
            <th className="text-success">#</th>
              <th  className="text-success">Title</th>
              <th  className="text-success">Album</th>
              <th  className="text-success"> Date</th>
              <th  className=""><i className='bx text-success  bx-sm bx-alarm'></i></th>
            </tr>
          </thead>
          <tbody >
                    
          {playlistTracks.map((track:TRACK, id) =>{
            return (

      
              <tr>
               
               <td className="text-success">
                {id}
       
               </td>
               <td>
               <div className="d-flex align-items-center ">
       <div className="flex-shrink-0 ">
         <Image src={`${import.meta.env.VITE_APP_CLOUD_URL}/${track?.cover_image}`} className=" rounded-3" alt="..." width="50" height="50" />
       </div>
       <div className="flex-grow-1 ms-3 text-success    ">
       {track?.title}
       </div>
     </div>
              
               </td>
               <td className=" text-success ">{track?.album.title}</td>
               <td className=" text-success" >
               {track?.release_year}
               
               </td>
               <td className="text-success" >
               {timeConverter(track?.duration)}
               
               </td>
               <ContextMenu.Portal>
                <ContextMenu.Content
                  className="ContextMenuContent bg-dark"
                
                  
                >
                  <ContextMenu.Item className="ContextMenuItem">
          <Link to={`/allartists`} className='text-decoration-none d-block text-success '> Go to Artist Radio  </Link> 
					</ContextMenu.Item>
                  <ContextMenu.Item  onClick={() => dispatch(fetchClearPlaylist(currentPlaylist))} className="ContextMenuItem">
                  Clear Playlist
                  </ContextMenu.Item>
                
      
                  <ContextMenu.Item  className="ContextMenuItem bg-dark"  id="something" onClick={() => dispatch(fetchRemoveFromPlaylist(data= {track, currentPlaylist}))} >Remove from  {currentPlaylist?.title} Playlist</ContextMenu.Item>
                  <ContextMenu.Item className="ContextMenuItem">
          <Link to={`/report`} className='text-decoration-none d-block text-success '> Report </Link> 
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
      
         
              
          
          
            </div>
           
            
           
           
           </Row>
         </div>
       
</div>
                <HomeRight />
        </div>
        <Audioplayer />
          </Container>) : (<Login />)}
          </section>
  
  )
}

export default Playlist