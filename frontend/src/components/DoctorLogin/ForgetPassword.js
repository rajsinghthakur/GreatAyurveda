import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import axios from 'axios';
import OTPInput, { ResendOTP } from "otp-input-react";
import { ToastContainer, toast } from "react-toastify";

export default function ForgetPassword() {

    const [isSignUp, setIsSignUp] = useState(false);
    function toggleForm() {
        setIsSignUp(!isSignUp);
    };

    const [otpVisible, setOtpVisible] = useState(false);
    const [email, setEmail] = useState("");
    let [email2, setemail2] = useState(" ");

    const forgetpassword = (flag) => {
        axios.post("http://localhost:3005/doctor/forgotpassword", { email })
            .then(response => {
                if (response.status === 200) {
                    toast.success("OTP Send Successfuly....")
                    if (flag) setOtpVisible(!otpVisible);
                } else {
                    toast.info("OTP Send fail....")
                }
            }).catch(err => {
                console.log(err);
                toast.error("user dos't exist ...")
            })
    }

    let [OTP, setOTP] = useState("");
    const verifyOTP = () => {
        axios.post("http://localhost:3005/doctor/verifyOTP", { OTP })
            .then(response => {
                if (response.status === 200) {
                    toast.success(response.data.message)
                    toggleForm();
                } else {
                    toast.info(response.data.message)
                }
            }).catch(err => {
                console.log(err);
                toast.error("Invalid OTP...");
            })
    }

    const [password, setPassword] = useState("");
    let [pass, setpass] = useState("");
    const [password2, setPassword2] = useState("");
    let [pass2, setpass2] = useState(" ");

    const setnewpassword = () => {
        axios.put("http://localhost:3005/doctor/setnewpassword", { email, password })
            .then(response => {
                if (response.status === 200) {
                    toast.error("Password Successfuly Chenged....")
                } else {
                    toast.error("problem in Password Chenged....")
                }
            }).catch(err => {
                console.log(err);
                toast.error("set Password Fail...")
            })
    }

    const handleSubmit = event => {
        event.preventDefault(); // 👈️ prevent page refresh
    }

    return (
        <div className=''>
            <ToastContainer />
            <div className='login d-flex align-items-center justify-content-center flex-column'>
                <div className={` containe ${isSignUp ? 'active' : ''}`}>
                    <div className="d-flex align-items-center justify-content-center text-center  form-container sign-up">
                        <form onSubmit={handleSubmit} className='d-flex align-items-center justify-content-center   signincon'>
                            <h1 className='fs-2'>Create Password</h1>
                            <span className='forget-text '>enter new password</span>
                            <input className='signin-password' onChange={(event) => { (event.target.value === "") ? setpass2("password is required") : (!event.target.value.match(/^(?=.*\d)/)) ? setpass("Password must contain at least one digit.") : (!event.target.value.match(/^(?=.*[a-zA-Z])/)) ? setpass("Password must contain at least one letter.") : (!event.target.value.match(/^.{5,}$/)) ? setpass("Password must be at least 5 characters long.") : setpass(""); setPassword(event.target.value); }} type="password" placeholder="Enter New Password" />
                            <small className='signin-input-message'>{pass}</small>
                            <input className='signin-password' onChange={(event) => { (event.target.value === "") ? setpass2("password is required") : (!event.target.value.match(/^(?=.*\d)/)) ? setpass2("Password must contain at least one digit.") : (!event.target.value.match(/^(?=.*[a-zA-Z])/)) ? setpass2("Password must contain at least one letter.") : (!event.target.value.match(/^.{5,}$/)) ? setpass2("Password must be at least 5 characters long.") : setpass2(""); setPassword2(event.target.value); }} type="password" placeholder="Verify Password" />
                            <small className='signin-input-message'>{pass2}</small>
                            {(pass === pass2 && password === password2) ? <Link to="/doctorlogin" onClick={() => { (password === password2) ? setnewpassword() : toast.error("Password must be same...") }}><button>Reset</button></Link> : <button onClick={() => { (password === "") ? setpass("enter new password") : setpass2("enter verify password") }} style={{ background: "var(--green-3)" }}>Reset</button>}
                        </form>
                    </div>
                    <div className=" d-flex text-center align-items-center justify-content-center form-container sign-in">
                        <form onSubmit={handleSubmit} className=' d-flex align-items-center justify-content-center signincon'>
                            <h1 className='fs-2'>Forget Password</h1>
                            <span className='forget-text mb-0'>enter your name email</span>
                            <input className='signin-password mt-0' onChange={(event) => { (event.target.value === "") ? setemail2("email is required") : (!event.target.value.match(/^[^\s@]+@gmail\.com$/)) ? setemail2("Invalid Email.") : setemail2(""); setEmail(event.target.value); }} type="email" placeholder="Email" />
                            <small className='signin-input-message'>{email2}</small>
                            {(email2 == "") ? <button onClick={() => forgetpassword(1)} style={{ display: otpVisible ? "none" : "block" }}>Send OTP</button> : <button style={{ background: "var(--green-3)", display: otpVisible ? "none" : "block" }} onClick={() => { (email === "") ? setemail2("email is required") : (!email.match(/^[^\s@]+@gmail\.com$/)) ? setemail2("Invalid Email.") : setemail2(" ") }}>Send OTP</button>}
                            <OTPInput className="ps-3 pt-2" style={{ display: otpVisible ? "block" : "none" }} value={OTP} onChange={setOTP} autoFocus OTPLength={4} otpType="number" disabled={false} inputStyles={{ padding: "1px" }} />
                            {(OTP.length == 4) ? <button onClick={verifyOTP} style={{ display: otpVisible ? "block" : "none" }}>Submit</button> : <button style={{ background: "var(--green-3)", display: otpVisible ? "block" : "none" }}>Submit</button>}
                            <ResendOTP className="me-4" style={{ display: otpVisible ? "block" : "none" }} onResendClick={() => forgetpassword(0)} />
                            <Link className="links" to="/doctorlogin">→ Back ←</Link>
                        </form>
                    </div>
                    <div className="toggle-container">
                        <div className="toggle">
                            <div className="toggle-panel toggle-left signincon">
                                <h1 className='fs-2'>Doctor Welcome Back!</h1>
                                <p>We received a request to reset your password after set new password</p>
                                <h2 className='fs-2'>→</h2>
                            </div>
                            <div className="toggle-panel toggle-right signincon">
                                <h1 className='fs-2'>Doctor Hello, Friend!</h1>
                                <p>Please use the email or name to log in and reset your password</p>
                                <h2 className='fs-2'>←</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}