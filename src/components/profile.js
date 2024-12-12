// import React, { useState } from "react";
// import "./ProfileDetails.css";
// import { Avatar, IconButton, Typography } from '@mui/material';
// import { Dashboard } from "./Dashboard";

// const ProfileDetails = ({ profile, sendData }) => {
//   const [isCardVisible, setIsCardVisible] = useState(false);

//   const handleLogout = () => {
//     console.log("User logged out");
//     sendData(null);
//   };

//   const toggleProfileCard = () => {
//     setIsCardVisible((prev) => !prev);
//   };

//   return (
//     <div className="profile-container">
//       {/* Profile Logo */}
//       <div className="profile-logo">
//         <IconButton onClick={toggleProfileCard}>
//           <Avatar
//             alt={profile.name}
//             src={profile.picture}
//             sx={{
//               width: 50,
//               height: 50,
//             }}
//           />
//         </IconButton>
//       </div>

//       {/* Profile Card */}
//       {isCardVisible && (
//         <div className="profile-card-container">
//           <div className="profile-card">
//             <div className="profile-header">
//               <IconButton sx={{ p: 0 }}>
//                 <Avatar
//                   alt={profile.name}
//                   src={profile.picture}
//                   sx={{
//                     width: 80,
//                     height: 80,
//                     borderRadius: 50,
//                     boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
//                   }}
//                 />
//               </IconButton>
//             </div>
//             <div className="profile-content">
//               <Typography variant="h6" component="div" fontSize={18} fontFamily='"Open Sans", sans-serif'>
//                 {profile.name}
//               </Typography>
//               <Typography variant="body2" component="div" fontSize={14} fontFamily='"Open Sans", sans-serif'>
//                 {profile.email}
//               </Typography>
//               <button className="logout-button" onClick={handleLogout}>
//                 Logout
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//       {/* <Dashboard /> */}
//     </div>
//   );
// };

// export default ProfileDetails;
import React, { useState } from "react";
import "./ProfileDetails.css";
import { Avatar, IconButton, Typography } from '@mui/material';
import Dashboard from './Dashboard';

const ProfileDetails = ({ profile, sendData }) => {
  const [isCardVisible, setIsCardVisible] = useState(false);

  const handleLogout = () => {
    console.log("User logged out");
    sendData(null);
  };

  const toggleProfileCard = () => {
    setIsCardVisible((prev) => !prev);
  };

  return (
    <div className="profile-container">
      {/* Profile Logo */}
      <div className="profile-logo">
        <IconButton onClick={toggleProfileCard}>
          <Avatar
            alt={profile.name}
            src={profile.picture}
            sx={{
              width: 50,
              height: 50,
            }} style={{marginTop:'117%'}}
          />
        </IconButton>
      </div>

      {/* Profile Card */}
      {isCardVisible && (
        <div className="profile-card-container">
          <div className="profile-card">
            <div className="profile-header">
              <IconButton sx={{ p: 0 }}>
                <Avatar
                  alt={profile.name}
                  src={profile.picture}
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: 50,
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                  }}
                />
              </IconButton>
            </div>
            <div className="profile-content">
              <Typography variant="h6" component="div" fontSize={18} fontFamily='"Open Sans", sans-serif'>
                {profile.name}
              </Typography>
              <Typography variant="body2" component="div" fontSize={14} fontFamily='"Open Sans", sans-serif'>
                {profile.email}
              </Typography>
              <button className="logout-button" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Dashboard Component */}
      <br></br>
      <Dashboard />
    </div>
  );
};

export default ProfileDetails;
