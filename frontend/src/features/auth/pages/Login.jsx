import React from 'react'

const Login = () => {
  return (
    <main>
      <div className='form-container'>
        <h1> Login   </h1>
        <form >

      <div className="input-group">
        <label htmlFor="email">Email</label>
        <input type="email" id='email'name='email' placeholder="Enter Email Address" />
      </div>

      <div className="password-group">
        <label htmlFor="email">Password</label>
        <input type="password" id='password'name='password' placeholder="Enter your Password" />
      </div>

        </form>
      </div>
    </main>
  )
}

export default Login