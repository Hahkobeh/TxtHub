import React from 'react';
import Layout from '../components/Layout';
import './ScoreBoard.scss';

function ScoreBoard(){


    return(
        <div>
            <Layout/>

            <h1 className='score-header'>Leaderboard</h1>

           
            <ul className = 'leaderboard-container'>

                
                <li className ='wordle-leaderboard'>
                    
                    <h1 className='wordle-header'>Wordle</h1>
                    <hr/>
                    
                    <div className ='labels'>
                        <ul>
                            <li><h3>Rank</h3></li>
                            <li><h3>Name</h3></li>
                            <li><h3>Rating</h3></li>
                        </ul>
                        <ul className = 'user-score'>
                            <li>1</li>
                            <li>Colin_c</li>
                            <li>3.4</li>
                        </ul>
                        
                    </div>
                </li >

                <li className ='anagram-leaderboard'>
                    
                    <h1 className='anagram-header'>Anagram</h1>
                    <hr/>
                    

                    <div className ='labels'>
                        <ul>
                            <li><h3>Rank</h3></li>
                            <li><h3>Name</h3></li>
                            <li><h3>Rating</h3></li>
                        </ul>
                        <ul className = 'user-score'>
                            <li>1</li>
                            <li>Colin_c</li>
                            <li>400</li>
                        </ul>
                       
                    </div>
                    
                </li>
            </ul>
           
          
        </div>
        

    );

}

export default ScoreBoard;