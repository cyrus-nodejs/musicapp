
import { Link } from "react-router-dom"
const Navbrand = () => {
  return (
    <div>
    <div className='fs-3 fw-light text-success d-none d-lg-block'><Link to="/" className="text-decoration-none p-2 text-success" >SoundPlanet</Link></div>
    <div className='fs-6 pt-3 d-lg-none fw-medium  text-success '><Link to="/" className="text-decoration-none  text-success" >SoundPlanet</Link></div>
    </div>
  )
}

export default Navbrand