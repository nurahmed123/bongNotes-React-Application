import React, { useEffect } from 'react'
import { Link, useLocation, useHistory } from "react-router-dom";

const NavBar = () => {
    var location = useLocation();
    useEffect(() => {
    }, [location]);

    const history = useHistory();
    const logOut = () => {
        history.push("/login");
        localStorage.removeItem("authToken");
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">bongNotes</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
                        </li>

                    </ul>
                    {
                        !localStorage.getItem("authToken") ?
                            <form className="d-flex">
                                <Link className="btn btn-success mx-1" type="submit" to="/login">Login</Link>
                                <Link className="btn btn-success mx-1" type="submit" to="/signup">Signup</Link>
                            </form> :
                            <button className="btn btn-success mx-1" onClick={logOut}>Log out</button>
                    }
                </div>
            </div>
        </nav>
    )
}

export default NavBar