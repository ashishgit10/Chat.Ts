import React, { useState } from 'react'

const LoginForm: React.FC = () => {
    const [show, setShow] = useState<boolean>(false)
    const [data, setData] = useState({ email: "", password: "" })

    const handleData = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value
        })
    }
    
    const handlesubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(data)
    }
    return (
        <form className='flex flex-col p-5' onSubmit={handlesubmit}>
            <label htmlFor='email'>email</label>
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