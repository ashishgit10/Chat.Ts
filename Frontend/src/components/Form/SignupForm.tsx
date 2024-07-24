import React from 'react'

const SignupForm: React.FC = () => {

  return (
    <form className='flex flex-col p-5'>
      <label htmlFor='name'>Name</label>
      <input type="text" name="name" placeholder="Email" />
      <label htmlFor='name'>Email</label>
      <input type="text" name="email" placeholder="Email" />
      <label htmlFor='name'>Password</label>
      <input type="password" name="password" placeholder="Password" />
      <label htmlFor='name'>Confirm Password</label>
      <input type="text" name="confirmpass" placeholder="confirm" />
    </form>
  )
}

export default SignupForm