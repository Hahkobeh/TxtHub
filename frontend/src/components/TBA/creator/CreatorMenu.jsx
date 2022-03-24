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
                    startNodeId: '1',
                    Likes: 5,
                },
                {
                    storyId: "tempID2",
                    storyName: "adventure to the center of the world",
                    startNodeId: '1',
                    Likes: 3,
                }
            ],
            addStoryName: '',
            addStoryGenre: 'ADVENTURE'
            
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
                    <this.addStoryForm/>
                </>
            )
        }else{
            let {storyName} = this.state.savedStories.find(e => (e.storyId === this.state.activeStory))

            return(
                <StoryEditor storyId={this.state.activeStory} startNodeId={this.state.savedStories.find(s => s.storyId === this.state.activeStory).startNodeId} storyName={storyName} selectStory={this.selectStory}/>
            )
        }
    }

    handleFormChange = (e) => {
        const {name, value} = e.target
        this.setState({
            [name]: value
        })
    }


    addStory = (e) => {
        e.preventDefault()
        if(this.state.addStoryName !== null){
            /*TODO create new story, need to generate id, add to savedStories in state then set as active story */
        }
    }

    addStoryForm = () => {
        return(
            <form onSubmit={this.addStory}>
                <label>
                    Story name:
                    <input name='addStoryName' type='text' onChange={this.handleFormChange}/>
                </label>
                <label>
                    Genre:
                    <select name='addStoryGenre' onChange={this.handleFormChange}>
                        <option key='1' value='ADVENTURE'>Adventure</option>
                        <option key='2' value='MYSTERY'>Mystery</option>
                        <option key='3' value='ACTION'>Action</option>
                        <option key='2' value='FANTASY'>Fantasy</option>

                    </select>
                </label>
                <input type='submit'/>
            </form>
        )
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