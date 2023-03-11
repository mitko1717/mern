import React from 'react'
import { useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

export const Navbar = () => {
    const navigate = useNavigate()
    const auth = useContext(AuthContext)
    const logoutHandler = (e) => {
        e.preventDefault()
        auth.logout()
        navigate('/')
    }

    return (
        <nav>
        <div className="nav-wrapper blue darken-1" style={{padding: '0 2rem'}}>
          <a href="/" className="brand-logo">short links</a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><NavLink to={'/create'}>create</NavLink></li>
            <li><NavLink to={'/links'}>links</NavLink></li>
            <li><a href='/' onClick={logoutHandler}>logout</a></li>
          </ul>
        </div>
      </nav>
    )
}