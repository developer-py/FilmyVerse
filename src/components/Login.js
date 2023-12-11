import React, { useContext, useState } from 'react'
import { TailSpin } from 'react-loader-spinner'
import { Link } from 'react-router-dom';
import swal from "sweetalert";
import { addDoc,doc,query,where, getDocs } from 'firebase/firestore';
import { usersRef } from "./firebase/firebase";
import { Appstate } from "../App";
import bcrypt from 'bcryptjs';
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const useAppstate=useContext(Appstate);
  const [form,setForm]=useState({
    mobile:"",
    password:""
  });
  const [loading,setLoading]=useState(false);
  const login= async()=>{
    setLoading(false)
    try {
      const quer=query(usersRef,where('mobile','==', form.mobile))
      const querySnapshot=getDocs(quer);
      (await querySnapshot).forEach((doc)=>{
        const _data=doc.data();
        const isUser= bcrypt.compareSync(form.password, _data.password);
        if(isUser){
          useAppstate.setLogin(true); 
          useAppstate.setUsername(_data.name);
          swal({
            text: "Loged In",
            icon: "success",
            buttons: false,
            timer: 3000,
          });
          navigate('/')
        }else{
          swal({
            text: "Invalid credentials",
            icon: "error",
            buttons: false,
            timer: 3000,
          });
          setLoading(false);
        }
      })
    
    } catch (error) {
      swal({
        text: error.message,
        icon: "error",
        buttons: false,
        timer: 3000,
      });
      setLoading(false);
    }
  }

  return (
    <div className='w-full flex flex-col mt-10 items-center'>
    <h1 className='text-xl font-bold'>Login</h1>
    <div class="p-2 w-full md:w-1/3">
      <div class="relative">
        <label for="mobile" class="leading-7 text-sm text-gray-100">Mobile NUmber</label>
        <input
        type={"number"}
        id="mobile"
        name="mobile" 
        value={form.mobile}
        onChange={(e)=>setForm({...form, mobile: e.target.value})}
        class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
      </div>
    </div>

    <div class="p-2 w-full md:w-1/3">
    <div class="relative">
      <label for="password" class="leading-7 text-sm text-gray-100">Password</label>
      <input type={"password"}
      id="password"
      name="password" 
      value={form.password}
      onChange={(e)=>setForm({...form, password: e.target.value})}
      class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
    </div>
  </div>
  <div className="p-2 w-full">
  <button 
  onClick={login}
  className="flex mx-auto text-white bg-green-700 border-0 py-2 px-8 focus:outline-none hover:bg-green-500 rounded text-sm">
  {loading ? <TailSpin height={22} width={35}/>:"Login"}</button>
  </div>
  <p>Do not have account ? <Link to={"/signup"}> <span className='text-blue-500'>Sign Up</span></Link></p> 
  </div>
  )
}

export default Login