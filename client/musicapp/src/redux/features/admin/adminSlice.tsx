import { createSlice,  createAsyncThunk } from '@reduxjs/toolkit'
import {  ORDER,   TRACK,  USER} from '../../../utils/@types'
import { RootState } from '../../app/store'
import axios from 'axios'


export interface AdminState {
  allCustomers:USER[] 
  allPremiers:USER[] 
  allCustomerServices:USER[] 
  allOrders:ORDER[] 
  allAdmins:USER[] 
  status:  'idle' | 'pending' | 'succeeded' | 'failed'
  error:string | null | undefined
  message:string
  }

  // Define the initial value for the slice state
const initialState: AdminState = {
    allCustomers:  [],
    allPremiers: [],
    allCustomerServices: [],
    allOrders: [],
    allAdmins: [],
    status:  'idle',
    error: null ,
    message:"",
  }
  

 // eslint-disable-next-line react-refresh/only-export-components
 const BASEURL = import.meta.env.VITE_APP_BASE_URL
  

export const fetchAdminAllOrders = createAsyncThunk(
    'admin/fetchAdminAllOrders', async () => {
        const response= await axios.get(`${BASEURL}/allorders`,{ withCredentials: true })
        console.log(response.data)
        return response.data
      });

      export const fetchAdminAllCustomers = createAsyncThunk(
        'admin/fetchAdminAllCustomers', async () => {
            const response= await axios.get(`${BASEURL}/allcustomers`,{ withCredentials: true })
            console.log(response.data)
            return response.data
          });
    
          export const fetchAdminAllPremiers = createAsyncThunk(
            'admin/fetchAdminAllPremiers', async () => {
                const response= await axios.get(`${BASEURL}/allpremiers`,{ withCredentials: true })
                console.log(response.data)
                return response.data
              });
        
     
            
                 
                  export const fetchAdminAllAdmin = createAsyncThunk(
                    'admin/fetchAdminAllAdmin', async () => {
                        const response= await axios.get(`${BASEURL}/alladmins`,{ withCredentials: true })
                        console.log(response.data)
                        return response.data
                      });
 

                      export const fetchAddAdmin = createAsyncThunk(
                        'auth/fetchAddAdmin', async (data:{email:string, }) => {
                       const   { email} = data
                            const response= await axios.post(`${BASEURL}/addadmin`, {email},{ withCredentials: true })
                            console.log(response.data)
                            return response.data
                          });
        
                          export const fetchAddPremier = createAsyncThunk(
                            'auth/fetchAddPremier', async (data:{email:string, }) => {
                           const   { email} = data
                                const response= await axios.post(`${BASEURL}/addreseller`, {email},{ withCredentials: true })
                                console.log(response.data)
                                return response.data
                              });
        
                              export const fetchAddGenre = createAsyncThunk(
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                'items/fetchAddGenre', async (data:any) => {
                                    const response= await axios.post(`${BASEURL}/add/item`,{data},{ withCredentials: true })
                                    console.log(response.data)
                                    return response.data
                                  });


                                  export const fetchAddPrice = createAsyncThunk(
                                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                    'items/fetchAddPrice', async (data:any) => {
                                        const response= await axios.post(`${BASEURL}/add/item`,{data},{ withCredentials: true })
                                        console.log(response.data)
                                        return response.data
                                      });

                                      export const fetchAddSong = createAsyncThunk(
                                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                        'items/fetchAddSong', async (data:any) => {
                                            const response= await axios.post(`${BASEURL}/add/item`,{data},{ withCredentials: true })
                                            console.log(response.data)
                                            return response.data
                                          });

                                          export const fetchAddArtist = createAsyncThunk(
                                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                            'items/fetchAddArtist', async (data:any) => {
                                                const response= await axios.post(`${BASEURL}/add/item`,{data},{ withCredentials: true })
                                                console.log(response.data)
                                                return response.data
                                              });

                                              export const fetchDeleteSong= createAsyncThunk(
                    
                                                'items/fetchDeleteItem', async (item:TRACK) => {
                                                    const itemId = item._id
                                                    const response= await axios.post(`${BASEURL}/admin/delete/item`,{itemId},{ withCredentials: true })
                                                    console.log(response.data)
                                                    return response.data
                                                  });
                                              

// Slices contain Redux reducer logic for updating state, and
// generate actions that can be dispatched to trigger those updates.
export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
  
  },
   extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchAdminAllOrders.pending, (state) => {
      state.status = 'pending'
    })
    .addCase(fetchAdminAllOrders.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.allOrders= action.payload
      })
      .addCase(fetchAdminAllOrders.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message;
      })
      builder.addCase(fetchAdminAllCustomers.pending, (state) => {
        state.status = 'pending'
      })
      .addCase(fetchAdminAllCustomers.fulfilled, (state, action) => {
          state.status = 'succeeded'
          state.allCustomers= action.payload
        })
        .addCase(fetchAdminAllCustomers.rejected, (state, action) => {
          state.status = 'failed'
          state.error = action.error.message;
        })
       
            builder.addCase(fetchAdminAllPremiers.pending, (state) => {
                state.status = 'pending'
              })
              .addCase(fetchAdminAllPremiers.fulfilled, (state, action) => {
                  state.status = 'succeeded'
                  state.allPremiers= action.payload
                })
                .addCase(fetchAdminAllPremiers.rejected, (state, action) => {
                  state.status = 'failed'
                  state.error = action.error.message;
                })

                builder.addCase(fetchAdminAllAdmin.pending, (state) => {
                    state.status = 'pending'
                  })
                  .addCase(fetchAdminAllAdmin.fulfilled, (state, action) => {
                      state.status = 'succeeded'
                      state.allAdmins= action.payload
                    })
                    .addCase(fetchAdminAllAdmin.rejected, (state, action) => {
                      state.status = 'failed'
                      state.error = action.error.message;
                    })
                    .addCase(fetchAddAdmin.pending, (state) => {
                        state.status = 'pending'
                       
                        })
                        .addCase(fetchAddAdmin.fulfilled, (state, action) => {
                          state.status = 'succeeded'
                          state.message= action.payload.message
                        })
                        .addCase(fetchAddAdmin.rejected, (state, action) => {
                          state.status = 'failed'
                          state.error = action.error.message;
                        })
                        .addCase(fetchAddPremier.pending, (state) => {
                            state.status = 'pending'
                           
                            })
                            .addCase(fetchAddPremier.fulfilled, (state, action) => {
                              state.status = 'succeeded'
                              state.message= action.payload.message
                            })
                            .addCase(fetchAddPremier.rejected, (state, action) => {
                              state.status = 'failed'
                              state.error = action.error.message;
                            })
                            builder.addCase(fetchAddGenre.pending, (state) => {
                                state.status = 'pending'
                                })
                                .addCase(fetchAddGenre.fulfilled, (state, action) => {
                                state.message = action.payload.message
                                })
                                .addCase(fetchAddGenre.rejected, (state, action) => {
                                state.status = 'failed'
                                state.error = action.error.message;
                                })
                                builder.addCase(fetchAddPrice.pending, (state) => {
                                    state.status = 'pending'
                                    })
                                    .addCase(fetchAddPrice.fulfilled, (state, action) => {
                                    state.message = action.payload.message
                                    })
                                    .addCase(fetchAddPrice.rejected, (state, action) => {
                                    state.status = 'failed'
                                    state.error = action.error.message;
                                    })
                                    builder.addCase(fetchAddSong.pending, (state) => {
                                        state.status = 'pending'
                                        })
                                        .addCase(fetchAddSong.fulfilled, (state, action) => {
                                        state.message = action.payload.message
                                        })
                                        .addCase(fetchAddSong.rejected, (state, action) => {
                                        state.status = 'failed'
                                        state.error = action.error.message;
                                        })
                                        builder.addCase(fetchAddArtist.pending, (state) => {
                                            state.status = 'pending'
                                            })
                                            .addCase(fetchAddArtist.fulfilled, (state, action) => {
                                            state.message = action.payload.message
                                            })
                                            .addCase(fetchAddArtist.rejected, (state, action) => {
                                            state.status = 'failed'
                                            state.error = action.error.message;
                                            })
                                            builder.addCase(fetchDeleteSong.pending, (state) => {
                                                state.status = 'pending'
                                                })
                                                .addCase(fetchDeleteSong.fulfilled, (state, action) => {
                                                state.message = action.payload.message
                                                })
                                                .addCase(fetchDeleteSong.rejected, (state, action) => {
                                                state.status = 'failed'
                                                state.error = action.error.message;
                                                })
       
      
     
  

    
  },
})

// Export the generated action creators for use in components

export const getAdminAllAdmins = (state:RootState) => state.admin.allAdmins
export const getAdminAllCustomers = (state:RootState) => state.admin.allCustomers
export const getAdminAllCustomerService = (state:RootState) => state.admin.allCustomerServices
export const getAdminAllPremiers= (state:RootState) => state.admin.allPremiers
export const getAdminAllOrders = (state:RootState) => state.admin.allOrders
export const getAdminMessage =(state:RootState) => state.admin.message
export const getAdminrError = (state:RootState) => state.admin.error
export const getAdminStatus = (state:RootState) => state.admin.status


// Export the slice reducer for use in the store configuration
export default adminSlice.reducer;