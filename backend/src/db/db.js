const mongoose = require("mongoose")

async function connectDb(){
    try{
       await  mongoose.connect(process.env.MONGODB_URI)
        console.log("mongoDb is Connected")

    }
    catch(err){
        console.log("cannot connect with DB")
    }
}

module.exports = connectDb