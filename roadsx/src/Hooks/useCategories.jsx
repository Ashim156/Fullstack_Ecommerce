import axios from "axios";
import { useEffect, useState } from "react"
import { toast } from "react-toastify";


export default function useCategories () {
    const[categories,setCategories]=useState([]);

    const getCategories=async()=>{
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
getCategories()
    },[])

return categories
}


