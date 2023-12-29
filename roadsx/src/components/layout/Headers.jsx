import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { IoLogIn } from "react-icons/io5";
import { FaShoppingCart } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import { IoMenu } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { GrLogin } from 'react-icons/gr'
import { AiOutlineUser } from 'react-icons/ai'

import { useAuth } from '../../context/Auth'
import logo from './assets/logo1.png'
import SearchInput from '../form/SearchInput'
import useCategories from '../../Hooks/useCategories'
import { useCart } from '../../context/cart'
import { Badge } from 'antd';




const Headers = () => {
  const [toggle, setToggle] = useState(true);
  const [active, setActive] = useState("")
  const [auth, setAuth] = useAuth();
  const categories = useCategories()
  const navigate = useNavigate()
  const [cart] = useCart('')

  const handelLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",

    })
  
    localStorage.removeItem('auth')

  }


  return (
    <>

      <div className='h-20 sm:flex-wrap max-w-full mx-auto shadow-lg shadow-gray-800 rounded-b-full mb-6 sm:h-24 bg-black text-white p-2 flex  sm:flex  md:flex md:justify-center  items-center '>
        {/* <div className='w-10 h-15 bg-white pt-[4.5px] cursor-pointer hover:bg-gray-600 rounded-full flex justify-center ' onClick={() => setToggle(!toggle)}>{toggle ? <HiOutlineMenuAlt1 size={30}/> : <AiOutlineClose size={30} /> }
 </div> */}

        {/* <Link 
 to="/"
 onClick={() => {
    setActive("");
    window.scrollTo(0, 0);
  }} > <div className='relative left-9 top-6'><img src={logo} alt="logo"  /> </div>
  </Link> */}

        <div className="flex items-center ml-20 -mt-4 ">
          <Link to='/'>
            <img className='w-28 h-28' src={logo} alt="" />
          </Link>
          <div className='hidden z-20 ss:flex sm:flex sm:left-80 ss:left-36 -ml-4 ss:-ml-20 cursor-pointer relative left-28' onClick={()=>setToggle(!toggle)} >
          {toggle?(<IoMenu size={40} />):(<IoClose size={40} /> )}
           
          
          </div>
          <div className={`${!toggle?'sm:flex ss:flex':'hidden'} absolute mt-4  shadow-lg shadow-slate-500  h-[30vh] hidden w-[90vw]    bg-black rounded-s-full  right-0 top-20 sm:mt-10`}>
            <div className='mt-20'>
          <SearchInput />

            </div>

          <div className='flex flex-col gap-4 text-2xl  items-center mt-9 ml-5 '>

      
          {!auth.user ? (<>
            <Link to='/login' className='flex  items-center justify-center hover:bg-teal-600 rounded-full w-[8rem] '>
              <IoLogIn size={18}   /> Login
            </Link>

            <Link to="/register"className='flex  items-center justify-center hover:bg-teal-600 rounded-full w-[8rem] '>
              <AiOutlineUser size={18} /> Sign Up
            </Link>

          </>) : (<><Link to="/login" onClick={handelLogout} className='flex  items-center justify-center hover:bg-teal-600 rounded-full w-[8rem] '>
            <div className='flex text-sm'>< FiLogOut size={25} />Logout</div>
          </Link>
            <NavLink to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`} className='flex ml-9 text-sm '>
              <AiOutlineUser size={'2rem'} /> {`${auth?.user?.name}'s Dashboard`}
            </NavLink>
          </>)}
         
         
          <Link to='/cart' className='flex  items-center justify-center hover:bg-teal-600 rounded-full w-[8rem] text-sm '>
            <FaShoppingCart size={'1.5rem'} />
            Cart ({cart?.length})
          </Link>
          

        </div>
         
          </div>
        
          
          <div className="flex mt-8 space-x-1 ss:hidden sm:hidden  ">
            <SearchInput />

          </div>
        
        </div>
        <div className='flex md:ml-14 ml-24 gap-2 ss:hidden sm:hidden   '>

        
          {!auth.user ? (<>
            <Link to='/login' className=' text-white  rounded-full text-center p-2 flex gap-1 text-sm justify-center items-center cursor-pointer hover:border-1 hover:bg-teal-200 font-serif hover:text-black '>
            <IoLogIn size={18}   /> Login
            </Link>

            <Link to="/register" className=' w-[6rem] text-white rounded-full text-center p-2 flex gap-1 text-sm justify-center items-center cursor-pointer hover:border-1 hover:bg-teal-200  font-serif hover:text-black'>
              <AiOutlineUser size={18} /> Sign Up
            </Link>

          </>) : (<><Link to="/login" onClick={handelLogout} className=' w-[6rem]  text-white  rounded-full text-center p-2 flex gap-1 text-sm justify-center items-center  cursor-pointer hover:border-1 hover:bg-teal-200  font-serif hover:text-black'>
           <div className='flex'> < FiLogOut size={25} /> Logout </div>
          </Link>
            <NavLink to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`} className=' w-[6rem]  text-white  rounded-full text-center p-2 flex gap-1 text-sm justify-center items-center  cursor-pointer hover:border-1 hover:bg-teal-200  font-serif hover:text-black'>
              <div className='flex'>
              <AiOutlineUser size={'2rem'} /> {`${auth?.user?.name}'s Dashboard`}
              </div>
            </NavLink>
          </>)}

          <Badge className='flex items-center justify-center' count={cart?.length}>
<Link to='/cart' className='flex items-center h-full gap-1 text-white rounded-full p-2 text-sm justify-center hover:bg-teal-200 cursor-pointer hover:border-1 hover:border-teal-200 font-serif hover:text-black'>
            <FaShoppingCart size={15} />
            Cart
          </Link>
</Badge>

        </div>
      </div>
    </>
  )
}

export default Headers
