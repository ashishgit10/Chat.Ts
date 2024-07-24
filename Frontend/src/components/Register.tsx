import React, { useState } from 'react'
import LoginForm from './Form/LoginForm';
import SignupForm from './Form/SignupForm';

const Register: React.FC = () => {
    const [login, setlogin] = useState<boolean>(true);
    return (
        <div className='flex justify-center items-center w-full'>
            <div className='bg-green-500 w-[80%]'>
                <div className='flex justify-around py-2'>
                    <div className={`cursor-pointer px-6 py-2 rounded-lg ${login ? "bg-blue-500" : ""}`} onClick={() => setlogin(!login)}>
                        Login
                    </div>
                    <div className={`cursor-pointer px-6 py-2 rounded-lg ${!login ? "bg-blue-500" : ""}`} onClick={() => setlogin(!login)}>
                        Signup
                    </div>
                </div>
                <div>
                    {
                        login ?

                            <LoginForm />
                            :

                            <SignupForm />

                    }
                </div>
            </div>

        </div>
    )
}

export default Register