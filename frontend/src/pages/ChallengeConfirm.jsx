import React from 'react';

import './ChallengeConfirm.scss';

function ChallengeConfirm(props){


    return(
        <div className='challenge-options-card'>

            <div className ='challenge-options'>
                <div onClick={props.playHandler} className='b play'>Play Challenge</div>
                <div onClick={props.delHandler} className='b reject-challenge'>Delete Challenge</div>
            </div>

            


        </div>

    );
}

export default ChallengeConfirm;