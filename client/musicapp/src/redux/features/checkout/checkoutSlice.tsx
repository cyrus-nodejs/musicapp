import { createSlice,  createAsyncThunk } from '@reduxjs/toolkit'
import {  ORDER, PRICE, SUB} from '../../../utils/@types'
import { RootState } from '../../app/store'
import axios from 'axios'


export interface CheckoutState {
  stripePromise:string | null | undefined | unknown ,
  clientSecret:string,
  currentOrder:ORDER | null | undefined | void
  currentSub:SUB | null | undefined | void
  packages:[] | null | undefined | void
  status:  'idle' | 'pending' | 'succeeded' | 'failed'
  message:string
  error:string | null | undefined
  }

  // Define the initial value for the slice state
const initialState: CheckoutState = {
    stripePromise:'',
    clientSecret:'',
    currentOrder:null,
    currentSub:null,
    packages:null,
    status:  'idle',
    message:'',
    error: null ,
  }
  

// eslint-disable-next-line react-refresh/only-export-components
const BASEURL = import.meta.env.VITE_APP_BASE_URL


// export const fetchConfig = createAsyncThunk(
//     'checkout/fetchConfig', async () => {
//         const response= await axios.get(`${BASEURL}/config`,{ withCredentials: true })
//         console.log(response.data.publishableKey)
//         return response.data.publishableKey
//       });

  export const fetchCreatePayment = createAsyncThunk(
    'checkout/fetchPayment',  async (item:PRICE) => {
        const bill = item.price
            const plan= item.plans
            console.log(bill, plan)
        const response= await axios.post(`${BASEURL}/api/create-payment/`,{bill, plan},{ withCredentials: true })
        console.log(response.data)
        return response.data
      });
        
      export const fetchConfirmPayment = createAsyncThunk(
        'checkout/fetchConfirmPayment',  async (paymentIntent) => {
        const response= await axios.post(`${BASEURL}/confirmpayment`, {paymentIntent},{ withCredentials: true })
        console.log(response.data)
        return response.data
        });
            
        export const fetchRetrievePayment = createAsyncThunk(
         'checkout/fetchRetrievePayment',  async (data:{orderId:string}) => {
        const {orderId} = data
        const response= await axios.post(`${BASEURL}/retrievepayment`, {orderId},{ withCredentials: true })
        console.log(response.data)
        return response.data
        });               
                    
        
      export const fetchOrder = createAsyncThunk(
        'checkout/fetchOrder',  async () => {
            const response= await axios.get(`${BASEURL}/api/order/`,{ withCredentials: true })
            console.log(response.data)
            return response.data
          });

          export const fetchSub = createAsyncThunk(
            'checkout/fetchSub',  async () => {
                const response= await axios.get(`${BASEURL}/api/subscription/`,{ withCredentials: true })
                console.log(response.data)
                return response.data
              });
              export const fetchPrice= createAsyncThunk(
                'checkout/fetchPrice',  async () => {
                    const response= await axios.get(`${BASEURL}/api/price/`,{ withCredentials: true })
                    console.log(response.data)
                    return response.data
                  });
    



// Slices contain Redux reducer logic for updating state, and
// generate actions that can be dispatched to trigger those updates.
export const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    
  },
   extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchCreatePayment.pending, (state) => {state.status = 'pending'})
      .addCase(fetchCreatePayment.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.clientSecret= action.payload
      })
      .addCase(fetchCreatePayment.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message;
      })
      
      .addCase(fetchOrder.pending, (state) => {
        state.status = 'pending'
        })
        .addCase(fetchOrder.fulfilled, (state, action) => {
          state.status = 'succeeded'
          state.currentOrder= action.payload
        })
        .addCase(fetchOrder.rejected, (state, action) => {
          state.status = 'failed'
          state.error = action.error.message;
        })
        .addCase(fetchSub.pending, (state) => {
            state.status = 'pending'
            })
            .addCase(fetchSub.fulfilled, (state, action) => {
              state.status = 'succeeded'
              state.currentSub= action.payload
            })
            .addCase(fetchSub.rejected, (state, action) => {
              state.status = 'failed'
              state.error = action.error.message;
            })
            .addCase(fetchPrice.pending, (state) => {
              state.status = 'pending'
              })
              .addCase(fetchPrice.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.packages= action.payload
              })
              .addCase(fetchPrice.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message;
              })
  
              .addCase(fetchRetrievePayment.pending, (state) => {
                state.status = 'pending'
                })
            .addCase(fetchRetrievePayment.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.message = action.payload.message
            })
            .addCase(fetchRetrievePayment.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
            })
            .addCase(fetchConfirmPayment.pending, (state) => {
              state.status = 'pending'
              })
              .addCase(fetchConfirmPayment.fulfilled, (state, action) => {
                state.status = 'succeeded'
                
                 state.message = action.payload.message
              })
              .addCase(fetchConfirmPayment.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message;
              })
  },
})

// Export the generated action creators for use in components
export const getStripePromise = (state:RootState) => state.checkout.stripePromise
export const getClientSecret = (state:RootState) => state.checkout.clientSecret
export const getCurrentOrder = (state:RootState) => state.checkout.currentOrder
export const getCurrentSub= (state:RootState) => state.checkout.currentSub
export const getPackageList = (state:RootState) => state.checkout.packages
export const getCheckoutror = (state:RootState) => state.checkout.error
export const getCheckoutStatus = (state:RootState) => state.checkout.status



// Export the slice reducer for use in the store configuration
export default checkoutSlice.reducer;