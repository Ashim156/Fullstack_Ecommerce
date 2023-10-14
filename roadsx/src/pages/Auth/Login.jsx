
import { useState } from 'react'
import Layout from '../../components/layout/Layout'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/Auth';

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();


  const navigate = useNavigate();
  const location = useLocation();

  const handelSubmit = async (e) => {
    e.preventDefault();
    try {

      const res = await axios.post("http://localhost:8080/api/v1/auth/login", { email, password });
      console.log(res)

      if (res.data.success) {
        toast.success(res.data.message)
        navigate(location.state || "/");

        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token
        });
        localStorage.setItem("auth", JSON.stringify(res.data));

      } else {
        toast.error(res.data.message)
      }
    } catch (error) {
      toast.error("ERROR")

    }
  }


  return (
    <Layout>
      <div className='h-screen w-full  overflow-hidden white flex  flex-col rounded-t-full  bg-gradient-to-r  from-white to-teal-100'>
        <form  className='max-w-[400px] overflow-hidden mt-16 w-full mx-auto bg-black p-8 px-8 rounded-lg' onSubmit={handelSubmit} >
        <h2 className='text-4xl text-white font-bold text-center'>SIGN IN </h2>
        <div className='flex flex-col text-gray-400 py-2'>
           
              <label>Email:   </label>
              
                  <input  className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' type="email" onChange={(e) => { setEmail(e.target.value) }}
                    value={email} required placeholder='Enter Your Email' />
              
           
           
            
              <div className='flex flex-col text-gray-400 py-2'>
          
              <label>Password: </label>
               
                  <input className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' type="password" onChange={(e) => { setPassword(e.target.value) }} placeholder='Password' value={password} required />
               </div>
             
         
         



               <div className='flex justify-between  text-gray-400 py-2 '>
             
             

                
                    <button  className='w-full my-1 py-1 hover:underline hover:underline-offset-4 ' type='submit' onClick={() => { navigate("/forgot-password") }}>
                    Forgot Password
                    </button>
                  </div>

                
              
             
        
          
                  <button className='w-full my-2 py-2 text-xl bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg'type='submit'>Sign In</button>
           
          </div>
        </form>
      </div>
    </Layout>
  )
}


export default Login
