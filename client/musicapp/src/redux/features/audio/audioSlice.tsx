import { createSlice,  createAsyncThunk} from '@reduxjs/toolkit'
import { TRACK, ARTIST, GENRE, ALBUM, PLAYLIST} from '../../../utils/@types'
import { RootState } from '../../app/store'
import axios from 'axios'



export interface AudioState {
  tracks:TRACK[]  ,
  trackIndex:number,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  currentTrack:TRACK | null |  void | any | TRACK[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  currentArtist:ARTIST | null |  void | any | TRACK[]
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  nextTrack:ARTIST | null |  void | any | TRACK[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  savedTrack:TRACK | null |  void | any | TRACK[]
  isplaying:boolean
  artists:ARTIST[]
  albums:ALBUM[]
  genres:GENRE[]
  newtracks:TRACK[]
  topten:TRACK[]
  mostplayed:TRACK[] 
  recentlyplayed:TRACK[]
  latesttrack:TRACK[]
  playList:PLAYLIST | null
  playListSong:TRACK[]
  allPlayList:TRACK[]
  searchTerm:string | null
  searchResult : TRACK[] | null
  isShuffle:boolean
  isRepeat:boolean
  status:  'idle' | 'pending' | 'succeeded' | 'failed'
  error:string | null | undefined
  }

  // Define the initial value for the slice state
const initialState: AudioState = {
    tracks: [],
    trackIndex:0,
    currentTrack:null,
    savedTrack: null ,
    nextTrack:null,
    currentArtist:null,
    isplaying:false,
    artists:[],
    albums:[],
    genres:[],
    newtracks:[],
    topten:[],
    mostplayed:[],
   recentlyplayed:[],
   latesttrack:[],
    playList:null,
    searchTerm:null,
    searchResult:[],
    playListSong:[],
    allPlayList:[],
    isShuffle:false,
    isRepeat:false,
    status: 'idle' ,
    error:null
  }
  

// eslint-disable-next-line react-refresh/only-export-components
const BASEURL = import.meta.env.VITE_APP_BASE_URL


export const fetchAllTracks = createAsyncThunk(
    'audio/fetchAllTracks', async () => {
        const response= await axios.get(`${BASEURL}/api/tracks/`,{ withCredentials: true })
        console.log(response?.data)
        return response?.data
      });

      export const fetchAddTimesPlayed = createAsyncThunk(
        'audio/fetchAddTimesPlayed',  async (data:{currentTrack:TRACK, num_times:number}) => {
          const {num_times, currentTrack} = data
            const id = currentTrack.id
            const response= await axios.put(`${BASEURL}/api/times-played/`, {id, num_times},{ withCredentials: true })
            console.log(response.data)
            return response.data
          });
  export const fetchArtists = createAsyncThunk(
    'audio/fetchArtists',  async () => {
        const response= await axios.get(`${BASEURL}/api/artists/`,{ withCredentials: true })
        console.log(response.data)
        return response.data
      });

      export const fetchAlbums = createAsyncThunk(
        'audio/fetchAlbum',  async () => {
            const response= await axios.get(`${BASEURL}/api/albums/`,{ withCredentials: true })
            console.log(response.data)
            return response.data
          });
    

      export const fetchGenres = createAsyncThunk(
        'audio/fetchGenres',  async () => {
            const response= await axios.get(`${BASEURL}/api/genres/`,{ withCredentials: true })
            console.log(response.data)
            return response.data
          });


          export const fetchMostplayed = createAsyncThunk(
            'audio/fetchMostplayed',  async () => {
                const response= await axios.get(`${BASEURL}/api/most-played/`,{ withCredentials: true })
                console.log(response.data)
                return response.data
              });

              export const fetchLatestTracks = createAsyncThunk(
                'audio/fetchLatestTracks',  async () => {
                    const response = await axios.get(`${BASEURL}/api/latest-tracks/`,{ withCredentials: true })
                    console.log(response.data)
                    return response.data
                  });
      
                  export const fetchRecentlyplayed = createAsyncThunk(
                    'audio/fetchRecentlyplayed',  async () => {
                        const response= await axios.get(`${BASEURL}/api/recently-played/`,{ withCredentials: true })
                        console.log(response.data)
                        return response.data
                      });
          
         
                      export const fetchSearchTerm = createAsyncThunk(
                       
                        'audio/fetchSearchTerm',  async (data) => {
                            const response= await axios.post(`${BASEURL}/searc`, {data},{ withCredentials: true })
                            console.log(response.data)
                          
                            return response.data
                          });
    
                      export const fetchSearchResult = createAsyncThunk(
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        'audio/fetchSearchResult',  async (searchTerm:any) => {
                          console.log(searchTerm)
                            const response= await axios.get(`${BASEURL}/api/search/?search=${searchTerm}`,{ withCredentials: true })
                            console.log(response.data)
                            return response.data
                          });
        
                     




// Slices contain Redux reducer logic for updating state, and
// generate actions that can be dispatched to trigger those updates.
export const audioSlice = createSlice({
  name: 'audio',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    handleNext: (state) => {
      if (!state.isShuffle ){
        state.trackIndex = Math.floor(Math.random() * state.tracks.length)
       
          localStorage.setItem('currentTrack', JSON.stringify(state.tracks[state.trackIndex]))
          state.savedTrack =localStorage.getItem("currentTrack")
          
         state.currentTrack= JSON.parse(state.savedTrack)
      //  state.currentTrack = state.tracks[state.trackIndex]
      }else if (state.trackIndex >= state.tracks.length - 1) {
        localStorage.setItem('currentTrack', JSON.stringify(state.tracks[state.trackIndex]))
          state.savedTrack =localStorage.getItem("currentTrack")
          state.currentTrack= JSON.parse(state.savedTrack)
            //  state.currentTrack = state.tracks[state.trackIndex]
           }else if  (state.trackIndex == 0) {
            localStorage.setItem('currentTrack', JSON.stringify(state.tracks[state.trackIndex]))
          state.savedTrack =localStorage.getItem("currentTrack")
          state.currentTrack= JSON.parse(state.savedTrack)
                // state.currentTrack = state.tracks[state.trackIndex]
               }else{
                localStorage.setItem('currentTrack', JSON.stringify(state.tracks[state.trackIndex += 1]))
          state.savedTrack =localStorage.getItem("currentTrack")
          state.currentTrack= JSON.parse(state.savedTrack)
                // state.currentTrack = state.tracks[state.trackIndex += 1]
               }
      
    },
    handlePrevious: (state) => {
      if (!state.isShuffle ){
        state.trackIndex = Math.floor(Math.random() * state.tracks.length)
       state.currentTrack = state.tracks[state.trackIndex]
      }else if (state.trackIndex === 0)   {
        state.currentTrack = state.tracks[state.trackIndex]
         
        }else if (state.trackIndex >= state.tracks.length - 1) {
          state.currentTrack = state.tracks[state.trackIndex]
          // setCurrentTrack(tracks[trackIndex + 1]);
        }else{
          state.currentTrack = state.tracks[state.trackIndex -= 1]
        }
        // setCurrentTrack(tracks[trackIndex + 1]);
      
     
    },
    
    playTrack: (state, action ) => {
     state.currentTrack = action?.payload
     state.isplaying = !state.isplaying
    },
    togglePlayPause: (state) => {
      state.isplaying = !state.isplaying
     },

     playAllTracks: (state, action) => {
      state.tracks = action.payload
     
      state.currentTrack = state.tracks[state.trackIndex]
      state.isplaying = !state.isplaying
      state.nextTrack = state.tracks[state.trackIndex += 1]
    
     },

     handleShuffle : (state) => {
      state.isShuffle = !state.isShuffle
     },

     handleRepeat : (state) => {
      state.isRepeat = !state.isRepeat
     },
    
     handleSearchterm : (state, action) => {
      state.searchTerm = action.payload
     }
  },
   extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchAllTracks.pending, (state) => {
      state.status = 'pending'
    })
    .addCase(fetchAllTracks.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.tracks= action.payload
        state.currentArtist=action.payload[state.trackIndex].artist
         state.currentTrack=action.payload[state.trackIndex]
        
       

        
      })
      .addCase(fetchAllTracks.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message;
      })
       .addCase(fetchAddTimesPlayed.pending, (state) => {
        state.status = 'pending'
        })
        .addCase(fetchAddTimesPlayed.fulfilled, (state) => {
          state.status = 'succeeded'
          })
        .addCase(fetchAddTimesPlayed.rejected, (state, action) => {
         state.status = 'failed'
          state.error = action.error.message;
         })
      .addCase(fetchArtists.pending, (state) => {
      state.status = 'pending'
      })
      .addCase(fetchArtists.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.artists= action.payload
      })
      .addCase(fetchArtists.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message;
      })
    
      .addCase(fetchAlbums.pending, (state) => {
        state.status = 'pending'
        })
        .addCase(fetchAlbums.fulfilled, (state, action) => {
          state.status = 'succeeded'
          state.albums= action.payload
        })
       
        .addCase(fetchAlbums.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message;
      })
      .addCase(fetchGenres.pending, (state) => {
        state.status = 'pending'
        })
        .addCase(fetchGenres.fulfilled, (state, action) => {
          state.status = 'succeeded'
          state.genres= action.payload
        })
        .addCase(fetchGenres.rejected, (state, action) => {
          state.status = 'failed'
          state.error = action.error.message;
        })
        .addCase(fetchRecentlyplayed.pending, (state) => {
          state.status = 'pending'
          })
          .addCase(fetchRecentlyplayed.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.recentlyplayed= action.payload
          })
          .addCase(fetchRecentlyplayed.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message;
          })
        .addCase(fetchLatestTracks.pending, (state) => {
          state.status = 'pending'
          })
          .addCase(fetchLatestTracks.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.latesttrack= action.payload
          })
          .addCase(fetchLatestTracks.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message;
          })
          .addCase(fetchMostplayed.pending, (state) => {
            state.status = 'pending'
            })
            .addCase(fetchMostplayed.fulfilled, (state, action) => {
              state.status = 'succeeded'
              state.mostplayed= action.payload
            })
            .addCase(fetchMostplayed.rejected, (state, action) => {
              state.status = 'failed'
              state.error = action.error.message;
            })
          
              .addCase(fetchSearchResult.pending, (state) => {
                state.status = 'pending'
                })
                .addCase(fetchSearchResult.fulfilled, (state, action) => {
                  state.status = 'succeeded'
                  state.searchResult= action.payload
                
                 
                })
                .addCase(fetchSearchResult.rejected, (state, action) => {
                  state.status = 'failed'
                  state.error = action.error.message;
                })
             
    
  },
})

// Export the generated action creators for use in components
export const getTracks = (state:RootState) => state.audio.tracks
export const getArtists = (state:RootState) => state.audio.artists
export const getGenres = (state:RootState) => state.audio.genres
export const getAlbums = (state:RootState) => state.audio.albums
export const getLatestTracks = (state:RootState) => state.audio.latesttrack
export const getMostPlayed = (state:RootState) => state.audio.mostplayed
export const getRecentlyPlayed = (state:RootState) => state.audio.recentlyplayed
export const getTrackIndex = (state:RootState) => state.audio.trackIndex
export const getCurrentTrack = (state:RootState) => state.audio.currentTrack
export const getNextTrack = (state:RootState) => state.audio.nextTrack
export const getCurrentArtist = (state:RootState) => state.audio.currentArtist
export const getIsPlaying = (state:RootState) => state.audio.isplaying
export const getIsShuffle = (state:RootState) => state.audio.isShuffle
export const getIsRepeat = (state:RootState) => state.audio.isRepeat
export const getAudioError = (state:RootState) => state.audio.error
export const getAudioStatus = (state:RootState) => state.audio.status
export const getSearchResult = (state:RootState) => state.audio.searchResult
export const getSearchTerm = (state:RootState) => state.audio.searchTerm

export const {handleNext, playTrack, togglePlayPause, handlePrevious,
  
  playAllTracks, handleShuffle, handleRepeat, handleSearchterm} = audioSlice.actions


// Export the slice reducer for use in the store configuration
export default audioSlice.reducer;