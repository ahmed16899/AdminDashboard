import React from 'react';
import '../index.css';
import { Link, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {counterActions , authActions} from '../store/index.js'
import { useNavigate } from "react-router-dom";


//import { Link } from "react-router-dom";
const Navbar = () => {
  const userData = useSelector(state => state.userData.userData)
  const isAuth = useSelector(state=>state.isAuth.isAuth)

  const dispatch = useDispatch ();
  const navigate = useNavigate();

  const logout = ()=>
  {
    dispatch(counterActions.increment(null))
    dispatch(authActions.logout())

    navigate('/auth/signin');

  }
  return (

    <header id="header" className="sticky-top  " >
      <div className="container d-flex align-items-center justify-content-around">
        <nav id="navbar" className="navbar order-last order-lg-0">
          <ul>

            {!isAuth &&
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" activeClassName="active" to="/"> Home</NavLink>
                </li>
                <li className="nav-item" >
                  <NavLink className="nav-link" activeClassName="active" to="/auth/signup" >Sign Up</NavLink>
                </li>
                <li className="nav-item" >
                  <NavLink className="nav-link" activeClassName="active" to="/auth/signin">Sign In  </NavLink>
                </li>
              </>
            }

           
            {isAuth &&
              <>
                <li className="nav-item">
                  {userData.name}
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" activeClassName="active" to="/admin/viewusers">View Users  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" activeClassName="active" to="/admin/dashboard">Dashboard</NavLink>
                </li>
                <button  onClick={logout} className='btn btn-primary mx-2'>Log out</button>
               
                
                </>
            }

          </ul>
        </nav>


        <a href="#appointment" className="appointment-btn scrollto"
        ><span className="d-none d-md-inline">Make an</span>Appointment</a>
      </div>
    </header>
  );
};

export default Navbar;