

import { OverlayTrigger, Button, Container,  Tooltip,  TooltipProps } from "react-bootstrap";
import NavIndex from "../../components/NavBar/NavIndex"
import { RefAttributes, useEffect } from "react"
import NavSearchResults from "../../components/NavBar/NavSearch/NavSearchResults"
import { PRICE} from "../../utils/@types"
import { dateConverter } from "../../utils/helpers/utilities";
import { Link } from "react-router-dom"
import { getIsAuthenticated, getAuthUser } from "../../redux/features/auth/authSlice"
import {fetchCurrentSub, fetchCreatePayment, fetchPrice, getPriceList, getCurrentSub } from "../../redux/features/checkout/checkoutSlice"
import { useAppDispatch, useAppSelector } from "../../redux/app/hook"
import { getSearchTerm } from "../../redux/features/audio/audioSlice"
const Pricing = () => {
 const dispatch = useAppDispatch()


  const currentSub = useAppSelector(getCurrentSub)
  const priceList = useAppSelector(getPriceList)
  const searchterm = useAppSelector(getSearchTerm)
  const isauthenticated = useAppSelector(getIsAuthenticated)
  const authUser = useAppSelector(getAuthUser)
  
  useEffect(() => {
     
    dispatch(fetchPrice())
    
  }, [dispatch])

  useEffect(() => {
    dispatch(fetchCurrentSub())

    }, [authUser, dispatch]);
     
    const renderTooltip = (props: JSX.IntrinsicAttributes & TooltipProps & RefAttributes<HTMLDivElement>) => (
      <Tooltip id="button-tooltip" className="tooltip badge text-bg-success bg-succes" {...props}>
        Login to Pay
      </Tooltip>
    );
    
 console.log(priceList)

console.log(currentSub)
  return (
    <section className="  ">
      <NavIndex />
      
      
   
       <Container className="mt-5 pt-5 mainCenter" fluid>
  {searchterm ? (<NavSearchResults />) : (  <div>
    {currentSub?.status == 'active'  ? (
      <div className="">
           <div className="d-flex justify-content-center ms-auto">
            <div className="flex-col ">
  <div className=" d-flex  fs-4">
  <div className="me-1 text-success ">Subscription: {currentSub?.status == 'active' ? ("Active") : ('Free')}</div>
  <div className=" "><i className='bx text-success  bx-check bx-md'></i></div>
    </div>
    <div className=" d-flex fs-4">
  <div className="me-1 text-success ">Package Plan: {currentSub?.pricing?.plans}</div>
  <div className="me-auto "><i className='bx text-success bx-check bx-md'></i></div>
    </div>
        <div className=" d-flex fs-4">
  <div className="me-1 text-success "> Duration: 30 days</div>
  <div className="me-auto "><i className='bx  text-success bx-check bx-md'></i></div>
    </div>
    <div className=" d-flex  fs-4">
  <div className="me-1 text-success "> Expires: {dateConverter(currentSub?.end_date)} </div>
  <div className="me-auto "><i className='bx text-success  bx-check bx-md'></i></div>
    </div>
  
  
</div>
</div>
        <div className="row  row-cols-1 row-cols-md-3 mb-3 text-center">
    {priceList?.map((item:PRICE) =>{
          return (
            <div  className="col ">
            <div className="card mb-4  rounded-3 shadow-sm" >
              <div className="card-header pricingbg py-3">
                <h4 className="my-0 text-light fw-normal">{item.plans}</h4>
              </div>
              <div className="card-body pricingbg ">
                <h1 className="card-title text-light pricing-card-title">${item.price}<small className=" text-light fw-light">/mo</small></h1>
                <ul className="list-unstyled mt-3 mb-4">
                  
                  <li>2 GB of storage</li>
                  <li>Email support</li>
                  <li>Help center access</li>
                </ul>
                {item.plans == currentSub?.pricing.plans ? ( <Button disabled     className="w-100 btn btn-lg btn-outline-light"><Link to="/payment" className="text-decoration-none text-success">Active</Link></Button>) 
                    :
                     ( <Button disabled variant='success'     className="w-100 btn btn-lg btn-outline-light"><Link to="/payment" className="text-decoration-none text-light">Pay Now</Link></Button>)
                     }
                 
              {/* <button disabled onClick={() => {dispatch(fetchCreatePayment(item))  }}  type="button" className="w-100 btn btn-lg btn-outline-light">Pay Now</button> */}
              {/* onClick={() =>{addViewedItem(item); addRelatedItem(item) }} */}
              </div>
            </div>
          </div>
       )})}
      
      </div>

    <h2 className="display-6 text-center mb-4">Compare pricing</h2>

    <div className="table-responsive">
      <table className="table table-hover table-secondary text-center">
        <thead>
          <tr>
            <th style={{width:' 34%'}}></th>
            <th style={{width: '22%'}}>Free</th>
            <th style={{width: '22%'}}>Pro</th>
            <th style={{width: '22%'}}>Premium</th>
          </tr>
        </thead>
        <tbody className="">
          <tr>
            <th scope="row" className="text-start text-light ">Playlist</th>
            <td><i className='bx text-light bx-check bx-md'></i></td>
            <td><i className='bx text-light bx-check bx-md'></i></td>
            <td><i className='bx text-light bx-check bx-md'></i></td>
          </tr>
          <tr>
            <th scope="row" className="text-start text-light ">Download</th>
            <td></td>
            <td><i className='bx bx-check text-light bx-md'></i></td>
            <td><i className='bx bx-check bx-md text-light'></i></td>
          </tr>
        </tbody>

        <tbody>
          <tr>
            <th scope="row" className="text-start text-light ">Permissions</th>
            <td><i className='bx bx-check bx-md text-light'></i></td>
            <td><i className='bx bx-check bx-md text-light'></i></td>
            <td><i className='bx bx-check bx-md text-light'></i></td>
          </tr>
          <tr>
            <th scope="row" className="text-start text-light ">Sharing</th>
            <td></td>
            <td><i className='bx bx-check bx-md text-light'></i></td>
            <td><i className='bx bx-check bx-md text-light'></i></td>
          </tr>
          <tr>
            <th scope="row" className="text-start text-light ">Family Plan</th>
            <td></td>
            <td></td>
            <td><i className='bx bx-check bx-md text-light'></i></td>
          </tr>
          <tr>
            <th scope="row" className="text-start text-light ">Extra</th>
            <td></td>
            <td></td>
            <td><i className='bx bx-check bx-md text-light'></i></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>  ) : ( 
    <div>
    <div className="row  row-cols-1 row-cols-md-3 mb-3 text-center">
    {priceList?.map((item:PRICE) =>{
          return (
            <div  className="col ">
            <div className="card mb-4  rounded-3 shadow-sm">
              <div className="card-header pricingbg py-3">
                <h4 className="my-0 text-light  fw-normal">{item.plans}</h4>
              </div>
              <div className="card-body pricingbg ">
                <h1 className="card-title text-light pricing-card-title">${item.price}<small className=" text-light fw-light">/mo</small></h1>
                <ul className="list-unstyled mt-3 mb-4">
                  
                  <li>2 GB of storage</li>
                  <li>Email support</li>
                  <li>Help center access</li>
                </ul>
                {isauthenticated && <a href=""></a> ? (
                  <div>
                    {item?.plans === 'basic' ? ( <button disabled onClick={() => dispatch(fetchCreatePayment(item))  }   type="button" className="w-100 btn btn-lg btn-outline-light"><Link to="/payment" className="text-decoration-none text-success">Pay Now</Link></button>) 
                    :
                     ( <button  onClick={() => dispatch(fetchCreatePayment(item))  }   type="button" className="w-100 btn btn-lg btn-outline-light"><Link to="/payment" className="text-decoration-none text-success">Pay Now</Link></button>)
                     }
                 
               
                </div>
                ) : (<OverlayTrigger
      placement="bottom"
      delay={{ show: 250, hide: 400 }}
      overlay={renderTooltip}
    >
           <button    type="button" className="w-100 btn btn-lg btn-outline-light"><Link to="/payment" className="text-decoration-none text-success">Pay Now</Link></button>
    </OverlayTrigger>
   )}
              
              {/* onClick={() =>{addViewedItem(item); addRelatedItem(item) }} */}
              </div>
            </div>
          </div>
       )})}
      
      </div>

    <h2 className="display-6 text-center mb-4">Compare pricing</h2>

    <div className="table-responsive ">
      <table className="table  table-hover table-secondary text-light text-center">
        <thead>
          <tr>
            <th style={{width:' 34%'}}></th>
            <th style={{width: '22%'}}>Free</th>
            <th style={{width: '22%'}}>Pro</th>
            <th style={{width: '22%'}}>Premium</th>
          </tr>
        </thead>
        <tbody className="">
          <tr>
            <th scope="row" className="text-start text-light">Playlist</th>
            <td><i className='bx text-light bx-check bx-md'></i></td>
            <td><i className='bx text-light bx-check bx-md'></i></td>
            <td><i className='bx text-light bx-check bx-md'></i></td>
          </tr>
          <tr>
            <th scope="row" className="text-start text-light">Download</th>
            <td></td>
            <td><i className='bx bx-check text-light bx-md'></i></td>
            <td><i className='bx bx-check bx-md text-light'></i></td>
          </tr>
        </tbody>

        <tbody>
          <tr>
            <th scope="row" className="text-start text-light">Permissions</th>
            <td><i className='bx bx-check bx-md text-light'></i></td>
            <td><i className='bx bx-check bx-md text-light'></i></td>
            <td><i className='bx bx-check bx-md text-light'></i></td>
          </tr>
          <tr>
            <th scope="row" className="text-start text-light">Sharing</th>
            <td></td>
            <td><i className='bx bx-check bx-md text-light'></i></td>
            <td><i className='bx bx-check bx-md text-light'></i></td>
          </tr>
          <tr>
            <th scope="row" className="text-start text-light">Family Plan</th>
            <td></td>
            <td></td>
            <td><i className='bx bx-check bx-md text-light'></i></td>
          </tr>
          <tr>
            <th scope="row" className="text-start text-light">Extra</th>
            <td></td>
            <td></td>
            <td><i className='bx bx-check bx-md text-light'></i></td>
          </tr>
        </tbody>
      </table>
    </div>
    </div>
   )}
   </div>)}

    </Container>  
  </section>
  )
}

export default Pricing;