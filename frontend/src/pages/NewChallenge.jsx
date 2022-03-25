import React, {useRef, useState} from 'react';

import axios from 'axios';

import './NewChallenge.scss';

function NewChallenge(props){

    

    const usernameRef = useRef();

    const [selection, setSelection] = useState("none");
    const [check, setCheck] = useState(false);
    const [usernameError, setUsernameError] = useState(false);
    const [choiceError, setChoiceError] = useState(false);

    function checkHandler(){
        setCheck(!check);
    }

    function setChoice(choice){
        setSelection(choice);
    }

    const currentName = localStorage.getItem('username');

    const [challengeYourself, setChallengeYourself] = useState(false);

    async function submitChallenge(e){
        e.preventDefault();
        setUsernameError(false);
        setChoiceError(false);
        
        if(check && usernameRef.current.value === ""){
            setUsernameError(true);
            return;

        }else if(selection === "none"){
            setChoiceError(true);
            return;
        }

        //selection for the game
        //currentName for sender of challenge
        //no username for chalelengee or usernameRef.current.value for specific person

        if(check){

            if(usernameRef.current.value === currentName){

                setChallengeYourself(true);
                return;
            }

            let data = { 
                game: selection,
                username: usernameRef.current.value
            }
            await  axios.post(`http://localhost:8081/challenge/api/v1/send/${currentName}` , data);


        }else{

            await  axios.post(`http://localhost:8081/challenge/api/v1/send/${currentName}` , selection);

        }

        props.handler();

    }

    return(
        <div className = 'new-challenge-container'>


            <div className='nc-top'>
                <h1 className='nc-title'>Create Challenge</h1>

                <h3 onClick={props.handler}>{props.button}</h3>
            </div>

            
            <hr/>

            <form className='form'>

                    <label className="label">Playing someone you know?</label>
                    <input id="checkbox" type='checkbox' onClick={checkHandler}/>
                {check && <div className="control">
                    <label className='label'>Enter the user you wish to challenge:</label>
                    <input type='text' id='username' placeholder='e.g jacob12' ref={usernameRef}/>
                    {usernameError && <p className='error'>You must enter a username.</p>}
                </div>}
                <div className="control">
                    <label className='label'>Select which game you wish to play!</label>
                    <div className ='challenge-options'>
                        <div className={selection === "Wordle" ? "bu selection" : "bu"}  onClick={() => setChoice("Wordle")}>Wordle</div>
                        <div className={selection === "Anagrams" ? "bu selection" : "bu"} onClick={() => setChoice("Anagrams")}>Anagrams</div>
                    </div>
                    {choiceError && <p className='error'>You must select a game mode.</p>}
                </div>
                {challengeYourself && <div className = 'error cye'> you cannot challenge yourself</div>}
                <div className ="control">
                    <button onClick={submitChallenge} id="submitButton">Send Challenge!</button>
                </div>
            </form>
            
            
            
            
        </div>
    )
}

export default NewChallenge;