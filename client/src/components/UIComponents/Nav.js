import React, { useContext, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import toast from 'react-hot-toast';

export default function Nav() {

    const [auth, setAuth] = useContext(AuthContext)

    const navigate = useNavigate();


    const handleLogout = () => {
        setAuth({
            user: null,
            token: "",
        });

        console.log(auth)

        localStorage.removeItem("auth");
        toast.success("Logged out successfully");
        navigate("/login")
    };
    return (
        <>
            {/* <header className="bg-dark text-white text-center py-3">
                <h1 className="mt-3">KisanRaj</h1>
            </header> */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark navbar-sm" style={{ opacity:"1", 'height': '60px' }} >
                <div className="container-fluid" style={{ height: "50px" }}>
                    <Link className="navbar-brand text-warning" to="/">KisanRaj</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navi" aria-controls="navi" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navi">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item dropdown">
                                <a className="nav-link text-white p-3 disabled" href='#' id="navbarDropdown" data-bs-toggle="dropdown" aria-expanded="false" >
                                    Buy
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><Link className="dropdown-item" to={auth?.user ? "/dashboard/user/buy-commodity/all" : "/buy-commodity/all"} >Buy Commodity</Link></li>
                                    <li><Link className="dropdown-item" to="/cp" >Buy Equipment</Link></li>

                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link text-white p-3 disabled" href='#' id="navbarDropdown" data-bs-toggle="dropdown" aria-expanded="false" >
                                    Sell
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><Link className="dropdown-item" to="/dashboard/user/sell-commodity" >Sell Commodity</Link></li>
                                    <li><Link className="dropdown-item" to="/cp" >Sell Equipment</Link></li>

                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link text-white p-3 disabled" href='#' id="navbarDropdown" data-bs-toggle="dropdown" aria-expanded="false" >
                                    Equipment
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><Link className="dropdown-item" to="/dashboard/user/hire-equipment" >Hire Equipment</Link></li>
                                    <li><Link className="dropdown-item" to="/dashboard/user/post-equipment" >Post Equipment</Link></li>
                                    <li><Link className="dropdown-item" to="/dashboard/user/sell-equipment" >Sell Equipment</Link></li>
                                </ul>
                            </li>


                            <li className="nav-item">
                                <NavLink className="nav-link active p-3" aria-current="page" to={auth?.user? "/dashboard/user/coldstorages":"/coldstorages"}>Cold Storages</NavLink>
                            </li> 

                            { /*<li className="nav-item">
                                <Link className="nav-link active p-3" aria-current="page" to="/rooms">Cold Storages</Link>
                            </li>*/}
 

                        </ul>

                        {!auth?.user ? (
                            <>
                                <button className="btn btn-sm btn-success m-3" type="button" onClick={() => { navigate("/login") }}>Login</button>
                                <button className="btn btn-sm btn-success m-3" type="button" onClick={() => { navigate("/register") }}>Register</button>
                            </>
                        ) : (
                            <>
                                <ul className="navbar-nav p-2 mx-5">
                                    <li className="nav-item">
                                        <Link className="nav-link active p-3" aria-current="page" to="/dashboard/user/listings-posted">Listings</Link>
                                    </li>

                                    <li className="nav-item dropdown">
                                        <a className="nav-link text-white p-3 disabled" href='#' id="navbarDropdown" data-bs-toggle="dropdown" aria-expanded="false" >
                                            Potentials
                                        </a>
                                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                            <li><Link className="dropdown-item" to={auth?.user ? "/dashboard/user/potential-leads" : "/login"} >Potential leads</Link></li>
                                            <li><Link className="dropdown-item" to={auth?.user ? "/dashboard/user/post-potential" : "/login"} >Post Potential</Link></li>
                                        </ul>
                                    </li>

                                    <li className="nav-item dropdown">
                                        <a className="nav-link text-white p-3 disabled" href='#' id="navbarDropdown" data-bs-toggle="dropdown" aria-expanded="false" >
                                            Responses
                                        </a>
                                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                            <li><Link className="dropdown-item" to="/dashboard/user/proposals-recieved" >Proposals Recieved</Link></li>
                                            <li><Link className="dropdown-item" to="/dashboard/user/history/negotiations" >Negotiations History</Link></li>

                                        </ul>
                                    </li>
                                    
                                    <li className="nav-item">
                                        <Link className="nav-link active p-3" aria-current="page" to="/Orders">Orders</Link>
                                    </li>

                                    <li className="nav-item dropdown active my-2">
                                        <a className="nav-link me-auto text-white disabled text-danger" href='#' data-bs-toggle="dropdown"><span className='text-warning'>{auth?.user?.name}</span>   <i className="fa-solid fa-sort-down"></i></a>
                                        <ul className="dropdown-menu">
                                            <li><Link className="dropdown-item" to="/dashboard/user/profile"> Profile</Link></li>
                                            <li><a className="dropdown-item" onClick={handleLogout}> Logout </a></li>
                                        </ul>
                                    </li>
                                    

                                </ul>
                            </>
                        )}





                    </div>
                </div>
            </nav>
        </>
    )
}


