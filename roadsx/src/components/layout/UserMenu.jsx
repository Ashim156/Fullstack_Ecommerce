import { NavLink } from "react-router-dom"
import { BiCategory} from 'react-icons/bi';
import { MdOutlineCategory,MdOutlineLocalShipping} from 'react-icons/md';
import { TbBorderSides} from 'react-icons/tb';
import { MdOutlineDashboard } from "react-icons/md";
import { useState } from "react";

const UserMenu = () => {
    const active=" bg-white text-black shadow shadow-gray-500/50 hover:shadow-gray-500/40  font-semibold rounded-lg";
    
    const notactive="";
    const [toggle, setToggle]=useState(false)
  return (
<>
<div className="2xl:hidden lg:hidden ">
<MdOutlineDashboard size={'2.5rem'} className="cursor-pointer md:ml-32" onClick={()=>{setToggle(!toggle)}} />
<div className={`${toggle?"flex":"hidden"} md:ml-36 z-50 rounded-b-full shadow-lg shadow-black text-center text-[px] w-[13rem] h-[50vh]  py-16 text-black bg-white flex-col relative`}>

    <h2 className='text-teal-500 font-bold'><span className=" text-teal-500  hover:shadow-teal-500/40 font-bold text-2xl rounded-lg">User</span> <span className=" text-black  hover:shadow-gray-500/40 font-semibold rounded-lg text-2xl">PANEL</span></h2>
    <div className=' grid text-center gap-2'>
   
      <NavLink to='/dashboard/user/profile'  className={({isActive})=>`${isActive?active:notactive}  hover:bg-black hover:text-white  h-8 flex items-center gap-2 justify-center` }><TbBorderSides/>User Profile</NavLink>
      <NavLink to='/dashboard/user/order'  className={({isActive})=>`${isActive?active:notactive}  hover:bg-black hover:text-white gap-2 h-8 flex items-center justify-center` }><MdOutlineLocalShipping/> orders</NavLink>
      
 

      </div>
      </div>
<div>

</div>
  </div>
<div className="-z-1 rounded-b-full shadow-lg shadow-black text-center text-[25px] w-96 h-[60vh]  py-16 text-black bg-white sm:hidden ss:hidden md:hidden ">

    <h2 className='text-teal-500 font-bold'><span className=" text-teal-500  hover:shadow-teal-500/40 font-bold text-3xl rounded-lg">User</span> <span className=" text-black  hover:shadow-gray-500/40 font-semibold rounded-lg text-3xl">PANEL</span></h2>
    <div className=' grid text-center gap-2'>
   
      <NavLink to='/dashboard/user/profile'  className={({isActive})=>`${isActive?active:notactive}  hover:bg-black hover:text-white  h-8 flex items-center gap-2 justify-center` }><TbBorderSides/>User Profile</NavLink>
      <NavLink to='/dashboard/user/order'  className={({isActive})=>`${isActive?active:notactive}  hover:bg-black hover:text-white gap-2 h-8 flex items-center justify-center` }><MdOutlineLocalShipping/> orders</NavLink>
      
 

      </div>
      </div>
  </>
  )
}

export default UserMenu
