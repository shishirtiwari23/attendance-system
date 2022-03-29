import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'
import "./Dashboard.css"

const Dashboard = () => {
  return (
    <div className='dashboard'>
        <div className='navLinks'>
        <Link className='navLink' to="/register"><Button>Register a User</Button></Link>
        <Link className='navLink' to="/daily-attendance"><Button>Take Daily Attendance</Button></Link>
        <Link className='navLink' to="/analysis"><Button>View Analysis</Button></Link>
        </div>
    </div>
  )
}

export default Dashboard