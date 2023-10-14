
import { useEffect, useState } from "react";
import AdminMenu from "../../components/layout/AdminMenu"
import Layout from "../../components/layout/Layout"
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { Select } from "antd";
const{Option}=Select


const UpdateProduct = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [quantity, setQuantity] = useState("");
    const [shipping, setShipping] = useState("");
    const [photo, setPhoto] = useState("");
    const [id, setId] = useState("");

    const params=useParams();

    const getSingleProduct=async()=>{
       try {
        
        const {data}= await axios.get(`http://localhost:8080/api/v1/product/get-product/${params.slug}`)
        setName(data.singleProduct.name)
        setId(data.singleProduct._id)
        setDescription(data.singleProduct.description)
        setPrice(data.singleProduct.price)
        setQuantity(data.singleProduct.quantity)
        setCategory(data.singleProduct.category._id)
        setShipping(data.singleProduct.shipping)
        console.log(data)
        
       } catch (error) {
        toast.error("something went wrong")
        
       }
    }

    useEffect(()=>{
        getSingleProduct()
        //eslint-disable-next-line
},[])
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
          
          const handelUpdate=async(e)=>{
            e.preventDefault()
           try {
            const productData=new FormData()
            productData.append("name",name)
            productData.append("description",description)
            photo && productData.append("photo",photo)
            productData.append("price",price)
            productData.append("quantity",quantity)
            productData.append("category",category)
            // productData.append("shipping",shipping)
    
            const {data}= await axios.put(`http://localhost:8080/api/v1/product/update-product/${id}`,productData)
            if(data?.success){
              toast.success("successfully updated")
              navigate("/dashboard/admin/product")
            }
            else{
              toast.error("cannot update product")
            }
            
           } catch (error) {
            toast.error("something went wrong")
            
           }
         
          }
          const handelDelete=async()=>{
            try {
                const answer=window.prompt("do you want to delete this product?")
                if(!answer) return;
                const {data}= await axios.delete(`http://localhost:8080/api/v1/product/delete-product/${id}`);
                toast.success("deleted")
                navigate("/dashboard/admin/product")
                
            } catch (error) {
                toast.error("something went wrong")
            }
           }
      return (
        <Layout>
        <div className='w-[90%] grid text-center grid-cols-3 shadow-lg shadow-green-950'>
      <AdminMenu/>
   <div className=' mt-6 col-span-2'>
   <h2 className='text-gray-800 text-[2rem] font-bold text-center'>UPDATE PRODUCT</h2>
   <div className="mt-1 text-center">
    <Select bordered={true} placeholder={"Select a Category"} size="large" showSearch className="mb-4 w-full" value={category} onChange={(value)=>{setCategory(value)}}>
   {categories?.map((c)=>(
    <Option key={c._id} value={c._id}>{c.name}</Option>
   ))}
    </Select>
    <label className="text-xl mt-4 bg-gray-800 shadow-lg shadow-gray-500/50 hover:shadow-gray-500/40 text-white font-semibold rounded-lg grid grid-cols-1 " >
      {photo?photo.name:"Upload Photo"}
      <input type="file" name="photo" accept="images/*" onChange={(e)=>{setPhoto(e.target.files[0])}} hidden/>
    </label>
   </div>
   <div className="mt-4 flex justify-center  ">
   {photo ?(
          <img src={URL.createObjectURL(photo)} alt="product-photo" className="h-[200px] "/>
        ):(<img src={`http://localhost:8080/api/v1/product/product-photo/${id}`} alt="product-photo" className="h-[200px] "/>)}
   </div>
   <div>
    <input className="w-full bg-green-50 text-center h-10 border-2 mt-4 border-gray-300 hover:bg-white font-bold focus:border-bg-gray-100 focus:ring-gray-500 focus:outline-none focus:ring focus:ring-opacity-10" type="text" placeholder="Product name" value={name} onChange={(e)=>{setName(e.target.value)}}/>
    </div>
    <div>
    <textarea name="postContent"  className="w-full bg-green-50 text-center mt-4 border-2 h-40  border-gray-300 hover:bg-white font-bold focus:border-bg-gray-100 focus:ring-gray-500 focus:outline-none focus:ring focus:ring-opacity-10 " type="text" placeholder="Product description" value={description} onChange={(e)=>{setDescription(e.target.value)}}/>
    </div>
    
    <div>
    <input className="w-full bg-green-50 text-center h-10 border-2 mt-4  border-gray-300 hover:bg-white font-bold focus:border-bg-gray-100 focus:ring-gray-500 focus:outline-none focus:ring focus:ring-opacity-10" type="number" placeholder="Product quantity" value={quantity} onChange={(e)=>{setQuantity(e.target.value)}}/>
    </div>
    <div>
    <input className="w-full bg-green-50 text-center h-10 border-2 mt-4 border-gray-300 hover:bg-white font-bold focus:border-bg-gray-100 focus:ring-gray-500  focus:outline-none focus:ring focus:ring-opacity-10 " type="number" placeholder="Product price" value={price} onChange={(e)=>{setPrice(e.target.value)}}/>
    </div>
    <div className=" text-center" > <Select bordered={true} className="mt-4 mb-4 w-full" placeholder="Do You Have Shipping Address" size="large" value={shipping?"yes":"no"} onChange={(value)=>{setShipping(value)}}>
      <Option value='0'>Yes</Option>
      <Option value='1' >No</Option>
    </Select></div>
    <div className="w-full text-center text-xl bg-teal-800 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg">
      <button  onClick={handelUpdate}>Create Product</button>
    </div>
    <div className="w-full text-center text-xl mt-4 bg-red-950 shadow-lg shadow-red-500/50 hover:shadow-red-500/40 text-white font-semibold rounded-lg">
      <button  onClick={handelDelete}>Delete Product</button>
    </div>
   
   </div>
   </div>




    </Layout>
      )
    }

export default UpdateProduct
