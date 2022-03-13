import './Anagrams.scss';
import React, {useState, useEffect} from 'react';
import {FaBackspace, FaRedo} from 'react-icons/fa';
import {GiCancel} from 'react-icons/gi';
import {AiOutlineQuestionCircle} from 'react-icons/ai';
import axios from "axios";

import Layout from '../Layout';
import { InputGroup } from 'react-bootstrap';

import Instructions from './Instructions';
import Backdrop from '../wordle/Backdrop';
import Message from '../wordle/Message';


var currentGuess = [];
var currentScore = 0; 
var word = 'otter'; //setWord() // use setWord wen hooked up to API
var guessPos = 0; 
var lastClickedButton = [];

/*async function setWord(){
    await axios.get('http://localhost:8082/wordle/api/v1/getword')
        .then(res => {
            answer = res.data
            console.log(res.data)
        });
}
*/


function Anagrams(){
    const [instructions, setInstructions] = useState(true);
    const [playingGame, setPlayingGame] = useState(false);
    const [notWord, setNotWord] = useState(false);
    const [notEnoughLetters, setNotEnoughLetters] = useState(false);
    const [timer, setTimer] = React.useState(0);

    React.useEffect(() => {
        timer > 0 && setTimeout(()=> setTimer(timer - 1), 1000);
    }, [timer]);

    function startGame(){
      
        setPlayingGame(true);
        setTimer(60);

        scramWord();
     
    }

    useEffect(() => {
        document.addEventListener('keydown' , e => {
            
            
            if(e.key === 'Delete' || e.key === 'Backspace'){
                removeLetter();
            }else if(word.includes(e.key)){

                var id = 1;
                for(let i = -1; i > -6; i--){
                    const box = document.getElementById(i);
                    if(!lastClickedButton.includes(i) && word[ (i + 1) * -1] === e.key){
                        id = i;
                        break;
                    }
                }
                if(id === 1){
                    return;
                }
                letterClick(e.key, id);
                
            }else if(e.key === 'Enter' ){
                
                enterWord();
            }
        });
    }, []);

    function scramWord(){
        var arr = word.split('');           
        var n = arr.length;              
        
        for(var i=0 ; i<n-1 ; ++i) {
          var j = Math.floor(Math.random() * n);     
          
          var temp = arr[i];             
          arr[i] = arr[j];
          arr[j] = temp;
        }

        word = arr.join('');
        
    }

    function enterWord(){
        setNotEnoughLetters(false);
        setNotWord(false);

        if(currentGuess.length < 5){

            setNotEnoughLetters(true);
            return;
        }

        /*let test
        let request = 'http://localhost:8082/wordle/api/v1/testword/' + currentWord.join("")
        console.log(request)
        await axios.get(request)
            .then(res => {
                console.log(res.data)
                test =  res.data
        })
        console.log(test)
        if(test === false){
            setNotWord(true);
            return;
        }*/

        word = 'ready'; //setWord();
        scramWord();
        nextWord();
    }

    function nextWord(){


        for(let i = 0; i < 5; i++){
            var temp = lastClickedButton[i];
            const box2 = document.getElementById(temp);
            box2.style.backgroundColor = '#d3d6da';

            const box = document.getElementById(i);
            box.textContent = '';
        }
        guessPos = 0;
        lastClickedButton = [];
        currentGuess = [];
    }

    function letterClick(a, id){

        setNotEnoughLetters(false);
        setNotWord(false);

        if(lastClickedButton.includes(id)){
            return;
        }
        currentGuess.push(a);
        const box = document.getElementById(guessPos);
        box.textContent = a;
        guessPos++;

        const box2 = document.getElementById(id);
        box2.style.backgroundColor = 'grey';
        lastClickedButton.push(id);
       

    }

    function removeLetter(){

        setNotEnoughLetters(false);
        setNotWord(false);

        if(guessPos === 0){
            return;
        }
        if (guessPos > 0){
            guessPos--;
        }
        
        let b = '';
        currentGuess.pop();
        const box = document.getElementById(guessPos);
        box.textContent = b;
        
        var last  = lastClickedButton[lastClickedButton.length -1];
        lastClickedButton.pop();
        const box2 = document.getElementById(last);
        box2.style.backgroundColor = '#d3d6da';
        
    }

    async function minusFive(){
        setNotEnoughLetters(false);
        setNotWord(false);

        word = 'ready';
        scramWord();
        nextWord();
        
        setTimer(timer - 5);
    }

    function quitGame(){

        
        setPlayingGame(false);
        setNotWord(false);
        setNotEnoughLetters(false);
        setTimer(0);
        currentGuess = [];
        currentScore = 0; 
        guessPos = 0; 
        lastClickedButton = [];
    }

    var letterCombo = new Array(5).fill(null);

    const changeInstructions = () => setInstructions(!instructions);


    return(
        <div className='no-scroll'>

            <Layout Game={<h1 className="game-name">Anagrams <AiOutlineQuestionCircle className='help' onClick = {changeInstructions}/></h1>}/>

            {notEnoughLetters && <Message title='Not long enough.'/>}
            {notWord && <Message title = 'Not in word list.'/>}
            {instructions && <Instructions button={<GiCancel/>} handler={changeInstructions}/>}
            {instructions && <Backdrop onCancel={changeInstructions}/>}


            <div className = 'quit-div'>
                {playingGame && <button className = 'stateB' onClick={quitGame} id = 'quitButton' >Quit Round</button>}
            </div>
            
            <div className = 'start-anagrams'>
                {!playingGame && <button className = 'stateB' onClick={startGame} id = 'startButton'>Start Game</button>}
            </div>
            

            <div id ='anagram-option-container'>
                <div id = 'anagram-menu'>
                    {playingGame && <p className='timer'>{timer}</p>}
                    {playingGame && <button className = 'stateB' id = 'skipButton' onClick={minusFive}>Skip (-5s)</button>}
                </div>
                
            </div>

            {playingGame && <div id='currentGuess-container'>
            <div id='currentGuess'> 
                    {letterCombo.map(function(arr, comboIndex){
                        return <div class="letterSquare" id={comboIndex}></div>
                    })}
                    
                
                </div>
            </div>}

            {playingGame && <div id="letterSet">
                <div className='letterSetRow'>
                    
                    
                    <button_Anagrams onClick= { () => letterClick(word[0], '-1') }id='-1'>{word[0]}</button_Anagrams>
                    <button_Anagrams onClick= { () => letterClick(word[1], '-2') }id='-2'>{word[1]}</button_Anagrams>
                    <button_Anagrams onClick= { () => letterClick(word[2], '-3') }id='-3'>{word[2]}</button_Anagrams>
                    <button_Anagrams onClick= { () => letterClick(word[3], '-4') }id='-4'>{word[3]}</button_Anagrams>
                    <button_Anagrams onClick= { () => letterClick(word[4], '-5') }id='-5'>{word[4]}</button_Anagrams>
                    <button_Anagrams onClick= { () => removeLetter() }id='-6'><FaBackspace size={20} /></button_Anagrams>
                    <button_Anagrams onClick= { () => enterWord() }id='-7' >↵</button_Anagrams>
                </div>
                
            </div>}
            
           

        </div>
    )
}

export default Anagrams; 