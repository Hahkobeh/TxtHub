import React from 'react';

import './Instructions.scss';
import letters from '../../images/letters.png';
import anagram from '../../images/anagram.png';
import enter from '../../images/enter.png';

function Instructions(props){

    return(
        <div className = 'instructions'>

            <div className='instr-top'>
                <h1 className='instr'>How to play</h1>

                <h3 onClick={props.handler}>{props.button}</h3>
            </div>

            
            <hr/>
            
            <div className = 'body'>
                <p>Guess as many words as you can.</p>
                <p>Each guess must be a valid 5 letter word. Hit enter to submit guess</p>

                <p>You must use each letter listed only once</p>
                <hr/>

                <p>Use all letters to create a valid word.</p>
                <img src= {letters} alt='letters-example' id="letters"/>
                
                <p>Letters will show up on the entry squares.</p>
                <img src= {anagram} alt='entry-square-example'/>
                
                <p>Hit enter to make a guess.</p>
                <img src = {enter} alt='enter-example'/>
                
                <hr/>
            </div>
            
            
        </div>
    )
}

export default Instructions;