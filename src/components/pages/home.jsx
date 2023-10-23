import React, {Component} from 'react';
import {useNavigate} from 'react-router-dom';
import studing from '../../assets/studing-at-home.jpg'



export default function Home (){  
    const nav = useNavigate();
   

return (
    <div className='home-container'>
        <h1>Discover Excellence</h1> 
        <h3>Your journey starts here.</h3> 
            <button className='home-button' onClick={() => nav("/courses")}>Courses list</button>
            <img src={studing} alt="studing" />
            
           
    </div>
    );
}