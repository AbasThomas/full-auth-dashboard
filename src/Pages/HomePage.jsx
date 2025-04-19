import React from 'react'
import UserRegistrationForm from './UserRegistration'
import { Navigate, useNavigate } from 'react-router-dom'

const HomePage = () => {
  const navigate = useNavigate()
  return (
    <div className='homeContainer' style={{
      textAlign: 'center',
    }}>
      
        <h2>WELCOME TO YOUR PERSONAL DASHBOARD</h2>
        <p >New here?<a href="" onClick={() => navigate('/register  ')}>Create account</a></p>
    </div>
  )
}

export default HomePage