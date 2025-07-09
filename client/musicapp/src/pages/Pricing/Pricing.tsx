

import { OverlayTrigger, Button, Container, Table,  Tooltip,  TooltipProps } from "react-bootstrap";
import NavIndex from "../../components/NavBar/NavIndex"
import { RefAttributes, useEffect } from "react"
import NavSearchResults from "../../components/NavBar/NavSearch/NavSearchResults"
import { PRICE} from "../../utils/@types"
import { dateConverter } from "../../utils/helpers/utilities";
import { Link } from "react-router-dom"
import { getIsAuthenticated, getAuthUser } from "../../redux/features/auth/authSlice"
import {fetchCurrentSub, fetchCreatePayment,  fetchPrice, getPriceList, getCurrentSub } from "../../redux/features/checkout/checkoutSlice"
import { useAppDispatch, useAppSelector } from "../../redux/app/hook"
import { getSearchTerm } from "../../redux/features/audio/audioSlice"
const Pricing = () => {
 const dispatch = useAppDispatch()


  const currentSub = useAppSelector(getCurrentSub)
  const priceList = useAppSelector(getPriceList)
  const searchterm = useAppSelector(getSearchTerm)
  const isauthenticated = useAppSelector(getIsAuthenticated)
  const authUser = useAppSelector(getAuthUser)
  const id = authUser?.id
  useEffect(() => {
     
    dispatch(fetchPrice())
    
  }, [dispatch])

  useEffect(() => {
    dispatch(fetchCurrentSub(id))

    }, [id, dispatch]);
     
    const renderTooltip = (props: JSX.IntrinsicAttributes & TooltipProps & RefAttributes<HTMLDivElement>) => (
      <Tooltip id="button-tooltip" className="tooltip badge   artist-bg" {...props}>
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
    { isauthenticated && authUser ? (
      <div className="">
        {  currentSub?.status == 'active' ? ( <div> <div className="d-flex artist-bg justify-content-center ms-auto">
            <div className="flex-col ">
  <div className=" d-flex  fs-4">
  <div className="me-1  ">Subscription: {currentSub?.status == 'active' ? ("Active") : ('Free')}</div>
  <div className=" "><i className='bx text-success  bx-check bx-md'></i></div>
    </div>
    <div className=" d-flex ">
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
        <div className="row row-cols-1 rounded row-cols-md-3 mb-3 text-center">
    {priceList?.map((item:PRICE) =>{
          return (
            <div  className="artist-bg ">
            <div className="  " >
              <div className="artist-bg  py-3">
                <p className="my-0  fw-normal">{item.plans}</p>
              </div>
              <div className="  ">
                <p className="artist-bg ">${item.price}<small className="  fw-light">/mo</small></p>
                <ul className="list-unstyled artist-bg  mt-3 mb-4">
                  
                  <li className="artist-bg ">2 GB of storage</li>
                  <li>Email support</li>
                  <li>Help center access</li>
                </ul>
                {item.plans == currentSub?.pricing.plans ? ( <Button disabled     className="w-100  create-button "><Link to="/payment" className="text-decoration-none ">Active</Link></Button>) 
                    :
                     ( <Button disabled     className="w-100  create-button "><Link to="/payment" className="text-decoration-none ">Pay Now</Link></Button>)
                     }
              </div>
            </div>
          </div>
       )})}
      
      </div>

    <h2 className="display-6 text-center mb-4">Compare pricing</h2>

    <div className="table-responsive">
      <Table className=" custom-table ">
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
            <th scope="row" className="text-start  ">Playlist</th>
            <td><i className='bx  bx-check bx-md'></i></td>
            <td><i className='bx  bx-check bx-md'></i></td>
            <td><i className='bx  bx-check bx-md'></i></td>
          </tr>
          <tr>
            <th scope="row" className="text-start  ">Download</th>
            <td></td>
            <td><i className='bx bx-check  bx-md'></i></td>
            <td><i className='bx bx-check bx-md '></i></td>
          </tr>
        </tbody>

        <tbody>
          <tr>
            <th scope="row" className="text-start  ">Permissions</th>
            <td><i className='bx bx-check bx-md '></i></td>
            <td><i className='bx bx-check bx-md '></i></td>
            <td><i className='bx bx-check bx-md '></i></td>
          </tr>
          <tr>
            <th scope="row" className="text-start  ">Sharing</th>
            <td></td>
            <td><i className='bx bx-check bx-md '></i></td>
            <td><i className='bx bx-check bx-md '></i></td>
          </tr>
          <tr>
            <th scope="row" className="text-start  ">Family Plan</th>
            <td></td>
            <td></td>
            <td><i className='bx bx-check bx-md '></i></td>
          </tr>
          <tr>
            <th scope="row" className="text-start  ">Extra</th>
            <td></td>
            <td></td>
            <td><i className='bx bx-check bx-md '></i></td>
          </tr>
        </tbody>
      </Table>
    </div></div>) : (<div className=''>
        
 
        <div className="row  pt-5 row-cols-1 row-cols-md-3 mb-3 text-center">
    {priceList?.map((item:PRICE) =>{
          return (
            <div  className=" ">
            <div className="artist-bg pt-3  rounded " >
              <div className="artist-bg  py-3">
                <p className="my-0 fs-5 artist-bg">{item.plans}</p>
              </div>
              <div className=" artist-bg ">
                <p className="artist-bg fs-5  ">${item.price}<small className="  artist-bg fw-light">/mo</small></p>
                <ul className="list-unstyled artist-bg  mt-3 mb-4">
                  
                  <li className="artist-bg   ">{item.price} GB of storage</li>
                  <li className='artist-bg'>Email support</li>
                  <li className="artist-bg">Help center access</li>
                </ul>
              
                     <Link to="/payment" className="text-decoration-none text-reset artist-bg "> <Button  onClick={() => dispatch(fetchCreatePayment(item))  }   className="w-100  create-button ">Pay Now</Button></Link>
                     
              </div>
            </div>
          </div>
       )})}
      
      </div>

    <h2 className="display-6 text-center mb-4">Compare pricing</h2>

    <div className="table-responsive">
      <Table className="custom-table text-center">
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
            <th scope="row" className="text-start  ">Playlist</th>
            <td><i className='bx  bx-check bx-md'></i></td>
            <td><i className='bx  bx-check bx-md'></i></td>
            <td><i className='bx  bx-check bx-md'></i></td>
          </tr>
          <tr>
            <th scope="row" className="text-start  ">Download</th>
            <td></td>
            <td><i className='bx bx-check  bx-md'></i></td>
            <td><i className='bx bx-check bx-md '></i></td>
          </tr>
        </tbody>

        <tbody>
          <tr>
            <th scope="row" className="text-start  ">Permissions</th>
            <td><i className='bx bx-check bx-md '></i></td>
            <td><i className='bx bx-check bx-md '></i></td>
            <td><i className='bx bx-check bx-md '></i></td>
          </tr>
          <tr>
            <th scope="row" className="text-start  ">Sharing</th>
            <td></td>
            <td><i className='bx bx-check bx-md '></i></td>
            <td><i className='bx bx-check bx-md '></i></td>
          </tr>
          <tr>
            <th scope="row" className="text-start  ">Family Plan</th>
            <td></td>
            <td></td>
            <td><i className='bx bx-check bx-md '></i></td>
          </tr>
          <tr>
            <th scope="row" className="text-start  ">Extra</th>
            <td></td>
            <td></td>
            <td><i className='bx bx-check bx-md '></i></td>
          </tr>
        </tbody>
      </Table>
    </div>
    </div>) }
         
  </div>  ) : ( 
    <div>
    <div className="row    row-cols-1 row-cols-md-3 mb-3 text-center">
    {priceList?.map((item:PRICE) =>{
          return (
            <div  className="col pt-2 ">
            <div className="card mb-4  rounded-1 artist-bg shadow-sm">
              <div className=" artist-bg py-3">
                <p className="my-0  artist-bg fs-5  ">{item.plans}</p>
              </div>
              <div className="artist-bg  ">
                <p className="artist-bg fs-5 ">${item.price}<small className="  fw-light">/mo</small></p>
                <ul className="list-unstyled artist-bg mt-3 mb-4">
                  
                  <li className="artist-bg">2 GB of storage</li>
                  <li className='artist-bg'>Email support</li>
                  <li className='artist-bg'>Help center access</li>
                </ul>
               <OverlayTrigger
      placement="bottom"
      delay={{ show: 250, hide: 400 }}
      overlay={renderTooltip}
      
    >
          <Link to="/payment" className="text-decoration-none text-reset artist-bg"> <button    type="button" className="w-100 btn  btn-lg create-button">Pay Now</button></Link>
    </OverlayTrigger>
   
              </div>
            </div>
          </div>
       )})}
      
      </div>

    <h2 className="display-6 text-center mb-4">Compare pricing</h2>

    <div className="table-responsive artist-bg">
      <Table className=" custom-table  text-center">
        <thead>
          <tr>
            <th style={{width:' 34%'}}></th>
            <th style={{width: '22%'}}>Free</th>
            <th style={{width: '22%'}}>Pro</th>
            <th style={{width: '22%'}}>Premium</th>
          </tr>
        </thead>
        <tbody className="artist-bg">
          <tr>
            <th scope="row" className="text-start artist-bg">Playlist</th>
            <td><i className='bx artist-bg  bx-check bx-md'></i></td>
            <td><i className='bx artist-bg bx-check bx-md'></i></td>
            <td><i className='bx  bx-check bx-md'></i></td>
          </tr>
          <tr>
            <th scope="row" className="text-start ">Download</th>
            <td></td>
            <td><i className='bx bx-check  bx-md'></i></td>
            <td><i className='bx bx-check bx-md '></i></td>
          </tr>
        </tbody>

        <tbody>
          <tr>
            <th scope="row" className="text-start ">Permissions</th>
            <td><i className='bx bx-check bx-md '></i></td>
            <td><i className='bx bx-check bx-md '></i></td>
            <td><i className='bx bx-check bx-md '></i></td>
          </tr>
          <tr>
            <th scope="row" className="text-start ">Sharing</th>
            <td></td>
            <td><i className='bx bx-check bx-md '></i></td>
            <td><i className='bx bx-check bx-md '></i></td>
          </tr>
          <tr>
            <th scope="row" className="text-start ">Family Plan</th>
            <td></td>
            <td></td>
            <td><i className='bx bx-check bx-md '></i></td>
          </tr>
          <tr>
            <th scope="row" className="text-start ">Extra</th>
            <td></td>
            <td></td>
            <td><i className='bx bx-check bx-md '></i></td>
          </tr>
        </tbody>
      </Table>
    </div>
    </div>
   )}
   </div>)}

    </Container>  
  </section>
  )
}

export default Pricing;