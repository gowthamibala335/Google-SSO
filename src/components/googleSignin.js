import React, { useState, useEffect } from "react";                        
import { googleLogout, useGoogleLogin } from '@react-oauth/google';                  
import axios from 'axios';
import { Avatar, Button, IconButton, AppBar, Toolbar, Typography,
  Card,CardContent,CardActions,CardHeader, Box} from "@mui/material";            
import miracleLogo from '../assets/miracle-logo-white.svg';
import googleLogo from '../assets/google-logo.png'


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

  const logOut = () => {
    googleLogout();
    setProfile(null); 
  };

  return (
    <>
      <Box display="flex" flexDirection="column" minHeight="100vh" height="auto" overflow="auto">

        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static" style={{ background: '#282828' }}>
            <Toolbar>
              <img
                src={miracleLogo}
                alt="Logo"
                style={{ width: 156, marginRight: 10, height: 65 }}
              />
              <div style={{ flexGrow: 1 }} />
              {profile && (
                <Button color="inherit" onClick={logOut} style={{ fontWeight: 600 }}>
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
            minHeight: '80vh',
          }}
        >
          <Card
            sx={{
              maxWidth: 400,
              height: 282,
              width: 320,
              padding: 3,
              borderRadius: 3,
              backgroundColor: 'white',
              boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)'

            }}
          >

            <CardHeader
              title="Google SSO"
              sx={{
                textAlign: 'center',
                fontWeight: 'bold',
                color: 'rgb(40, 40, 40)',
              }}
            />
            <br></br>
            <CardContent sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'flex-start',
              height: '100%',
              paddingBottom: '10px',
            }}>


              {!profile ?
                <>
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={login}
                    style={{
                      backgroundColor: 'white',
                      color: '#4285F4',
                      fontWeight: 'bold',
                      border: '1px solid #4285F4',
                      textTransform: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '10px',
                      boxShadow: "initial"
                    }}
                  >
                    <img
                      src={googleLogo}
                      alt="Logo"
                      style={{
                        width: 38,
                        height: 38,
                        marginRight: -12,
                        position: 'relative',
                        left: -40,
                      }}
                    />
                    Sign in with Google
                  </Button>
                  <Typography style={{ paddingTop: '18%', color: '#0b57d0' }}>
                    Welcome!
                    Sign in quickly and securely using your Google account.
                  </Typography>
                </> :
                <>
                  <IconButton sx={{ p: 0 }}>
                    <Avatar alt={profile.name} src={profile.picture} sx={{
                      width: 100, 
                      height: 100, 
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