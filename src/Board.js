import React, { Component } from 'react';
import Square from './Square.js'

class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            boardData: this.initBoardData(this.props.height, this.props.width)
        }    
    }
    
    getRandomColour() {
        const n = Math.floor(Math.random() * 4) + 1;

        return this.getColour(n);
    }

    getColour(index) {
        switch(index) {
            case 1:
                return "red";
            case 2:
                return "yellow";
            case 3:
                return "blue";
            case 4:
                return "green";
            default:
                return "black";
        }
    }

    getNextColour(colour) {
        let n = 0;

        switch(colour) {
            case "red":
                n = 2;
                return this.getColour(n);
            case "yellow":
                n = 3;
                return this.getColour(n);
            case "blue":
                n = 4;
                return this.getColour(n);
            case "green":
                n = 1;
                return this.getColour(n);
            default:
                n = 0;
                return this.getColour(n);
        }
    }

    initBoardData(height, width) {
        let data = [];

        for (let i = 0; i < height; i++) {
            data.push([]);
            for (let j = 0; j < width; j++) {
                data[i][j] = {
                    x: i,
                    y: j,
                    colour: this.getRandomColour()
                }
            }
        }

        return data;
    }

    traverseBoard(x, y) {
        const height = this.props.height - 1;
        const width = this.props.width - 1;

        let area = [];

        area.push({a: x, b: y});

        // UP
        if (x > 0) {
            area.push({a: x - 1, b: y});
        }

        // DOWN
        if (x < height) {
            area.push({a: x + 1, b: y});
        }

        // LEFT
        if (y > 0) {
            area.push({a: x, b: y - 1});
        }

        // RIGHT
        if (y < width) {
            area.push({a: x, b: y + 1});
        }

        return area;
    }

    allMatching() {
        let gridColours = [];
        for (let i = 0; i < this.props.height; i++) {
            for (let j = 0; j < this.props.width; j++) {
                gridColours.push(this.state.boardData[i][j].colour)
            }
        }

        const allEqual = arr => arr.every(g => g === arr[0]);

        return allEqual(gridColours);
    }

    gameWon() {
        alert("Congratulations! You won!");
        this.props.setState({gameStatus: "Menu"});
    }

    handleSquareClick(x, y) {
        let area = this.traverseBoard(x, y);
        let updatedData = this.state.boardData;

        for (let i = 0; i < area.length; i++) {
            let x = area[i].a;
            let y = area[i].b;

            let prevColour = updatedData[x][y].colour;
            updatedData[x][y].colour = this.getNextColour(prevColour);

            this.setState({
                boardData: updatedData
            });
        }

        if (this.allMatching() === true) {
            this.gameWon();
        }
    }

    renderSquares(data) {
        return data.map((datarow) => {
            return datarow.map((dataitem) => {
                return (
                    <span key={(dataitem.y * datarow.length) + dataitem.x}>
                        <Square
                            colour={dataitem.colour}
                            onClick={() => this.handleSquareClick(dataitem.x, dataitem.y)}
                        />
                        {(datarow[datarow.length - 1] === dataitem) ? <div className="linebreak"><br /></div> : ""}
                    </span>
                );
            });
        });
    }

    render() {
        return (
            <div className="board">
                {this.renderSquares(this.state.boardData)}
            </div>
        );
    }
}

export default Board;