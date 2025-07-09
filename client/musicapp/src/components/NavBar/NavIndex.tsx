import NavSearch from "./NavSearch/NavSearch"
import Navbrand from "./Navbrand";
import NavDashboard from "./NavDashboard";



const NavIndex = () => {



   

  return (
    <div className="d-flex Navbar pt-1 justify-content-between fixed-top">
          <div  className="me-auto  col-1 "><Navbrand /></div>
  <div className=" me-auto col-4 "> <NavSearch /></div>
  <div className="col-3"><NavDashboard /></div>
  
    </div>

  )
}

export default NavIndex;