import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { supabase } from '../../supabaseClient'
import { useState, useEffect } from 'react' 


export default function SidebarComponent(){
  const [session, setSession] = useState(null);

  const {
    data } = supabase.auth.onAuthStateChange((_event, session) => {
    setSession(session);
  });  

    if (!session) {
      return (
          <div>  </div>
      );
    } else {
      return(
      <div className='sidebar'>
        <ul>
          <li><Link to='/courses-list'>Other courses</Link></li>
          <li><Link to='/dashboard'>Dashboard</Link></li>
          <li><Link to='/quiz'>quiz</Link></li>
          <li><Link to='/my-tasks'>My tasks</Link></li>
       
        </ul>
      </div>   
      );
      
    };


  }