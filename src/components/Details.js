import React,{useState,useEffect} from 'react'
import ReactStars from 'react-stars';
import { useParams } from 'react-router-dom';
import { db } from './firebase/firebase';
import {doc,getDoc} from 'firebase/firestore'
import { ThreeCircles } from 'react-loader-spinner';
import Review from "./Review";

const Details = () => {
  const {id} =useParams();
 
  const [data,setData]=useState({
    title:"",
    year:"",
    image:"",
    description:"",
    rating:0,
    rated:0
  });
const [loading,setLoding]=useState(false)
  useEffect(()=>{
    async function getData(){
      setLoding(true)
      const _doc = doc(db, "movies", id);
   
      const _data=await getDoc(_doc);
    
      setData(_data.data());
      setLoding(false)
    }
    getData();
  },[]);
  return (
    <div className='p-4 mt-4 flex flex-col md:flex-row items-center md:items-start justify-center w-full'>
    {loading?<div className='flex justify-center h-96 items-center '><ThreeCircles /></div>:
      <>
    <img className='h-96 block top-30 mt-3' style={{ position: 'sticky', top: '50px' }} src={data.image}/>
    <div className='md:ml-4 ml-0 w-full md:w-1/2'>
      <h1 className='text-3xl font-bold text-gray-400' >  {data.title} <span className='text-xl'> ({data.year}) </span></h1>
    
  
<ReactStars
        count={5}
        // onChange={ratingChanged}
        size={24}
        color2={'#ffd700'}
        value={data.rating/data.rated}
        edit={false}
        />
      <p className='mt-2'>{data.description}</p>
      <Review id={id} prevRating={data.rating} userRated={data.rated}/>
      </div>
      </>
    }
    </div>
  )
}

export default Details