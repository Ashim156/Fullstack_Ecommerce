import { useState } from 'react'
import Layout from '../../components/layout/Layout'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { useNavigate } from 'react-router-dom';



const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();


  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/api/v1/auth/register", { name, address, phone, email, password, answer });
      console.log(res)
      if(password<=6){
        toast.error("error")
      }

    
      if (res && res.data.success) {
        toast.success(res.data && res.data.message)
        navigate("/login");

      } else {
        toast.error(res.data.message)
      }
    } catch (error) {
      toast.error("ERROR")

    }



  }
  return (


    <>
      <Layout>
        <div className='h-screen bg-gray-800 flex flex-col justify-center  rounded-t-full  bg-gradient-to-r  from-white to-teal-100'>
          <form onSubmit={handelSubmit} className='max-w-[400px] w-full mx-auto bg-black p-8 px-8 rounded-lg' >
            <h2 className='text-4xl text-white font-bold text-center'>REGISTER HERE </h2>

            <div className='flex flex-col text-gray-400 py-2'>



              <input className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' type="text" placeholder='Enter Your Name' onChange={(e) => { setName(e.target.value) }} value={name} required />


            </div>



            <div className='flex flex-col text-gray-400 py-2'>



              <input className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' type="email" placeholder='Enter Your Email' onChange={(e) => { setEmail(e.target.value) }} value={email} required />


            </div>



            <div className='flex flex-col text-gray-400 py-2'>



              <input className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' type="password" placeholder='Enter Your Password' onChange={(e) => { setPassword(e.target.value) }} value={password} required />


            </div>



            <div className='flex flex-col text-gray-400 py-2'>



              <input className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' type="number" placeholder='Enter Your Phone Number' onChange={(e) => { setPhone(e.target.value) }} value={phone} required />


            </div>


            <div className='flex flex-col text-gray-400 py-2'>



              <input className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' type="text" placeholder='Enter Your Address' onChange={(e) => { setAddress(e.target.value) }} value={address} required />


            </div>

            <div className='flex flex-col text-gray-400 py-2'>



              <input className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' type="text" placeholder='Enter Your Favourite Colour' onChange={(e) => { setAnswer(e.target.value) }} value={answer} required />


            </div>

            <button className='w-full my-2 py-2 text-xl bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg' type="submit">Register</button>
          </form>
        </div>
      </Layout>
    </>
  )
}

export default Register
