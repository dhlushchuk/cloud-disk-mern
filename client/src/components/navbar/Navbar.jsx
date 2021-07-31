import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { userLogout } from '../../actions/user';
import { searchFiles, getFiles } from '../../actions/files';
import avatarLogo from '../../assets/img/avatar.svg'
import { API_URL } from '../../config'

const Navbar = () => {
    const isAuth = useSelector(state => state.user.isAuth)
    const currentDir = useSelector(state => state.files.currentDir)
    const currentUser = useSelector(state => state.user.currentUser)
    const dispatch = useDispatch()
    const [searchName, setSearchName] = useState('')
    const [searchTimeout, setSearchTimeout] = useState(false)
    const [showNav, setShowNav] = useState(false)
    const avatar = currentUser.avatar ? `${API_URL + currentUser.avatar}` : avatarLogo    
    const searchChangeHandler = e => {
        setSearchName(e.target.value)
        if(searchTimeout) {
            clearTimeout(searchTimeout)
        }
        if(e.target.value !== '') {
            setSearchTimeout(setTimeout((value) => {
                dispatch(searchFiles(value))
            }, 500, e.target.value))
        } else {
            dispatch(getFiles(currentDir))
        }
    }
    return (
        <>
        <nav className="navbar navbar-light bg-light bg-outline-secondary" style={{borderBottom: '1px solid black'}} onClick={() => setShowNav(false)}>
            <NavLink className="nav-link" to='/'>
                <div>MERN CLOUD</div>
            </NavLink>
            <ul className="nav align-items-center">
                <li className="nav-item nav-burger" onClick={e => e.stopPropagation()}>
                    <button className="navbar-toggler m-2" type="button" onClick={() => setShowNav(prevState => !prevState)}>
                        <span className="navbar-toggler-icon"/>
                    </button>
                </li>
                {isAuth?
                    <>
                        <li className="nav-item nav-content">
                            <form className="d-flex">
                                <input className="form-control me-2 nav-link" value={searchName} onChange={e => searchChangeHandler(e)} type="search" placeholder="Search" aria-label="Search"/>
                             </form> 
                        </li>
                        <li className="nav-item nav-content">
                            <button className="btn nav-link" onClick={() => dispatch(userLogout())} type="submit">Logout</button>
                        </li>
                        <li className="nav-item nav-content">
                            <NavLink className="nav-link" to='/profile'>
                                <img style={{width: 50, height: 50}} src={avatar} alt='user-avatar' />
                            </NavLink>
                        </li>
                    </>
                :
                    <>
                        <li className="nav-item nav-content">
                            <NavLink className="nav-link" to="/login">Sign In</NavLink>
                        </li>
                        <li className="nav-item nav-content">
                            <NavLink className="nav-link" to="/registration">Sign Up</NavLink>
                        </li>
                    </>
                }
            </ul>
        </nav>
        {showNav &&
            <ul class="nav flex-column navbar-light bg-light">
                {isAuth? 
                    <>
                        <li className="nav-item">
                            <form className="d-flex">
                                <input className="form-control me-2 m-3 nav-link" value={searchName} onChange={e => searchChangeHandler(e)} type="search" placeholder="Search" aria-label="Search"/>
                             </form> 
                        </li>
                        <li className="nav-item">
                            <div className="nav-link nav-links">
                                <button className="btn" onClick={() => dispatch(userLogout())} type="submit">Logout</button>
                                <NavLink to='/profile'>
                                    <img style={{width: 50, height: 50}} src={avatar} alt='user-avatar' />
                                </NavLink>
                            </div>
                        </li>
                    </>
                :
                    <>
                        <li className="nav-item">
                            <div className="nav-link nav-links">
                                <NavLink className="nav-link btn-outline-primary" onClick={() => setShowNav(false)} to="/login">Sign In</NavLink>
                                <NavLink className="nav-link btn-outline-primary" onClick={() => setShowNav(false)} to="/registration">Sign Up</NavLink>
                            </div>
                        </li>
                    </>
                }
            </ul>
        }
    </>
    );
};

export default Navbar;