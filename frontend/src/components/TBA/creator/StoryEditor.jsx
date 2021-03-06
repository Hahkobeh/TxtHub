import React, { Component } from 'react'
import axios from "axios";
import CurrentNode from "./CurrentNode";
import ObjectID from "bson-objectid";
import './StoryEditor.scss'

export default class StoryEditor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: props.firstNodeId,
            nodes : [],
            connections:[],
            checked: false,
            newNodeName: '',
            connectId: ''

        }
    }



    async componentDidMount() {


        await axios.all([
            axios.get(`http://localhost:8083/tba/api/v1/nodes/${this.props.storyId}`),
            axios.get(`http://localhost:8083/tba/api/v1/connections/${this.props.storyId}`)
        ]).then(axios.spread((...res)=> {
            console.log('setting state now!')

            this.setState({
                nodes : res[0].data,
                connections:res[1].data
            })

        }))




    }





    componentWillUnmount() {
        console.log('unmounted')
        axios.put(`http://localhost:8083/tba/api/v1/updateNodes/${this.props.storyId}`,this.state.nodes).then(r => console.log(r))
        console.log(this.state.connections)
        axios.put(`http://localhost:8083/tba/api/v1/updateConnections/${this.props.storyId}`, this.state.connections).then(r => console.log(r))
    }








    render() {
        console.log(this.state.nodes)
         if(this.state.nodes.length === 0){
            return (
                <h1>LOADING</h1>
            )
        }else {
            let node = this.state.nodes.find(e => e.id === this.state.id)

            return (
                <>
                    <h1>{this.props.storyName}</h1>
                    <div className='story-editor'>
                        <this.allNodes/>
                        <CurrentNode node={node} handleChangeNodeName={this.handleChangeNodeName} handleChangeNodeBody={this.handleChangeNodeBody} handleChangeNodeEnd={this.handleChangeNodeEnd}/>
                        <this.connections/>
                    </div>
                    <button onClick={() => this.props.selectStory(null)}>Return to my stories</button>
                </>

            )
        }
    }

    allNodes = () => {
        return (
            <div className='node-list'>
                <h2>Node List</h2>
                <ul>
                    {this.state.nodes.map((node) => (

                        <li key={node.id} onClick={() => this.changeCurrentNode(node.id)}>{node.nodeName}{node.id === this.props.firstNodeId && <> (Start) </>}{node.id === this.state.id && <> (Current) </>}</li>
                    ))}

                </ul>
            </div>
        )
    }


    connections = () => {
        let allConnections = this.state.connections.filter(e => e.nodeId === this.state.id)
        console.log()
        let possibleNodeConnections = this.state.nodes.filter(e => e.id !== this.state.id && !allConnections.find(c => (e.id === c.connectedNodeId)))
        console.log(possibleNodeConnections)
        return (
            <div className='node-connections'>
                <ul className='node-current-connections'>
                    {allConnections.length !== 0 ? allConnections.map((connection) => (
                            <li key={connection.id}>
                                <p onClick={() => this.changeCurrentNode(connection.connectedNodeId)}>{this.state.nodes.find(e => connection.connectedNodeId === e.id).nodeName}</p>
                                <button className='secondary-button' onClick={() => this.removeConnection(connection.id)}>Remove connection</button>
                                {connection.connectedNodeId !== this.props.firstNodeId && <button className='secondary-button' onClick={() => this.removeNode(connection.connectedNodeId)}>Delete node</button>}
                            </li>
                        )) :
                        <li>There are no connections, add one!</li>}
                </ul>
                <form onSubmit={this.createNode}>
                    <h2>Add connection</h2>
                    <label>
                        <p>
                        Existing node?
                        </p>
                        <input type='checkbox' value={this.state.checked} onChange={() => this.handleChecked()}/>
                    </label>
                    {
                        this.state.checked ? (
                            <label>
                                <p>
                                Node name:
                                </p>
                                <select name='connectId' onChange={this.handleChangeForm}>
                                    <option key={''} value=''/>
                                    {possibleNodeConnections.map(nodeElement => (
                                        <option key={nodeElement.id} value={nodeElement.id}>{nodeElement.nodeName}</option>))}}
                                </select>
                            </label>
                        ) : (
                            <>
                                <label>
                                    <p>
                                    Node name:
                                    </p>
                                    <input type='text' name='newNodeName' onChange={this.handleChangeForm} value={this.state.newNodeName}/>
                                </label>
                            </>
                        )
                    }
                    <input type='submit' value='Connect' className='submit'/>
                </form>

            </div>
        )
    }

    createNode = (e) => {
        e.preventDefault()

        if(!this.state.checked && this.state.name !== '') {

            const newId = ObjectID().toHexString()

            const newNode = {
                id: newId,
                storyId: this.props.storyId,
                nodeName: this.state.newNodeName,
                body: '',
                end: false

            }


            const newConnection = {
                id: ObjectID().toHexString(),
                storyId: this.props.storyId,
                nodeId: this.state.id,
                connectedNodeId: newId
            }


            this.setState({
                nodes: [...this.state.nodes, newNode],
                connections: [...this.state.connections, newConnection],
                connectId: '',
                newNodeName: ''
            })


        }else{
            console.log(this.state.connectId)
            if(this.state.connectId !== '') {
                const newConnection = {
                    id: ObjectID().toHexString(),
                    storyId: this.props.storyId,
                    nodeId: this.state.id,
                    connectedNodeId: this.state.connectId
                }
                this.setState({
                    connections: [...this.state.connections, newConnection],
                    connectId: '',
                    newNodeName: ''
                })
            }
        }
    }

    handleChangeForm = (e) => {

        const {name, value} = e.target
        this.setState({[name]: value})
    }

    handleChecked = () => {
        this.setState((prevState) => ({
            checked: !prevState.checked,
            connectId: '',
            newNodeName: ''
        }))

    }




    removeNode = (id) => {
        const newNodes = this.state.nodes.filter(e => e.id !== id)
        const newConnections = this.state.connections.filter(e =>  e.nodeId !== id && e.connectedNodeId !== id)
        this.setState({
            nodes: newNodes,
            connections: newConnections
        })
    }

    removeConnection = (id) => {
        const newConnections = this.state.connections.filter(c => c.id !== id)

        this.setState({connections:newConnections})
    }

    changeCurrentNode = (id) => {
        if(id !== this.state.id) {
            this.setState({
                id: id
            })
        }
    }

    handleChangeNodeName = (event) => {
        let newNodes = this.state.nodes.map(e => {
            if(e.id === this.state.id){
                e.nodeName = event.target.value
                return(e)
            }else{
                return(e)
            }
        })

        this.setState({nodes:newNodes})
    }

    handleChangeNodeBody = (event) => {
        let newNodes = this.state.nodes.map(e => {
            if(e.id === this.state.id){
                e.body = event.target.value
                return(e)
            }else{
                return(e)
            }
        })

        this.setState({nodes:newNodes})
    }

    handleChangeNodeEnd = () => {
        let newNodes = this.state.nodes.map(e => {
            if(e.id === this.state.id){
                e.end = !e.end
                return(e)
            }else{
                return(e)
            }
        })
        this.setState({nodes:newNodes})

    }



}
