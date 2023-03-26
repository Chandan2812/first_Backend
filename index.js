const express=require("express")
const {connection}=require("./db")
const {userRouter}=require("./routes/User.routes")
const {noteRouter}=require("./routes/note.route")
const {authenticate}=require("./middleware/middleware")
const cors=require("cors")
require("dotenv").config()

const app=express()

app.use(express.json())
app.use(cors())
app.use("/users",userRouter)
app.use(authenticate)
app.use("/notes",noteRouter)



app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("connected to DB")
    } catch (error) {
        console.log(error.message)
    }
    console.log("server is running");
})