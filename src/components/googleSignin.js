import React, { useState,useEffect } from "react";
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { Avatar, Button, IconButton } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography } from '@mui/material';
import miracleLogo from '../assets/miracle-logo-white.svg'; 
import googleLogo from '../assets/google-logo.png'

import {
  Card,
  CardContent,
  CardActions,
  CardHeader,
  Box,
} from '@mui/material';

const GoogleSignIn = () =>{
    const [user, setUser] = useState(null); // Initialize user state as null, not empty array
    const [profile, setProfile] = useState(null); // Initialize profile state as null
   
    const login = useGoogleLogin({
      onSuccess: (codeResponse) => {
        setUser(codeResponse);

      },
      onError: (error) => {
        console.log('Login Failed:', error);
      },
      redirectUri: 'http://localhost:3000', 
    });
  
    useEffect(() => {
      console.log(profile);
      
      if (user?.access_token) { // Check if the user has access_token
        axios
          .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: 'application/json',
            },
          })
          .then((res) => {
            console.log(res,"res");
            
            setProfile(res.data);
          })
          .catch((err) => console.log('Error fetching profile:', err));
      }
    }, [user]); // Run effect when 'user' changes
  
    // Log out function
    const logOut = () => {
      googleLogout();
      setProfile(null); // Reset profile on logout
    };
  
return(
    <>
      {/* <Box display="flex" flexDirection="column" minHeight="90vh" height="100%"> */}
      <Box display="flex" flexDirection="column" minHeight="100vh" height="auto" overflow="auto">

       <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" style={{background:'#282828'}}>
            <Toolbar>
  <img
    src={miracleLogo}
    alt="Logo"
    style={{ width: 156, marginRight: 10, height: 65 }}
  />
  <div style={{ flexGrow: 1 }} />  {/* This will push the Logout button to the right */}
  {profile && (
    <Button color="inherit" onClick={logOut} style={{fontWeight:600}}>
      LogOut
    </Button>
  )}
</Toolbar>

            </AppBar>
           
           
            
        </Box>

    <Box
  sx={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '80vh', // Adjusted to allow proper spacing
  }}
>

     
      <Card
  sx={{
    maxWidth: 400,
    height: 300,
    width: 320,
    padding: 3,
    // boxShadow: '0px 4px 15px rgba(0, 124, 240, 0.5), 0px 8px 20px rgba(0, 223, 216, 0.6), 0px 12px 25px rgba(255, 0, 128, 0.7)', // Gradient colors applied to box shadow
    borderRadius: 3, // Rounded corners
    backgroundColor: 'white', // Clean white background

    boxShadow:'0px 4px 15px rgba(0, 0, 0, 0.2)'

  }}
>

<CardHeader
  title="Google SSO"
  sx={{
    textAlign: 'center',
    fontWeight: 'bold',  // This makes the font bold
    color: 'rgb(40, 40, 40)', // Dark color for the title
  }}
/>
<br></br><br></br><br></br>
        <CardContent sx={{
display: 'flex',
flexDirection: 'column',
alignItems: 'center', // Align items horizontally to center
justifyContent: 'flex-start', // Align to the start vertically
height: '100%', // Full height of the CardContent
paddingBottom: '10px', // Optional: add padding at the bottom
}}>


{!profile ? <><Button
variant="contained"
color="primary"
fullWidth
onClick={login}
style={{ marginBottom: '10px' }}
>
  <img
    src={googleLogo}
    alt="Logo"
    style={{ width: 46, marginRight: -12, height: 48,position:'relative',left:-40 }}
  />
Sign in with Google
</Button> 

<Typography style={{paddingTop:'10%',color:'#0b57d0'}}>
Welcome!
Sign in quickly and securely using your Google account.

</Typography>
</>:
<>





<IconButton sx={{ p: 0 }}>
<Avatar alt="Remy Sharp" src={profile.picture} sx={{
width: 100, // Set the width
height: 100, // Set the height
borderRadius: 50,

}} />

</IconButton>
<Typography variant="h6" fontSize={15} component="div" >
<br></br>
<b>User Name :</b> {profile.name}
</Typography>
<Typography variant="h6" fontSize={15} component="div" >
<b>Email:</b> {profile.email}
</Typography>

</>}
</CardContent>
        
        <CardActions sx={{ justifyContent: 'center', gap: 2 }}>
       

        </CardActions>
      </Card>
    </Box>
    <Box component="footer" bgcolor="#282828" padding={2} textAlign="center">
        <Typography variant="body2" color="white">
        Built by Miracle Software Systems, Inc.
        </Typography>
      </Box>
      </Box>
    </>
)
}

export default GoogleSignIn