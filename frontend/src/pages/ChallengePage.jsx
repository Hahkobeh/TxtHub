import React, {useState , useContext} from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import Message from '../components/wordle/Message';
import { useNavigate } from 'react-router-dom';
import {BsPlusCircle} from 'react-icons/bs';
import {GiCancel} from 'react-icons/gi';
import Backdrop from '../components/wordle/Backdrop';
import NewChallenge from './NewChallenge';
import {ChallengeContext} from '../ChallengeContext';

import './ChallengePage.scss';

var c = [ ["Wordle" , "Jacob", "--", 10], ["Wordle" , "Jacob", 5, "--"], ["Wordle" , "Jacob", 5, "--"]]

function ChallengePage(){

    const {currentChallenge, setCurrentChallenge} = useContext(ChallengeContext);

    let challengeId;
    const [c, setC] = useState([]);

    SetUp();

    async function SetUp(){
        await axios.get()
            .then(res=> { 
                setC(res.data);
        });
    }

    
    
    let navigate = useNavigate();
    const [waiting, setWaiting] = useState(false);

    const [newChallenge, setNewChallenge] = useState(false);

    function clickChallenge(id){
        setWaiting(false);

        if(c[id].userScore !== '--'){
            setWaiting(true);
            
        }else{

            localStorage.setItem('currentChallenge', c[id]);

            if(c[id].game === "Wordle"){
                //setCurrentChallenge(c[id]);
                navigate('/wordle');
            }else if(c[id].game === "Anagrams"){
                //setCurrentChallenge(c[id]);
                navigate('/anagrams');
            }

        }
    }  

    function challengeHandler(){
        setNewChallenge(!newChallenge);
    }

    return(
        <div>
            <Layout/>

            {newChallenge && <NewChallenge button={<GiCancel/>} handler={challengeHandler}/>}
            {newChallenge && <Backdrop onCancel={challengeHandler}/>}


            {waiting && <Message title='Waiting for opponent to play'/>}

            <div className='add' onClick={challengeHandler}>
                <BsPlusCircle size={40}/>
            </div>

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
                
                {c.map(function(c){
                    return <div onClick={() => clickChallenge(c.id)}>
                        <ul className='challenge' >
                            <li>{c.game}</li>
                            <li>{c.opponent}</li>
                            <li>{c.opScore}</li>
                            <li>{c.userScore}</li>
                            
                        </ul>

                    </div>
                })}


            </div>


        </div>
    );


}

export default ChallengePage;