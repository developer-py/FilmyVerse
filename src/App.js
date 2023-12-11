import Header from "./components/Header";
import Cards from "./components/Cards";
import { Route,Routes } from "react-router-dom";
import Addmovie from "./components/Addmovie";
import Details from "./components/Details";
import { createContext, useState } from "react";
import Signup from "./components/Signup";
import Login from "./components/Login";
const Appstate=createContext();
function App() {
  const [login,setLogin]=useState();
  const [userName,setUsername]=useState();
  return (
<Appstate.Provider value={{ login,userName,setLogin,setUsername }}>
    <div className="App ">
    <Header/> 
    
    <Routes>
    <Route path="/" element={<Cards/>}/>
    <Route path="add-movie" element={<Addmovie/>}/>
    <Route path="/detail/:id" element={<Details/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/signup" element={<Signup/>}/>
    </Routes>
    
    </div>
    </Appstate.Provider>
  );
}

export default App;
export {Appstate};
