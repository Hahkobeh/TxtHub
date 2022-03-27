import React, {Component} from 'react';
import StoryEditor from './StoryEditor';
import axios from "axios";

class CreatorMenu extends Component {
    constructor(props){
        super(props)
        this.state = {
            activeStory: null,
            savedStories: [],
            addStoryName: '',
            addStoryGenre: 'ADVENTURE'
            
        }

    }

    componentDidMount() {
        axios.get(`http://localhost:8083/tba/api/v1/getStories/${this.props.username}`)
            .then(res => {
                    this.setState({savedStories: res.data})
                }

            )
    }



    selectStory = (id) => {
        this.setState({activeStory: id})
    }

    listProjects = () => {
        return (
            <ul>
                {this.state.savedStories.length !== 0 ?

                    this.state.savedStories.map((story) => (
                        <li key={story.id}>
                            <p onClick={() => this.selectStory(story.id)}>{story.name} [{story.genre}]</p>
                            <button onClick={() => this.deleteStory(story.id)}>Delete Story</button>

                        </li>
                    ))
                    :
                    <li key='0'>You have no stories! Create one! Or you may not be connected to the database.</li>

                }
            </ul>
        )


    }

    deleteStory = async (id) =>{
        console.log(id)
        await axios.delete(`http://localhost:8083/tba/api/v1/deleteStory/${id}`)

        await this.getStories()
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
            let {firstNodeId, name} = this.state.savedStories.find(e => (e.id === this.state.activeStory))

            return(
                <StoryEditor storyId={this.state.activeStory} firstNodeId={firstNodeId} storyName={name} selectStory={this.selectStory}/>
            )
        }
    }

    handleFormChange = (e) => {
        const {name, value} = e.target
        this.setState({
            [name]: value
        })
    }



    addStoryForm = () => {
        return(
            <form onSubmit={this.addStory}>
                <label>
                    Story name:
                    <input name='addStoryName' type='text' onChange={this.handleFormChange} value={this.state.addStoryName}/>
                </label>
                <label>
                    Genre:
                    <select name='addStoryGenre' onChange={this.handleFormChange}>
                        <option key='1' value='ADVENTURE'>Adventure</option>
                        <option key='2' value='MYSTERY'>Mystery</option>
                        <option key='3' value='ACTION'>Action</option>
                        <option key='4' value='FANTASY'>Fantasy</option>

                    </select>
                </label>
                <input type='submit'/>
            </form>
        )
    }

    getStories =  async () => {
        console.log('getting stories')
        await axios.get(`http://localhost:8083/tba/api/v1/getStories/${this.props.username}`)
            .then(res => {
                this.setState({savedStories: res.data})
                }

            )
    }

    addStory = async (e) => {
        e.preventDefault()
        if(this.state.addStoryName !== '') {
            const storyInfo = {
                storyName: this.state.addStoryName,
                author: this.props.username,
                genre: this.state.addStoryGenre
            }
            console.log(storyInfo)
            await axios.post(`http://localhost:8083/tba/api/v1/newStory`,storyInfo)
            await this.getStories()
            this.setState({addStoryName: ''})
        }
    }



    render() {
        return (
            <div className='creator-menu'>
                
                <this.loadElements/>

                <button onClick={this.props.return}>Return to main menu</button>

            </div>
        );
    }
}

export default CreatorMenu;

/*
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
                }*/