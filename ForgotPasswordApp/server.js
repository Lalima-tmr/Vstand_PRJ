require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();
app.use(cors());
app.use(bodyParser.json());

let otpStorage = {};
let userStorage = {};

// userStorage['1bo20is015.lalimakumari@brindavancollege.com'] = { password: 'oldPassword' };

app.post('/register', async (req, res) => {
    const { email, password } = req.body;

    if (userStorage[email]) {
        return res.status(400).send('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    userStorage[email] = { password: hashedPassword };
    res.status(200).send('User registered successfully');
});

// Generate and Send OTP
app.post('/generate-otp', (req, res) => {
    const email = req.body.email;
    const otp = Math.floor(100000 + Math.random() * 900000);
    otpStorage[email] = { otp, expires: Date.now() + 300000 };

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP code is: ${otp}`
    };

    transporter.sendMail(mailOptions, (error) => {
        if (error) {
            console.log('Failed to send OTP email:', error);
            return res.status(500).send('Error sending OTP');
        }
        res.status(200).send('OTP sent successfully');
    });
});

// Verify OTP
app.post('/verify-otp', (req, res) => {
    const { email, enteredOtp } = req.body;
    const storedOtp = otpStorage[email];

    if (storedOtp && storedOtp.otp == enteredOtp && storedOtp.expires > Date.now()) {
        delete otpStorage[email];
        res.status(200).send('OTP verified');
    } else {
        res.status(400).send('Invalid or expired OTP');
    }
});

// Reset Password
app.post('/reset-password', async (req, res) => {
    const { email, newPassword } = req.body;

    if (userStorage[email]) {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        userStorage[email].password = hashedPassword; 
        res.status(200).send('Password reset successfully');
    } else {
        res.status(404).send('User not found');
    }
});

app.use((req, res, next) => {
    console.log(`${req.method} request for '${req.url}'`);
    next();
});

app.listen(3000, () => console.log('Server started on port 3000'));


//==========================================================================================================================


// require('dotenv').config();
// const express = require('express');
// const nodemailer = require('nodemailer');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const bcrypt = require('bcrypt');
// const rateLimit = require('express-rate-limit'); 

// const app = express();
// app.use(cors());
// app.use(bodyParser.json());

// let otpStorage = {}; 
// let userStorage = {}; 


// const otpRateLimiter = rateLimit({
//     windowMs: 15 * 60 * 1000, 
//     max: 5, 
//     message: { message: 'Too many OTP requests, please try again later.' }
// });

// app.post('/register', async (req, res) => {
//     const { email, password } = req.body;

//     if (userStorage[email]) {
//         return res.status(400).json({ message: 'User already exists' });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     userStorage[email] = { password: hashedPassword };
//     res.status(200).json({ message: 'User registered successfully' });
// });


// app.post('/generate-otp', otpRateLimiter, (req, res) => {
//     const email = req.body.email;
//     const otp = Math.floor(100000 + Math.random() * 900000);
//     otpStorage[email] = { otp, expires: Date.now() + 300000 }; 

//     const transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//             user: process.env.EMAIL_USER,
//             pass: process.env.EMAIL_PASS
//         }
//     });

//     const mailOptions = {
//         from: process.env.EMAIL_USER,
//         to: email,
//         subject: 'Your OTP Code',
//         text: `Your OTP code is: ${otp}`
//     };

//     transporter.sendMail(mailOptions, (error) => {
//         if (error) {
//             console.log('Failed to send OTP email:', error);
//             return res.status(500).json({ message: 'Error sending OTP' });
//         }
//         res.status(200).json({ message: 'OTP sent successfully' });
//     });
// });

// // Verify OTP
// app.post('/verify-otp', (req, res) => {
//     const { email, enteredOtp } = req.body;
//     const storedOtp = otpStorage[email];

//     if (storedOtp && storedOtp.otp == enteredOtp && storedOtp.expires > Date.now()) {
//         delete otpStorage[email];
//         res.status(200).json({ message: 'OTP verified' });
//     } else {
//         res.status(400).json({ message: 'Invalid or expired OTP' });
//     }
// });

// // Reset Password
// app.post('/reset-password', async (req, res) => {
//     const { email, newPassword } = req.body;

//     if (userStorage[email]) {
//         const hashedPassword = await bcrypt.hash(newPassword, 10);
//         userStorage[email].password = hashedPassword; 
//         res.status(200).json({ message: 'Password reset successfully' });
//     } else {
//         res.status(404).json({ message: 'User not found' });
//     }
// });

// // Logging middleware
// app.use((req, res, next) => {
//     console.log(`${req.method} request for '${req.url}'`);
//     next();
// });

// app.listen(3000, () => console.log('Server started on port 3000'));
