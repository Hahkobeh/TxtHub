import React, {useState , useContext, useEffect} from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import Message from '../components/wordle/Message';
import { useNavigate } from 'react-router-dom';
import {BsPlusCircle} from 'react-icons/bs';
import {GiCancel} from 'react-icons/gi';
import Backdrop from '../components/wordle/Backdrop';
import NewChallenge from './NewChallenge';
import {ChallengeContext} from '../ChallengeContext';
import ChallengeConfirm from './ChallengeConfirm';

import './ChallengePage.scss';

function ChallengePage(){
    
    const currentName = localStorage.getItem('username');
    const {currentChallenge, setCurrentChallenge} = useContext(ChallengeContext);

    let challengeId;
    const [c, setC] = useState([]);
    const [f, setF] = useState([]);

    useEffect(() => {
        SetUp();
    }, []);


    async function SetUp(){
        await axios.get(`http://localhost:8081/challenge/api/v1/current/${currentName}`)
            .then(res=> { 
                
                setC(res.data);
                
        });
        await axios.get(`http://localhost:8081/challenge/api/v1/finished/${currentName}`)
            .then(res=> { 
                
                setF(res.data);
                
        });
    }

    
    
    let navigate = useNavigate();
    const [waiting, setWaiting] = useState(false);

    const [newChallenge, setNewChallenge] = useState(false);

    function clickChallenge(challenge){
        setWaiting(false);

        if(challenge.userScore !== -999){
            
            setWaiting(true);
            
        }else{

            localStorage.setItem('currentChallenge', challenge.challengeId);
            
            if(challenge.game === "Wordle"){
                //setCurrentChallenge(c[id]);
                navigate('/wordle');
            }else if(challenge.game === "Anagrams"){
                //setCurrentChallenge(c[id]);
                navigate('/anagrams');
            }

        }
    }  

    const [optionOpen, setOptionOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState([]);

    function challengeHandler(){
        SetUp();
        setNewChallenge(!newChallenge);
    }

    function optionHandler(challenge){

        if(challenge.userScore === -999){
            setOptionOpen(true);
        }

        
        setSelectedOption(challenge);

    }

    function playHandler(){
        console.log('play handler clicked');

        clickChallenge(selectedOption);
    }  

    async function delHandler(){
        console.log('del handler clicked');

      
        console.log(selectedOption.challengeId);
        await axios.delete(`http://localhost:8081/challenge/api/v1/delete/${selectedOption.challengeId}`);
        

        SetUp();
        setOptionOpen(false);
    }

    function optionClose(){
        setOptionOpen(false);
    }

    return(
        <div>
            <Layout/>

            {optionOpen && <ChallengeConfirm playHandler={playHandler} delHandler={delHandler} handler={optionClose} button={<GiCancel/>}/>}
            {optionOpen  && <Backdrop onCancel={optionClose}/>}
            
            {newChallenge && <NewChallenge button={<GiCancel/>} handler={challengeHandler}/>}
            {newChallenge && <Backdrop onCancel={challengeHandler}/>}


            {waiting && <Message title='Waiting for opponent to play'/>}

            <div className='add' onClick={challengeHandler}>
                <BsPlusCircle size={40}/>
            </div>
            <div className='challenge-cont'>

                <div className='challenge-header'>
                    <h1>Ongoing Challenges</h1>
                </div>
                <div className="challenge-container">

                    <ul className='labels'>
                        <li><h3>Challenge</h3></li>
                        <li><h3>Opponent</h3></li>
                        <li><h3>Opp Score</h3></li>
                        <li><h3>Your Score</h3></li>
                    </ul>
                    <hr/>
                    
                    {c.map(function(c, index){
                        return <div onClick={() => optionHandler(c)}>
                            <ul className='challenge' >


                                <li>{c.game}</li>
                                <li>{c.opponent}</li>
                                {c.opScore !== -999 && <li>{c.opScore}</li>}
                                {c.opScore === -999 && <li>---</li>}
                                                            
                                {c.userScore !== -999 && <li>{c.userScore}</li>}
                                {c.userScore === -999 && <li>---</li>}

                            </ul>

                        </div>
                    })}


                </div>

            </div>

            <div className = 'challenge-cont'>
                <div className='challenge-header'>
                    <h1>Finished Challenges</h1>
                </div>
                <div className="challenge-container">

                    <ul className='labels'>
                        <li><h3>Challenge</h3></li>
                        <li><h3>Opponent</h3></li>
                        <li><h3>Opp Score</h3></li>
                        <li><h3>Your Score</h3></li>
                    </ul>
                    <hr/>
                    
                    {f.map(function(f, index){
                        return <div>
                            <ul className={f.opScore < f.userScore ? 'challenge-f win' : 'challenge-f loss'} id={f.opScore === f.userScore ? 'tie' : ''} >
                                <li>{f.game}</li>
                                <li>{f.opponent}</li>
                                <li>{f.opScore}</li>
                                <li>{f.userScore}</li>

                            </ul>

                        </div>
                    })}


                </div>
            </div>

            


        </div>
    );


}

export default ChallengePage;