import React, {useState,useEffect} from 'react'
import ReactStars from 'react-stars';
import { getDocs } from 'firebase/firestore';
import { moviesRef } from './firebase/firebase';
import { ThreeDots } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
function Cards() {
  const [data,setData]=useState([]);
  const [loading,setLoding]=useState(false);

  useEffect(()=>{
    async function getData(){
      setLoding(true);
      const _data= await getDocs(moviesRef);
      _data.forEach((doc)=>{
        setData((prv)=>[...prv, {...(doc.data()),id:doc.id}])
      })
      setLoding(false);

    }
    getData();
  },[])
  
  return (

    <div className='flex flex-wrap justify-between px-3 mt-2'>
    {loading ? <div className='w-full flex justify-center items-center h-96'> <ThreeDots height={40} color='white'/></div>:

      data.map((e,i)=>{
        return(

     
    <Link to={`/detail/${e.id}`}>    <div key={i} className='card  font-medium  shadow-lg p-2 hover:-translate-y-4 cursor-pointer mt-6 transition-all duration-500'>
        <img className='h-60 md:72' src={e.image}/>
         {e.title}
        <h1><span className='text-gray-500 mr-2'>Rating:</span> 
        <ReactStars
        count={5}
        // onChange={ratingChanged}
        size={24}
        color2={'#ffd700'}
        value={e.rating/e.rated}
        edit={false}
        />
        
        </h1>
        <h1><span className='text-gray-500'>Year:</span> {e.year}</h1>

        </div></Link> 
       
        
            )
      })
          
  
  }
         
     
    </div>
  )
}

export default Cards