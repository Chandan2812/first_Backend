const express=require("express")
const {NoteModel}=require("../model/Note.model")


const noteRouter=express.Router()

noteRouter.post("/create",async(req,res)=>{
    const data=req.body
    const note=new NoteModel(data)
    await note.save()
    res.send({msg:"note created"})
})

noteRouter.get("/",async(req,res)=>{
    let user=req.body.user
    // console.log(userId)
    const notes=await NoteModel.find({user})
    res.send(notes)
})

noteRouter.patch("/update/:id",async(req,res)=>{
    let userId=req.body.user
    const id=req.params.id
    const body=req.body
    const data=await NoteModel.findOne({_id:id})
    if(data.user==userId)
    {
        await NoteModel.findByIdAndUpdate({_id:id},body)
        res.send({msg:"Notes Updated"})
    }
    else{
        res.send("Notes not found")
    }  
})

noteRouter.delete("/delete/:id",async(req,res)=>{
    let userId=req.body.user
    const id=req.params.id
    const data=await NoteModel.findOne({_id:id})
    //console.log(data)
    if(data.user ==userId)
    {
        await NoteModel.findByIdAndDelete({_id:id})
        res.send({msg:"Notes deleted"})
    }
    else{
        res.send({msg:"Notes not found"})
    }
    
})

module.exports={noteRouter}