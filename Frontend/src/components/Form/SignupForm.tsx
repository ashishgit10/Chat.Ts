import React from 'react'

const SignupForm:React.FC = () => {
  return (
    <form className='flex flex-col'>
    <label />
    <input type="text" name="email" placeholder="Email" />
    <input type="password" name="password" placeholder="Password" />
</form>
  )
}

export default SignupForm