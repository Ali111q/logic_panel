import React from 'react'
import logo from '../imgs/Logo.png'
import ali from '../imgs/ali.jpg'
import { Link } from 'react-router-dom'
const SideBar = () => {



    return (
        <div  className="d-flex flex-column flex-shrink-0 p-3 bg-light v-100  "  style={{width: "280px",height:'100% !important'}}>
        <a href="/"  className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
          <span  className="fs-4"> <img src={logo} alt="" /></span>
        </a>
        <hr/>
        <ul  className="nav nav-pills flex-column mb-auto">
          <li>
            <Link to="/universities"  className="nav-link link-dark text-uppercase">
              UNIVERSITIES
            </Link>
          </li>
        </ul>
        <hr/>
        <div  className="d-flex align-items-center justify-content-between gap-5 ">
          <a href="#"  className="d-flex align-items-center link-dark text-decoration-none " id="dropdownUser2" data-bs-toggle="dropdown" aria-expanded="false">
            <img src={ali} alt="" width="32" height="32"  className="rounded-circle me-2"/>
            <strong>Ali</strong>
          </a>
            <Link className="btn btn-danger" onClick={()=>{localStorage.removeItem('token')}} to="/login">Log Out</Link>
        </div>
      </div>
    )
}

export default SideBar
