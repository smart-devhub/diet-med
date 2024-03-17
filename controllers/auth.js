import { Users } from "../modal/user.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
 export const  register= async (req,res)=>{
    
    const {name,email,password}=req.body
       if(!name || !email || !password){
            return res.status(400).json({error:"please fill all the fields"})
        }   
        
        const user=await Users.findOne({email:email})
      
        if(user){
            return res.status(200).json({message:"user already registered"})
        }
        const hashPass=await bcrypt.hash(password,10)
        const newUser=new Users({name,email,password:hashPass})
        newUser.save().then(()=>{
            res.status(200).json({message:"user registered successfully"})
        }).catch(err=>{
            res.status(400).json({error:"something went wrong"})
        })
}

export const login=async (req,res)=>{
    const {email,password}=req.body
    if(!email || !password){
        return res.status(400).json({error:"please fill all the fields"})
    }
    const user=await Users.findOne({email})
    if(!user){
        return res.status(400).json({error:"Invalid Email."})
    }
    const isMatch=await bcrypt.compare(password,user.password)
    if(!isMatch){
        return res.status(400).json({error:"Wrong Password"})
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({message:"login successfull",data:user,token:token})

  
}

export const getAllUsers=async (req,res)=>{
    const users=await Users.find({})
   res.json({data:users})

}

export const deleteUser=async(req,res)=>{
    const {email}=req.body
    const user=await Users.findOne({email:email})
    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }
     Users.deleteOne({email:email}).then(()=>{
       res.status(200).json({ message: "User deleted"})
    }).catch(err=>{
        res.status(500).json({message:err|| "Something went wrong"})
    })
    

}

