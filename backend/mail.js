import nodemailer from 'nodemailer';

// Function to generate a random OTP
const generateOTP = () => {
    const otpLength = 4; // Length of the OTP
    const digits = '0123456789'; // Possible digits in the OTP
    let otp = '';
    for (let i = 0; i < otpLength; i++) {
        otp += digits[Math.floor(Math.random() * 10)]; // Randomly select a digit
    }
    return otp;
};

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: 'thegreatayurveda@gmail.com', pass: 'mscy bdjt dttl plbj' }
});

const sendOTP = () => {
    const otp = generateOTP(); // Generate OTP
    const mailOptions = {
        from: 'thegreatayurveda@gmail.com',
        to: "rajthakur8827142011@gmail.com",
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

sendOTP();
