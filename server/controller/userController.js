const AuthModel = require("../models/AuthModel")
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const Cookies = require('js-cookie')

const userLogin = async (req, res) => {
    try {
        /* Validation */
        let { email, password } = req.body
        if (!email) {
            return res.status(400).json({ message: "Email is required", success: false })
        }
        if (!password) {
            return res.status(400).json({ message: "Password is required", success: false })
        }

        /* Business Logic */
        let checkIfUserExists = await AuthModel.findOne({ email: email })
        if (!checkIfUserExists) {
            return res.status(400).json({ message: "Email not found", success: false })
        }
        let checkPassword = await bcrypt.compare(password, checkIfUserExists.password);
        if (!checkPassword) {
            return res.status(400).json({ message: "Password is Incorrect", success: false })
        }

        /* Generate JWT if user credentials are correct */
        let token = jwt.sign({ userId: checkIfUserExists._id, userName: checkIfUserExists.name }, process.env.SECRET, { expiresIn: "24h" })
        res.cookie('token', token, {
            sameSite: 'none',
            secure: true,
            domain: 'vercel.app'
        })
        res.cookie('name', checkIfUserExists.name, {
            sameSite: 'none',
            secure: true,
            domain: 'vercel.app'
        })
        res.cookie('id', checkIfUserExists._id, {
            sameSite: 'none',
            secure: true,
            domain: 'vercel.app'
        })

        return res.status(200).json({ success: true, message: "User Logged in Successful" })

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}
const userRegister = async (req, res) => {
    try {
        /* Validation */
        let { email, password, name } = req.body
        if (!email) {
            return res.status(400).json({ message: "Email is required", success: false })
        }
        if (!password) {
            return res.status(400).json({ message: "Password is required", success: false })
        }
        if (!name) {
            return res.status(400).json({ message: "Name is required", success: false })
        }
        /* Business Logic */
        let checkUserExists = await AuthModel.findOne({ email: email })
        if (checkUserExists) return res.status(200).json({ status: false, message: "User already present! Please Login" })

        let hashedPassword = await bcrypt.hash(password, 5)
        let createUser = await AuthModel.create({ email, name, password: hashedPassword })
        return res.status(201).json({ message: "User Registered Successfully", success: true })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })

    }
}

module.exports = { userLogin, userRegister }
