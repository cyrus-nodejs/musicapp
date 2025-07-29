
import { useAppDispatch, useAppSelector } from "../../redux/app/hook";
import { fetchLogout ,  getAuthUser} from "../../redux/features/auth/authSlice";
import { getIsAuthenticated } from "../../redux/features/auth/authSlice";
import { capitalizeFirstLetter } from "../../utils/helpers/utilities";
import { Button } from "react-bootstrap";

import { useTheme } from "../../context/themeContext";

const NavDashboard = () => {
    
 const authUser = useAppSelector(getAuthUser)
 const isAuthenticated = useAppSelector(getIsAuthenticated)
 const dispatch = useAppDispatch()


  const { theme, toggleTheme } = useTheme();

      return (
    <div className="d-flex">
      { authUser?.is_staff  && (
  <a href='/admin/dashboard' className='text-decoration-none'><div className="" >


  <p className="p-2 text-light fw-medium ">Admin</p>
  

</div></a>
)}  


    <div className=" p-2  d-none d-lg-block"><a href="/pricing" className="text-link  fw-medium p-2 text-decoration-none">Pricing</a></div>
      <div className="  d-none d-lg-block me-auto">
    { authUser && isAuthenticated ? ( <div onClick={() => dispatch(fetchLogout())} className="d-flex flex-row p-2">

  <p className=" me-1  text-link ">Logout</p>
  <p className=" text-link ">Hi {capitalizeFirstLetter(authUser?.first_name)}</p>


</div>
) : (<a href="/login" className=" text-decoration-none"><div className="d-flex flex-row  p-2 text-light">
  <p className='me-1 text-link'>Login</p>
<p className='text-link'>Hi Guest</p>
</div></a>
) }
    </div>  
      <div> <Button className="create-button mb-4 rounded px-3 me-3" onClick={toggleTheme}>
        {theme}
      </Button>
</div>
  </div>
    
  )
}

export default NavDashboard