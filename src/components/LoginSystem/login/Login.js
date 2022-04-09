import React, { useState, useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';
import noteContext from '../../../context/notes/noteContext';

export default function Login() {

    const history = useHistory();

    const context = useContext(noteContext)
    const { showAlert } = context;

    const [userInputData, setUserInputData] = useState({ email: "", password: "" })

    const loginUser = async (event) => {
        event.preventDefault();

        //TODO: Login user
        const host = "http://localhost:300";

        const response = await fetch(`${host}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: userInputData.email, password: userInputData.password })
        });
        const json = await response.json()
        console.log(json)
        if (json.success) {
            showAlert("Login success", "success")
            // save the authToken and redirect
            localStorage.setItem("authToken", json.authToken)
            history.push("/")

        } else {
            showAlert("Invalid credentials", "error")
        }
    }

    const user__input = (event) => {
        setUserInputData({ ...userInputData, [event.target.name]: event.target.value })
    }

    return (
        <>
            <div className="container my-4">
                <h3>Login to use bongNotes</h3>
                <form onSubmit={loginUser} >
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" name="email" className="form-control" id="email" aria-describedby="email" onChange={user__input} value={setUserInputData.email} required />
                        <div id="email" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" name="password" onChange={user__input} value={setUserInputData.password} required />
                        {1 <= userInputData.password.length && userInputData.password.length < 6 ? <div id="emailHelp" className="form-text text-danger">Password must 6 characters</div> : ""}
                        <div className="form-text text-success">You have no account? <Link className="link-info hover-overlay hover-zoom hover-shadow" to="/signup">Create account</Link></div>
                    </div>
                    <button type="submit" className="btn btn-success" disabled={userInputData.email.length < 1 || userInputData.password.length < 6}>Submit</button>
                </form>
            </div>
        </>
    )
}
