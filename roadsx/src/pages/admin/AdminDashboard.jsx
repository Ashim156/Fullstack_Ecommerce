
import AdminMenu from '../../components/layout/AdminMenu'
import Layout from '../../components/layout/Layout'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../context/Auth'


const AdminDashboard = () => {
  const[auth]=useAuth()
  return (
    <Layout>

      <div className='w-[80%] grid grid-cols-3 gap-5'>
      <AdminMenu/>
   <div className='mt-20 grid h-10 col-span-2 text-center'>
     
   <h1  className=' my-2 py-2 text-xl text-black font-serif rounded-lg'type='submit'> Name: {auth?.user?.name}</h1>
      <h1 className=' my-2 py-2 text-xl text-black font-serif rounded-lg'type='submit'> Email: {auth?.user?.email}</h1>
      <h1  className=' my-2 py-2 text-xl text-black font-serif rounded-lg'type='submit'> Phone: {auth?.user?.phone}</h1>
      <h1  className=' my-2 py-2 text-xl text-black font-serif rounded-lg'type='submit'> Address:{auth?.user?.address}</h1>
   </div>

  
   </div>
    </Layout>
  )
}

export default AdminDashboard
