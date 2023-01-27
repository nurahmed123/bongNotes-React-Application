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
        // <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        //     <div className="container-fluid">
        //         <Link className="navbar-brand" to="/">bongNotes</Link>
        //         hi
        //         <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        //             <span className="navbar-toggler-icon"></span>
        //         </button>
        //         <div className="collapse navbar-collapse" id="navbarSupportedContent">
        //             <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        //                 <li className="nav-item">
        //                     <Link className={`nav-link ${location.pathname === "/dictionary" ? "active" : ""}`} to="/dictionary">Dictionary</Link>
        //                 </li>
        //                 <li className="nav-item">
        //                     <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
        //                 </li>
        //                 <li className="nav-item">
        //                     <Link className={`nav-link ${location.pathname === "/notes" ? "active" : ""}`} aria-current="page" to="/notes">Notes</Link>
        //                 </li>
        //                 <li className="nav-item">
        //                     <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
        //                 </li>
        //             </ul>
        //             {
        //                 !localStorage.getItem("authToken") ?
        //                     <form className="d-flex">
        //                         <Link className="btn btn-success mx-1" type="submit" to="/login">Login</Link>
        //                         <Link className="btn btn-success mx-1" type="submit" to="/signup">Signup</Link>
        //                     </form> :
        //                     <button className="btn btn-success mx-1" onClick={logOut}>Log out</button>
        //             }
        //         </div>
        //     </div>
        // </nav>

        <header className="text-gray-600 body-font">
            <div className="container mx-auto flex flex-wrap p-2 flex-col md:flex-row items-center">
                <Link className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">

                    <span className="ml-3 text-xl text-white">BongNotes</span>
                </Link>
                <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center">
                    <Link className={`mr-5 text-gray-300 cursor-pointer hover:text-gray-400 ${location.pathname === "/" ? "text-white" : ""}`} to="/">Google translate</Link>
                    <Link className={`mr-5 text-gray-300 cursor-pointer hover:text-gray-400 ${location.pathname === "/dictionary" ? "text-white" : ""}`} to="/dictionary">Dictionary</Link>
                    <Link className={`mr-5 text-gray-300 cursor-pointer hover:text-gray-400 ${location.pathname === "/notes" ? "text-white" : ""}`} to="/notes">Notes</Link>
                    <Link className={`mr-5 text-gray-300 cursor-pointer hover:text-gray-400 ${location.pathname === "/contactus" ? "text-white" : ""}`} to="/contactus">Contct us</Link>
                </nav>

                {
                    !localStorage.getItem("authToken") ?
                        <form className="d-flex">
                            <Link className="btn bg-[#198754] hover:bg-[#209d62] hover:text-white text-violet-100" type="submit" to="/login">Login</Link>
                            <Link className="btn bg-[#198754] hover:bg-[#209d62] hover:text-white text-violet-100 mx-2" type="submit" to="/signup">Signup</Link>
                        </form> :
                        <button className="btn bg-[#198754] hover:bg-[#209d62] hover:text-white text-violet-100" onClick={logOut}>Log out</button>
                }
            </div>
        </header>

    )
}

export default NavBar