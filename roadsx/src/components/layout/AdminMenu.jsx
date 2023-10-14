import { NavLink } from "react-router-dom"
import { BiCategory} from 'react-icons/bi';
import { MdOutlineCategory,MdOutlineLocalShipping} from 'react-icons/md';
import { TbBorderSides} from 'react-icons/tb';


const AdminMenu = () => {
    const active=" bg-white text-black shadow-inner shadow-gray-500/50  hover:shadow-gray-500/40 hover:rounded-full font-semibold rounded-lg";
    
    const notactive="";
  return (
<>
<div className="-z-1 rounded-b-full  shadow-lg shadow-black text-center text-[25px] w-96 h-[100vh]  py-16 text-black bg-white ">
    <h2 className='text-teal-500 font-bold'><span className=" text-teal-500  hover:shadow-teal-500/40 font-bold text-3xl rounded-lg">ADMIN</span> <span className=" text-black  hover:shadow-gray-500/40 font-semibold rounded-lg text-3xl">PANEL</span></h2>
    <div className=' grid text-center gap-2'>
    <NavLink to='/dashboard/admin/create-category' className={({isActive})=>`${isActive?active:notactive} hover:bg-black hover:text-white   h-8 flex gap-2 items-center  rounded-t-full justify-center   ` }><BiCategory/>Create Category</NavLink>
     <NavLink to='/dashboard/admin/create-product'className={({isActive})=>`${isActive?active:notactive}  hover:bg-black hover:text-white h-8 flex items-center gap-2 justify-center` }> < MdOutlineCategory/> Create Product</NavLink>
    
      <NavLink to='/dashboard/admin/product'  className={({isActive})=>`${isActive?active:notactive}  hover:bg-black hover:text-white  h-8 flex items-center gap-2 justify-center` }><TbBorderSides/>Product Lists</NavLink>
      <NavLink to='/dashboard/admin/all-orders'  className={({isActive})=>`${isActive?active:notactive}  hover:bg-black hover:text-white gap-2 h-8 flex items-center justify-center` }><MdOutlineLocalShipping/> orders</NavLink>
      
 

      </div>
      </div>
  </>
  )
}

export default AdminMenu
