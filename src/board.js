import React from 'react';
import './index.css';
import Square from './square.js';
import './game-results.js';
import  './game.js';



class Board extends React.Component {
  renderSquare(i) {
    const winnerLine = this.props.winnerLine;
    return (
      < Square
        key={i}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
        highlight={winnerLine && winnerLine.includes(i)}
      />
    );
  }

  render() {
    const boardSize = 6;
    let squares = [];
    for (let i =0; i < boardSize; ++i) {
      let row = [];
      for (let j = 0; j < boardSize; ++j) {
        row.push(this.renderSquare(i *boardSize +j));
      }
      squares.push(<div key={i} classNam="board-row">{row}</div> );
    }
    return (
      <div>{squares}</div>
      // <div>
      //   <div className="board-row">
      //     {this.renderSquare(0)}
      //     {this.renderSquare(1)}
      //     {this.renderSquare(2)}
      //   </div>
      //   <div className="board-row">
      //     {this.renderSquare(3)}
      //     {this.renderSquare(4)}
      //     {this.renderSquare(5)}
      //   </div>
      //   <div className="board-row">
      //     {this.renderSquare(6)}
      //     {this.renderSquare(7)}
      //     {this.renderSquare(8)}
      //   </div>
      //   <div className="board-row">
      //     {this.renderSquare(9)}
      //     {this.renderSquare(10)}
      //     {this.renderSquare(11)}
      //   </div>
      //   <div className="board-row">
      //     {this.renderSquare(12)}
      //     {this.renderSquare(13)}
      //     {this.renderSquare(14)}
      //   </div>      
      //   <div className="board-row">
      //     {this.renderSquare(15)}
      //     {this.renderSquare(16)}
      //     {this.renderSquare(17)}
      //   </div>
      //   <div className="board-row">
      //     {this.renderSquare(18)}
      //     {this.renderSquare(19)}
      //     {this.renderSquare(20)}
      //   </div>
      //     <div className="board-row">
      //     {this.renderSquare(21)}
      //     {this.renderSquare(22)}
      //     {this.renderSquare(23)}
      //   </div>
      // <div className="board-row">
      //     {this.renderSquare(24)}
      //     {this.renderSquare(25)}
      //     {this.renderSquare(26)}
      //   </div>
      // <div className="board-row">
      //     {this.renderSquare(27)}
      //     {this.renderSquare(28)}
      //     {this.renderSquare(29)}
      //   </div>
      //<div className="board-row">
       //     {this.renderSquare(30)}
       //     {this.renderSquare(31)}
       //     {this.renderSquare(32)}
       //   </div>
       //  <div className="board-row">
        //     {this.renderSquare(33)}
        //     {this.renderSquare(34)}
        //     {this.renderSquare(35)}
        //   </div>

      // </div>
    );
  }
}
export default Board;