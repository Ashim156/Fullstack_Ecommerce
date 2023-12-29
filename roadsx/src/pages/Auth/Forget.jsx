import Layout from "../../components/layout/Layout"
import  { useState } from 'react'
import toast from 'react-hot-toast';

import axios from "axios";
 import { useNavigate } from 'react-router-dom';


const Forget = () => {

  const [email,setEmail]=useState("");
  const [newPassword,setNewPassword]=useState("");

  const [answer,setAnswer]=useState("");

  const navigate= useNavigate();


  const handelSubmit=async (e)=>{
    e.preventDefault();
    try {
      const res= await axios.post("http://localhost:8080/api/v1/auth/forgot-password",{email,newPassword,answer});
      console.log(res)
      
      if(res && res.data.success){
      toast.success(res.data && res.data.message)
      navigate("/login");
      }else{
        toast.error(res.data.message)
      }
    } catch (error) {
      toast.error("Couldn't Reset Profile")
      
    }
   
   

  }
  return (
    <>
    <Layout>
    <div className='h-screen flex flex-col justify-center  rounded-t-full  bg-gradient-to-r  from-white to-teal-100'>
         <form className='max-w-[400px] w-full mx-auto bg-black p-8 px-8 rounded-lg' onSubmit={handelSubmit} >
         <h2 className='text-4xl text-white font-bold text-center'>RESET PASSWORD</h2>

           
         <div className='flex flex-col text-gray-400 py-2'>
                     <label >Email</label>
              
                 <input  className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none'type="email" onChange={(e)=>{setEmail(e.target.value)}}
                  value={email} required placeholder='Enter Your Email' />
               </div>
           
    
       
          
               <div className='flex flex-col text-gray-400 py-2'>
                     <label >New Password</label>
              
                 <input  className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none'type="password" onChange={(e)=>{setNewPassword(e.target.value)}}
                  value={newPassword} required placeholder='Enter Your New Password' />
               </div>
               <div className='flex flex-col text-gray-400 py-2'>
                     <label >Answer</label>
              
                 <input  className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none'type="text" onChange={(e)=>{setAnswer(e.target.value)}}
                  value={answer} required placeholder='Enter Your Favourite Color' />
               </div>
               <button className='w-full my-2 py-2 text-xl bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg'type='submit'>Reset</button>
       
         </form>
     </div>
    </Layout>
    </>
  )
}

export default Forget
