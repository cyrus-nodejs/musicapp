import { Container } from "react-bootstrap"
import { useEffect } from "react";
import { fetchCurrentOrder } from "../../redux/features/checkout/checkoutSlice";
import {useAppDispatch,  useAppSelector } from "../../redux/app/hook";
import NavSearchResults from "../../components/NavBar/NavSearch/NavSearchResults";
import { getCurrentOrder } from "../../redux/features/checkout/checkoutSlice";
import { getSearchTerm } from "../../redux/features/audio/audioSlice";
import NavIndex from "../../components/NavBar/NavIndex"
const CurrentOrder = () => {
 const dispatch = useAppDispatch()
 

   const currentOrder = useAppSelector(getCurrentOrder)
   const searchterm = useAppSelector(getSearchTerm)
   

   useEffect(() => {
        dispatch(fetchCurrentOrder())
      
      }, [ dispatch]);
console.log(currentOrder)

 return (
    <section className="  ">
    <NavIndex />
    <Container className="mt-5 pt-5 mainCenter" fluid>
    {searchterm ? (<NavSearchResults />) : (  <div >
      <div className="fs-3 text-center  text-light">Current Order</div>
    <div className="fs-3 text-center  text-light">Order Id:{currentOrder?.id} </div>
    <div className="d-flex mx-auto mt-5 flex-column rounded-2 w-25 p-5 border">
  <div className="p-2 fs-3 text-light">Total Price:${currentOrder?.bill}</div>
  <div className="p-2 fs-3 text-light ">Status: {currentOrder?.payment ? ('Paid') : ('Not paid')}</div>
  <div className="p-2 fs-3 text-light">Plan:{currentOrder?.pricing.plans}</div>
</div>
       </div> ) }
   
</Container>
</section>
  )
}

export default CurrentOrder