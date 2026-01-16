const express = require("express")
const authRoutes = express.Router()
const controllers = require("../controller/auth.controller")



authRoutes.post("/register",controllers.registerUserController)
authRoutes.post('/login',controllers.loginUserController)
authRoutes.post("/logout",controllers.logoutUserController)


module.exports = authRoutes