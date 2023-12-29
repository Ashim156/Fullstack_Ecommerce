import axios from "axios"
import {useSearch} from '../../context/Search'
import { useNavigate } from "react-router-dom"

const Search = () => {

    const [values,setValues]=useSearch()
    const navigate=useNavigate()


    const handelSearch=async(e)=>{
        e.preventDefault();
      try {
        const {data}=await axios.get(`http://localhost:8080/api/v1/product/search/${values.keyword}`)
        setValues({...values,result:data})
     navigate("/search")
        
      } catch (error) {
        console.log(error)
      }
    }
  return (
    <>
    <form className="" onSubmit={handelSearch}>

  
    <input
                   type="text"
                    
                    className="w-[35vw] md:w-[28vw]  px-4 py-2 bg-white text-black border rounded-full focus:border-bg-gray-100 focus:ring-teal-700 focus:outline-none focus:ring focus:ring-opacity-40 ml-10"
                    placeholder="Search..."
                    value={values.keyword}
                    onChange={(e)=>{setValues({...values,keyword:e.target.value})}}
                />
                <button className="px-4 md:hidden  ss:hidden sm:hidden">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                </button>
                </form>
    </>
  )
}

export default Search
