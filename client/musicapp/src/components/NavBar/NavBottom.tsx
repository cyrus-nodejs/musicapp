import { Link } from "react-router-dom"

const NavBottom = () => {
  return (
    <section className="fixed-bottom ">
    <div className="d-flex d-lg-none Navbar">
  <div className="p-2  flex-fill">
    <div className="">
    <div className="d-flex flex-column  ">
        <Link to="/" className="text-decoration-none text-light">
  <div className="text-center"><i className='bx bx-home bx-sm'></i></div>
  <div className="text-center">Home</div>
  </Link>
</div>
    </div>
  </div>
  <div className="p-2  flex-fill">
    <div className="">
    <div className="d-flex flex-column  ">
    <Link to="/" className="text-decoration-none text-light">
  <div className="text-center"><i className='bx bx-food-menu bx-sm' ></i></div>
  <div className="text-center">Your Library</div>
  </Link>
</div>

    </div>
  </div>
  <div className="p-2  flex-fill">
    <div className="">
    <div className="d-flex flex-column  ">
    <Link to="/" className="text-decoration-none text-light">
  <div className="text-center"><i className='bx bx-search bx-sm'></i></div>
  <div className="text-center">Search</div>
  </Link>
</div>
    </div>
  </div>
  <div className="p-2  flex-fill">
    <div className="">
    <div className="d-flex flex-column  ">
    <Link to="/" className="text-decoration-none text-light">
  <div className="text-center"><i className='bx bx-target-lock bx-sm' ></i></div>
  <div className="text-center">Get App</div>
  </Link>
</div>
    </div>
  </div>
</div>
</section>
  )
}

export default NavBottom