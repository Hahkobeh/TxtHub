import axios from 'axios';
import React, {useContext, useState} from 'react';
import Layout from '../components/Layout';

import './ScoreBoard.scss';

function ScoreBoard(){

    const [loading, setLoading] = useState(true);

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
                    console.log('hello')
                    console.log(res.data)
                    setUserWordleRank(res.data);
            });

            await axios.get(`http://localhost:8081/user/api/v1/rank/${currentName}/anagram`)
                .then(res => {
                    console.log(res.data)
                    setUserAnagramRank(res.data);
            });
            
        }

    
        await axios.get('http://localhost:8081/user/api/v1/leaders/wordle')
            .then(res => {
                console.log(res.data)
                setWordleRankings(res.data);
        });
        

        await axios.get('http://localhost:8081/user/api/v1/leaders/anagram')
            .then(res => {
                console.log(res.data)
                setAnagramRankings(res.data);
        });
        
        await axios.get('http://localhost:8081/user/api/v1/leaders/tba')
            .then(res => {
                console.log(res.data)
                setTbaRankings(res.data);
        });

        setLoading(false);


    }

    if(loading){
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
                    
                        </div>
                        
                    </li>
                </ul>
               
              
            </div>
            
    
        );

    }else{
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
    
                                {wordleRankings.map(function(wordleRanking){
                                    return <div>
                                        <ul className = 'user-score'>
                                            <li>{wordleRanking.rank}</li>
                                            <li>{wordleRanking.username}</li>
                                            <li>{parseInt(wordleRanking.rating)}</li>
                                        </ul>
                                        <hr/>
                                    </div>
                                })}
                            {userWordleRank !== null && <ul className = 'user-score'>
                                <li>{userWordleRank.rank}</li>
                                <li>{userWordleRank.username}</li>
                                <li>{parseInt(userWordleRank.rating)}</li>
                            </ul>}
    
    
                                
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
                            {anagramRankings.map(function(anagramRanking){
                                    return <div>
                                        <ul className = 'user-score'>
                                            <li>{anagramRanking.rank}</li>
                                            <li>{anagramRanking.username}</li>
                                            <li>{parseInt(anagramRanking.rating)}</li>
                                        </ul>
                                        <hr/>
                                    </div>
                            })}
    
                            {userAnagramRank !== null && <ul className = 'user-score'>
                                <li>{userAnagramRank.rank}</li>
                                <li>{userAnagramRank.username}</li>
                                <li>{parseInt(userAnagramRank.rating)}</li>
                            </ul>}
                           
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
                            {tbaRankings.map(function(tbaRanking){
                                    return <div>
                                        <ul className = 'user-score'>
                                            <li>{tbaRanking.rank}</li>
                                            <li>{tbaRanking.username}</li>
                                            <li>{parseInt(tbaRanking.rating)}</li>
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

    

}

export default ScoreBoard;