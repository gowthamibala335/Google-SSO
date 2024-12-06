import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';

import MainHeader from './components/header';
import MainPage from './components/Main';
import LoginCard from './components/loginDialog';
import SpeechToText from './components/speech';
function App() {

  return (
    <div>
      {/* <MainHeader/>
      <MainPage /> */}
      {/* <SpeechToText/> */}
      <Routes>
        <Route path="/" element={<LoginCard />} />
        <Route path="/MainPage" element={<MainPage />} />
      </Routes>
    </div>
    
  );
}

export default App;
