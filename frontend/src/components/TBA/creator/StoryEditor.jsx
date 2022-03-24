import React, { Component } from 'react'
import Select from "react-select";
import ObjectID from "bson-objectid";

export default class StoryEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {

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
            ],
            checked: false,
            name: '',
            body: ''

        }
    }

    handleChecked = () => {
        this.setState((prevState) => ({
            checked: !prevState.checked
        }))
    }

    changeCurrentNode = (id) => {

        this.setState({
            id: id
        })

    }

    handleChangeBody = (e) => {
        const removeCurrent = this.state.nodes.filter(element => element.id !== this.state.id)
        let node = this.state.nodes.find(element => element.id === this.state.id)
        node.body = e.target.value
        this.setState({nodes:[...removeCurrent, node]})
    }

    handleChangeForm = (e) => {
        console.log(this.state.name)
        const {name, value} = e.target
        this.setState({[name]: value})

    }

    createNode = (e) => {
        e.preventDefault()

        if(!this.state.checked) {
            const newNode = {
                id: ObjectID().toHexString(),
                nodeName: this.state.name,
                body: '',
                connections: []
            }
            const removeCurrent = this.state.nodes.filter(element => element.id !== this.state.id)
            let updateCurrent = this.state.nodes.find(element => element.id === this.state.id)
            updateCurrent.connections.push({
                id: newNode.id,
                nodeName: newNode.nodeName
            })
            const newNodes = [...removeCurrent,updateCurrent,newNode]

            this.setState({nodes: newNodes})


        }else{
            {/*TODO select box*/}
        }
    }

    currentNode = () => {
        let node = this.state.nodes.find((element) => element.id === this.state.id)

        return(
            <div className='node-current'>
                <h1>{node.nodeName}</h1>
                <input type='text' value={this.state.nodes.find(e => e.id === this.state.id).body} onChange={this.handleChangeBody}/>
                <div className='connections'>
                    <div className='node-connections'>
                        <ul>
                            {node.connections.map((connection) => (
                                <li key={connection.id} onClick={() => this.changeCurrentNode(connection.id)}>{connection.nodeName}</li>
                            ))}
                        </ul>
                    </div>
                    <div className='add-node'>
                        <form onSubmit={this.createNode}>
                            <h2>Add connection</h2>
                            <label>
                                Existing node?
                            <input type='checkbox' value={this.state.checked} onChange={this.handleChecked}/>
                            </label>
                            {
                                this.state.checked ? (
                                    <label>
                                        Node name:
                                        <Select options={this.state.nodes.map(nodeElement => ({value: nodeElement.id, label: nodeElement.nodeName}))}/>
                                    </label>
                                ) : (
                                    <>
                                    <label>
                                        Node name:
                                        <input type='text' name='name' onChange={this.handleChangeForm}/>
                                    </label>
                                    </>
                                )
                            }
                            <label>
                                Connect!
                                <input type='submit'/>
                            </label>
                        </form>
                    </div>
                </div>
                {/*TODO left off here, need to add checkbox to check if node already exists or create new node*/}
            </div>
        )
    }




    allNodes = () => {
        return (
            <div className='node-list'>
                <h2>All nodes:</h2>
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
                <h1>Currently working on: {this.props.storyName}</h1>
                <this.allNodes/>
                <this.currentNode/>
            </>

        )
    }
}


