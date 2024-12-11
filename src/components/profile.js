import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, IconButton, Typography } from '@mui/material'
import React from 'react'
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import LogoutIcon from '@mui/icons-material/Logout';
const Profile = ({ profile,sendData  }) => {
  const logOut = () => {
    googleLogout();
    sendData(null)
  };
  return (
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
          maxWidth: 500,
          height: 282,
          width: 500,
          padding: 3,
          borderRadius: 3,
          backgroundColor: 'white',
          boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)'

        }}
      >
        <Box sx={{
          flexGrow: 1,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Typography variant="h6" fontSize={15} component="div" style={{ margin: 0, fontWeight: 400, fontSize: '1.5rem', lineHeight: 1.334, }} >
            <b>Google SSO</b>
          </Typography>
          {/* <CardHeader
        title="Google SSO"
        sx={{
          textAlign: 'center',
          fontWeight: 'bold',
          color: 'rgb(40, 40, 40)',
        }}
      /> */}
          <Button color="inherit" onClick={logOut} style={{ fontWeight: 600 }}>
            < LogoutIcon />
          </Button>
        </Box>

        <CardContent sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          height: '100%',
          paddingBottom: '10px',
        }}>




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

        </CardContent>
        <CardActions sx={{ justifyContent: 'center', gap: 2 }}>
        </CardActions>
      </Card>
    </Box>
  )
}
export default Profile
