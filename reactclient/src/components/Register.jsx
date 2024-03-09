import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";

const Register = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')

    async function handleSubmit() {
        try {
            let response = await fetch('https://sales-blink-assignment-server.vercel.app/api/user/register', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password, name })
            })
            let responseData = await response.json()
            console.log(responseData)
            toast(responseData.message)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            <div className="flex items-center justify-center h-screen bg-gray-100">
                <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg rounded-lg w-96">
                    <h3 className="text-2xl font-bold text-center">Sign Up</h3>
                    <div className="mt-4">
                        <div>
                            <label className="block" htmlFor="name">Name</label>
                            <input type="text" placeholder="Name" onChange={(e) => { setName(e.target.value) }}
                                className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                                id="name" />
                        </div>
                        <div>
                            <label className="block" htmlFor="email">Email</label>
                            <input onChange={(e) => { setEmail(e.target.value) }} type="email" placeholder="Email"
                                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                                id="email" />
                        </div>
                        <div className="mt-4">
                            <label className="block">Password</label>
                            <input onChange={(e) => { setPassword(e.target.value) }} type="password" placeholder="Password"
                                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                                id="password" />
                        </div>

                        <div className="flex items-baseline justify-between">
                            <button onClick={handleSubmit} className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900">Sign Up</button>
                            <Link to="/login" className="text-sm text-blue-600 hover:underline">Click here to Sign In</Link>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default Register
