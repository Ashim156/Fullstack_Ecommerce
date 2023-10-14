import {useEffect,useState} from 'react';
import { useAuth } from '../../context/Auth';
import {Outlet} from 'react-router-dom';
import axios from 'axios';
import Spinner from './Spinner';

export  const Private = () => {
 const [auth,setAuth]= useAuth();
 const[ok,setOk]=useState(false);
 useEffect(()=>{
  const authCheck =async ()=>{
    const res= await axios.get("http://localhost:8080/api/v1/auth/user-auth");
    if(res.data.ok){
      setOk(true)
    }
    else{
      setOk(false)
    }

  }
  if(auth?.token) authCheck();


 },[auth?.token]);
  return ok ? <Outlet /> :<Spinner path="" />
}


export default Private;