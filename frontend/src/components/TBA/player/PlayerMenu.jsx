import axios from 'axios'
import React, { Component } from 'react'
import PlayingGame from "./PlayingGame";
import book from '../book.svg'
import './PlayerMenu.scss'

export default class PlayerMenu extends Component {
    constructor(props){
        super(props)
        this.state = {
            activeStory: null,
            stories: []

        }

    }

    componentDidMount() {
        this.getStories()
    }

    getStories = () => {
        axios.get(`http://localhost:8083/tba/api/v1/getStoriesByLikes`)
            .then(res => {
                    this.setState({stories: res.data})
                }

            )
    }


    returnToStories = () => {
        this.getStories()
        this.setState({activeStory: null})
    }



    inGame = () => {
        if(this.state.activeStory === null){
            return (
                <>
                    <h1>Stories rated by highest likes!</h1>
                    <ul>
                        {this.state.stories.map((story) => (
                            <li key={story.id} onClick={() => {this.setState({activeStory: story.id})}}>
                                <div className='story-info'>
                                    <h2>{story.name}</h2>
                                    <p>by {story.authorUsername}</p>
                                </div>
                                <div className='story-meta-info'>
                                    <p>Likes:</p>
                                    <p>Dislikes:</p>
                                    <p>genre:</p>
                                </div>
                                <div className='story-info-2'>
                                    <p>{story.likes}</p>
                                    <p>{story.dislikes}</p>
                                    <p>[{story.genre}]</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </>
            )
        }else{
            let currentStory = this.state.stories.find(e => e.id === this.state.activeStory)
            return (
                <PlayingGame storyId={currentStory.id} firstNodeId={currentStory.firstNodeId} storyName={currentStory.name} author={currentStory.authorUsername} genre={currentStory.genre} returnToStories={this.returnToStories} username={this.props.username}/>
            )
        }
    }

   

    render() {
        return (
            <>
                <img src={book} alt='book' className='icon book'/>
                <div className='player-menu'>
                    <this.inGame/>
                    <button className='return-button' onClick={this.props.return}>Return to main menu</button>

                </div>
            </>
        )
    }
}
