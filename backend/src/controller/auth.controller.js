// register user , login user , logout user 


const userModel = require("../model/auth.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")



async function registerUserController(req, res) {
    const { userName, password } = req.body
    const isUser = await userModel.findOne({ userName })
    if (isUser) {
        return res.status(401).json({
            message: "user already exist"
        })
    }
    const hashPassword = await bcrypt.hash(password, 10)
    const user = await userModel.create({
        userName,
        password: hashPassword
    })
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
    res.cookie("token", token)
    res.status(200).json({
        message: "user Created Successfully",
        user: userName
    })
}

async function loginUserController(req, res) {
    const { userName, password } = req.body
    const user = await userModel.findOne({ userName })
    if (!user) {
        return res.status(400).json({
            message: "Invalid UserName"
        })
    }
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
        return res.status(400).json({
            message: "Invalid Password "
        })
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
    res.cookie("token", token)
    res.status(200).json({
        message: "User Login Successfully "
    })
}

function logoutUserController(req, res) {
    res.clearCookie("token");
    res.status(200).json({ message: "Logged out" });
}

module.exports = {
    registerUserController,
    loginUserController,
    logoutUserController
}

