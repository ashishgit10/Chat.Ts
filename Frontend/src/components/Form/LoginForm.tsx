import axios from 'axios';
import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const LoginForm: React.FC = () => {
    const [show, setShow] = useState<boolean>(false)
    const [data, setData] = useState({ email: "", password: "" })

    const navigate = useNavigate();

    const handleData = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value
        })
    }

    const handlesubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!data.email || !data.password) {
            toast.error("Please fill in all fields");
            return;
        }
        try {
            const response = await axios.post("http://localhost:8001/api/v1/login", data, {
                headers: {
                    "Content-Type": "application/json"
                }, withCredentials: true
            })
            console.log(response)
            if (response.status === 200) {
                toast.success("Login Successful");
                console.log("Response Data:", response.data);
                navigate("/home")
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                navigate("/")
                toast.error(error.response?.data?.message || "Login failed");
            } else {
                navigate("/")
                toast.error("An unexpected error occurred");
            }
        }

    }
    return (
        <form className='flex flex-col p-5' onSubmit={handlesubmit}>
            <label htmlFor='email'>email</label>
            <Toaster />
            <input type="text" name="email" placeholder="Email" value={data.email} onChange={handleData} />
            <label htmlFor='password'>Password</label>
            <div className='relative'>
                <input className=' w-full' type={show ? "password" : "text"} value={data.password} onChange={handleData} name="password" placeholder="Password" />
                <button className='absolute right-4' onClick={() => setShow(!show)}>{show ? "show" : "hide"}</button>
            </div>
            <button type="submit">Login</button>
        </form>
    )
}

export default LoginForm