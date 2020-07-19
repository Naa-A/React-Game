import React from 'react';
import './index.css';
import './board.js';
import './square.js';
import './game-results.js';



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






    // function calculateWinner(squares) {
    //   const lines = [
    //     [0, 1, 2],
    //     [3, 4, 5],
    //     [6, 7, 8],
    //     [0, 3, 6],
    //     [1, 4, 7],
    //     [2, 5, 8],
    //     [0, 4, 8],
    //     [2, 4, 6]
    //   ];
  