
import { useLocation, useNavigate } from "react-router-dom"
import React, {useState } from 'react'
import axios from "axios";
import { BsCurrencyRupee } from "react-icons/bs";
import { ToastContainer, toast } from "react-toastify";

let userId = localStorage.getItem("userId")

function Checkout() {
    const navigate = useNavigate();
    const location = useLocation();
    const {cartItemList, totalBillAmount } = location.state;

    const [FullName, setFullName] = useState("");
    const [FullName2, setFullName2] = useState("");

    const [State, setState] = useState("");
    const [State1, setState1] = useState("");

    const [City, setCity] = useState("");
    const [City2, setCity2] = useState("");

    const [UserContact, setContact] = useState("");
    const [UserContact2, setContact2] = useState("");

    const [Address, setAddress] = useState("");
    const [Address2, setAddress2] = useState("");

    const [Pincode, setPincode] = useState("");
    const [Pincode2, setPincode2] = useState("");

    const PlaceOrder = async (amount) => {

        if ((FullName === "") && (State === "") && (City === "") && (UserContact === "") && (Address === "") && (Pincode === "") || ((FullName === "" || (State === "") || (City === "") || (UserContact === "") || (Address === "") || (Pincode === "")))) {
            toast.error("First Fill information")
        }
        else {

            try {
                // Fetching payment key
                const { data: { key } } = await axios.get("http://localhost:3005/payment/getkey");

                // Initiating payment checkout
                const { data: { order } } = await axios.post("http://localhost:3005/payment/checkout", {
                    amount
                });

                const options = {
                    key,
                    amount: order.amount,
                    currency: "INR",
                    name: "The Great Ayurveda APP",
                    description: "Tutorial of RazorPay",
                    image: "./images/2.png",
                    order_id: order.id,
                    callback_url: "http://localhost:3005/payment/paymentverification",
                    prefill: {
                        // name: user.name,
                        // email: user.email,
                        // contact: user.contact
                    },
                    notes: {
                        "address": "Razorpay Corporate Office"
                    },
                    theme: {
                        "color": "blue"
                    },
                    handler: async function (response) {
                        try {
                            // Verify payment status
                            console.log(response);
                            const paymentVerificationResponse = await axios.post("http://localhost:3005/payment/paymentverification", {
                                razorpay_order_id: order.id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature,
                                amount: amount
                            });

                            if (paymentVerificationResponse.data.success) {
                                // Payment verified, now call placeOrder API
                                const myOrder = await axios.post("http://localhost:3005/order/placeOrder", {
                                    FullName, State, City, UserContact, Address, Pincode, userId })
                                    .then(response=>{
                                        // toast.success("saved information")
                                        window.alert("order successfully...");
                                        navigate("/");
                                    }).catch(error=>{
                                        toast.error("error");
                                    })   
                                console.log("PlaceOrder API response:", myOrder.data);
                            } else {
                                // Payment verification failed
                                console.error("Payment verification failed:", paymentVerificationResponse.data.error);
                            }
                        } catch (error) {
                            console.error("Error during payment verification:", error);
                        };
                    }
                }
                // Creating and opening Razorpay instance
                const razor = new window.Razorpay(options);
                razor.open();
            } catch (error) {
                console.error("Error during payment checkout:", error);
                // Handle errors gracefully (e.g., display error message to the user)
            }

        }
    }


    return <>
        <ToastContainer />
        <section className='container-fluid  p-4'>
            <section className='container p-2 justify-content-center row align-content-around m-auto d-flex' id='checkout-page' >
                <div id='checkout-left' className='col-md-7 me-3 border' style={{ height: "390px" }} >
                    <div className=' text-white p-2  d-flex justify-content-center align-items-center mt-2  rounded' style={{ background: "var(--green)" }}>
                        <h6 style={{ fontSize: "19px" }}>Account & Shipping Details</h6>
                    </div>

                    <div className='row form-group p-2' style={{ height: "320px" }}>
                        <div className='col-md-6 mt-2'>
                            <label>Full Name*</label><br />
                            <input type='text' onChange={(event) => { (event.target.value === "") ? setFullName2("name is required") : (!event.target.value.match("^[a-z A-Z]+$")) ? setFullName2("name contains only charecters") : (!event.target.value.match("^[a-z A-Z]{2,30}$")) ? setFullName2("name must be at least 2 characters long.") : setFullName2(""); setFullName(event.target.value); }} className='form-control' placeholder="Enter your name" required />
                            <small className="text-danger" style={{ fontSize: "12px" }}>{FullName2}</small>
                        </div>
                        <div className='col-md-6 mt-2'>
                            <label htmlFor="city" placeholder="Select State">State *</label>
                            <select className="form-control" onChange={(event) => setState(event.target.value)} defaultValue="Choose..." >
                                <small className="text-danger" style={{ fontSize: "12px" }}>{State1}</small>
                                <option>Select State</option>
                                <option>Andhra Pradesh</option>
                                <option>Assam</option>
                                <option>Bihar</option>
                                <option>Chhattisgarh</option>
                                <option>Goa</option>
                                <option>Gujarat</option>
                                <option>Haryana</option>
                                <option>Himachal Pradesh</option>
                                <option>Jharkhand</option>
                                <option>Karnataka</option>
                                <option>Kerala</option>
                                <option>Madhya Pradesh</option>
                                <option>Manipur</option>
                                <option>Meghalaya</option>
                                <option>Mizoram</option>
                                <option>Nagaland</option>
                                <option>Odisha</option>
                                <option>Rajasthan</option>
                                <option>Sikkim</option>
                                <option>Telangana</option>
                                <option>Tamil Nadu</option>
                                <option>Tripura</option>
                                <option>Uttar Pradesh</option>
                                <option>Uttarakhand</option>
                                <option>West Bengal</option>
                                <option>Arunachal Pradesh</option>
                            </select>
                        </div>
                    
                        <div className='col-md-6 mt-3'>
                            <label>City*</label><br />
                            <input type='text' onChange={(event) => { (event.target.value === "") ? setCity2("City is required") : (!event.target.value.match("^[a-z A-Z]+$")) ? setCity2("City contains only charecters") : (!event.target.value.match("^[a-z A-Z]{1,30}$")) ? setCity2("City must be at least 2 characters long.") : setCity2(""); setCity(event.target.value) }} className='form-control' placeholder="Enter City" required />
                            <small className="text-danger" style={{ fontSize: "12px" }}>{City2}</small>
                        </div>

                        <div className='col-md-6 mt-3'>
                            <label>Phone Number*</label><br />
                            <input type='tel' onChange={(event) => { (event.target.value === "") ? setContact2("number is required") : (!event.target.value.match(/^[0-9]+$/)) ? setContact2("Number must contain only digits.") : (!event.target.value.match(/^\d{10}$/)) ? setContact2("Number must only 10 digits.") : setContact2(""); setContact(event.target.value) }} className='form-control' placeholder="Mobile Number" required />
                            <small className="text-danger" style={{ fontSize: "12px" }}>{UserContact2}</small>
                        </div>
                        <div className='col-md-6 mt-3'>
                            <label>Street Address*</label><br />
                            <input type='text' onChange={(event) => { (event.target.value === "") ? setAddress2("Address is required") : (!event.target.value.match("^[a-z A-Z 0-9/().]+$")) ? setAddress2("Invalid Address") : (!event.target.value.match("^[a-z A-Z 0-9/().]{1,100}$")) ? setAddress2("Invalid Address") : setAddress2(""); setAddress(event.target.value) }} className='form-control' placeholder="Address" required />
                            <small className="text-danger" style={{ fontSize: "12px" }}>{Address2}</small>
                        </div>
                        <div className='col-md-6 mt-3'>
                            <label>Pincode*</label><br />
                            <input type='tel' onChange={(event) => { (event.target.value === "") ? setPincode2("Pincode is required") : (!event.target.value.match(/^[0-9]+$/)) ? setPincode2("Pincode must contain only digits.") : (!event.target.value.match(/^\d{6}$/)) ? setPincode2("Pincode must only 6 digits.") : setPincode2(""); setPincode(event.target.value) }} className='form-control' placeholder="Pincode" required />
                            <small className="text-danger" style={{ fontSize: "12px" }}>{Pincode2}</small>
                        </div>
                        <div className='col-md-12 mt-3'>
                            <button className='btn  mt-2 text-white' style={{ background: "var(--green)" }} onClick={() => PlaceOrder(totalBillAmount)}>Proceed to Pay</button>
                        </div>
                    </div>
                </div>
                <div id='checkout-right' className='border col-md-4'>
                    <div className='text-white rounded mt-2 container d-flex justify-content-center align-items-center p-2' style={{ background: "var(--green)" }}>
                        <h6 style={{ fontSize: "19px" }}>Cart Details</h6>
                    </div>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th >Product</th>
                                <th>Qantity</th>
                                <th style={{ display: "block", marginLeft: "15px" }}>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItemList?.map((product, index) => <tr key={index}>
                                <td>{product["products.title"]}</td>
                                <td className="text-center" >{product["products.cartItem.quantity"]}</td>
                                <td className="text-center " style={{ width: "80px" }}><BsCurrencyRupee />{product["products.cartItem.quantity"] * (product["products.price"])}</td>
                            </tr>)}
                        </tbody>
                        <hr />
                        <tfoot>
                            <tr>
                                <th>Total</th>
                                <td></td>
                                <th>{(totalBillAmount).toFixed(2)}</th>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </section>
        </section>
    </>
}

export default Checkout;