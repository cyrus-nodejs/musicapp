import { createSlice,  createAsyncThunk } from '@reduxjs/toolkit'
 import { USER } from '../../../utils/@types'
import { saveToken, saveRefreshToken } from '../../../utils/helpers/storage'
import { RootState } from '../../app/store'
// import axios from 'axios'
import axios from '../../../utils/helpers/axiosconfig'



export interface AuthState {
    authUser:   null | USER | void
    isAuthenticated: boolean
    status:  'idle' | 'pending' | 'succeeded' | 'failed'
    error:string | null | undefined
    message:string
    token:string |null
  }

  // Define the initial value for the slice state
const initialState: AuthState = {
    authUser: null,
    isAuthenticated: false,
    message:"",
    status: 'idle' ,
    token:null,
    error:null
  }
  

// eslint-disable-next-line react-refresh/only-export-components
const BASEURL = import.meta.env.VITE_APP_BASE_URL


export const fetchAsyncUser = createAsyncThunk(
    'auth/fetchAsyncUser', async () => {              
        const response= await axios.get(`${BASEURL}/api/user/`,  { withCredentials: true })
        console.log(response.data)
        return response.data
      });

      export const fetchLogin = createAsyncThunk(
        'auth/fetchLogin', async (data:{username:string, password:string}) => {
         const { username, password} = data
            const response= await axios.post(`${BASEURL}/api/login/`,{username, password},{ withCredentials: true })
            console.log(response.data)
            const token = response.data.access;
            const refreshToken= response.data.refresh;
            saveToken(token);  // Save the token in localStorage
            saveRefreshToken(refreshToken) // Save the refresh token in localStorage
            return token;
          

          });

          export const fetchRegister = createAsyncThunk(
            'auth/fetchRegister', async (data:{first_name:string, last_name:string, username:string, password:string}) => {
           const   {first_name, last_name, username,  password} = data
            const email=username
                const response= await axios.post(`${BASEURL}/api/register/`, {first_name, username,  last_name, email, password},{ withCredentials: true })
                console.log(response.data)
                return response.data
              });
        

  // export const fetchAsyncLogout = createAsyncThunk(
  //   'auth/fetchAsyncLogout',  async () => {
  //       const response= await axios.post(`${BASEURL}/api/logout/`,{},{ withCredentials: true })
  //       console.log(response.data)
  //       return response.data
  //     });
      export const fetchForgotPassword = createAsyncThunk(
        'auth/fetchForgotPassword',  async (data:{email:string}) => {
         const {email} = data   
            const response= await axios.post(`${BASEURL}/api/request-password/`, {email})
            console.log(response.data)
            return response.data
          });
          export const fetchResetPassword = createAsyncThunk(
            'auth/fetchResetPassword',  async (data:{password:string, token:string, uid:number}) => {
               const { password,uid, token} = data
              const response= await axios.post(`${BASEURL}/api/reset-password/`, { password, uid, token})
                console.log(response.data)
                return response.data
              });
            

    
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {

    fetchAsyncLogout: (state) => {
      localStorage.removeItem('access_token');
      state.authUser=null
     }
 
  },
   extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchAsyncUser.pending, (state) => {
      state.status = 'pending'
      
    })
    .addCase(fetchAsyncUser.fulfilled, (state, action) => {
         state.authUser= action.payload
         state.isAuthenticated = true
         state.message= action.payload.status
        
      })
      .addCase(fetchAsyncUser.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message;
        
      })
      
      .addCase(fetchLogin.pending, (state) => {
        state.status = 'pending'
        })
        .addCase(fetchLogin.fulfilled, (state, action) => {
          state.isAuthenticated = true
          state.message= action.payload.message
          state.authUser= action.payload
          
          
          
  
        })
        .addCase(fetchLogin.rejected, (state, action) => {
          state.status = 'failed'
          state.error = action.error.message;
        })
        .addCase(fetchRegister.pending, (state) => {
      state.status = 'pending'
     
      })
      .addCase(fetchRegister.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.message= action.payload.message
      })
      .addCase(fetchRegister.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message;
      })
      
     
      .addCase(fetchForgotPassword.pending, (state) => {
        state.status = 'pending'
        
        })
        .addCase(fetchForgotPassword.fulfilled, (state, action) => {
          state.status = 'succeeded'
          state.message = action.payload.message
        })
        .addCase(fetchForgotPassword.rejected, (state, action) => {
          state.status = 'failed'
          state.error = action.error.message;
          
        })
        .addCase(fetchResetPassword.pending, (state) => {
          state.status = 'pending'
          })
          .addCase(fetchResetPassword.fulfilled, (state, action) => {
            state.isAuthenticated = true
            state.message= action.payload.message
            
          })
          .addCase(fetchResetPassword.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message;
          })
     
    
  },
})

// Export the generated action creators for use in components
export const getAuthUser = (state:RootState) => state.auth.authUser
export const getIsAuthenticated = (state:RootState) => state.auth.isAuthenticated
export const getAuthError = (state:RootState) => state.auth.error
export const getAuthStatus = (state:RootState) => state.auth.status
export const getAuthToken = (state:RootState) => state.auth.token

export const getMessage =(state:RootState) => state.auth.message
export const {fetchAsyncLogout } = authSlice.actions
// Export the slice reducer for use in the store configuration
export default authSlice.reducer;