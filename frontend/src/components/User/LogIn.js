import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import { ToastContainer, toast } from "react-toastify";

export default function LogIn() {
    const [isSignUp, setIsSignUp] = useState(false);

    const toggleForm = () => {
        setIsSignUp(!isSignUp);
    };


    const [name, setname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const [contactNumber, setcontactNumber] = useState("");
    let [input, setinput] = useState("");
    let [pass, setpass] = useState(" ");
    let [input2, setinput2] = useState("");
    let [pass2, setpass2] = useState(" ");
    let [email2, setemail2] = useState("");
    // let [number2, setnumber2] = useState("");

    const navigate = useNavigate();
    const signIn = () => {
        axios.post(process.env.React_APP_SECRET_KEY_SignIn, { email, password })
            .then(response => {
                console.log(response);
                if (response.status === 200) {
                    localStorage.setItem("userId", response.data.user.id);
                    toast.success("Sign In Success....");
                    navigate("/");
                }
            }).catch(err => {
                console.log(err);
                toast.error("Sign in fail....");
            });
    }

    const signUp = () => {
        // axios.post(process.env.React_APP_SECRET_KEY_SignUp, { name, email, password, contactNumber })
        axios.post(process.env.React_APP_SECRET_KEY_SignUp, { name, email, password })
            .then(response => {
                if (response.status === 200) {
                    toast.success("Sign Up Success....");
                    toggleForm();
                }
            }).catch(err => {
                console.log(err);
                toast.info("User is Already exist...");
            })
    }

    const handleSubmit = event => {
        console.log('handleSubmit ran');
        event.preventDefault(); // 👈️ prevent page refresh
    }

    // const [user, setUser] = useState(null);
    // const [profile, setProfile] = useState(null);

    const signin = useGoogleLogin({
        onSuccess: (codeResponse) => {
            // setUser(codeResponse);
            // console.log("codeResponse", codeResponse);
            Userdata(codeResponse,"signin");
        },
        onError: (error) => console.log('Login Failed:', error),
    });

    const signup = useGoogleLogin({
        onSuccess: (codeResponse) => {
            Userdata(codeResponse,"signup");
        },
        onError: (error) => console.log('Login Failed:', error),
    });

    const Userdata = (userData, type) => {
        if (userData) {
            axios
                .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${userData.access_token}`, {
                    headers: {
                        Authorization: `Bearer ${userData.access_token}`,
                        Accept: 'application/json'
                    }
                })
                .then((res) => {
                    const googlename = document.getElementById('googlename');
                    const googleemail = document.getElementById('googleemail');
                    const googleemail2 = document.getElementById('googleemail2');
                    const googlepassword = document.getElementById('googlepassword');
                    const googlepassword2 = document.getElementById('googlepassword2');
                    googlename.value = res.data.name;
                    googleemail.value = res.data.email;
                    googleemail2.value = res.data.email;
                    googlepassword.value = res.data.id;
                    googlepassword2.value = res.data.id;
                    setname(res.data.name);
                    setEmail(res.data.email);
                    setPassword(res.data.id);
                    setemail2("");
                    setpass2("");
                    setinput2("");
                    setinput("");
                    setpass("");
                    // setProfile(res.data);
                    // console.log("res", res.data);
                })
                .catch((err) => console.log('Failed', err));
        }
    };

    return (
        <div>
            <ToastContainer />
            <div className='login'>
                <div className={` containe ${isSignUp ? 'active' : ''}`}>
                    <div className="form-container sign-up ">
                        <form onSubmit={handleSubmit} className='signincon '>
                            <h1 className='fs-2'>Create Account</h1>
                            {/* <div className="social-icons">
                                <div className="ms-2 me-2 icon-google"></div>
                                <div className="ms-2 me-2 icon-facebook"></div>
                                <div className="ms-2 me-2 icon-git"></div>
                                <div className="ms-2 me-2 icon-linkedin"></div>
                            </div> */}
                            <span>or use your email for registration</span>
                            <input className='signin-input' id="googlename" onChange={(event) => { (event.target.value === "") ? setinput2("name is required") : (!event.target.value.match("^[a-z A-Z]+$")) ? setinput2("name contains only charecters") : (!event.target.value.match("^[a-z A-Z]{2,20}$")) ? setinput2("name must be at least 2 characters long.") : setinput2(""); setname(event.target.value); }} type="text" placeholder="User Name" />
                            <small className='signin-input-message'>{input2}</small>
                            <input className='signin-password' id="googleemail" onChange={(event) => { (event.target.value === "") ? setemail2("email is required") : (!event.target.value.match(/^[^\s@]+@/)) ? setemail2("Email must start with valid characters.") : (!event.target.value.match(/@gmail\.com$/)) ? setemail2("Email must end with '@gmail.com'.") : setemail2(""); setEmail(event.target.value); }} type="email" placeholder="Email" />
                            <small className='signin-input-message'>{email2}</small>
                            <input className='signin-password' id="googlepassword" onChange={(event) => { (event.target.value === "") ? setpass2("password is required") : (!event.target.value.match(/^(?=.*\d)/)) ? setpass2("Password must contain at least one digit.") : (!event.target.value.match(/^(?=.*[a-zA-Z])/)) ? setpass2("Password must contain at least one letter.") : (!event.target.value.match(/^.{5,}$/)) ? setpass2("Password must be at least 5 characters long.") : setpass2(""); setPassword(event.target.value); }} type="password" placeholder="Password" />
                            <small className='signin-input-message'>{pass2}</small>
                            {/* <input className='signin-password' onChange={(event) => { (event.target.value === "") ? setnumber2("number is required") : (!event.target.value.match(/^[0-9]+$/)) ? setnumber2("Number must contain only digits.") : (!event.target.value.match(/^\d{10}$/)) ? setnumber2("Number must only 10 digits.") : setnumber2(""); setcontactNumber(event.target.value); }} type="number" placeholder="Number" />
                            <small className='signin-input-message'>{number2}</small> */}
                            {/* {(input2 === pass2 && pass2 === email2 && email2 === number2) ? <button onClick={signUp}>Sign Up</button> : <button onClick={() => { (name === "") ? setinput2("name is required") : (email === "") ? setemail2("email is required") : (password === "") ? setpass2("password is required") : (contactNumber === "") ? setnumber2("number is required") : setpass2(" ") }} style={{ background: "var(--green-3)" }}>Sign Up</button>} */}
                            {(input2 === pass2 && pass2 === email2) ? <button onClick={signUp}>Sign Up</button> : <button onClick={() => { (name === "") ? setinput2("name is required") : (email === "") ? setemail2("email is required") : (password === "") ? setpass2("password is required") : setpass2(" ") }} style={{ background: "var(--green-3)" }}>Sign Up</button>}
                            <div className="googleloginicon mt-3" onClick={signup}></div>
                        </form>
                    </div>
                    <div className="form-container sign-in ">
                        <form onSubmit={handleSubmit} className='signincon  '>
                            <h1 className='fs-2 mb-2'>Sign In</h1>
                            {/* <div className="social-icons">
                                <div className="ms-2 me-2 icon-google"></div>
                                <div className="ms-2 me-2 icon-facebook"></div>
                                <div className="ms-2 me-2 icon-git"></div>
                                <div className="ms-2 me-2 icon-linkedin"></div>
                            </div> */}
                            <span>or use your email password</span>
                            <input className='signin-password' id="googleemail2" onChange={(event) => { (event.target.value === "") ? setemail2("email is required") : (!event.target.value.match(/^[^\s@]+@gmail\.com$/)) ? setemail2("Invalid Email.") : setemail2(""); setEmail(event.target.value); }} type="email" placeholder="Email" />
                            <small className='signin-input-message'>{email2}</small>
                            <input className='signin-password' id="googlepassword2" onChange={(event) => { (event.target.value === "") ? setpass("password is required") : setpass(""); setPassword(event.target.value); }} type="password" placeholder="Password" />
                            <small className='signin-input-message'>{pass}</small>
                            <Link className="ml-3 links " to="/forgetpassword">→ Forget Your Password? ←</Link>
                            {(input === pass) ? <button onClick={signIn}>Sign In</button> : <button onClick={() => { (name === "") ? setinput("name is required") : (password === "") ? setpass("password is required") : setpass(" ") }} style={{ background: "var(--green-3)" }}>Sign In</button>}
                            <div className="googleloginicon mt-3" onClick={signin}></div>
                        </form>
                    </div>
                    <div className="toggle-container">
                        <div className="toggle">
                            <div className="toggle-panel toggle-left signincon">
                                <h1 className='fs-2'>Welcome Back!</h1>
                                <p>Enter your personal details to use all of site features</p>
                                <button className={`hidden ${isSignUp ? '' : 'visible'}`} onClick={toggleForm}>Sign In</button>
                            </div>
                            <div className="toggle-panel toggle-right signincon">
                                <h1 className='fs-2'>Hello, Friend!</h1>
                                <p>Register with your personal details to use all of site features</p>
                                <button className={`hidden ${isSignUp ? 'visible' : ''}`} onClick={toggleForm}>Sign Up</button>
                            </div>
                        </div>
                    </div>
                </div >
            </div >
        </div >
    );
}  