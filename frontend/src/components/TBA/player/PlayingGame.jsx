import React, { Component } from 'react'
import axios from "axios";

export default class PlayingGame extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: props.firstNodeId,
            nodes : [],
            connections:[],
            done:false

        }
    }



    async componentDidMount() {
        await axios.all([
            axios.get(`http://localhost:8083/tba/api/v1/nodes/${this.props.storyId}`),
            axios.get(`http://localhost:8083/tba/api/v1/connections/${this.props.storyId}`)
        ]).then(axios.spread((...res)=> {
            console.log('setting state!')

            this.setState({
                nodes : res[0].data,
                connections:res[1].data
            })

        }))




    }

    changeCurrentNode = (id) => {
        if(id !== this.state.id) {
            this.setState({
                id: id
            })
        }
    }

    connectionList = () => {
        const nodeConnections = this.state.connections.filter(e => e.nodeId === this.state.id)
        return (
            <ul>
                {nodeConnections.map(c => (
                    <li key={c.id} onClick={() => this.changeCurrentNode(c.connectedNodeId)}>{this.state.nodes.find(n => n.id === c.connectedNodeId).nodeName}</li>
                    )
                )}
            </ul>
        )
    }

    end = () => {
        return(
            <div className='end'>
                <h3>End of Story!</h3>

                {this.props.username !== null ?
                    this.props.username !== this.props.author ?
                        <div className='like-buttons'>
                            <button onClick={this.likeStory} disabled={this.state.done}>Like</button>
                            <button onClick={this.dislikeStory} disabled={this.state.done}>Dislike</button>
                        </div>
                        :
                        <p>You cannot like your own story...</p>
                :
                <p>Log in to like/dislike stories</p>
                }
            </div>
        )
    }

    likeStory = () => {
        axios.put(`http://localhost:8081/user/api/v1/update/tba/${this.props.author}/${this.props.username}`)
            .then(r => {
                if(r.data === true){
                    axios.put(`http://localhost:8083/tba/api/v1/like/${this.props.storyId}`).then(r => console.log(r))
                }
            })
        this.setState({done:true})

    }

    dislikeStory = () => {
        axios.put(`http://localhost:8083/tba/api/v1/dislike/${this.props.storyId}`).then(r => console.log(r))
        this.setState({done:true})
    }




    render() {
        if(this.state.nodes.length === 0){
            return (
                <h1>LOADING</h1>
            )
        }else {
            let node = this.state.nodes.find(e => e.id === this.state.id)
            console.log(this.state.connections.filter(e => e.nodeId === this.state.id))
            return (

                <>
                    <h1>{this.props.storyName}</h1>
                    <h2>Written by: <span className='story-author'>{this.props.author}</span></h2>
                    <h1 className='node-title'>{node.nodeName}</h1>
                    <p className='node-body'>{node.body}</p>
                    {(!node.end && this.state.connections.filter(e => e.nodeId === this.state.id).length !== 0)  ? <this.connectionList/> : <this.end/>}

                    <button onClick={() => this.props.returnToStories(null)}>Return to story list</button>
                </>

            )
        }
    }
}