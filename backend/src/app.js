const express = require("express")
const cookieParser = require("cookie-parser")
const authRoutes = require("../src/routes/auth.routes")

const cors = require("cors")

const app = express()

//CORS Middleware
app.use(cors({
    origin: ["http://127.0.0.1:3000", "http://127.0.0.1:3001","https://test2.apmoa.org.pk/"],
    methods: ["GET","POST","PUT","DELETE"],
    credentials: true,
}))






//Using middle ware 
app.use(express.json())
app.use(cookieParser())

//Auth Routes 

app.use("/api/auth",authRoutes)



module.exports = app