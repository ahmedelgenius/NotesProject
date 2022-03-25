import React from 'react'
import jwtdecode from 'jwt-decode';
import {Link, useLocation} from 'react-router-dom'
function Navbar() {
    let token = localStorage.getItem('userToken');
    if(token)  {
        var deToken = jwtdecode(token);
    }

    let location = useLocation();
    function logOut(){
        localStorage.clear();
    }
  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container">
            <Link className="navbar-brand" to={'/home'} >Notes</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                {location.pathname === '/home'?
                <ul className="navbar-nav ms-auto">
                    <li className='nav-link'>
                        <h3 className='text-info'> Welcom {deToken.first_name}</h3>
                    </li>
                    <li className="nav-item">
                        <Link onClick={logOut} className="nav-link" to={'/login'}>LogOut</Link>
                    </li>
                    
                </ul>:
                <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                    <Link className="nav-link" to={'/register'}>Register</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to={'/login'}>Login</Link>
                </li>
            </ul>
                }
                
            </div>
        </div>
    </nav>
    </>
  )
}

export default Navbar;