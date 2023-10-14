import AdminMenu from "../../components/layout/AdminMenu"
import Layout from "../../components/layout/Layout"


const User = () => {
  return (
    <Layout>
          <div className='w-[60%] grid grid-cols-2'>
      <AdminMenu/>
   <div className='border-2 mt-6'>
  user
   </div>
   </div>
    </Layout>
  )
}

export default User
