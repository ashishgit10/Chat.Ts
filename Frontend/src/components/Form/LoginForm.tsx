import React from 'react'

const LoginForm: React.FC = () => {
    return (
        <form className='flex flex-col p-5'>
            <label htmlFor='name'>Name</label>
            <input type="text" name="email" placeholder="Email" />
            <label htmlFor='password'>Password</label>
            <input type="password" name="password" placeholder="Password" />
        </form>
    )
}

export default LoginForm