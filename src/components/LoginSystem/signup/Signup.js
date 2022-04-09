import React, { useContext, useState } from 'react'
import { useHistory, Link } from 'react-router-dom';

import noteContext from '../../../context/notes/noteContext';

export default function SignUp() {

    const [createUserInputData, setCreateUserInputData] = useState({ name: "", email: "", password: "", confirmPassword: "" })
    const history = useHistory();

    const context = useContext(noteContext)
    const { showAlert } = context;

    if(localStorage.getItem("authToken")){
        history.push("/")
    }

    const createAccount = async (event) => {
        event.preventDefault();

        //TODO: Signup user
        const host = "http://localhost:300";

        const response = await fetch(`${host}/api/auth/createuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: createUserInputData.name, email: createUserInputData.email, password: createUserInputData.password })
        });
        const json = await response.json()
        console.log(json)
        if (json.userExits) {
            showAlert("User already exits with this same email", "error")
            return
        }
        if (json.success) {
            showAlert("Successfully signup", "success")
            // save the authToken and redirect
            localStorage.setItem("authToken", json.authToken)
            history.push("/")

        } else {
            showAlert("Invalid credentials", "error")
        }

    }

    const create__user__input = (event) => {
        setCreateUserInputData({ ...createUserInputData, [event.target.name]: event.target.value })
    }
    return (
        <>
            <div className="container my-4">
                <h3>Signup to use bongNotes</h3>
                <form onSubmit={createAccount}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" id="name" aria-describedby="name" name="name" value={createUserInputData.name} onChange={create__user__input} />
                        {1 <= createUserInputData.name.length && createUserInputData.name.length < 3 ? <div className="form-text text-danger">Username must 3 characters</div> : ""}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="email" aria-describedby="email" name="email" value={createUserInputData.email} onChange={create__user__input} />
                        <div id="email" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" name="password" value={createUserInputData.password} onChange={create__user__input} />
                        {1 <= createUserInputData.password.length && createUserInputData.password.length < 6 ? <div className="form-text text-danger">Password must 6 characters</div> : ""}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                        <input type="password" className="form-control" id="confirmPassword" name="confirmPassword" value={createUserInputData.confirmPassword} onChange={create__user__input} />
                        {1 <= createUserInputData.password.length && createUserInputData.password !== createUserInputData.confirmPassword ? <div className="form-text text-danger">Password not match</div> : ""}
                        <div className="form-text text-success">Have your account? <Link className="link-info hover-overlay hover-zoom hover-shadow" to="/login">Click here</Link></div>

                    </div>
                    <button type="submit" className="btn btn-success" disabled={createUserInputData.name.length < 3 || createUserInputData.password.length < 6 || createUserInputData.email.length < 3 || createUserInputData.password !== createUserInputData.confirmPassword}>Submit</button>
                </form>
            </div>
        </>
    )
}
