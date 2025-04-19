 const express=require("express")
 const path=require("path")
 const [connection,Task]=require("./dataBase")
 const app=express()
 app.use(express.json())
app.use(express.static(path.join(__dirname)))
 



app.post("/add",async (req,res)=>{
    const task=new Task(req.body)
    await task.save()
    res.send("task Added succesfully")
})

app.get("/show",async(req,res)=>{
    const data=await Task.find()
    res.send(data)
})

app.delete("/delete",async (req,res)=>{
    const id=req.body.id
    const data=await Task.findByIdAndDelete(id)
    res.send(data)
})

app.patch("/update",async(req,res)=>{
    const id=req.body.id
    const update=req.body
    const data=await Task.findByIdAndUpdate(id,update)
    res.send("updated")
})


const start= async ()=>{
    try{
        await connection()
        app.listen(3000,()=>{
            console.log("listening at 3000...")
        })
    }catch{
        console.log("App not listening...")
    }
 }

start()