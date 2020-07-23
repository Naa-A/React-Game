import React from 'react';
import './index.css';
import './square';
import Board from './board';
import {calculateWinner} from './game-results';


class Game extends React.Component 
  {
    constructor(props) {
        super(props);
        this.state = {
        history: [
          {
            squares: Array(36).fill(null)
          }
        ],
        stepNumber: 0,
        xIsNext: true,
        isAscending: true
      };
    }
  
    handleClick(i) {
      const history = this.state.history.slice(0, this.state.stepNumber + 1);
      const current = history[history.length - 1];
      const squares = current.squares.slice();

      if (calculateWinner(squares).winner || squares[i]) {
        return;
      }
      squares[i] = this.state.xIsNext ? "X" : "O";
      this.setState({
        history: history.concat([
          {
            squares: squares,
            // store index of latest moved square
            latestMoveSquare: i 
            
          }
        ]),
        stepNumber: history.length,
        xIsNext: !this.state.xIsNext
      });
    }
  
    jumpTo(step) {
      this.setState({
        stepNumber: step,
        xIsNext: (step % 2) === 0
      });
    }

    handleSortToggle() {
      this.setState({
        isAscending: !this.state.isAscending
      });
    }
  
    render() {
      const history = this.state.history;
      const stepNumber = this.state.stepNumber;
      const current = history[stepNumber];
    //  const current = history[this.state.stepNumber];
      const winnerInfo = calculateWinner(current.squares);
      const winner = winnerInfo.winner;

    //use let below instead of const
      let moves = history.map((step, move) => 
      {
        const latestMoveSquare = step.latestMoveSquare;
        const col = 1 + latestMoveSquare % 6;
        const row = 1 + Math.floor(latestMoveSquare / 6);
        const desc = move ?
          `Go to move #${move} (${col}, ${row})` :
          'Go to game start';

        return (
          <li key={move}>
            <button
            className={move === stepNumber ? 'move-list-item-selected' : ''}
            onClick={() => this.jumpTo(move)}>{desc}</button>
          </li>
        );
      });
    
      let status;
      if (winner) {
        status = "Winner: " + winner;
      } else {
        if (winnerInfo.isDraw) {
          status = "Draw";
        } else {
        status = "Next player: " + (this.state.xIsNext ? "X" : "O");
      }
    }
  
    const isAscending = this.state.isAscending;
    if (!isAscending) {
      moves.reverse();
    }

      return (
        <div className="game">
          <div className="game-board">
            <Board
              squares={current.squares}
              onClick={i => this.handleClick(i)}
              winnerLine={winnerInfo.line}
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <button onClick={() => this.handleSortToggle()} >
              {isAscending ? 'descending' : 'ascending'}
            </button>
            <ol>{moves}</ol>
          </div>
        </div>
      );
    }
  }

  export default Game;