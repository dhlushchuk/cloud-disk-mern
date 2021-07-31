import React, {useState} from 'react';
import {login} from "../../actions/user";
import { useDispatch } from 'react-redux';

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()
    const handleSubmit = e => {
        e.preventDefault()
        dispatch(login(email, password))
    }

    return (
        <div className="card">
            <form>
                <h5 className="card-title">Sign In</h5>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input value={password} onChange={e => setPassword(e.target.value)} type="password" className="form-control" id="exampleInputPassword1"/>
                </div>
                <button onClick={e => handleSubmit(e)} className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};

export default Login;
