// Import necessary components from react-router-dom and other parts of the application.
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import React, { useState } from "react";

const SignUp = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { store, dispatch } = useGlobalReducer()

  function sendData(e){
    e.preventDefault()

    const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(
        {
            "email": email,
            "password": password
            }
        )
    };

    fetch(import.meta.env.VITE_BACKEND_URL + '/api/signup', requestOptions)
        .then(response => {
          if(response.status == 200){
            alert("Usuario creado")
            dispatch({ type : "set_auth", payload: true })
          }
          return response.json()
        })
        .then(data => {
          localStorage.setItem("token", data.access_token)
        })
        .catch(err => console.error("Error:", err));
  }
  return (
<div className="container mt-5">
            <form className="w-50 mx-auto" onSubmit={sendData}>
                <h2 className="text-center mb-4">Login</h2>
                
                <div className="mb-3">
                    <label className="form-label">Email address</label>
                    <input 
                        value={email} onChange={(e) => setEmail(e.target.value)} 
                        type="email" className="form-control" placeholder="email"
                        required 
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input 
                        value={password} onChange={(e) => setPassword(e.target.value)} 
                        type="password" className="form-control" placeholder="password"
                        required 
                    />
                </div>

                <button type="submit" className="btn btn-primary w-100">
                    Ingresar
                </button>
                <Link to="/" className="ms-2">
                    Regresa a principal
                </Link>
            </form>
        </div>
  )
}

export default SignUp