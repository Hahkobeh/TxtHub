import React, { Component } from 'react'

export default class playerMenu extends Component {
    constructor(props){
        super(props)
    }

   

    render() {
        return (
            <div>
                <h1>GAMES!</h1>
                <ul>
                    <li>GAME 1</li>
                    <li>GAME 2</li>
                </ul>

                <button onClick={this.props.return}>temp return</button>

            </div>
        )
    }
}
