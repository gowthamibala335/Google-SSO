import React, { useState,useEffect } from "react";
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { Avatar, Button, IconButton } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography } from '@mui/material';
import {
  Card,
  CardContent,
  CardActions,
  CardHeader,
  Box,
} from '@mui/material';
import { Image } from "@mui/icons-material";
// import logo from 'assets/miraclelogo.png';
const GoogleSignIn = () =>{
    const [user, setUser] = useState(null); // Initialize user state as null, not empty array
    const [profile, setProfile] = useState(null); // Initialize profile state as null
    const navigate = useNavigate();
    // const handleLogout = () => {
    //   if(!profile){
    //       navigate('/')
    //       googleLogout();
    //       }
    //   }

    // const [userLogin, setUserLogin] = useState(null); 
    // Google login callback
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
      <Box display="flex" flexDirection="column" minHeight="90vh" height="100%">
       <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                {/* <div  class="col-md-12 text-center"> */}
                  {/* <Image src={logo} width="150px"/></div> */}
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Speech to Text
                    </Typography>
                    {profile &&  <>
                    <Button color="inherit" onClick={logOut}>LogOut</Button></>}
                </Toolbar>
            </AppBar>
           
           
            
        </Box>
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', // Full viewport height
      }}
    >
      <Card
        sx={{
          maxWidth: 400,
          height:300,
          width:300,
          padding: 3,
          boxShadow: 3, // Subtle shadow for depth
          borderRadius: 3, // Rounded corners
          backgroundColor: 'white', // Clean white background
        }}
      >
        <CardHeader
          title="Google SSO"
          sx={{
            textAlign: 'center',
            fontWeight: 'bold',
            color: '#1976d2', // Blue color for the title
          }}
        />
        {/* <Image style={{
          display: 'block',
          maxWidth: '100%',
          width: '100px',height: "100px"}}
        src={voice} alt="Voice"/> */}
        <CardContent>
          
           
      {!profile ? <><Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={login}
              style={{ marginBottom: '10px' }}
            >
              Sign in with Google
            </Button>  </>:
            <>
            <IconButton  sx={{ p: 0 }}>
                        <Avatar alt="Remy Sharp" src={profile.picture} />
                    </IconButton>
            </>}  
             
         
          
        </CardContent>
        <CardActions sx={{ justifyContent: 'center', gap: 2 }}>
       

        </CardActions>
      </Card>
    </Box>
    <Box component="footer" bgcolor="#3f51b5" padding={2} textAlign="center">
        <Typography variant="body2" color="white">
          © 2024 My Application. All rights reserved.
        </Typography>
      </Box>
      </Box>
    </>
)
}

export default GoogleSignIn