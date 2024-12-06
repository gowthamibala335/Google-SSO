import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardActions,
  CardHeader,
  TextField,
  Button,
  Box,
} from '@mui/material';
import GoogleSignIn from './googleSignin'; // Assuming GoogleSignIn is a separate component
import { Image } from '@mui/icons-material';
// import voice from "../assets/voice.jpg";
const LoginCard = () => {
  const [emailLogin, setEmailLogin] = useState(false);


  const handleLogin = () => {
    // Handle login logic
    console.log('Login clicked');
  };


  return (
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
          padding: 3,
          boxShadow: 3, // Subtle shadow for depth
          borderRadius: 3, // Rounded corners
          backgroundColor: 'white', // Clean white background
        }}
      >
        <CardHeader
          title="Speech to Text"
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
          {emailLogin ? (
            // Email Login Form
            <>
              <TextField
                autoFocus
                margin="dense"
                label="Email"
                fullWidth
                variant="outlined"
                type="email"
                sx={{ marginBottom: 2 }}
              />
              <TextField
                margin="dense"
                label="Password"
                fullWidth
                variant="outlined"
                type="password"
                sx={{ marginBottom: 2 }}
              />
            </>
          ) : (
            // Default Login Buttons
            <>
              {/* Google Sign-In Button */}
              <GoogleSignIn />
              {/* <Button
                variant="contained"
                color="secondary"
                fullWidth
                onClick={handleEmailLogin}
                sx={{ marginTop: 2 }}
              >
                Sign in with Email
              </Button> */}
            </>
          )}
        </CardContent>
        <CardActions sx={{ justifyContent: 'center', gap: 2 }}>
          {emailLogin && (
            <Button onClick={handleLogin} color="primary" variant="contained">
              Login
            </Button>
          )}

        </CardActions>
      </Card>
    </Box>
  );
};

export default LoginCard;
