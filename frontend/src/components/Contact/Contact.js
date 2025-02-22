import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './Contact.css'
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';



const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });
    const [successMessage, setSuccessMessage] = useState('');
    const [failureMessage, setFailureMessage] = useState('');
    const [errors, setErrors] = useState({});
    const [showModal, setShowModal] = useState(false);


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

        // Clear previous errors for the field
        setErrors({
            ...errors,
            [e.target.name]: ''
        });
    };

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     const validationErrors = validateFormData(formData);

    //     if (Object.keys(validationErrors).length > 0) {
    //         setErrors(validationErrors);
    //         return;
    //     }

    //     // Here you can add code to send the form data to your backend using AJAX
    //     console.log('Form Data:', formData);
    //     // For demonstration purpose, just showing success message
    //     setSuccessMessage('Message sent successfully!');
    //     setFormData({
    //         name: '',
    //         email: '',
    //         phone: '',
    //         subject: '',
    //         message: ''
    //     });

    //     // Show success message popup
    //     setShowModal(true);
    // };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validateFormData(formData);
    
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        console.log(formData)
        // Send the form data to the backend API
        axios.post('http://localhost:3005/contact/addcontact', {formData})
            .then(response => {
                console.log('Response:', response.data);
                // Set success message and clear form data
                setSuccessMessage('Message sent successfully!');
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    subject: '',
                    message: ''
                });
                // Show success message popup
                setShowModal(true);
            })
            .catch(error => {
                console.error('Error:', error);
                // Set failure message if request fails
                setFailureMessage('Failed to send message. Please try again later.');
            });
    };
    
    const validateFormData = (data) => {
        const errors = {};
        if (!data.name.trim()) {
            errors.name = 'Name is required';
        }
        if (!data.email.trim()) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(data.email)) {
            errors.email = 'Invalid email address';
        }
        if (!data.phone.trim()) {
            errors.phone = 'Phone number is required';
        } else if (!/^\d{10}$/.test(data.phone)) {
            errors.phone = 'Invalid phone number';
        }
        if (!data.subject.trim()) {
            errors.subject = 'Subject is required';
        }
        if (!data.message.trim()) {
            errors.message = 'Message is required';
        }
        return errors;
    };


   

    return (
        <>
          
            <section className="contact" style={{ width: "99vw" }}>
                <div className="contact-img">
                    <div className="contact-img-main"></div>
                </div>
                <div className="text-overlay">
                    <h1>Contact Us Today!</h1>
                    <h2>Let's get fit and healthy together</h2>
                </div>
                <div className="container mt-4">
                    <div className='row'>
                        <div className="col-md-6">
                            <h2>Make An Enquiry</h2>
                            <p>Hi please feel to contact us if you have any queries to us</p>
                            <div className="contact-form mt-4">
                                <form>
                                    <div className="form-group">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="name">Name<span> *</span></label>
                                                    <input type="text" className="form-control form-control-sm custom-input custom-input mb-3" id="name" name="name" value={formData.name} onChange={handleChange} required />
                                                    {errors.name && <div className="text-danger">{errors.name}</div>}
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="email">Email<span> *</span></label>
                                                    <input type="email" className="form-control form-control-sm custom-input custom-input mb-3" id="email" name="email" value={formData.email} onChange={handleChange} required />
                                                    {errors.email && <div className="text-danger">{errors.email}</div>}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="Phone">Phone<span> *</span></label>
                                                    <input type="tel" className="form-control form-control-sm custom-input mb-3" id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
                                                    {errors.phone && <div className="text-danger">{errors.phone}</div>}
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="subject">Subject<span> *</span></label>
                                                    <input type="text" className="form-control form-control-sm custom-input mb-3" id="subject" name="subject" value={formData.subject} onChange={handleChange} required />
                                                    {errors.subject && <div className="text-danger">{errors.subject}</div>}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <label htmlFor="message">Message<span> *</span></label>
                                                    <textarea className="form-control form-control-sm custom-input mb-5" id="message" name="message" rows="4" value={formData.message} onChange={handleChange} required></textarea>
                                                    {errors.message && <div className="text-danger">{errors.message}</div>}
                                                </div>
                                            </div>
                                        </div>
                                        <button    type="submit" className="btn btn custom-button mb-3">Send Query</button>
                                    </div>
                                </form>
                                {failureMessage && <div style={{ color: 'red' }}>{failureMessage}</div>}
                            </div>
                        </div>
                        <div className='col-md-4 ms-1'>
                            <h2>For Quick Enquiry</h2>
                            <p>We are happy to serve you at any time.....</p>
                            <div className='quick-enquiry'>
                                <div className='container'>
                                    <div className='row'>
                                        <div className='col-md-4 mt-4'>
                                            <div className="support"></div>
                                        </div>
                                        <div className='col-md-8 mt-4 contactNo'>
                                            <p>+91 9109817209 , +91 7489896419, +91  8827142011</p>
                                        </div>
                                        <div className='row'>
                                            <div className='col-md-12 ms-4 mt-4'></div>
                                            <p >OUR ADDRESS<br></br>
                                                Old Rajmohalla, Raj Mohalla South, Raj Mohalla, Indore, Madhya Pradesh 452002</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <br></br>
          
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title className='text-success'>Success!</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    Message sent successfully!
                </Modal.Body>
                <Modal.Footer>

                </Modal.Footer>
            </Modal>

        </>
    );
}

export default Contact;

