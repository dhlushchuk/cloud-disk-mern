import React, { useEffect } from 'react';
import Navbar from "./navbar/Navbar";
import './app.scss'
import { BrowserRouter, Redirect, Route, Switch, NavLink } from "react-router-dom";
import Registration from "./registration/Registration";
import Login from './login/Login';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../actions/user';
import Disk from './disk/Disk';
import Profile from './profile/Profile';
import cloudStorageImage from '../assets/img/picture.png'

function App() {
    const isAuth = useSelector(state => state.user.isAuth)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(auth())
    }, [dispatch])
    return (
        <BrowserRouter>
            <div>
                <Navbar/>
                <div>
                    {!isAuth? 
                        <Switch>
                            <Route path="/" component={MainComponent} exact/>
                            <Route path="/registration" component={Registration} exact/>
                            <Route path="/login" component={Login} exact/>
                            <Redirect to='/'/>
                        </Switch>
                    :
                        <Switch>
                            <Route exact path="/" component={Disk}/>
                            <Route exact path="/profile" component={Profile}/>
                            <Redirect to='/'/>
                        </Switch>
                    }
                </div>
            </div>
        </BrowserRouter>
    );
}

const MainComponent = () => {
    return (
        <div className="card">
            <img src={cloudStorageImage} className="card-img-top" alt="cloud-storage"/>
            <div className="card-body" style={{display: 'flex', flexDirection: 'column'}}>
                <h5 style={{textAlign: 'center'}} className="card-title">Sign up now and get access to our cloud storage.</h5>
                <NavLink className="btn btn-primary" style={{margin: '20px auto'}} to="/registration">Sign Up</NavLink>
            </div>
        </div>
    )
}

export default App;
