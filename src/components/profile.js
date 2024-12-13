import React, { useState } from "react";
import { Avatar, AppBar, Toolbar, Typography, Box, Grid, Paper, List, ListItem, ListItemAvatar, ListItemText, Button, Divider, IconButton, Tooltip } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import BadgeIcon from '@mui/icons-material/Badge';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import LogoutIcon from '@mui/icons-material/Logout';
// Utility function to convert text to title case
const toTitleCase = (str) => {
  const lowerCaseWords = ['a', 'an', 'and', 'but', 'for', 'nor', 'of', 'on', 'or', 'so', 'the', 'to', 'up', 'yet'];

  return str
    .split(' ') // Split the string into words
    .map((word, index) => {
      // Capitalize first and last word, or any word that isn't in the exceptions list
      if (index === 0 || index === str.split(' ').length - 1 || !lowerCaseWords.includes(word.toLowerCase())) {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      }
      return word.toLowerCase(); // For lower-case words (except first/last), return them in lowercase
    })
    .join(' '); // Join the words back together with spaces
};
const Profile = ({ profile, sendData }) => {
  const [userProfile, setUserProfile] = useState(profile)

  const logOut = () => {
    sendData(null)
    setUserProfile(null);
  };
  return (
    <Box display="flex" flexDirection="column" height="84vh" overflow="hidden">
      {/* AppBar */}
      <AppBar position="static" sx={{ background: '#00aae7' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold', fontFamily: '"Open Sans", sans-serif' }}>
            Welcome, {toTitleCase(userProfile.name)}
          </Typography>
          <Tooltip title="Logout">
            <IconButton sx={{color:"#fff"}} onClick={logOut}>
              <LogoutIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box flexGrow={1} padding={4} bgcolor="#f4f4f4" overflow="auto">
        <Grid container spacing={4}>
          {/* User Profile Section */}
          <Grid item xs={12} md={4} >
            <Paper elevation={12} sx={{
              padding: 3,
              textAlign: "center",
              borderRadius: 5,
              boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.1)',
              background: '#ffffff',
              color: '#333',
              height: '86%'
            }}>
              <Avatar
                src={userProfile.picture}
                alt={userProfile.name}
                sx={{
                  width: 100,
                  height: 100,
                  margin: "auto",
                  mb: 3,
                  border: '4px solid #00aae7',
                  boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.1)',
                  marginTop: '20px',
                  marginBottom: '40px',
                }}
              />
              <Typography variant="h5" fontWeight="bold" sx={{ color: '#00aae7', fontSize: '1.6rem', fontFamily: '"Open Sans", sans-serif' }}>
                {toTitleCase(userProfile.name)}
              </Typography>
              <Typography variant="body1" sx={{ color: '#888', fontSize: '1rem', marginBottom: 3, fontFamily: '"Open Sans", sans-serif' }}>
                {userProfile.email}
              </Typography>
            

            </Paper>
          </Grid>
          <Grid item xs={12} md={8}>
            <Paper elevation={12} sx={{
              padding: 3,
              borderRadius: 5,
              boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.1)',
              background: '#ffffff'
            }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#00aae7', fontFamily: '"Open Sans", sans-serif' }}>
                User Details
              </Typography>
              <Divider sx={{ marginBottom: 2 }} />
              <List sx={{ paddingTop: 0 }}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar sx={{ backgroundColor: '#00aae7' }}>
                      <AccountCircleIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Name"
                    secondary={toTitleCase(userProfile.name) || "N/A"}
                    style={{
                      fontFamily: '"Open Sans", sans-serif',
                    }}
                  />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar sx={{ backgroundColor: '#00aae7' }}>
                      <AlternateEmailIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Email"
                    secondary={userProfile.email || "N/A"}
                  />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar sx={{ backgroundColor: '#00aae7' }}>
                      <BadgeIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Google ID"
                    secondary={userProfile.id || "N/A"}
                  />
                </ListItem>
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Box>


    </Box>
  );
};

export default Profile;
