const mongoose=require("mongoose")
const connection=async()=>{
    try{
        await mongoose.connect("mongodb+srv://munna-bhai:H6H4IcSYXbsk1zZ8@first-cluster.ljcmp.mongodb.net/tasks")
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