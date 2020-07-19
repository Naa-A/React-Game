import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './board.js';
import './game.js';
import './square.js';


  
  
  // ========================================
  
  ReactDOM.render(<Game />, document.getElementById("root"));
  
  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    // function calculateWinner(squares) {
    //   const lines = [
    //     [0, 1, 2],
    //     [3, 4, 5],
    //     [6, 7, 8],
    //     [9, 10, 11],
    //     [12, 13, 14],
    //     [15, 16, 17],
    //     [0, 3, 6],
    //     [1, 4, 7],
    //     [2, 5, 8],
    //     [0, 4, 8],
    //     [2, 4, 6],
    //     [       ],
    //     [       ],
    //     [       ],
    //     [       ],
    //     [       ],
    //   ];


    // function calculateWinner(squares) {
    //   const lines = [
    //     [0, 1, 2, 3, 4, 5],
    //     [6, 7, 8, 9, 10, 11],
    //     [12, 13, 14, 15, 16   ]
    //     [0, 3, 6],
    //     [1, 4, 7],
    //     [2, 5, 8],
    //     [0, 4, 8],
    //     [2, 4, 6]
    //   ];
  


    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c])
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
