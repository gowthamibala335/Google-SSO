import React, { useState, useEffect } from "react";                        
import { googleLogout, useGoogleLogin } from '@react-oauth/google';                  
import axios from 'axios';
import { Avatar, Button, IconButton, AppBar, Toolbar, Typography,
  Card,CardContent,CardActions,CardHeader, Box} from "@mui/material";            
import miracleLogo from '../assets/miracle-logo-white.svg';
import DSlogo from '../assets/ds-24-logo-light.svg';
import googleLogo from '../assets/google-logo.png'
import ProfileDetails from "./profile";

const GoogleSignIn = () => {
  
  const [user, setUser] = useState(null); 
  const [profile, setProfile] = useState(null); 
  
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
    if (user?.access_token) { 
      axios
        .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
            Accept: 'application/json',
          },
        })
        .then((res) => {
          setProfile(res.data);
        })
        .catch((err) => console.log('Error fetching profile:', err));
    }
  }, [user]);

  const logOut = (data) => {
    googleLogout();
    setProfile(data); 
  };

  return (
    <>
      <Box display="flex" flexDirection="column" minHeight="100vh" height="auto" overflow="auto">

        <Box sx={{ flexGrow: 1 }}>
          {/* <AppBar position="static" elevation={1} style={{ background: '#fffffff2',position:'fixed' }}>
            <Toolbar>
              <img
                src={miracleLogo}
                alt="Logo"
                style={{ width: 156, marginRight: 10, height: 65 }}
              />

              <div style={{ flexGrow: 1 }} />
              <img
                src={DSlogo}
                alt="Logo"
                style={{ height: 40 }}
              />
             
            </Toolbar>
          </AppBar> */}
          <AppBar position="static" elevation={1} style={{ background: '#fffffff2', position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000 }}>
  <Toolbar>
    <img
      src={miracleLogo}
      alt="Logo"
      style={{ width: 156, marginRight: 10, height: 65 }}
    />

    <div style={{ flexGrow: 1 }} />
    <img
      src={DSlogo}
      alt="Logo"
      style={{ height: 40 }}
    />
  </Toolbar>
</AppBar>

        </Box>
        
        {!profile ?  <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '80vh',
          }}
        >
          <Card
            sx={{
              maxWidth: 400,
              height: 330,
              width: 350,
              padding: 3,
              borderRadius: 3,
              backgroundColor: 'white',
              boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)'

            }}
          >

{/* <CardHeader
title={
<Typography
component="span"
sx={{
fontWeight: 'bold',
textAlign: 'center',
fontSize: '1.5rem', // Adjust the font size as needed
}}
>
<span style={{ color: '#00aae7' }}>Google SSO</span>
<span style={{ color: 'rgb(40, 40, 40)' }}> Authentication</span>
</Typography>
}
sx={{
textAlign: 'center',
}}
/> */}
{/* <CardHeader
title="Google SSO Authentication"
sx={{
textAlign: 'center',
fontWeight: 'bold',
color: 'rgb(40, 40, 40)',
whiteSpace: 'nowrap', // Prevent text from wrapping to the next line
overflow: 'hidden', // Ensure text doesn't overflow the container
textOverflow: 'ellipsis', // Add an ellipsis if the text is too long
}}
/> */}
 <Typography variant="h6" fontFamily='"Open Sans", sans-serif' fontSize={15} component="div" style={{ color:'#00aae7',margin: 0, fontWeight: 400, fontSize: '1.5rem', lineHeight: 1.334,textAlign: 'center', }} >
            <b>Google SSO <span style={{ color:'#282828'}}>Authentication</span></b>
          </Typography>
          <Typography  fontFamily='"Open Sans", sans-serif' fontWeight={600} style={{ paddingTop: '25%', color: '#00aae7' }}>
                    Welcome!
                    Sign in quickly and securely using your Google account.
                  </Typography>
            <br></br>
            <CardContent sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'flex-start',
              height: '100%',
              paddingTop: '70px',
            }}>

              
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={login}
                    style={{ backgroundColor: 'white',color: '#00aae7', fontWeight: 'bold', border: '1px solid #00aae7',textTransform: 'none',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px', boxShadow: "initial"
                    }}>
                    <img
                      src={googleLogo}
                      alt="Logo"
                      style={{
                        width: 38,
                        height: 38,
                        marginRight: -12,
                        position: 'relative',
                        left: -40,
                      }}/>
                    Sign in with Google
                  </Button>
                  
            </CardContent>
            <CardActions sx={{ justifyContent: 'center', gap: 2 }}>
            </CardActions>
          </Card>
        </Box>:
        <ProfileDetails profile = {profile}  sendData = {logOut} />}

        <Box component="footer" bgcolor="#282828" padding={1} textAlign="center">
          <Typography variant="body2" color="white" fontFamily='"Open Sans", sans-serif' >
            Built by Miracle Software Systems, Inc.
          </Typography>
        </Box>
      </Box>
    </>
  )
}

export default GoogleSignIn