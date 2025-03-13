
import { useAppDispatch, useAppSelector } from "../../redux/app/hook";
import { fetchAsyncLogout ,  getAuthUser} from "../../redux/features/auth/authSlice";
import { getIsAuthenticated } from "../../redux/features/auth/authSlice";
import { capitalizeFirstLetter } from "../../utils/helpers/utilities";

const NavDashboard = () => {
    
 const authUser = useAppSelector(getAuthUser)
 const isAuthenticated = useAppSelector(getIsAuthenticated)
 const dispatch = useAppDispatch()

//   useEffect(() => {
//    dispatch(fetchConfig())
 
//  }, [dispatch]);


      return (
    <div className="d-flex">
      { authUser?.is_staff  && (
  <a href='/admin/dashboard' className='text-decoration-none'><div className="" >


  <div className="p-2 text-light fw-medium ">Admin</div>
  

</div></a>
)}  


    <div className=" p-2 text-light d-none d-lg-block"><a href="/pricing" className="text-light  fw-medium p-2 text-decoration-none">Pricing</a></div>
      <div className=" text-light d-none d-lg-block me-auto">
    { authUser && isAuthenticated ? ( <div onClick={() => dispatch(fetchAsyncLogout())} className="d-flex flex-row p-2">

  <div className=" me-1 text-light fw-medium fs-6">Logout</div>
  <div className=" text-white ">Hi {capitalizeFirstLetter(authUser?.first_name)}</div>


</div>
) : (<a href="/login" className="text-light text-decoration-none"><div className="d-flex flex-row  p-2 text-light">
  <div className='me-1'>Login</div>
<div className=''>Hi Guest</div>
</div></a>
) }
    </div>  
         
  </div>
    
  )
}

export default NavDashboard