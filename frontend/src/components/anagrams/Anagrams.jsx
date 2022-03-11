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
            
            <div className = 'a-game'>

           
            <div className='top-container'>
                
            {!playingGame && <button className = 'stateButton' onClick={startGame} id = 'startButton'>Start Game</button>}
            {playingGame && <button className = 'stateButton' id = 'cancelButton'>Cancel Game</button>}
            {playingGame && timer}
            </div>
            
            <div id='guessList-container'>
            <div id='guessList'> 
                    {wordsGuessed.map(function(arr, index){
                        return <div class="wordBox" id={index}></div>
                    })}
                    
                
                </div>
            </div>

            <div id='currentGuess-container'>
            <div id='currentGuess'> 
                    {letterCombo.map(function(arr, comboIndex){
                        return <div class="letterSquare" id={comboIndex}></div>
                    })}
                    
                
                </div>
            </div>
            
            <div id="letterSet">
            <div className='letterSetRow'>
                    <button_Anagrams onClick= { () => letterClick(1) }id='-1'></button_Anagrams>
                    <button_Anagrams onClick= { () => letterClick(2) }id='-2'></button_Anagrams>
                    <button_Anagrams onClick= { () => letterClick(3) }id='-3'></button_Anagrams>
                    <button_Anagrams onClick= { () => letterClick(4) }id='-4'></button_Anagrams>
                    <button_Anagrams onClick= { () => letterClick(5) }id='-5'></button_Anagrams>
                    <button_Anagrams onClick= { () => removeLetter() }id='-6'><FaBackspace size={20} /></button_Anagrams>
                    <button_Anagrams onClick= { () => enterWord() }id='-7' >↵</button_Anagrams>
                </div>
                
            </div>
                

            </div>
        </div>
    )
}

export default Anagrams; 