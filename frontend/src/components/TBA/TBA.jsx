import React, {Component} from 'react';
import Layout from "../Layout";
import CreatorMenu from './creator/CreatorMenu';
import PlayerMenu from './player/PlayerMenu';
import './TBA.scss'

class TBA extends Component {
    constructor() {
        super();
        this.state = {
            screen: 0 //0 - main, 1 - play, 3 - create
        }
    }
    
    returnToMainMenu = () => {
        this.setState({screen: 0})
    }

    

    tbaNav = () => {
        console.log(this.state.screen)
        switch (this.state.screen){
            case 0:
                console.log(this.state.screen)
                return (
                    <div className='main-menu'>
                        <div className='card-2' onClick={()=> this.setState({screen:1})}>
                            <h1>Play!</h1>
                        </div>
                        <div className='card-2' onClick={()=> this.setState({screen:2})}>
                            <h1>Create!</h1>
                        </div>
                    </div>
                )
            case 1:
                return (
                    <PlayerMenu return={this.returnToMainMenu}/>
                )
            case 2:
                return (
                    <CreatorMenu return={this.returnToMainMenu}/>
                )
            default:
                this.setState({screen:0})
                break;
        }
    }



    render() {
        return (
            <>
                <Layout Game={<h1 className="game-name">Text Based Adventure</h1>}/>
                <div className='tba-container'>
                    <this.tbaNav/>
                </div>


            </>
        );
    }
}

export default TBA;