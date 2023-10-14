
import Layout from '../../components/layout/Layout'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/Auth'
import UserMenu from '../../components/layout/UserMenu'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'

const Profile = () => {
  // const[auth]=useAuth()
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
const[auth,setAuth]=useAuth();
  const [phone, setPhone] = useState("");
  useEffect(()=>{
    const {email,name,address,phone}=auth?.user
    setName(name);
    setEmail(email)
    setAddress(address)
    setPhone(phone)
  },[auth?.user])
  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      const {data} = await axios.put("http://localhost:8080/api/v1/auth/update-profile", { name, address, phone, email, password,});
 
    
      if (data?.error) {
        toast.error(data?.error) 
      } else {
        setAuth({...auth,
          user:data?.updatedProfile})
          let ls= localStorage.getItem("auth")
          ls= JSON.parse(ls)
          ls.user=data.updatedProfile
          localStorage.setItem("auth",JSON.stringify(ls))
          toast.success("updated successfully")
   
      }
    } catch (error) {
      toast.error("ERROR to update")

    }
 
  }

  return (
    <Layout>
      <div className="w-[60%]  bg-white  text-black grid grid-cols-2">
        <UserMenu />
        <div className="h-screen bg-white  flex flex-col ">
          <form onSubmit={handelSubmit} className="max-w-[400px] w-full mx-auto bg-white shadow-2xl p-8 px-8 rounded-lg">
            <h2 className="text-4xl text-black font-serif text-center">
              Edit Profile{" "}
            </h2>
            <div className="flex flex-col py-2">
              <input
                className="rounded-lg mt-2 p-2 focus:border-blue-500 shadow-zinc-200 shadow-xl focus:bg-slate-200 focus:outline-none"
                type="text"
                placeholder="Enter Your Name"
                onChange={(e) => {
                  setName(e.target.value);
                }}
                value={name}
              
              />
            </div>
            <div className="flex flex-col py-2">
              <input
                className="rounded-lg shadow-zinc-200 shadow-xl  mt-2 p-2 focus:border-blue-500 focus:bg-slate-200 focus:outline-none"
                type="email"
                placeholder="Enter Your Email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                value={email}
              
                disabled
              />
            </div>
            <div className="flex flex-col py-2">
              <input
                className="rounded-lg shadow-zinc-200 shadow-xl  mt-2 p-2 focus:border-blue-500 focus:bg-slate-200 focus:outline-none"
                type="password"
                placeholder="Enter Your Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                value={password}
              
              />
            </div>
            <div className="flex flex-col py-2">
              <input
                className="rounded-lg shadow-zinc-200 shadow-xl  mt-2 p-2 focus:border-blue-500 focus:bg-slate-200 focus:outline-none"
                type="number"
                placeholder="Enter Your Phone Number"
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
                value={phone}
              />
            </div>
            <div className="flex flex-col py-2">
              <input
                className="rounded-lg  shadow-zinc-200 shadow-xl mt-2 p-2 focus:border-blue-500 focus:bg-slate-200 focus:outline-none"
                type="text"
                placeholder="Enter Your Address"
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
                value={address}
              
              />
            </div>
            <button
              className="w-full my-2 py-2 text-xl bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg"
              type="submit">
              Update
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
export default Profile
