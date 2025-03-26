import { createSlice,  createAsyncThunk , PayloadAction } from '@reduxjs/toolkit'
import {  PLAYLIST, TRACK} from '../../../utils/@types'
import { RootState } from '../../app/store'
import axios from 'axios'


export interface PlaylistState {
playlists:PLAYLIST[] | void 
currentPlayList:PLAYLIST | null
currentPlaylistSong:TRACK[]
recentlyplayed:TRACK[]|null
timesplayed:TRACK[]|null
status:  'idle' | 'pending' | 'succeeded' | 'failed',
error:string | null | undefined,
message:string|null
  }

  // Define the initial value for the slice state
const initialState: PlaylistState = {
 
  playlists:[],
  currentPlaylistSong:[],
  currentPlayList:null,
  recentlyplayed:null,
  timesplayed:null,
    status: 'idle' ,
    error:null,
    message:null
  }
  
  
// eslint-disable-next-line react-refresh/only-export-components
const BASEURL = import.meta.env.VITE_APP_BASE_URL
export const fetchPlaylist = createAsyncThunk(
  'playlist/fetchPlaylist',  async () => {
      const response= await axios.get(`${BASEURL}/api/playlist/`,{ withCredentials: true })
      console.log(response.data)
      return response.data
    });

    export const fetchCurrentPlaylist = createAsyncThunk(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      'playlist/fetchCurrentPlaylist',  async (id:any) => {
      
          const response= await axios.get(`${BASEURL}/api/current-playlist/${id}`, {params: {param:id}, withCredentials: true })
          console.log(response.data)
          return response.data
        });

export const fetchCreatePlaylist = createAsyncThunk(
    'playlist/fetchCreatePlaylist', async (data:{title:string}) => {
      const title= data.title
      console.log(title)
        const response= await axios.post(`${BASEURL}/api/create-playlist/`, {title}, { withCredentials: true })
        console.log(response.data)
        return response.data
      });
  
      export const fetchAddToPlaylist = createAsyncThunk(
        'playlist/fetchAddToPlaylist',  async (data:{track:TRACK, playlist:PLAYLIST}) => {
            const {track, playlist} = data
            const trackId = track.id
            const playlistId = playlist.id  
            const response= await axios.put(`${BASEURL}/api/add-to-playlist/`, {trackId, playlistId}, { withCredentials: true })
            console.log(response.data)
            return response.data
          });
          export const fetchUpdateTitle = createAsyncThunk(
            'playlist/fetchUpdateTitle',  async (data:{title:string, playlist:PLAYLIST}) => {
                const {title, playlist} = data
                const playlistId = playlist.id
                const response= await axios.patch(`${BASEURL}/api/update-playlist-title/`,{ playlistId, title,},{ withCredentials: true })
                console.log(response.data)
                return response.data
              });


             

export const fetchRemoveFromPlaylist = createAsyncThunk(

    'playlist/fetchRemoveFromPlaylist', async (data:{track:TRACK, playList:PLAYLIST}) => {
        const {track, playList} = data
        const trackId = track.id
        const playlistId = playList.id
        const response= await axios.put(`${BASEURL}/api/remove-from -playlist/`, {trackId, playlistId}, { withCredentials: true })
        console.log(response.data)
        return response.data
      });

  export const fetchClearPlaylist = createAsyncThunk(
    'playlist/fetchClearPlaylist',  async (file:PLAYLIST) => {
        const playlistId = file.id   
        const response= await axios.put(`${BASEURL}/api/clear-playlist/`,{playlistId},{ withCredentials: true })
        console.log(response.data)
        return response.data
      });

     
      export const fetchDeletePlaylist = createAsyncThunk(
        'playlist/fetchDeletePlaylist',  async (data2:{playlist:PLAYLIST}) => {
          const {playlist} = data2
            const playlistId = playlist.id
            const response= await axios.post(`${BASEURL}/api/delete-playlist/`, {playlistId},  { withCredentials: true })
            console.log(response.data)
            return response.data
          });

         
          export const fetchRecentlyPlayed = createAsyncThunk(
            'playlist/fetchRecentlyPlayed ',  async () => {
                const response= await axios.get(`${BASEURL}/api/played/`,{ withCredentials: true })
                console.log(response.data.track)
                return response.data.track
              });

              export const fetchAddRecentlyPlayed = createAsyncThunk(
                'playlist/fetchAddRecentlyPlayed',  async (data2:{file:TRACK}) => {
                    const {file } = data2
                    const trackId = file.id
                    const response= await axios.post(`${BASEURL}/api/played/`,{trackId},{ withCredentials: true })
                    console.log(response.data)
                    return response.data
                  });
                
                 
// Slices contain Redux reducer logic for updating state, and
// generate actions that can be dispatched to trigger those updates.
export const playlistSlice = createSlice({
  name: 'playlist',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    handleOnInput: (state) => {
     state.message = null
    },
  },
   extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchCreatePlaylist.pending, (state) => {
      state.status = 'pending'
    })
    .addCase(fetchCreatePlaylist.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.message = action.payload.message

        
     
      })
      .addCase(fetchCreatePlaylist.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message;
      })
      .addCase(fetchPlaylist.pending, (state) => {
      state.status = 'pending'
      })
      .addCase(fetchPlaylist.fulfilled, (state, action:PayloadAction) => {
        state.status = 'succeeded'
        state.playlists= action.payload
        
      })
      .addCase(fetchPlaylist.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message;
      })
       .addCase(fetchCurrentPlaylist.pending, (state) => {
                    state.status = 'pending'
                    })
                    .addCase(fetchCurrentPlaylist.fulfilled, (state, action) => {
                      state.status = 'succeeded'
                      state.currentPlayList= action.payload
                      state.currentPlaylistSong=action.payload.tracks
                    })
                    .addCase(fetchCurrentPlaylist.rejected, (state, action) => {
                      state.status = 'failed'
                      state.error = action.error.message;
                    })
      
      .addCase(fetchAddToPlaylist.pending, (state) => {
        state.status = 'pending'
        })
        .addCase(fetchAddToPlaylist.fulfilled, (state) => {
          state.status = 'succeeded'
        
        })
        .addCase(fetchAddToPlaylist.rejected, (state, action) => {
          state.status = 'failed'
          state.error = action.error.message;
        })
        .addCase(fetchAddRecentlyPlayed.pending, (state) => {
            state.status = 'pending'
            })
            .addCase(fetchAddRecentlyPlayed.fulfilled, (state) => {
              state.status = 'succeeded'
              
            })
            .addCase(fetchAddRecentlyPlayed.rejected, (state, action) => {
              state.status = 'failed'
              state.error = action.error.message;
            })
           
            .addCase(fetchRemoveFromPlaylist.pending, (state) => {
                state.status = 'pending'
              })
              .addCase(fetchRemoveFromPlaylist.fulfilled, (state) => {
                  state.status = 'succeeded'
                  
                })
                .addCase(fetchRemoveFromPlaylist.rejected, (state) => {
                  state.status = 'failed'
                  
                })
                .addCase(fetchClearPlaylist.pending, (state) => {
                state.status = 'pending'
                })
                .addCase(fetchClearPlaylist.fulfilled, (state) => {
                  state.status = 'succeeded'
                 
                })
                .addCase(fetchClearPlaylist.rejected, (state, action) => {
                  state.status = 'failed'
                  state.error = action.error.message;
                })
                
                .addCase(fetchDeletePlaylist.pending, (state) => {
                  state.status = 'pending'
                  })
                  .addCase(fetchDeletePlaylist.fulfilled, (state) => {
                    state.status = 'succeeded'
              
                    
                  })
                  .addCase(fetchDeletePlaylist.rejected, (state, action) => {
                    state.status = 'failed'
                    state.error = action.error.message;
                  })
                  .addCase(fetchRecentlyPlayed.pending, (state) => {
                      state.status = 'pending'
                      })
                      .addCase(fetchRecentlyPlayed.fulfilled, (state, action) => {
                        state.status = 'succeeded'
                        state.recentlyplayed = action.payload
                      })
                      .addCase(fetchRecentlyPlayed.rejected, (state, action) => {
                        state.status = 'failed'
                        state.error = action.error.message;
                      })
                     
                      .addCase(fetchUpdateTitle.pending, (state) => {
                        state.status = 'pending'
                        })
                        .addCase(fetchUpdateTitle.fulfilled, (state) => {
                          state.status = 'succeeded'
                          
                        })
                        .addCase(fetchUpdateTitle.rejected, (state, action) => {
                          state.status = 'failed'
                          state.error = action.error.message;
                        })
            

    
  },
})

// Export the generated action creators for use in components

export const getPlaylists= (state:RootState) => state.playlist.playlists
export const getRecentlyPlayed= (state:RootState) => state.playlist.recentlyplayed
export const getPlaylistError = (state:RootState) => state.playlist.error
export const getPlaylistStatus = (state:RootState) => state.playlist.status
export const getCurrentPlaylist = (state:RootState) => state.playlist.currentPlayList
export const getCurrentPlaylistTrack = (state:RootState) => state.playlist.currentPlaylistSong
export const getMessage = (state:RootState) => state.playlist.message

export const {handleOnInput} = playlistSlice.actions





// Export the slice reducer for use in the store configuration
export default playlistSlice.reducer;