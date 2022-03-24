import React, {Component} from 'react';
import StoryEditor from './StoryEditor';
import axios from "axios";

class CreatorMenu extends Component {
    constructor(props){
        super(props)
        this.state = {
            activeStory: null,
            savedStories: [
                {
                    storyId: "tempID",
                    storyName: "adventure for gold",
                    Likes: 5,
                },
                {
                    storyId: "tempID2",
                    storyName: "adventure to the center of the world",
                    Likes: 3,
                }
            ]
            
        }
    }

    getStories = async () => {
        await axios.get()
            .then(res => {

            })
    }

    selectStory = (id) => {
        this.setState({activeStory: id})
    }

    listProjects = () => {
        console.log('hello')
        return (
            <ul>
                {this.state.savedStories.map((story) => (
                    <li key={story.storyId} onClick={() => this.selectStory(story.storyId)}>{story.storyName}</li>
                ))}
            </ul>
        )
    }



    loadElements = () => {
        if(this.state.activeStory === null){

            return(
                <>
                    <h1>Continue project:</h1>
                    <this.listProjects/>
                    <h1>Create new</h1>
                </>
            )
        }else{
            let {storyName} = this.state.savedStories.find(e => (e.storyId === this.state.activeStory))

            return(
                <StoryEditor storyId={this.state.activeStory} storyName={storyName}/>
            )
        }
    }


    render() {
        return (
            <div className='creator-menu'>
                
                <this.loadElements/>
                <button onClick={this.props.return}>temp return</button>

            </div>
        );
    }
}

export default CreatorMenu;