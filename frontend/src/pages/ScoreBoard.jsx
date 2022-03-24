import axios from 'axios';
import React, {useContext, useState} from 'react';
import Layout from '../components/Layout';

import './ScoreBoard.scss';

function ScoreBoard(){

    const [wordleRankings, setWordleRankings] = useState([]);
    const [anagramRankings, setAnagramRankings] = useState([]);
    const [tbaRankings, setTbaRankings] = useState([]);

    const [userWordleRank, setUserWordleRank] = useState([]);
    const [userAnagramRank, setUserAnagramRank] = useState([]);

    const currentName = localStorage.getItem('username');
    SetUp();

    async function SetUp(){
        
        
        if(!currentName){
            await axios.get(`http://localhost:8081/user/api/v1/rank/${currentName}/wordle`)
                .then(res => {
                    setUserWordleRank(res.data);
            });

            await axios.get(`http://localhost:8081/user/api/v1/rank/${currentName}/anagram`)
                .then(res => {
                    setUserAnagramRank(res.data);
            });
            
        }

    
        await axios.get('http://localhost:8081/user/api/v1/leaders/wordle')
            .then(res => {
                setWordleRankings(res.data);
        });
        

        await axios.get('http://localhost:8081/user/api/v1/leaders/anagram')
            .then(res => {
                setAnagramRankings(res.data);
        });
        
        await axios.get('http://localhost:8081/user/api/v1/leaders/tba')
            .then(res => {
                setTbaRankings(res.data);
        });
    
    }

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
                                        <li>{wordleRankings[0]}</li>
                                        <li>{wordleRankings[1]}</li>
                                        <li>{wordleRankings[2]}</li>
                                    </ul>
                                    <hr/>
                                </div>
                            })}
                        <ul className = 'user-score'>
                            <li>{userWordleRank[0]}</li>
                            <li>{userWordleRank[1]}</li>
                            <li>{userWordleRank[2]}</li>
                        </ul>

                            
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
                                        <li>{anagramRankings[0]}</li>
                                        <li>{anagramRankings[1]}</li>
                                        <li>{anagramRankings[2]}</li>
                                    </ul>
                                    <hr/>
                                </div>
                        })}

                        <ul className = 'user-score'>
                            <li>{userAnagramRank[0]}</li>
                            <li>{userAnagramRank[1]}</li>
                            <li>{userAnagramRank[2]}</li>
                        </ul>
                       
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
                                        <li>{tbaRankings[0]}</li>
                                        <li>{tbaRankings[1]}</li>
                                        <li>{tbaRankings[2]}</li>
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