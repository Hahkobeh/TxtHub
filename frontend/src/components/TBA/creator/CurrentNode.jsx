import React, {Component} from 'react';

class CurrentNode extends Component {
    constructor(props) {
        super(props);
        console.log(props.node)

    }




    render() {
        return (
            <div className='node-info'>
                <h2>Edit current node:</h2>
                <input type='text' onChange={this.props.handleChangeNodeName} value={this.props.node.nodeName}/>
                <textarea value={this.props.node.body} onChange={this.props.handleChangeNodeBody}/>
                <label>This is an end node:
                    <input type='checkbox' checked={this.props.node.end} onChange={this.props.handleChangeNodeEnd}/>
                </label>
            </div>
        );
    }
}

export default CurrentNode;