import { useEffect, useState } from "react"
import AdminMenu from "../../components/layout/AdminMenu"
import Layout from "../../components/layout/Layout"
import axios from "axios"
import toast  from "react-hot-toast"
import CategoryForm from "../../components/form/CategoryForm"
import {Modal,Button} from "antd";


const CreateCategory = () => {
  const [category,setCategory]=useState([])
  const [name,setName]=useState("")
  const [visible,setVisible]=useState(false)
  const [updateName,setUpdateName]=useState("")
  const [selected,setSelected]=useState(null)


  const handelSubmit=async(e)=>{
    e.preventDefault();
    try {
      const {data}=await axios.post("http://localhost:8080/api/v1/category/create-category",{name})
      if(data?.success){
        toast.success(`${name} is created`)
        getAllCategory()
        
      }
      else{
        toast.error("error to create")
      }
    } catch (error) {
      toast.error("error to create")
      
    }

  }
  
  
  const getAllCategory=async()=>{
   try {
    const {data}=await axios.get("http://localhost:8080/api/v1/category/get-category")
    if(data?.success){
      setCategory(data.category)
      
    }
   } catch (error) {
    toast.error("something went wrong")
    
   }
  }
  const updateHandelSubmit = async (e) => {
    console.log("id",selected._id)
    e.preventDefault();
    try {
      
      const { data } = await axios.put(
        `http://localhost:8080/api/v1/category/update-category/${selected._id}`,
        { name: updateName }
      );
      if (data?.success) {
        toast.success(`${updateName} is updated`);
        setSelected(null);
        setUpdateName("");
        setVisible(false);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handelDelete = async (id) => {
  
    try {
      
      const { data } = await axios.delete(
        `http://localhost:8080/api/v1/category/delete-category/${id}`);
      if (data?.success) {
        toast.success(`category is deleted`);
       
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

useEffect(()=>{
getAllCategory()
},[])

  return (
    <Layout>

       <div className='w-[100%] grid grid-cols-3'>
      <AdminMenu/>
   <div className=' mt-6 mb-7'>
   <h2 className='text-gray-800 text-3xl mt-3  font-serif text-center'>CREATE CATEGORY</h2>
   <CategoryForm handleSubmit={handelSubmit} value={name} setValue={setName} btnLabel="Add Product"/>
   <div>
  

  <div className="w-96  ">
  <tr className="flex justify-between w-72 mb-5 mt-5 font-serif text-2xl ">
                    <th>Name</th>
                    
                    <th>Action</th>
                  
                </tr>
                
    {category?.map(c=>
   <> 
   <div className="grid grid-cols-2   ">
   <div  className="flex justify-between  mb-6 text-xl max-w-xs overflow-clip shadow-inner shadow-teal-100   rounded-full"  key={c._id}>{c.name} </div>
   <table className="">
              
               
                        <tr >
                            
                            <Button className="text-black bg-blue-100 mb-2"  type="primary" onClick={()=>{setVisible(true); 
    setUpdateName(c.name); 
    setSelected(c)}}>Edit</Button>
                            <Button className="text-black bg-red-100 mb-2 ml-2 hover:bg-red-500 hover:text-white" type="danger"   onClick={()=>{ 

   
   handelDelete(c._id)}}>Delete</Button>
                           
                        </tr>
                
            </table>
    </div>
   
   
   </>)}
  </div>
  </div>
  <Modal onCancel={()=>setVisible(false)} footer={null} open={visible} >
  <CategoryForm handleSubmit={updateHandelSubmit} value={updateName} setValue={setUpdateName} btnLabel="Update Product" />
  </Modal>
</div>
   </div>
    
    
   

    </Layout>
    
  )
}

export default CreateCategory
