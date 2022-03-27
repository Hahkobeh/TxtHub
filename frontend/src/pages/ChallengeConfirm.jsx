import React from 'react';
import {GiCancel} from 'react-icons/gi';
import './ChallengeConfirm.scss';

function ChallengeConfirm(props){


    return(
        <div className='challenge-options-card'>

            <div>
                <h3 className= 'ex' onClick={props.handler}>{props.button}</h3>
            </div>

            <div className ='challenge-options'>
                <div onClick={props.playHandler} className='b play'>Play Challenge</div>
                <div onClick={props.delHandler} className='b reject-challenge'>Delete Challenge</div>
            </div>

            


        </div>

    );
}

export default ChallengeConfirm;