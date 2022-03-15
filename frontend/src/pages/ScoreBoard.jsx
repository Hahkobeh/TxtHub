import React from 'react';
import Layout from '../components/Layout';
import './ScoreBoard.scss';


var wordleRankings = [ ["Colin" ,"40" ] , ["Jacob" ,"5" ] ];
var anagramRankings = [ ["Colin" ,"40" ] , ["Jacob" ,"5" ] ];
var tbaRankings = [ ["Colin" ,"3.4" ] , ["Jacob" ,"5" ] ];
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
                            <li><h3>Username</h3></li>
                            <li><h3>Rating</h3></li>
                        </ul>
                        
                            {wordleRankings.map(function(wordleRanking, index){
                                return <div>
                                    <ul className = 'user-score'>
                                        <li>{index + 1}</li>
                                        <li>{wordleRanking[0]}</li>
                                        <li>{wordleRanking[1]}</li>
                                    </ul>
                                </div>
                            })}
                            
                    </div>
                </li >

                <li className ='anagram-leaderboard'>
                    
                    <h1 className='anagram-header'>Anagram</h1>
                    <hr/>
                    

                    <div className ='labels'>
                        <ul>
                            <li><h3>Rank</h3></li>
                            <li><h3>Username</h3></li>
                            <li><h3>Rating</h3></li>
                        </ul>
                        {anagramRankings.map(function(anagramRanking, index){
                                return <div>
                                    <ul className = 'user-score'>
                                        <li>{index + 1}</li>
                                        <li>{anagramRanking[0]}</li>
                                        <li>{anagramRanking[1]}</li>
                                    </ul>
                                </div>
                            })}
                       
                    </div>
                    
                </li>

                <li className ='tba-leaderboard'>
                    
                    <h1 className='tba-header'>TBA</h1>
                    <hr/>
                    

                    <div className ='labels'>
                        <ul>
                            <li><h3>Rank</h3></li>
                            <li><h3>Story Name</h3></li>
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