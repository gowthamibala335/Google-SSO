import React, { useState,useEffect } from "react";
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import SpeechToText from './speech';
import axios from 'axios';
import { Button } from "@mui/material";
import { useNavigate } from 'react-router-dom';
const GoogleSignIn = () =>{
    const [user, setUser] = useState(null); // Initialize user state as null, not empty array
    const [profile, setProfile] = useState(null); // Initialize profile state as null
    const navigate = useNavigate();
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
            navigate('/MainPage',{state:res.data});
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
    {/* <h2>React Google Login</h2>
      <br />
      <br /> */}
      {/* {profile ? (
        <div>
          <img src={profile.picture} alt='User' style={{width: '100px',  height: 'auto'}} />
          <h3>User Logged In</h3>
          <p>Name: {profile.name}</p>
          <p>Email Address: {profile.email}</p>
          <br />
          <br />
          <button onClick={logOut}>Log out</button>
          <SpeechToText />
        </div>
      ) : ( */}
        {/* // <button onClick={login}>Sign in with Google 🚀</button> */}
          <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={login}
              style={{ marginBottom: '10px' }}
            >
              Sign in with Google
            </Button> 
      {/* )} */}
    </>
)
}

export default GoogleSignIn