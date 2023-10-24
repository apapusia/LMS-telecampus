import React, {Component} from 'react';
import { supabase } from '../../supabaseClient'
import {BrowserRouter, Link} from 'react-router-dom'; 
import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import CastForEducationIcon from '@mui/icons-material/CastForEducation';

export default function Navbar (){  
  const [session, setSession] = useState(null);
  const nav = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])
    
  async function handleSignOut(){
    const { error } = await supabase.auth.signOut()
    nav("/");
  }
  
    if (!session) {
      return (
          <div className='navbar-container'>
              <CastForEducationIcon id='logo' />
            <div className='navbar'>
            <Link to='/login'>Login</Link> 
            </div>
          </div>
      );
    } else {
      return (
        <div className='navbar-container'>
           <Link to="/dashboard"><CastForEducationIcon id='logo'/></Link>
          <div className='navbar'>
            <div>
            <Link to='/profile'>Profile</Link> 
          </div>
          <div>
            <button className='home-button' onClick={() => handleSignOut()}>Sign out</button>
            </div>
          </div>
        </div>
      );
      
    };
};
