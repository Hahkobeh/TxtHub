import React, { Component } from 'react'
import axios from "axios";

export default class PlayingGame extends Component {
    constructor(props){
        super(props)
        this.state = {
            id: this.props.storyId,
            nodes: []
        }
    }
    componentDidMount() {
        axios.get('http://localhost:8083/tba/api/v1/getstories/' + this.props.storyId)
            .then(res => {
                this.setState({
                    nodes: res.data
                })
            })

    }


    render() {
        return (
            <div>
                <h1>{this.state.id}</h1>
                <button onClick={this.props.return}>Return to menu</button>
            </div>
        )
    }
}