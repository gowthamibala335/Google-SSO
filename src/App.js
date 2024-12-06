import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';

import GoogleSignIn from './components/googleSignin';
function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<GoogleSignIn />} />
      </Routes>
    </div>
    
  );
}

export default App;
