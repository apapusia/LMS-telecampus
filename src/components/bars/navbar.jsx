import * as React from 'react';
import { supabase } from '../../supabaseClient'
import {BrowserRouter, Link} from 'react-router-dom'; 
import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import CastForEducationIcon from '@mui/icons-material/CastForEducation';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Menu from "@mui/material/Menu";
import MenuIcon from '@mui/icons-material/Menu';

export default function Navbar() {
    const [session, setSession] = useState(null);
    const [menuItems, setmenuItems] = useState(null);
    const nav = useNavigate();
    const pages = [
        { name: "Dashboard", url: "/dashboard" },
        { name: "Other courses", url: "/courses-list" },
        { name: "Todo list", url: "/my-tasks" },
      ];
  
    useEffect(() => {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session)
      })
  
      supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session)
      })
    }, [])

    const openMenuToolTip = (event) => {
        setmenuItems(event.currentTarget);
     };
     const closeMenuToolTip = () => {
        setmenuItems(null);
     };
      
      
    async function handleSignOut(){
      const { error } = await supabase.auth.signOut()
      nav("/");
    }
    if (!session) {
        return (
            <Box sx={{ flexGrow: 1 }}>
              <AppBar position="static" color="secondary">
                <Toolbar>
                  <CastForEducationIcon id='logo' />
                  <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                  >
                    <MenuIcon />
                  </IconButton>
                  
                  <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    
                  </Typography>
                  <Link className='login-label' to='/login'>Login</Link>
                </Toolbar>
              </AppBar>
            </Box>
          );
      } else {
        return (
        <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="secondary">
            <Toolbar>
              <Link to="/dashboard">
                  <CastForEducationIcon id='logo' />
              </Link>
            <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick = {openMenuToolTip}
            >
                <MenuIcon />
            </IconButton>
            <Menu
                  anchorEl = {menuItems}
                  open = {Boolean(menuItems)}
                  onClose = {closeMenuToolTip}
               >
            <Box sx={{
          display: 'flex',
          alignItems: 'flex-start',
          flexDirection: 'column',
          p: 1,
          m: 1,
          bgcolor: 'background.paper',
          borderRadius: 1,
        }}>
            {pages.map((page, index) => (
              <Link
                key={index}
                to={page.url}
                style={{
                  padding: "6px 4px",
                  color: "default",
                  textDecoration: "none",
                }}
              >
                {page.name}
              </Link>
            ))}
            </Box>
               </Menu>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            
            </Typography>            
            <Button color="inherit" onClick={() => handleSignOut()}>Sign out</Button>
            </Toolbar>
        </AppBar>
        </Box>
  );        
      };    
}