import axios from 'axios';
import React from 'react';
import Layout from '../components/Layout';
import './ScoreBoard.scss';


var wordleRankings = setWordleRankings();
var anagramRankings = setAnagramRankings();
var tbaRankings = setTbaRankings();

async function setWordleRankings(){
    await axios.get('http://localhost:8081/user/api/v1/leaders/wordle')
        .then(res => {
            wordleRankings = res.data;
        });
}

async function setAnagramRankings(){
    await axios.get('http://localhost:8081/user/api/v1/leaders/anagram')
        .then(res => {
            anagramRankings = res.data;
    });
}

async function setTbaRankings(){
    await axios.get('http://localhost:8081/user/api/v1/leaders/tba')
        .then(res => {
            tbaRankings = res.data;
    });
}
function ScoreBoard(){


    return(
        <div>
            <Layout/>

            <h1 className='score-header'>Leaderboard</h1>

           
            <ul className = 'leaderboard-container'>

                
                <li className ='wordle-leaderboard'>
                    
                    <h1 className='wordle-header'>Wordle</h1>
                    <hr className="hr"/>
                    
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
                                    <hr/>
                                </div>
                            })}
                            
                    </div>
                </li >

                <li className ='anagram-leaderboard'>
                    
                    <h1 className='anagram-header'>Anagram</h1>
                    <hr className="hr"/>
                    

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
                                    <hr/>
                                </div>
                            })}
                       
                    </div>
                    
                </li>

                <li className ='tba-leaderboard'>
                    
                    <h1 className='tba-header'>TBA</h1>
                    <hr className="hr"/>
                    

                    <div className ='labels'>
                        <ul>
                            <li><h3>Rank</h3></li>
                            <li><h3>Story Name</h3></li>
                            <li><h3>Rating</h3></li>
                        </ul>
                        {tbaRankings.map(function(tbaRanking, index){
                                return <div>
                                    <ul className = 'user-score'>
                                        <li>{index + 1}</li>
                                        <li>{tbaRanking[0]}</li>
                                        <li>{tbaRanking[1]}</li>
                                    </ul>
                                    <hr/>
                                </div>
                            })}
                       
                    </div>
                    
                </li>
            </ul>
           
          
        </div>
        

    );

}

export default ScoreBoard;