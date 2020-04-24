import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import './Game.css';
import Board from './Board.js'

class Game extends Component {
    state = {
        gameStatus: "Menu",
        height: 3,
        width: 3
    }

    selectDifficulty(grid) {
        this.setState({
            gameStatus: "Game begun!",
            height: grid,
            width: grid
        });
    }

    renderMenu() {
        return (
            <div className="menu">
                <Button className="diffButton" onClick={() => this.selectDifficulty(3)}>
                    Easy<br />(3 x 3)
                </Button>
                <Button className="diffButton" onClick={() => this.selectDifficulty(7)}>
                    Medium<br />(7 x 7)
                </Button>
                <Button className="diffButton" onClick={() => this.selectDifficulty(11)}>
                    Hard<br />(11 x 11)
                </Button>
            </div>
        );
    }

    renderBoard() {
        return (
            <div>
                <div className="board">
                    <Board height={this.state.height} width={this.state.width} setState={(e) => this.setState(e)}/>
                </div>
                <Button className="backToMenu" onClick={() => this.setState({gameStatus: "Menu"})}>
                    Back to menu
                </Button>
            </div>
        );
    }

    render() {
        return (
            <div className="Game">
                <div className="topcard">
                    <div className="title">
                        Colour Match
                    </div>
                   <div className="gameinfo">
                        {this.state.gameStatus}
                    </div>
                </div>
                {this.state.gameStatus === "Menu" ? this.renderMenu() : this.renderBoard()}
            </div>
        );
    }
}

export default Game;