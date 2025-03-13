
import { createContext, useState,
    useRef
 } from 'react'
//  import { useCookies } from 'react-cookie';
import {audioControlType } from '../utils/@types.tsx';

import React from 'react'


export const AudioPlayerContext = createContext<audioControlType>(null!);


export const AudioPlayerProvider = ({ children}:{ children: React.ReactNode } ) => {
  
  // const [cookies] = useCookies(['olympus']);
  const [timeProgress, setTimeProgress] = useState(0)
  const [duration, setDuration] = useState(0)

  const [volume, setVolume] =  useState(60)
  const [mutevolume, setMuteVolume] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null >(null);
  const progressBarRef  = useRef<HTMLInputElement | null>(null);
 
   
//   const togglePlayPause = () => {
 
//   const PlayTrack = (file:TRACK) => {
//    setCurrentTrack(file)
//    setIsPlaying((prev) => !prev)
//   }

//   const PlayAllTracks = (file: React.SetStateAction<never[]>) => {
//     setSongs(file)
//     setIsPlaying((prev) => !prev)
//   }


 
// const handleNext = () :void  =>  {
//   if (trackIndex >= songs.length - 1) {
//     setTrackIndex(0);
//     setCurrentTrack(songs[0]);
//   } else {
//     setTrackIndex((prev:number) => prev + 1);
//     setCurrentTrack(songs[trackIndex + 1]);
//   }
// };
  

// const Alltracks =  async () => {
//   try {
//     const { data } = await axios.get(
//       "http://localhost:3000/songs",
    
//     );
//     const { success, message, songs} = data;
//     if (success) {
//       setSongs(songs)
//       console.log(songs)
//     } else {
//      console.log(message);
     
     
//     }
//   } catch (error) {
//     console.log(error)
//   }
// }




//   const getArtists =  async () => {
//     const config ={
//         method:"get",
//         url:`http://localhost:3000/artists`, 
//         withCredentials: true, 
//       }
    
      
//       axios(config)
//       .then(response=>{
//       setArtists(response.data.artists)
//       })
//       .catch(error => {
//         console.log(error)
//       })
  
//     }

//     const getGenre =  async () => {
//       const config ={
//           method:"get",
//           url:`http://localhost:3000/genres`, 
//           withCredentials: true, 
//         }
      
        
//         axios(config)
//         .then(response=>{
//         setGenres(response.data.genres)
//         })
//         .catch(error => {
//           console.log(error)
//         })
    
//       }
    
        
         
      
       
//       useEffect(() =>{
//     getGenre();
//       }, [])
 
    
       
    
     
//     useEffect(() =>{
//   getArtists();
  

//     }, [])

// useEffect(() =>{
//   Alltracks();
//     }, [])

  

//     useEffect(() =>{
//         setCurrentTrack(songs[trackIndex]);
        
//         }, [songs, trackIndex])
  
//   console.log(songs)
//   console.log(currentTrack )
//   console.log(genres)
//   console.log(artists)

  return (
    <AudioPlayerContext.Provider
      value={{
     timeProgress,
     audioRef,
     progressBarRef,
setDuration,
volume,
mutevolume,
setTimeProgress,
duration,
setVolume,
setMuteVolume,

      }}
    >
      {children}
    </AudioPlayerContext.Provider>
  );
};