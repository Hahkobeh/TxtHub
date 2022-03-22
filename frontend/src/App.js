import React, { useState, useMemo } from 'react';
import {Route, Routes } from 'react-router-dom';

import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/account/LoginPage';
import SignupPage from './pages/account/SignupPage';
import PResetPage from './pages/account/PResetPage';
import Wordle from './components/wordle/Wordle';
import Anagrams from './components/anagrams/Anagrams';
import ScoreBoard from './pages/ScoreBoard';
import ChallengePage from './pages/ChallengePage';
import { UserContext } from './UserContext';
import TBA from './components/TBA/TBA'
import { ChallengeContext } from './ChallengeContext';

function App() {

  const [user, setUser] = useState(null);
  const [currentChallenge, setCurrentChallenge] = useState(null);

  
  const providerValue = useMemo( ()=> ({user, setUser}), [user, setUser]);
  const providerTwoValue = useMemo( ()=> ({currentChallenge, setCurrentChallenge}), [currentChallenge, setCurrentChallenge]);
  return (
    
    <div>
      
      <UserContext.Provider value = {providerValue}>
        <ChallengeContext.Provider value = {providerTwoValue}>

        
        <Routes>

          <Route path='/' element={<HomePage/>}/>

          <Route path='/scoreboard' element={<ScoreBoard/>}/>

          <Route path='/challenges' element={<ChallengePage/>}/>
          
          <Route path='/login' element={<LoginPage/>}/>

          <Route path='/signup' element={<SignupPage/>}/>

          <Route path='/password-reset' element={<PResetPage/>}/>

          <Route path='/profile' element={<ProfilePage/>}/>

          <Route path='/wordle' element={<Wordle/>}/>

          <Route path='/anagrams' element={<Anagrams/>}/>

          <Route path='/tba' element={<TBA/>}/>

        </Routes>
        </ChallengeContext.Provider>
      </UserContext.Provider>
    </div>
  );
}

export default App;
