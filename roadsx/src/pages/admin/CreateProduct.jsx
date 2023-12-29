import { useEffect, useState } from "react";
import AdminMenu from "../../components/layout/AdminMenu"
import Layout from "../../components/layout/Layout"
import { useNavigate } from "react-router-dom";
import toast  from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
const{Option}=Select


const CreateProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");

  const getAllCategory=async()=>{
    try {
     const {data}=await axios.get("http://localhost:8080/api/v1/category/get-category")
     if(data?.success){
       setCategories(data.category)
       
     }
    } catch (error) {
     toast.error("something went wrong")
     
    }
  }
    useEffect(()=>{
      getAllCategory()
      },[])
      
      const handelProduct=async(e)=>{
        e.preventDefault()
       try {
        const productData=new FormData()
        productData.append("name",name)
        productData.append("description",description)
        productData.append("photo",photo)
        productData.append("price",price)
        productData.append("quantity",quantity)
        productData.append("category",category)
        // productData.append("shipping",shipping)

        const {data}= await axios.post("http://localhost:8080/api/v1/product/create-product",productData)
        if(data?.success){
          toast.success("successfully added")
          navigate("/dashboard/admin/product")
        }
        else{
          toast.error("cannot post product")
        }
        
       } catch (error) {
        toast.error("something went wrong")
        
       }
      }

  return (
    <>
    <Layout>
        <div className='w-[90%] max-h-full grid text-center grid-cols-3  '>
      <AdminMenu/>
   <div className=' mt-6 col-span-2'>
   <h2 className='text-gray-800 text-[2rem] font-serif text-center'>CREATE PRODUCT</h2>
   <div className="mt-1 text-center">
    <Select bordered={true} placeholder={"Select a Category"} size="large" showSearch className="mb-4 w-full" onChange={(value)=>{setCategory(value)}}>
   {categories?.map((c)=>(
    <Option key={c._id} value={c._id}>{c.name}</Option>
   ))}
    </Select>
    <label className="text-xl  bg-gray-800 shadow-lg shadow-gray-500/50 hover:shadow-gray-500/40 text-white font-serif rounded-lg grid grid-cols-1 " >
      {photo?photo.name:"Upload Photo"}
      <input type="file" name="photo" accept="images/*" onChange={(e)=>{setPhoto(e.target.files[0])}} hidden/>
    </label>
   </div>
   <div className="mt-4 flex justify-center  ">
    {photo && (
      <img src={URL.createObjectURL(photo)} alt="Product-photo" className="h-[200px] "/>
    )}
   </div>
   <div>
    <input className="w-full rounded-full text-black text-center h-10 border-2 mt-4 border-gray-300 hover:bg-white font-bold focus:border-bg-gray-100 focus:ring-gray-500 focus:outline-none focus:ring focus:ring-opacity-10" type="text" placeholder="Product name" value={name} onChange={(e)=>{setName(e.target.value)}}/>
    </div>
    <div>
    <textarea name="postContent"  className="w-full text-center mt-4 border-2 h-40  border-gray-300 hover:bg-white font-bold focus:border-bg-gray-100 focus:ring-gray-500 focus:outline-none focus:ring focus:ring-opacity-10 rounded-t-3xl mb-4" type="text" placeholder="Product description" value={description} onChange={(e)=>{setDescription(e.target.value)}}/>
    </div>
    
    <div>
    <input className="w-full  rounded-full text-center h-10 border-2  hover:bg-white font-bold focus:border-bg-gray-100 focus:ring-gray-500 focus:outline-none focus:ring focus:ring-opacity-10 " type="number" placeholder="Product quantity" value={quantity} onChange={(e)=>{setQuantity(e.target.value)}}/>
    </div>
    <div>
    <input className="w-full  rounded-full text-center h-10 border-2 mt-4 border-gray-300 hover:bg-white font-bold focus:border-bg-gray-100 focus:ring-gray-500  focus:outline-none focus:ring focus:ring-opacity-10 " type="number" placeholder="Product price" value={price} onChange={(e)=>{setPrice(e.target.value)}}/>
    </div>
    <div className=" text-center" > <Select bordered={true} className="mt-4 mb-4 w-full" placeholder="Do You Have Shipping Address" size="large" onChange={(value)=>{setShipping(value)}}>
      <Option value='0'>Yes</Option>
      <Option value='1' >No</Option>
    </Select></div>
    <div className=" text-center text-xl">
      <button className='w-40 text-black bg-gradient-to-r from-teal-300 to-teal-500  rounded-full font-serif  shadow-inner shadow-white hover:text-white hover:shadow-2xl mb-11  ' onClick={handelProduct}>Create Product</button>
    </div>
   
   </div>
   </div>




    </Layout>
    </>
    
  )
}

export default CreateProduct
