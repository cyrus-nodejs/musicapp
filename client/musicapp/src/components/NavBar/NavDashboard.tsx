
import { useAppDispatch, useAppSelector } from "../../redux/app/hook";
import { fetchLogout ,  getAuthUser} from "../../redux/features/auth/authSlice";
import { getIsAuthenticated } from "../../redux/features/auth/authSlice";
import { capitalizeFirstLetter } from "../../utils/helpers/utilities";

const NavDashboard = () => {
    
 const authUser = useAppSelector(getAuthUser)
 const isAuthenticated = useAppSelector(getIsAuthenticated)
 const dispatch = useAppDispatch()




      return (
    <div className="d-flex">
      { authUser?.is_staff  && (
  <a href='/admin/dashboard' className='text-decoration-none'><div className="" >


  <p className="p-2 text-light fw-medium ">Admin</p>
  

</div></a>
)}  


    <div className=" p-2 text-light d-none d-lg-block"><a href="/pricing" className="text-light  fw-medium p-2 text-decoration-none">Pricing</a></div>
      <div className=" text-light d-none d-lg-block me-auto">
    { authUser && isAuthenticated ? ( <div onClick={() => dispatch(fetchLogout())} className="d-flex flex-row p-2">

  <p className=" me-1 text-light fw-medium fs-6">Logout</p>
  <p className=" text-white ">Hi {capitalizeFirstLetter(authUser?.first_name)}</p>


</div>
) : (<a href="/login" className="text-light text-decoration-none"><div className="d-flex flex-row  p-2 text-light">
  <p className='me-1'>Login</p>
<p className=''>Hi Guest</p>
</div></a>
) }
    </div>  
         
  </div>
    
  )
}

export default NavDashboard