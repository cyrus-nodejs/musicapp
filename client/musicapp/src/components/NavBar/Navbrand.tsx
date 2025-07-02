
import { Link } from "react-router-dom"
const Navbrand = () => {
  return (
    <div>
    <h2 className=' fw-light text-link d-none d-lg-block'><Link to="/" className="text-decoration-none p-2 text-link" >MusicPlanet</Link></h2>
    <h2 className=' pt-3 d-lg-none fw-medium  text-link'><Link to="/" className="text-decoration-none  text-link" > MusicPlanet</Link></h2>
    </div>
  )
}

export default Navbrand