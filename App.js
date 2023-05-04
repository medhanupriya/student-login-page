import { useState } from 'react';
import './App.css';
import Stuform from './Stuform';
import Stulist from './Stulist';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {  
    const [editData,setEditData] =useState({}) 
    return (
        <div className="container">      
            <BrowserRouter>
                <Routes>    
                    <Route path="/" element={<Stulist setEditData={setEditData}/>}/>
                    <Route path="/Stuform" element={<Stuform editData={editData}/>} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}
export default App;
