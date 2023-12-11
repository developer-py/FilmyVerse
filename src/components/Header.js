import React, { useContext } from "react";
import AddIcon from '@mui/icons-material/Add';
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { Appstate } from "../App";
const Header=()=>{
    const useAppstate=useContext(Appstate);
    return (
        <div className="header text-3xl flex justify-between items-center  font-bold p-3 border-b-2 border-gray-500 sticky top-0 z-10 bg-black">
        <Link to={'/'}> <span> <span className='text-red-500'>Filmy</span>Verse</span> </Link>
        {useAppstate.login ?

            <Link to={'/add-movie'}>
            <h1 className='text-white text-lg flex items-center cursor-pointer'><Button> <AddIcon className="mr-2" color='success' /> <span className="text-white"> Add New</span></Button></h1>
            </Link>
            :
            <Link to={'/login'}>
            <h1 className='text-white bg-green-500 text-lg flex items-center cursor-pointer'><Button>  <span className="text-white font-medium capitalize"> Login</span></Button></h1>
            </Link>
        }
        </div>
    )
}

export default Header