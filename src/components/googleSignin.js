import React, { useState, useEffect } from "react";
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import {Button, AppBar, Toolbar, Typography,Card, CardContent, CardActions,Box } from "@mui/material";
import miracleLogo from '../assets/miracle-logo-white.svg';
import DSlogo from '../assets/ds-24-logo-light.svg';
import googleLogo from '../assets/google-logo.png'
import ProfileDetails from "./profile";
import './googleSignin.css';
const GoogleSignIn = () => {

  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [profile, setProfile] = useState(() => {
    const storedProfile = localStorage.getItem("profile");
    return storedProfile ? JSON.parse(storedProfile) : null;
  });

  // Google Login Functionality
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      setUser(codeResponse);
      localStorage.setItem("user", JSON.stringify(codeResponse));
    },
    onError: (error) => alert('Login Failed:', error),
  });

  useEffect(() => {
    // Fetch profile information if user is logged in
    if (user && !profile) {
      axios
        .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
            Accept: 'application/json',
          },
        })
        .then((res) => {
          setProfile(res.data);
          localStorage.setItem("profile", JSON.stringify(res.data));
        })
        .catch((err) => alert(err));
    }
  }, [user, profile]);

  // Logout Functionality
  const logOut = (data) => {
    googleLogout();
    setUser(data);
    setProfile(data);
    localStorage.removeItem("user");
    localStorage.removeItem("profile");
  };

  return (
    <>
      <Box display="flex" flexDirection="column" minHeight="100vh" height="auto" overflow="auto">
        <Box sx={{ flexGrow: 1 }}>
          <AppBar
            position="static"
            elevation={1}
            sx={{
              background: '#fffffff2',
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              zIndex: 1000,
            }}
          >
            <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <img
                  src={miracleLogo}
                  alt="Miracle Logo"
                  style={{
                    width: 156,
                    marginRight: 10,
                    height: 65,
                  }}
                />
              </Box>

              {profile && <Typography
                variant="h6"
                fontFamily='"Open Sans", sans-serif'
                sx={{
                  fontSize: "1.5rem",
                  fontWeight: 400,
                  textAlign: "center",
                  color: "#00aae7",
                  flex: 1,
                }}
              >
                <b>Automobile Dashboard</b>
              </Typography>}

              <Box sx={{ display: "flex", alignItems: "center" }}>
                <img
                  src={DSlogo}
                  alt="DS Logo"
                  style={{
                    height: 40,
                  }}
                />
              </Box>
            </Toolbar>
          </AppBar>
        </Box>

        {!profile ? <Box
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

            <Typography variant="h6" fontFamily='"Open Sans", sans-serif' fontSize={15} component="div" style={{ color: '#00aae7', margin: 0, fontWeight: 400, fontSize: '1.5rem', lineHeight: 1.334, textAlign: 'center', }} >
              <b>Google SSO <span style={{ color: '#282828' }}>Authentication</span></b>
            </Typography>
            <Typography fontFamily='"Open Sans", sans-serif' fontWeight={400} style={{ paddingTop: '12%', color: '#00aae7',textAlign:'justify' }}>
            <span style={{color:"#00aae7",fontWeight:600}}>"Log in securely and effortlessly using Google Single Sign-On (SSO)"</span>. With just one click, access your account without the need to remember multiple passwords. 
            Enjoy seamless and reliable authentication powered by Google's trusted infrastructure.
            </Typography>
            <br></br>
            <CardContent sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'flex-start',
              height: '100%',
              paddingTop: '30px',
            }}>
              <Button
                variant="contained"
                fullWidth
                onClick={login}
                style={{
                  backgroundColor: 'white', color: '#00aae7', fontWeight: 'bold', border: '1px solid #00aae7', textTransform: 'none',
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
                  }} />
                Sign in with Google
              </Button>
            </CardContent>
            <CardActions sx={{ justifyContent: 'center', gap: 2 }}>
            </CardActions>
          </Card>
        </Box> : <ProfileDetails profile={profile} sendData={logOut} />}

        <Box component="footer" sx={{
          backgroundColor: "#282828",
          padding: 1,
          textAlign: "center",
          marginTop: "auto",
          position: "fixed",
          bottom: 0,
          width: "100%",
        }}>
          <Typography variant="body2" color="white" fontFamily='"Open Sans", sans-serif' >
            Built by Miracle Software Systems, Inc.
          </Typography>
        </Box>
      </Box>
    </>
  )
}

export default GoogleSignIn