import React, { Component } from 'react'

export default class StoryEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            storyId: props.storyId,
            id: '1',
            nodes :[
                {
                    id: '1',
                    nodeName: 'startStory!',
                    body: 'you awake in the morning, get ready for work. u see a knife on the ground',
                    connections: [
                        {
                            id:'2',
                            nodeName: 'pick up knife'
                        },
                        {
                            id:'3',

                            nodeName: 'go to work'

                        }
                    ]

                },
                {
                    id: '2',
                    nodeName: 'pick up knife',
                    body: 'u pick up the knife',
                    connections: []
                },
                {
                    id: '3',
                    nodeName: 'go to work',
                    body: 'u go to work',
                    connections: []
                },
            ]
        }
    }

    changeCurrentNode = (id) => {

        this.setState({
            id: id
        })

    }

    currentNode = () => {
        let node = this.state.nodes.find((element) => element.id === this.state.id)
        console.log(node)
        return(
            <div className='node-current'>
                <h1>{node.nodeName}</h1>
                <p>{node.body}</p>
                <ul>
                    {node.connections.map((connection) => (
                        <li key={connection.id} onClick={() => this.changeCurrentNode(connection.id)}>{connection.nodeName}</li>
                    ))}
                </ul>
                <form>
                    <h2>Add connection</h2>
                    <label>
                        Option name:
                        <input type='text'></input>

                    </label>
                    <label>

                    </label>
                </form>
                {/*TODO left off here, need to add checkbox to check if node already exists or create new node*/}
            </div>
        )
    }


    allNodes = () => {
        return (
            <div className='node-list'>
                <ul>
                    {this.state.nodes.map((node) => (

                        <li key={node.id} onClick={() => this.changeCurrentNode(node.id)}>{node.nodeName}</li>
                    ))}

                </ul>
            </div>
        )
    }


    render() {
        return (
            <>
                <h1>current:{this.state.id}</h1>
                <this.allNodes/>
                <this.currentNode/>
            </>

        )
    }
}


