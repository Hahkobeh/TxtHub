import axios from 'axios'
import React, { Component } from 'react'
import PlayingGame from "./PlayingGame";

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
        console.log('u r here')
        if(this.state.activeStory === null){
            return (
                <>
                    <h1>Stories rated by highest likes!</h1>
                    <ul>
                        {this.state.stories.map((story) => (
                            <li key={story.id} onClick={() => {this.setState({activeStory: story.id})}}>{story.name} by {story.authorUsername}, <span className='likes'> likes: {story.likes} dislikes: {story.dislikes}</span></li>
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
            <div className='player-menu'>
                <this.inGame/>
                <button onClick={this.props.return}>Return to main menu</button>

            </div>
        )
    }
}
