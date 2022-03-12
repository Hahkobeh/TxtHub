import './Anagrams.scss';
import React, {useState} from 'react';
import {FaBackspace, FaRedo} from 'react-icons/fa';
import {AiOutlineQuestionCircle} from 'react-icons/ai';
import axios from "axios";

import Layout from '../Layout';


var letterList = ['r', 'a', 't', 'e', 's'];
var currentGuess = [];
var wordsList = ['rat', 'rate', 'ate', 'rates', 'seat', 'tears', 'tea']; 
var currentScore = 0; 

function Anagrams(){
    const [instructions, setInstructions] = useState(true);
    const [playingGame, setPlayingGame] = useState(false);
    const [timer, setTimer] = React.useState(0);

    React.useEffect(() => {
        timer > 0 && setTimeout(()=> setTimer(timer - 1), 1000);
    }, [timer]);

    function startGame(){
      
        setPlayingGame(true);
        setTimer(60);
     
    }

    function enterWord(){

    }

    function letterClick(){

    }

    function removeLetter(){
        
    }

    var wordsGuessed = new Array(wordsList.length).fill(null);
    var letterCombo = new Array(5).fill(null);

    const changeInstructions = () => setInstructions(!instructions);


    return(
        <div>

            <Layout Game={<h1 className="game-name">Anagrams <AiOutlineQuestionCircle className='help' onClick = {changeInstructions}/></h1>}/>
            
            {playingGame && <button className = 'stateB' id = 'quitButton'>Quit Game</button>}
            {!playingGame && <button className = 'stateB' onClick={startGame} id = 'startButton'>Start Game</button>}

            <div id ='anagram-option-container'>
                <div id = 'anagram-menu'>
                    {playingGame && <p className='timer'>{timer}</p>}
                    {playingGame && <button className = 'stateB' id = 'skipButton'>Skip (-5s)</button>}
                </div>
                
            </div>
            
           

        </div>
    )
}

export default Anagrams; 