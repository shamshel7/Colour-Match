import React, { Component } from 'react';
import './Square.css';

class Square extends Component {

    render() {
        return (
            <span className={"square " + (this.props.colour)} onClick={this.props.onClick}>

            </span>
        );
    }
}

export default Square;