import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {Link} from "react-router-dom";
import { logout, selectUser } from '../../redux-toolkit/userSlice';

function NavBar() {
    const user = useSelector(selectUser)
    const dispatch = useDispatch('')

    const user_logout = async () => {
        await fetch('http://localhost:8000/api/logout', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
        });
        dispatch(logout());
    }
  return (
    <main>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark" aria-label="Dark offcanvas navbar">
            <div className="container-fluid">
                <h4 className="navbar-brand">React App</h4>
                <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbarDark" aria-controls="offcanvasNavbarDark">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="offcanvas offcanvas-end text-bg-dark" tabIndex="-1" id="offcanvasNavbarDark" aria-labelledby="offcanvasNavbarDarkLabel">
                    <div className="offcanvas-header">
                        <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body">
                        <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                            {user ?
                                <li className="nav-item my-2">
                                    
                                    <Link to="/" className="btn btn-outline-danger px-4 mx-4" onClick={user_logout}>Sign Out</Link>
                                </li>
                                :
                                <li className="nav-item my-2">   
                                    <Link to="/" className="btn btn-outline-success px-4 mx-4">Sign In</Link>
                                </li>      
                            }                      
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    </main>
  )
}

export default NavBar
