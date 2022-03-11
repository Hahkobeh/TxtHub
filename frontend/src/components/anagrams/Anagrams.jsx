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

    function startGame(){
        //add functionality to alter letterList elements to something from the list
        //begin the game timer
        startTimer(); 
        for (let i = -1; i >= -5; i-=1)
        {
            document.getElementById(i).textContent = letterList[(i * -1) -1]; 
        }
        document.getElementById('startButton').style.visibility = "hidden";
        
    }

    function startTimer(){
        var start = Date.now();
        var timer = document.getElementById('timer');
        (
            function f(){
            var diff=Date.now()-start
            var nanoSec=(((6e4-diff)/1e3)>>0)
            var min=(nanoSec/60)>>0
            var sec=nanoSec-min*60;
            timer.textContent=min + ':' +((''+sec).length>1?'':'0')+sec;
            if(diff>6e4){
                start=Date.now();
                timer.textContent = "Times UP!";
                return; 
            }
        setTimeout(f,1e3);
        })
        ();
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
            
            {/*<div className ='top-container'>
                <div className='startButton' onClick={startGame} id = 'startButton'>
                    <h1>Start Game</h1>
                </div>
                <div className='timer' id = 'timer'></div>
            </div>*/}
            
            <div className='top-container'>
                <button className = 'button' onClick={startGame} id = 'startButton'>Start Game</button>

                <div className ='timer' id = 'timer'/>
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
    )
}

export default Anagrams; 