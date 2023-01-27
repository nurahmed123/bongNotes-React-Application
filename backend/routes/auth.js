const { body, validationResult } = require('express-validator');
const FetchUser = require('../middleware/FetchUser')
const nodemailer = require('nodemailer');
const User = require("../models/User")
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const express = require("express");
const router = express.Router();

const JWT_SECRET = 'Harryisagoodb$oy';

//TODO: ROUTE 1: Create a User using: POST "/api/auth/createuser". No login required
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', "Please enter minimum 6 characters").isLength({ min: 6 })
], async (req, res) => {
    let success = false;
    let userExits = false;

    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    };

    // Check whether the user with this email exits already
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            userExits = true
            return res.status(400).json({ userExits, error: "Sorry user already exits with this same email" })
        }
        // Create a new user
        const salt = await bcrypt.genSaltSync(10);
        let securePassword = await bcrypt.hashSync(req.body.password, salt);
        user = await User.create({
            name: req.body.name,
            password: securePassword,
            email: req.body.email
        })
        // res.json({ message: "Your data has been successfully updated to your database", user })

        const data = {
            user: {
                id: user.id
            }
        }
        const verify_user = user.verify;
        const authToken = jwt.sign(data, JWT_SECRET);

        success = true;
        res.json({ success, message: "Your data has been successfully updated to your database", authToken, verify_user })
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error");
    }

})


//TODO: ROUTE 2: Authenticate a User using: POST "/api/auth/login". No login require

router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
    let success = false;

    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            success = false;
            return res.status(400).json({ success, error: "Please try to login with correct credentials" });
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            success = false;
            return res.status(400).json({ success, error: "Please try to login with correct credentials" });
        }

        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success, authToken })

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

//TODO: ROUTE 3: Get loggedin User Details using: POST "/api/auth/getuser". Login required
router.post('/getuser', FetchUser, async (req, res) => {

    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password")
        res.send(user)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

//TODO: ROUTE 3: Update loggedin User Details using: POST "/api/auth/updateuser". Login required
router.post('/updateuser', FetchUser, async (req, res) => {

    try {
        const { name, email, password, verify } = req.body;
        const newUserInfo = {};
        if (name) { newUserInfo.name = name };
        if (email) { newUserInfo.email = email };
        if (verify) { newUserInfo.verify = verify };
        // Create password hash
        const salt = await bcrypt.genSaltSync(10);
        let securePassword = await bcrypt.hashSync(password, salt);
        if (password) { newUserInfo.password = securePassword };

        // Find the user to be updated and update it
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password")
        if (!user) { return res.status(404).send("Not Found") }

        const updateUser = await User.findByIdAndUpdate(req.user.id, { $set: newUserInfo }, { new: true })
        res.json({ updateUser });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

//TODO: ROUTE 3:Delete user account using: delete "/api/auth/deleteaccount". Login required
router.delete('/deleteaccount/:id', FetchUser, async (req, res) => {
    try {
        let deleteAccount = await User.findById(req.params.id);
        if (!deleteAccount) { return res.status(404).send("Not Found") }

        deleteAccount = await User.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Account has been deleted", deleteAccount });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

//TODO: ROUTE 1: Sending emil to user
router.post('/sendemail', [
    body('email', 'Enter a valid email').isEmail()
], async (req, res) => {
    let mailSend = false;

    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            success = false;
            return res.status(400).json({ success, error: "Please try to login with correct credentials" });
        };
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: true,
            auth: {
                user: "06nurahmed@gmail.com",
                pass: "loveyoubrosis@123456789"
            }
        });
        /*
const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST, // mx.example.com
    port: process.env.MAIL_PORT, // 143
    secure: true,
    auth: {
        user: process.env.MAIL_ADDRESS,
        pass: process.env.MAIL_PWD
    }
})*/

const mailOptions = {
    from: "06nurahmed@gmail.com",
    to: email,
    subject: "Verify account",
    // text: "<h1>hello world</h1>"
    text: "hello "
}

transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
        console.log(error)
    } else {
        res.status(200).json({ mailSend, message: "Otp send successfully. Check your mail" })
        console.log(info.response)
    }
})

} catch (error) {
console.error(error.message);
res.status(500).send("Internal Server Error");
}
});
/*
router.post('/sendemail', [
    body('email', 'Enter a valid email').isEmail()
], async (req, res) => {
    let mailSend = false;

    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email } = req.body;
    try {

        // async..await is not allowed in global scope, must use a wrapper
        async function main() {
            // Generate test SMTP service account from ethereal.email
            // Only needed if you don't have a real mail account for testing
            let testAccount = await nodemailer.createTestAccount();

            // create reusable transporter object using the default SMTP transport
            let transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false, // true for 465, false for other ports
                auth: {
                    user: "06nurahmed@gmail.com",
                    pass: "loveyoubrosis@123456789"
                },
            });

            // send mail with defined transport object
            let info = await transporter.sendMail({
                from: '"Fred Foo 👻" <06nurahmed@gmail.com>', // sender address
                to: email, // list of receivers
                subject: "Hello ✔", // Subject line
                text: "Hello world?", // plain text body
                html: "<b>Hello world?</b>", // html body
            });

            if (info.messageId) {
                res.send("email sent");
            } else {
                res.send("Error with sending email");
            }

            console.log("Message sent: %s", info.messageId);
            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

            // Preview only available when sending through an Ethereal account
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        }

        main().catch(console.error);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});
*/
module.exports = router