const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrpyt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const fetchUser = require('../middleware/fetchUser')

const JWT_SECRET = "Deveshk237@123"

// Route 1:
// Create a user using post "/api/auth/createUser" : NO Login Required
router.post('/createUser', [body('name', 'Enter a valid name').isLength({ min: 3 }), body('email', 'Enter a valid email').isEmail(), body('password', 'Password must be atleast 8 characters').isLength({ min: 8, max: 16 })], async (req, res) => {
    

    // check whether the use  with this email exists already
    try {
        let user = await User.findOne({ email: req.body.email });

        if (user) {
            return res.status(400).json({ error: "Sorry the user with this email alreay exists!" })
        }

        const salt = await bcrpyt.genSalt(10);
        const securedPassword = await bcrpyt.hash(req.body.password, salt)

        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: securedPassword,
        })

        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);

        res.json({ authToken });
    } catch (error) {
        return res.status(500).send("Internal Server Error: Some error occured");
    }
}
)

// Route 2:
// Authenticate a user using Post Request "api/auth/login": NO LOgin Required
router.post('/login', [body('email', 'Enter a valid email').isEmail(), body('password', 'Password cannot be blank').exists()], async (req, res) => {
    // If there are errors, return Bad Request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ error: "Try to login with correct credentials" })
        }

        const passCompare = await bcrpyt.compare(password, user.password);
        if (!passCompare) {
            return res.status(400).json({ error: "Try to login with correct credentials" })
        }

        const payLoad = {
            user: {
                id: user.id
            }
        }

        const authToken = jwt.sign(payLoad, JWT_SECRET);
        res.json({ authToken });

    } catch (error) {
        return res.status(500).send("Internal Server Error: Some error occured");
    }
})

// Route 3:
// Get user Details who is logged in using POST: "api/auth/getuser" : Login Required
router.post('/getuser', fetchUser, async (req, res) => {
    
    try {
        userid = req.user.id;
        const user = await User.findById(userid).select("-password")
        res.send(user)

    } catch (error) {
        return res.status(500).send("Internal Server Error: Some error occured");
    }

})

module.exports = router
