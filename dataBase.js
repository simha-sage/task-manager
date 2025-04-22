const mongoose=require("mongoose")
require("dotenv").config()
const connection=async()=>{
    try{
        await mongoose.connect(process.env.my_string)
        console.log("connected")
    }catch{
        console.error("DB connection failed")
    }
}

const task=mongoose.Schema({
    taskValue: String,
    state: Boolean
})
const Task=mongoose.model("Task",task)

module.exports=[connection,Task]