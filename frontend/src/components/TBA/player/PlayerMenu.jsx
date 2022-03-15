import axios from 'axios'
import React, { Component } from 'react'
import PlayingGame from "./PlayingGame";

export default class PlayerMenu extends Component {
    constructor(props){
        super(props)

        this.state = {
            stories: [],
            playing: null
        }

    }


    componentDidMount() {
        console.log('stories')
        let request = 'http://localhost:8083/tba/api/v1/getstories'
        axios.get(request)
            .then(res => {
                console.log(res)
                this.setState({
                    stories: res.data,
                })
            })

    }

    returnToMenu = () => {
        this.setState({
            playing: null
        })
    }

    inGame = () => {
        console.log('u r here')
        if(this.state.playing === null){
            return (
                <>
                    <h1>GAMES!</h1>
                    <ul>
                        {this.state.stories.map((story) => (
                            <li key={story.id} onClick={() => {this.setState({playing: story.id})}}>{story.name} <span> likes: {story.likes} dislikes: {story.dislikes}</span></li>
                        ))}
                    </ul>
                </>
            )
        }else{
            return (
                <PlayingGame storyId={this.state.playing} return={this.returnToMenu}/>
            )
        }
    }

   

    render() {
        return (
            <div>
                <this.inGame/>


                <button onClick={this.props.return}>temp return</button>

            </div>
        )
    }
}
