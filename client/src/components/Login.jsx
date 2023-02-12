import React, {  useState } from 'react'
import { register, signin } from '../service/Api';
import { useNavigate } from 'react-router-dom'
import './Login.css'
import { useContext } from 'react';
import { AccountContext } from '../context/AccountProvider';


const Login = ({ notify }) => {
    const navigate = useNavigate();
    const [page, setpage] = useState('signup');
    const { Account, setAccount,statechanged,setstatechanged } = useContext(AccountContext);

    let name, value
    const handleInputs = (e) => {
        name = e.target.name;
        value = e.target.value;
        setAccount({ ...Account, [name]: value });
    }
    const Postdata = async (e) => {
        e.preventDefault();

        const res = await register(Account);
        if (res.status === 201) {
            await signin(Account);
        }


        if (res.status === 422 || !res.data) {
            notify(res)
        } else {
            notify("user registered  successfully");
            navigate('/');
            setstatechanged(statechanged+1)
        }


    }
    const LoginUserdata = async (e) => {
        e.preventDefault();

        const res = await signin(Account);
        console.log(res)
        if (res == '400' || !res) {
            console.log("hello")
            notify("Invalid credentials");
        } else if (res == '200') {
            notify("user logged in successfully");
            localStorage.setItem('Matrimonialinfoadded', 'true')
            navigate('/');
            setstatechanged(statechanged+1)
        } else {
            notify("An unknown error occured");
        }

    }




    return (

        <section class="login">


            {page === 'signup' &&
                <>
                    <div class="login_box">
                        <div class="left">
                            <div class="contact">
                                <form action="">
                                    <h2>SIGN UP</h2>
                                    <input type="text" value={Account.name} name="name"
                                        onChange={handleInputs} placeholder="Your name" />
                                    <input type="text" value={Account.email} name="email"
                                        onChange={handleInputs} placeholder="Email" />
                                    <input type="text" value={Account.password} name="password"
                                        onChange={handleInputs} placeholder="Password" />
                                    <button onClick={Postdata} class="submit">Sign Up</button>
                                    <p class="signin">Already have an account? <span style={{ cursor: 'pointer', color: 'black' }} onClick={() => setpage("signin")}>sign In</span></p>

                                </form>

                            </div>
                        </div>
                        <div class="right">
                            <div class="right-text">
                                {/* <h2>Matrimonial</h2>
                                <h5>An online matrimonial site</h5> */}

                            </div>

                        </div>
                    </div>
                </>}
            {page === 'signin' &&
                <>
                    <div class="login_box">
                        <div class="left">
                            {/* <div class="top_link"><a href="#">Return home</a></div> */}
                            <div class="contact">
                                <form action="">
                                    <h2>SIGN IN</h2>
                                    <input type="text" value={Account.email} name="email"
                                        onChange={handleInputs} placeholder="Email" />
                                    <input type="text" value={Account.password} name="password"
                                        onChange={handleInputs} placeholder="Password" />

                                    <button onClick={LoginUserdata} class="submit">Sign In</button>
                                    <p class="signin">Didn't have an account? <span style={{ cursor: 'pointer', color: 'black' }} onClick={() => setpage("signup")}>sign up</span></p>
                                </form>

                            </div>
                        </div>
                        <div class="right">
                            <div class="right-text">
                                {/* <h2>Musica</h2>
                                <h5>A Music WebApp</h5> */}
                            </div>

                        </div>
                    </div>
                </>}

        </section>
    )
}

export default Login