import React, { useEffect } from 'react'
import ReactStars from 'react-stars'
import { useState,useContext } from 'react'
import { reviewsRef,db } from './firebase/firebase';
import { addDoc,doc,updateDoc,query,where, getDocs } from 'firebase/firestore';
import { TailSpin, ThreeDots } from 'react-loader-spinner';
import swal from 'sweetalert';
import { Appstate } from "../App";
import { useNavigate } from "react-router-dom";
const Review = ({id,prevRating,userRated}) => {
  const useAppstate=useContext(Appstate);
  const [rating,setReating]=useState(0);
  const [loading,setLoading]=useState(false);
  const [reviewsLoading,setReviewsLoading]=useState(false);
  const [form,setForm]=useState("");
  const [data,setData]=useState([]);
  const [newAdded,setnewAdded]=useState(0);


  const navigate = useNavigate();
  // const useAppstate=useContext(Appstate);
  const sendReview=async ()=>{
    setLoading(true)
    if(useAppstate.login){

  
    try{
      await addDoc(reviewsRef,{
        movieId:id,
        name:useAppstate.userName,
        rating:rating,
        thought:form,
        timestamp: new Date().getTime()
      })
      const ref=doc(db,"movies",id);
      await updateDoc(ref,{
        rating:prevRating+rating,
        rated:userRated+1
      })
      setReating(0);
      setForm("");
      setnewAdded(newAdded+1);
      swal({
        title:"Review send",
        icon:"success",
        buttons:false,
        timer:3000
    })
    }catch(erro){
      swal({
        title:erro.message,
        icon:"error",
        buttons:false,
        timer:3000
    })
    }
    setLoading(false)
  }else{
    navigate('/login')
  }
  }

  useEffect(()=>{
    async function getData(){
      setReviewsLoading(true)
      setData([])
      let quer=query(reviewsRef,where("movieId","==",id))
      const querySnapshot=await getDocs(quer)

      querySnapshot.forEach((doc)=>{
        setData((prev)=>[...prev,doc.data()])
      })
      setReviewsLoading(false)
    }
    getData();
  },[newAdded])

  return (
    <div className='mt-4 py-1 border-t-2 border-gray-400 w-full '>
    <ReactStars
        // count={5}
        // onChange={ratingChanged}
         size={30}
         onChange={(rate)=>setReating(rate)}
        // color2={'#ffd700'}
        value={rating}
        // edit={false}
        half={true}
        />
    <input
    onChange={(e)=>setForm(e.target.value)}
    placeholder='Share your thoughts....'
    className='w-full p-2 outline-none text-black bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 '
    />
    <button onClick={sendReview}  className='w-full bg-green-700 flex justify-center p-2 mt-4'>
     {loading?<TailSpin height={24}/>:"Share"}
    </button>
{
  reviewsLoading?
  <div className='mt-6 flex justify-center'><ThreeDots height={15} color='white'/></div>
  :
  <div mt-4 p-2>
  {data.map((e,i)=>{
    return(
      <div className=' p-2 w-full border-b header bg-opacity-50 border-gray-600 mt-2 ' key={i}>
      <div className='flex items-center'>
      <p className='text-blue-500'>{e.name}</p>
      <ReactStars
      size={15}
      value={e.rating}
      edit={false}
      half={true}
      />
      <p className='ml-3 text-sm'>{new Date(e.timestamp).toLocaleString()}</p>
      </div>
     <p> {e.thought}</p>
     
      </div>
    )
  })

  }
  </div>
}


    </div>
  )
}

export default Review