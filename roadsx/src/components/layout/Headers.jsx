import {Link, NavLink, useNavigate} from 'react-router-dom'
import { useState } from 'react'

import {HiOutlineMenuAlt1,} from 'react-icons/hi'
import { FaShoppingCart } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';

import {GrLogin} from 'react-icons/gr'
import {AiOutlineUser} from 'react-icons/ai'
import {AiOutlineClose}from 'react-icons/ai'
import { useAuth } from '../../context/Auth'
import logo from './assets/logo1.png'
import SearchInput from '../form/SearchInput'
import useCategories from '../../Hooks/useCategories'
// import { Select, Space } from 'antd'
// import { Option } from 'antd/es/mentions'
import { useCart } from '../../context/cart'




const Headers = () => {
  const [toggle,setToggle]= useState(true);
  const [active,setActive]= useState("")
  const [auth,setAuth]=useAuth();
  const categories=useCategories()
  const navigate=useNavigate()
  const [cart]=useCart('')
 
  const handelLogout=()=>{
    setAuth({
      ...auth,
      user:null,
      token:"",
  
    })
    localStorage.removeItem('auth')
    
  }
 

  return (
   <>
  
   <div className='h-20 sm:flex-wrap max-w-full mx-auto shadow-lg shadow-gray-800 rounded-b-full mb-6 sm:h-24 bg-black text-white p-2 flex  sm:flex  md:flex md:justify-center items-center '>
   {/* <div className='w-10 h-15 bg-white pt-[4.5px] cursor-pointer hover:bg-gray-600 rounded-full flex justify-center ' onClick={() => setToggle(!toggle)}>{toggle ? <HiOutlineMenuAlt1 size={30}/> : <AiOutlineClose size={30} /> }
 </div> */}
 
 {/* <Link 
 to="/"
 onClick={() => {
    setActive("");
    window.scrollTo(0, 0);
  }} > <div className='relative left-9 top-6'><img src={logo} alt="logo"  /> </div>
  </Link> */}

    <div className="flex items-center ml-20 -mt-4">
      <Link to='/'>
      <img className='w-28' src={logo} alt="" />
      </Link>
            <div className="flex space-x-1">
            <SearchInput />
                
            </div>
        </div>
        <div className='flex ml-20 gap-2'>
      
        {/* <Space wrap>
          <Select >
            {categories.map(c=>( <>
            <Option onClick={()=> navigate(`/${c.name}`)}>{c.name}</Option> </> ))}
          </Select>
          </Space> */}
        {!auth.user ?(<>
            <Link to='/login' className=' text-white  rounded-full text-center p-2 flex gap-1 text-sm justify-center items-center cursor-pointer hover:border-1 hover:bg-teal-200 font-serif hover:text-black '>
          <GrLogin size={18}/> Login
          </Link>

          <Link to="/register" className=' w-[6rem] text-white rounded-full text-center p-2 flex gap-1 text-sm justify-center items-center cursor-pointer hover:border-1 hover:bg-teal-200  font-serif hover:text-black'>
          <AiOutlineUser size={18}/> Sign Up
          </Link>

          </>):(<><Link to="/login" onClick={handelLogout} className=' w-[6rem]  text-white  rounded-full text-center p-2 flex gap-1 text-sm justify-center items-center  cursor-pointer hover:border-1 hover:bg-teal-200  font-serif hover:text-black'>
          < FiLogOut  size={25}/>
          </Link>
          <NavLink to={`/dashboard/${auth?.user?.role===1?"admin":"user"}`} className=' w-[6rem]  text-white  rounded-full text-center p-2 flex gap-1 text-sm justify-center items-center  cursor-pointer hover:border-1 hover:bg-teal-200  font-serif hover:text-black'>
          <AiOutlineUser size={20}/> {`${auth?.user?.name}'s Dashboard`}
          </NavLink>
          </>)}
      
          <Link to='/cart' className='flex items-center gap-1 text-white rounded-full p-2 text-sm justify-center hover:bg-teal-200 cursor-pointer hover:border-1 hover:border-teal-200 font-serif hover:text-black'>
  <FaShoppingCart size={15} />
  Cart ({cart?.length})
</Link>

        </div>
        </div>
        <div
            className={`${
              !toggle ? "flex" : "hidden"
            }   absolute  min-w-[30%] z-8  h-max`}
          >
           <div>


        <div
                  className='w-[50vw] h-[90vh] bg-white '
                 
                  onClick={() => {
                    setToggle(toggle);
                    
                  }}
                >
    
                  
            
                </div>
              
    </div>

           
               
            
          </div>

 
   </>
  )
}

export default Headers
