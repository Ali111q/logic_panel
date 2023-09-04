import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import sign from '../imgs/sign-form.png';
import logo from '../imgs/Logo.png';
import style from '../components/lectureForm.module.css';
import Axios from 'axios';

const SignForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()
    const submitHandler = (e) => {
        e.preventDefault();
        Axios.post(`http://172.20.10.11:5000/api/login`, {
            email,
            password,
        })
            .then((response) => {
                localStorage.setItem('token', response.data.token);
                navigate('/universities')
            })
            .catch((err) => console.log(err));
    };
    return (
        <section className="vh-100 overflow-hidden">
            <div className="container-fluid h-custom">
                <div className="row d-flex justify-content-between h-100">
                    <div className="col-md-8 pt-5 col-lg-6 col-xl-4 offset-xl-1">
                        <div className=" mb-5 ">
                            <img src={logo} className=" " alt="" style={{ width: '10rem' }} />
                        </div>
                        <form onSubmit={submitHandler}>
                            <h1>Wellcome back</h1>
                            <p>Welcome back! Please enter your details</p>
                            <div className="form-group">
                                <label htmlFor="emailInput">Email address</label>
                                <input
                                    type="email"
                                    className={`${style['address-class']} form-control`}
                                    id="emailInput"
                                    aria-describedby="emailHelp"
                                    placeholder="Enter email"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="passwordInput">Password</label>
                                <input
                                    type="password"
                                    className={`${style['address-class']} form-control`}
                                    id="passwordInput"
                                    placeholder="Password"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <button type="submit" className="btn btn-primary mt-3 w-100">
                                Log In
                            </button>
                        </form>
                    </div>
                    <div className="col-md-9 col-lg-6 col-xl-5">
                        <img src={sign} className="img-fluid " alt="Sample image" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SignForm;
