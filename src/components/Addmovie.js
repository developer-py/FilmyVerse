import React, { useState } from 'react'
import { TailSpin } from 'react-loader-spinner';
import { addDoc } from 'firebase/firestore';
import swal from 'sweetalert';
import { moviesRef } from './firebase/firebase';
function Addmovie() {
    const [form,setForm]=useState({
        title:"",
        year:"",
        image:"",
        description:"",
        rated:0,
        rating:0
    });
    const [loading,setLoading]=useState(false)

    const addMovie=async()=>{
        setLoading(true)
        try{

        
      
        await addDoc(moviesRef,form)
        swal({
            title:"Successfully Added",
            icon:"success",
            buttons:false,
            timer:3000
        })
        setForm({
            title:"",
            year:"",
            image:"",
            description:""
        })
      
    }catch(error){
        swal({
            title:error,
            icon:"error",
            buttons:false,
            timer:3000
        })
    }
    setLoading(false)
    }
  return (
    <section class="text-gray-600 body-font relative">
    <div class="container px-5 py-8 mx-auto">
        <div class="flex flex-col text-center w-full mb-4">
        <h1 class="sm:text-3xl text-xl font-medium title-font mb-4 text-white">Add New Movie</h1>
       
        </div>
        <div class="lg:w-1/2 md:w-2/3 mx-auto">
        <div class="flex flex-wrap -m-2">
            <div class="p-2 w-1/2">
            <div class="relative">
                <label for="title" class="leading-7 text-sm text-gray-100">Title</label>
                <input type="text"
                 id="title" 
                 name="title"
                 value={form.title}
                 onChange={(e)=>setForm({...form, title: e.target.value})}
                 class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
            </div>
            </div>
            <div class="p-2 w-1/2">
            <div class="relative">
                <label for="year" class="leading-7 text-sm text-gray-100">Year</label>
                <input type="text"
                 id="year"
                name="year" 
                value={form.year}
                onChange={(e)=>setForm({...form, year: e.target.value})}
                 class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
            </div>
            </div>
            <div class="p-2 w-full">
            <div class="relative">
                <label for="image" class="leading-7 text-sm text-gray-100">Image Link</label>
                <input type="text"
                 id="image"
                name="image" 
                value={form.image}
                onChange={(e)=>setForm({...form, image: e.target.value})}
                 class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
            </div>
            </div>
            <div class="p-2 w-full">
            <div class="relative">
                <label for="discription" class="leading-7 text-sm text-gray-100">Discription</label>
                <textarea 
                id="description"
                name="description"
                value={form.description}
                onChange={(e)=>setForm({...form, description: e.target.value})}
                class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
            </div>
            </div>
            <div class="p-2 w-full">
            <button onClick={addMovie} class="flex mx-auto text-white bg-green-700 border-0 py-2 px-8 focus:outline-none hover:bg-green-500 rounded text-sm">
            {loading ? <TailSpin height={22} width={35}/>:"Submit"}</button>
            </div>
           
        </div>
        </div>
    </div>
</section>
  )
}

export default Addmovie