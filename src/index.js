import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  const className = 'square' + (props.highlight ? ' highlight' : '');
  return (
    <button className={className} onClick={props.onClick}>
      {props.value}
    </button>
  );
}



class Board extends React.Component {
  renderSquare(i) {
    const winnerLine = this.props.winnerLine;
    return (
      <Square
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



 class Game extends React.Component 
  {
    constructor(props) {
        super(props);
        this.state = {
        history: [
          {
            squares: Array(35).fill(null)
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
        const col = 1 + latestMoveSquare % 3;
        const row = 1 + Math.floor(latestMoveSquare / 3);
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






  function calculateWinner(squares) {
    const lines = [
      [0, 1,  2, 3, 4,  5],
      [6, 7,  8, 9, 10, 11],
      [12, 13, 14, 15, 16, 17],
      [18, 19, 20, 21, 22, 23],
      [24, 25, 26, 27, 28, 29],
      [30, 31, 32, 33, 34, 35],
    
      [0, 6, 12, 18, 24, 30],
      [1, 7, 13, 19, 25, 31],
      [2, 8, 14, 20, 26, 32],
      [3, 9, 15, 21, 27, 33],
      [4, 10, 16,22, 28, 34],
      [5, 11, 17, 23, 29, 35],

      [0, 7, 14, 21, 28, 35],
      [30,25, 20, 15, 10, 5]
    ];



  for (let i = 0; i < lines.length; i++) {
    const [a, b, c, d, e, f] = lines[i];
    if (squares[a] && 
        squares[a] === squares[b] && 
        squares[a] === squares[c] &&
        squares[a] === squares[d] &&
        squares[a] === squares[e] &&
        squares[a] === squares[f] 
        )

     {
      return {
        winner: squares[a],
        line: lines[i],
        isDraw: false,
      };
    }
  }
  let isDraw = true;
  for (let i = 0; i < squares.length; i++) 
  {
    if (squares[i] === null) 
    {
      isDraw = false;
      break;
    }
  }
  return {
    winner: null,
    line: null,
    isDraw: isDraw,
};
}



ReactDOM.render(<Game />, document.getElementById("root"));