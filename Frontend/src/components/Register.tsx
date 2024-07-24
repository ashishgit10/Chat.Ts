import React, { useState } from 'react'

import LoginForm from './Form/LoginForm';

const Register: React.FC = () => {
    const [login, setlogin] = useState<Boolean>(false);
    return (
        <div className='flex justify-center items-center w-full'>
            <div className='bg-green-500 w-[80%]'>
                <div className='flex justify-around'>
                    <div className=''>
                        Login
                    </div>
                    <div>
                        Signup
                    </div>
                </div>
                <div>
                    <LoginForm />
                </div>
            </div>

        </div>
    )
}

export default Register