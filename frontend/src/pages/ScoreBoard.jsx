import axios from 'axios';
import React, {useEffect, useState} from 'react';
import Layout from '../components/Layout';

import './ScoreBoard.scss';

function ScoreBoard(){


    const [wordleRankings, setWordleRankings] = useState([]);
    const [anagramRankings, setAnagramRankings] = useState([]);
    const [tbaRankings, setTbaRankings] = useState([]);

    const [userWordleRank, setUserWordleRank] = useState([]);
    const [userAnagramRank, setUserAnagramRank] = useState([]);
    const [userTbaRank, setUserTbaRank] = useState([]);
    /*TODO user tba rank if implemented*/



    useEffect(() => {
        SetUp();
    }, []);
    
    const [wordleTopTen, setWordleTopTen] = useState(null);
    const [anagramTopTen , setAnagramTopTen] = useState(null);


    async function SetUp(){

        

        const currentName = localStorage.getItem('username');
        console.log(currentName)
        
        if(currentName !== null){
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

            await axios.get(`http://localhost:8081/user/api/v1/rank/${currentName}/tba`)
                .then(res => {
                    console.log(res.data)
                    setUserTbaRank(res.data);
                });
            
        }

    
        await axios.get('http://localhost:8081/user/api/v1/leaders/wordle')
            .then(res => {

                console.log(res.data)
                setWordleRankings(res.data);
                console.log('hello2')
        });
        

        await axios.get('http://localhost:8081/user/api/v1/leaders/anagram')
            .then(res => {
                console.log(res.data)
                setAnagramRankings(res.data);
                console.log('hello3')
        });
        
        await axios.get('http://localhost:8081/user/api/v1/leaders/tba')
            .then(res => {
                console.log(res.data)
                setTbaRankings(res.data);
                console.log('hello4')
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
    
                                {wordleRankings.map(function(wordleRanking){

                                    return <div>
                                        <ul className = {userWordleRank.username === wordleRanking.username ? 'user-score bold' : 'user-score'} >
                                            <li>{wordleRanking.rank}</li>
                                            <li>{wordleRanking.username}</li>
                                            <li>{parseInt(wordleRanking.rating)}</li>
                                        </ul>
                                        <hr/>
                                    </div>
                                })}

                            { userWordleRank !== null && userWordleRank.rank > 10 && <div><ul className = 'user-score bold'>
                                <li>:</li>
                                <li>:</li>
                                <li>:</li>
                            </ul> <hr/></div>}
                            { userWordleRank !== null && userWordleRank.rank > 10 && <ul className = 'user-score bold'>
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
                                    <ul className = {userAnagramRank.username === anagramRanking.username ? 'user-score bold' : 'user-score'}>
                                        <li>{anagramRanking.rank}</li>
                                        <li>{anagramRanking.username}</li>
                                        <li>{parseInt(anagramRanking.rating)}</li>
                                    </ul>
                                    <hr/>
                                </div>
                            })}

                            { userAnagramRank !== null && userAnagramRank.rank > 10 && <div><ul className = 'user-score bold'>
                                <li>:</li>
                                <li>:</li>
                                <li>:</li>
                            </ul><hr/></div>}
    
                            { userAnagramRank !== null && userAnagramRank.rank > 10 && <ul className = 'user-score bold'>
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
                                        <ul className = {userTbaRank.username === tbaRanking.username ? 'user-score bold' : 'user-score'}>
                                            <li>{tbaRanking.rank}</li>
                                            <li>{tbaRanking.username}</li>
                                            <li>{parseInt(tbaRanking.rating)}</li>
                                        </ul>
                                        <hr/>
                                    </div>
                            })}

                            { userTbaRank !== null && userTbaRank.rank > 10 && <div><ul className = 'user-score bold'>
                                <li>:</li>
                                <li>:</li>
                                <li>:</li>
                            </ul><hr/></div>}
    
                            { userTbaRank !== null && userTbaRank.rank > 10 && <ul className = 'user-score bold'>
                                <li>{userAnagramRank.rank}</li>
                                <li>{userAnagramRank.username}</li>
                                <li>{parseInt(userAnagramRank.rating)}</li>
                            </ul>}
                           
                        </div>
                        
                    </li>
                </ul>
               
              
            </div>
            
    
        );


    

}

export default ScoreBoard;