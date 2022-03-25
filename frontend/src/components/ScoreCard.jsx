import React from 'react';

import './ScoreCard.scss';

function ScoreCard(props){


    return(
        <div className = 'scorecard'>

            <div className = 'title'>
                <h1 className = 'game-over'>{props.title}</h1>
               
            </div>
            
            <hr/>
            
            <div className ='score'>
                <h1 className ='game-over'>{props.score} {props.data} {props.guesses} {props.data2}</h1>
                
            </div>

            <div className = 'again'>
                <h2>Play again?</h2>
                
                <h3 onClick={props.playHandler}>{props.playButton} </h3>

                <h2>Quit?</h2>
                <h3 onClick={props.quitHandler}>{props.quitButton} </h3>

            </div>

        </div>


    );

}

export default ScoreCard;