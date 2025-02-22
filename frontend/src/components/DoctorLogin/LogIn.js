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

    const [email, setEmail] = useState("");
    let [msgemail, setmsgEmail] = useState(" ");
    const [password, setPassword] = useState("");
    let [msgpassword, setmsgPassword] = useState("  ");
    let [msgpassword2, setmsgPassword2] = useState("   ");
    const [doctorName, setdoctorName] = useState("");
    let [msgdoctorName, setmsgdoctorName] = useState("    ");
    const [contactNumber, setcontactNumber] = useState("");
    let [msgcontactNumber, setmsgcontactNumber] = useState("     ");
    const [registrationNumber, setregistrationNumber] = useState("");
    let [msgregistrationNumber, setmsgregistrationNumber] = useState("      ");

    const navigate = useNavigate();
    const signIn = () => {
        axios.post("http://localhost:3005/doctor/signin", { email, password })
            .then(response => {
                if (response.status === 200) {
                    localStorage.setItem("doctorId", response.data.doctor.id);
                    toast.success("Sign In Success....");
                    checkDoctorDetails();
                }
            }).catch(err => {
                console.log(err);
                toast.error("Invelid name password....");
            });
    }

    const checkDoctorDetails = () => {
        axios.post("http://localhost:3005/doctor/doctorProfile", { id: (localStorage.getItem("doctorId")) })
            .then(response => {
                if (response.status === 200) {
                    toast.info("doctor details are exist...");
                    navigate("/doctorDashboard");
                }
                console.log(response);
            }).catch(err => {
                console.log(err);
                toast.info("fill the doctor details...catch");
                navigate("/doctorvarication");
            });
    }

    const signUp = () => {
        axios.post("http://localhost:3005/doctor/signup", { email, password, doctorName, contactNumber, registrationNumber })
            .then(response => {
                if (response.status === 200) {
                    toast.success("Sign Up Success....");
                    toggleForm();
                }
            }).catch(err => {
                console.log(err);
                toast.error("Email is Already exist...");
            })
    }

    const handleSubmit = event => {
        console.log('handleSubmit ran');
        event.preventDefault(); // 👈️ prevent page refresh
    }

    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => {
            setUser(codeResponse);
            console.log(codeResponse);
            Userdata(codeResponse);
        },
        onError: (error) => console.log('Login Failed:', error),
    });

    const Userdata = (userData) => {
        if (userData) {
            axios
                .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${userData.access_token}`, {
                    headers: {
                        Authorization: `Bearer ${userData.access_token}`,
                        Accept: 'application/json'
                    }
                })
                .then((res) => {
                    const googleemail = document.getElementById('googleemail');
                    const googleemail2 = document.getElementById('googleemail2');
                    const googlename = document.getElementById('googlename');
                    googleemail.value = res.data.email;
                    googleemail2.value = res.data.email;
                    googlename.value = res.data.name;
                    setProfile(res.data);
                    console.log(res.data);
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
                            {/* <GoogleSign /> */}
                            {/* <div className="social-icons">
                                <div className="ms-2 me-2 icon-google"></div>
                                <div className="ms-2 me-2 icon-facebook"></div>
                                <div className="ms-2 me-2 icon-git"></div>
                                <div className="ms-2 me-2 icon-linkedin"></div>
                            </div> */}
                            <span>or use your email for registration</span>
                            <input className='signin-input' id="googlename" onChange={(event) => { (event.target.value === "") ? setmsgdoctorName("name is required") : (!event.target.value.match("^[a-z A-Z]+$")) ? setmsgdoctorName("name contains only charecters") : (!event.target.value.match("^[a-z A-Z]{2,20}$")) ? setmsgdoctorName("name must be at least 2 characters long.") : setmsgdoctorName(""); setdoctorName(event.target.value); }} type="text" placeholder="User Name" />
                            <small className='signin-input-message'>{msgdoctorName}</small>
                            <input className='signin-password' id="googleemail" onChange={(event) => { (event.target.value === "") ? setmsgEmail("email is required") : (!event.target.value.match(/^[^\s@]+@/)) ? setmsgEmail("Email must start with valid characters.") : (!event.target.value.match(/@gmail\.com$/)) ? setmsgEmail("Email must end with '@gmail.com'.") : setmsgEmail(""); setEmail(event.target.value); }} type="email" placeholder="Email" />
                            <small className='signin-input-message'>{msgemail}</small>
                            <input className='signin-password' onChange={(event) => { (event.target.value === "") ? setmsgPassword("password is required") : (!event.target.value.match(/^(?=.*\d)/)) ? setmsgPassword("Password must contain at least one digit.") : (!event.target.value.match(/^(?=.*[a-zA-Z])/)) ? setmsgPassword("Password must contain at least one letter.") : (!event.target.value.match(/^.{5,}$/)) ? setmsgPassword("Password must be at least 5 characters long.") : setmsgPassword(""); setPassword(event.target.value); }} type="password" placeholder="Password" />
                            <small className='signin-input-message'>{msgpassword}</small>
                            <input className='signin-password' onChange={(event) => { (event.target.value === "") ? setmsgcontactNumber("number is required") : (!event.target.value.match(/^[0-9]+$/)) ? setmsgcontactNumber("Number must contain only digits.") : (!event.target.value.match(/^\d{10}$/)) ? setmsgcontactNumber("Number must only 10 digits.") : setmsgcontactNumber(""); setcontactNumber(event.target.value); }} type="tel" placeholder="Contact Number" />
                            <small className='signin-input-message'>{msgcontactNumber}</small>
                            <input className='signin-password' onChange={(event) => { (event.target.value === "") ? setmsgregistrationNumber("registration number is required") : (!event.target.value.match(/^[0-9]+$/)) ? setmsgregistrationNumber("registration number must contain only digits.") : setmsgregistrationNumber(""); setregistrationNumber(event.target.value); }} type="tel" placeholder="Registration Number" />
                            <small className='signin-input-message'>{msgregistrationNumber}</small>
                            {(msgdoctorName === msgemail && msgemail === msgpassword && msgpassword === msgcontactNumber && msgcontactNumber === msgregistrationNumber) ? <button onClick={signUp}>Sign Up</button> : <button onClick={() => toast.error("please fill the all information")} style={{ background: "var(--green-3)" }}>Sign Up</button>}
                            <div className="googleloginicon mt-3" onClick={login}></div>
                        </form>
                    </div>
                    <div className="form-container sign-in ">
                        <form onSubmit={handleSubmit} className='signincon  '>
                            <h1 className='fs-2 '>Sign In</h1>
                            {/* <div className="social-icons">
                                <div className="ms-2 me-2 icon-google"></div>
                                <div className="ms-2 me-2 icon-facebook"></div>
                                <div className="ms-2 me-2 icon-git"></div>
                                <div className="ms-2 me-2 icon-linkedin"></div>
                            </div> */}
                            <span>or use your email password</span>
                            <input className='signin-password' id="googleemail2" onChange={(event) => { (event.target.value === "") ? setmsgEmail("email is required") : (!event.target.value.match(/^[^\s@]+@gmail\.com$/)) ? setmsgEmail("Invalid Email.") : setmsgEmail(""); setEmail(event.target.value); }} type="email" placeholder="Email" />
                            <small className='signin-input-message'>{msgemail}</small>
                            <input className='signin-password' onChange={(event) => { (event.target.value === "") ? setmsgPassword2("password is required") : setmsgPassword2(""); setPassword(event.target.value); }} type="password" placeholder="Password" />
                            <small className='signin-input-message'>{msgpassword2}</small>
                            <Link className="ml-3 links " to="/doctorforgetpassword">→ Forget Your Password? ←</Link>
                            {(msgemail === msgpassword2) ? <button onClick={signIn}>Sign In</button> : <button onClick={() => toast.error("please fill the all information")} style={{ background: "var(--green-3)" }}>Sign In</button>}
                            <div className="googleloginicon mt-3" onClick={login}></div>
                        </form>
                    </div>
                    <div className="toggle-container">
                        <div className="toggle">
                            <div className="toggle-panel toggle-left signincon">
                                <h1 className='fs-2'>Welcome Back!</h1>
                                <h1 className='fs-3'>Doctor SignUp</h1>
                                <p>Enter your personal details to use all of site features</p>
                                <button className={`hidden ${isSignUp ? '' : 'visible'}`} onClick={toggleForm}>Sign In</button>
                            </div>
                            <div className="toggle-panel toggle-right signincon">
                                <h1 className='fs-2'>Hello, Friend!</h1>
                                <h1 className='fs-3'>Doctor SignIn</h1>
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