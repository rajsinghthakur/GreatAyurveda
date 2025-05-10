import { validationResult } from "express-validator";
import User from "../model/user.model.js";
import jwt from "jsonwebtoken";

// sed mail with OTP start =================================================================

import nodemailer from 'nodemailer';

// Function to generate a random OTP
let OTP;
const generateOTP = () => {
    const otpLength = 4; // Length of the OTP
    const digits = '0123456789'; // Possible digits in the OTP
    OTP = '';
    for (let i = 0; i < otpLength; i++) {
        OTP += digits[Math.floor(Math.random() * 10)]; // Randomly select a digit
    }
    return OTP;
};

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: 'thegreatayurveda@gmail.com', pass: 'mscy bdjt dttl plbj' }
});

const sendOTP = (receverMail) => {
    const otp = generateOTP(); // Generate OTP
    const mailOptions = {
        from: 'thegreatayurveda@gmail.com',
        to: `${receverMail}`,
        subject: 'Your OTP for The Great Ayurveda',
        text: `Your OTP is: ${otp}` // Include OTP in the email body
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log('Error sending email:', error);
        } else {
            console.log('Email sent successfully...');
        }
    });
};

// sed mail with OTP end =================================================================

export const SignUp = (request, response, next) => {
    console.log(request.body);
    
    const errors = validationResult(request);
    if (!errors.isEmpty())
        return response.status(401).json({ error: errors.array() });

    User.create({
        name: request.body.name,
        email: request.body.email,
        password: request.body.password,
        // contactNumber: request.body.contactNumber
    })
        .then((result) => {
            return response.status(200).json({ data: result.dataValues, message: "User created..." });
        })
        .catch((err) => {
            return response.status(500).json({ error: "Internal server error...", err });
        })
}

export const signIn = async (request, response, next) => {
    const errors = validationResult(request);
    if (!errors.isEmpty())
        return response.status(401).json({ error: errors.array() });

    let email = request.body.email;
    let password = request.body.password;

    let user = await User.findOne({ where: { email: email }, raw: true });
    console.log(user);
    
    if (user) {
        if (User.checkPassword(password, user.password)) {
            let payload = { subject: email };
            let token = jwt.sign(payload, 'fdfjfjrwieroerivxcnmvnnvrweiorddfsdfdlkfjlfjljlraj', { expiresIn: '1h' });
            return response.status(200).json({ message: "Sign In Success", user, token: token });
        } else {
            return response.status(401).json({ error: "Unauthorized user" });
        }
    }
    else
        return response.status(401).json({ error: "Unauthorized user" });

}

export const forgotpassword = (request, response, next) => {
    const errors = validationResult(request);
    if (!errors.isEmpty())
        return response.status(401).json({ error: errors.array() });

    User.findOne({ where: { email: request.body.email } })
        .then((result) => {
            if (result) {
                sendOTP(request.body.email);
                return response.status(200).json({ message: 'User exist....', Message: 'Email sent successfully...' });
            }
            else {
                return response.status(401).json({ message: 'unauthorized request....' })
            }
        })
        .catch((err) => {
            return response.status(500).json({ error: 'internal server error....', err })
        })
}

export const verifyOTP = (request, response, next) => {
    let otp = request.body.OTP;
    if (otp == OTP) {
        return response.status(200).json({ message: 'OTP Verification Successfuly....' })
    }
    else {
        return response.status(401).json({ message: 'OTP Verification failed....' })
    }
}

export const setnewpassword = (request, response, next) => {
    const errors = validationResult(request);
    if (!errors.isEmpty())
        return response.status(401).json({ error: errors.array() });

    User.update({
        password: request.body.password,
    }, {
        where: {
            email: request.body.email
        }, raw: true
    })
        .then((result) => {
            if (result[0])
                return response.status(200).json({ message: 'password updated....' })
            return response.status(401).json({ message: 'unauthorized request....' })
        })
        .catch((err) => {
            return response.status(500).json({ error: 'internal server error....', err })
        })
}

export const updatepassword = async (request, response, next) => {
    const errors = validationResult(request);
    if (!errors.isEmpty())
        return response.status(401).json({ error: errors.array() });


    let password = request.body.oldpassword;
    let id = request.body.id;
    let user = await User.findOne({ where: { id: id }, raw: true });
    if (User.checkPassword(password, user.password)) {
        User.update({ password: request.body.newpassword, },
            { where: { id: id }, raw: true })
            .then((result) => {
                if (result[0])
                    return response.status(200).json({ message: 'Password Updated....' })
                return response.status(401).json({ message: "Old password dos't Match...." })
            })
            .catch((err) => {
                console.log(err);
                return response.status(500).json({ error: 'internal server error....', err })
            })
    } else {
        return response.status(401).json({ message: "Old password dos't Match...." })
    }
}

export const update = (request, response, next) => {
    const errors = validationResult(request);
    if (!errors.isEmpty())
        return response.status(401).json({ error: errors.array() });
    User.update(
        {
            name: request.body.name,
            email: request.body.email,
            contactNumber: request.body.contactNumber,
            gender: request.body.gender
        },
        { where: { id: request.body.id }, raw: true })
        .then((result) => {
            if (result[0])
                return response.status(200).json({ message: 'user updated....' })
            return response.status(401).json({ message: 'unauthorized request....' })
        })
        .catch((err) => {
            return response.status(500).json({ error: 'internal server error....', err })
        })
}

export const updateAddress = (request, response, next) => {
    const errors = validationResult(request);
    if (!errors.isEmpty())
        return response.status(401).json({ error: errors.array() });
    User.update(
        {
            state: request.body.state,
            city: request.body.city,
            address: request.body.address,
            pincode: request.body.pincode
        },
        { where: { id: request.body.id }, raw: true })
        .then((result) => {
            if (result[0])
                return response.status(200).json({ message: 'user updated....' })
            return response.status(401).json({ message: 'unauthorized request....' })
        })
        .catch((err) => {
            return response.status(500).json({ error: 'internal server error....', err })
        })
}

export const listbyemail = (request, response, next) => {
    const errors = validationResult(request);
    if (!errors.isEmpty())
        return response.status(401).json({ error: errors.array() });

    User.findOne({
        where: { email: request.body.email }, raw: true
    })
        .then((result) => {
            if (result)
                return response.status(200).json({ data: result });
            return response.status(401).json({ message: 'unauthorized request' });
        })
        .catch((err) => {
            return response.status(500).json({ error: 'internal server err.....', err })
        })
}

export const Viewuserbyid = (request, response, next) => {
    const errors = validationResult(request);
    if (!errors.isEmpty())
        return response.status(401).json({ error: errors.array() });

    User.findOne({
        where: { id: request.body.id }, raw: true
    })
        .then((result) => {
            if (result)
                return response.status(200).json({ data: result });
            return response.status(401).json({ message: 'unauthorized request' });
        })
        .catch((err) => {
            return response.status(500).json({ error: 'internal server err.....', err })
        })
}

export const list = (request, response, next) => {
    User.findAll({ raw: true })
        .then((result) => {
            return response.status(200).json({ data: result });
        })
        .catch((err) => {
            return response.status(500).json({ error: "Internal server error...", err });
        })
}

// export const remove = (request, response, next) => {
//     const errors = validationResult(request);
//     if (!errors.isEmpty())
//         return response.status(401).json({ error: errors.array() });

//     User.destroy({ where: { email: request.body.email }, raw: true7 })
//         .then((result) => {
//             if (result)
//                 return response.status(200).json({ message: 'user deleted....' })
//             return response.status(401).json({ message: 'unauthorized request....' })
//         })
//         .catch((err) => {
//             return response.status(500).json({ error: "Internal server error.....", err })
//         })
// }