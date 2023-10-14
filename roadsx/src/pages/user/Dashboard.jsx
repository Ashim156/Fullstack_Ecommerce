import AdminMenu from '../../components/layout/AdminMenu'
import Layout from '../../components/layout/Layout'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../context/Auth'
import UserMenu from '../../components/layout/UserMenu'


const Dashboard = () => {
  const[auth]=useAuth()
  return (
    <Layout>

      <div className=' grid grid-cols-3'>
      <UserMenu/>
   <div className=' text-center grid h-40 mt-7 '>

 
     
     <h1  className='  text-xl text-black font-serif rounded-lg'type='submit'> Name: {auth?.user?.name}</h1>
      <h1 className='  text-xl text-black font-serif rounded-lg'type='submit'> Email: {auth?.user?.email}</h1>
      <h1  className='  text-xl text-black font-serif rounded-lg'type='submit'> Phone: {auth?.user?.phone}</h1>
      <h1  className='  text-xl text-black font-serif rounded-lg'type='submit'> Address:{auth?.user?.address}</h1>
     </div>


   </div>
    </Layout>
  )
}

export default Dashboard
