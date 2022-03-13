import React, {Component} from 'react';
import StoryEditor from './StoryEditor';

class CreatorMenu extends Component {
    constructor(props){
        super(props)
        this.state = {
            activeStory: null,
            savedStories: [
                {
                storyID: "tempID",
                storyName: "adventure for gold"
                },
                {
                    storyID: "tempID2",
                    storyName: "adventure to the center of the world"
                }
            ]
            
        }
    }

    listProjects = () => {
        return (
            <ul>
                {this.state.savedStories.map((story) => (
                    <li key={story.storyID} onClick={this.openStory}>{story.storyName}</li>
                ))}
            </ul>
        )
    }

    openStory = (e) => {
        console.log(e.target.StoryID)
        this.setState({
            ...this.setState,
            activeStory: e.target.StoryID
        })
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
            return(
                <StoryEditor storyID={this.state.activeStory}/>
            )
        }
    }


    render() {
        return (
            <div>
                
                <this.loadElements/>
                <button onClick={this.props.return}>temp return</button>

            </div>
        );
    }
}

export default CreatorMenu;