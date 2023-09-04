import React, { useEffect, useState } from 'react'
import signImg from '../imgs/sign-form.png'
import logo from '../imgs/Logo.png'
import style from '../components/lectureForm.module.css'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom'
const SignUp = () => {
    const navigate = useNavigate()
    //sign up states
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const token = localStorage.getItem('token')
    //submit handler function 


    const submitHandler = (e) => {
        e.preventDefault()
        Axios.post(`https://slogic.dorto-dev.com/api/signup`, {
            username,
            email,
            password
        }).then(data => {
            localStorage.setItem('token', data.data.token)
        }).catch(err => console.log(err))
    }

    return (<>
        <section class="vh-100 overflow-hidden ">
            <div class="container-fluid h-custom">
                <div class="row d-flex justify-content-between  h-100">
                    <div class="col-md-8 pt-5  col-lg-6 col-xl-4 offset-xl-1">
                        <div className=' mb-5 '>
                            <img src={logo} alt="logo img" style={{ width: '10rem' }} />
                        </div>
                        <form onSubmit={submitHandler}>
                            <h1>Wellcome back</h1>
                            <p>Welcome back! Please enter your details</p>
                            <div class="form-group">
                                <label for="usernameInput">Username</label>
                                <input type="text" class={`${style['address-class']} form-control`} id="usernameInput" aria-describedby="emailHelp" placeholder="Enter Username" onChange={(e) => setUsername(e.target.value)} />
                            </div>
                            <div class="form-group">
                                <label for="emailInput">Email address</label>
                                <input type="email" class={`${style['address-class']} form-control`} id="emailInput" aria-describedby="emailHelp" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div class="form-group">
                                <label for="passwordInput">Password</label>
                                <input type="password" class={`${style['address-class']} form-control`} id="passwordInput" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <button type="submit" class="btn btn-primary mt-3 w-100">Sign In</button>
                        </form>
                    </div>
                    <div class="col-md-9 col-lg-6 col-xl-5">
                        <img src={signImg} class="img-fluid " alt="Sample image" />
                    </div>
                </div>
            </div>

        </section>

    </>
    )
}

export default SignUp