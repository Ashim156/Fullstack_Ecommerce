import { comparePassword, hashPassword} from "../helpers/authHelper.js"
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Jwt from "jsonwebtoken";


export const registerController= async (req,res)=>{
    try {
const {name,email,password,phone,address,answer} = req.body
if(!name){
    res.send({message:"name is required"})
}
if(!email){
    res.send({message:"email is required"})
}
if(!password){
    res.send({message:"password is required"})
}
if(password.length<=7){
    res.send({message:"Password Must be of 8 Digit"})

}
if(!phone){
    res.send({message:"phone is required"})
}
if(phone.length<=9){
    res.send({message:"Phone Must be of 10 Digit"})

}
if(!address){
    res.send({message:"address is required"})
}
if(!answer){
    res.send({message:"answer is required"})
}

// for existing user
const existingUser= await userModel.findOne({email})
if(existingUser){
    res.status(200).send({
    success:false,
    message:"user already exist",
    
    
})
}
const hashedPassword = await hashPassword(password)

const user = await new userModel({name,email,phone,address,password:hashedPassword,answer}).save();

res.status(201).send({
    success:true,
    message:"user registered successfully",
    user,
})
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
           
            success: false,
            message:"error",
            error,

        })
        
    }

}

// login controller

export const loginController=async(req,res)=>{
    try {
        const {email,password}= req.body;
      
        if(!email || !password){
            res.status(404).send({
                success:false,
                message:"Invalid email or password"
            })
        }
       const user = await userModel.findOne({email});
       if(!user){
      return  res.status(404).send({
            success:false,
            message:"email not registered"
        })
       }
        const match = await comparePassword(password,user.password)
        if(!match){
          return  res.status(200).send({
                success:false,
                message:"invalid password"
            })
        }
        const token= await Jwt.sign({_id : user._id}, process.env.JWT_SECRET,
            {expiresIn:"1000d"}
        );
        res.status(202).send({
            success:true,
            message:"login successfull",
            user:{
                name: user.name,
                email: user.email,
                address:user.address,
                phone: user.phone,
                role:user.role
               
            },
            token
        });
        
    }   catch (error) {
        console.log(error)
        res.status(500).send({
           
            success: false,
            message:"error",
            error,

        })
}
}
export const forgotController=async (req,res)=>{
    try {
        const {email,answer,newPassword}= req.body;
        if(!email){
            res.status(400).send({message:"email is required"})
        }
        if(!newPassword){
            res.status(400).send({message:"new password is required"})
        }
        if(!answer){
            res.status(400).send({message:"answer is required"})
        }

        const user= await userModel.findOne({email,answer})
        if(!user){
            res.status(404).send({
                success:false,
                message:"email or answer invalid"
            })
        }
        const hashed=await hashPassword(newPassword);
        await userModel.findByIdAndUpdate(user._id,{password:hashed})
        res.status(200).send({
            success:true,
            message:"password reset Sucessfully"
        })
        
    } catch (error) {
        console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
        })
        
    }
}
export const updateProfile=async (req,res)=>{
    try {
        const {name,password,address,phone}=req.body;
        const user= await userModel.findById(req.user._id)
   
 
    if(password && password.length<6){
        return res.json({error:"password should be more than 6 characters"})
    }
    const hPassword= password ? await hashPassword(password) : undefined;
    const updatedProfile= await userModel.findByIdAndUpdate(
        req.user._id,{
            name: name || user.name,
            address: address || user.address,
            password: hPassword || user.password,
            phone: phone || user.phone

        },{new:true})

res.status(200).send({
    success:true,
    message:"success",
    updatedProfile
})
    } catch (error) {
        res.status(400).send({
            success:false,
            message:"error while updating"
        })
        
    }
}


// orders

export const ordersController=async(req,res)=>{
    try {
        const orders= await orderModel.find({buyer:req.user._id}).populate("products","-photo").populate("buyer","name")
        res.json(orders)
        
    } catch (error) {
        res.status(400).send({
            message:"error",
            success:"false",
            error
        })
        
    }
}
export const allOrdersController=async(req,res)=>{
    try {
        const orders= await orderModel.find({}).populate("products","-photo").populate("buyer","name").sort({createdAt:'-1'})
        res.json(orders)
        
    } catch (error) {
        res.status(400).send({
            message:"error",
            success:"false",
            error
        })
        
    }
    
}
export const orderStatusController=async(req,res)=>{
    try {
        const { orderId } = req.params;
        const { status } = req.body;
        const orders = await orderModel.findByIdAndUpdate(
          orderId,
          { status },
          { new: true }
        );
        res.json(orders);
      } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          message: "Error While Updateing Order",
          error,
        });
      }
    };