import GameBoard from "./components/GameBoard"
import Log from "./components/Log";
import Player from "./components/Player"
import React, { useState } from 'react';
import { WINNING_COMBINATIONS } from "./components/winning-combinations";
const initialGameBoard=[
  [null,null,null],
  [null,null,null],
  [null,null,null]
]

function deriveActivePlayer(gameTurns){
  let currentPlayer='X';
  if(gameTurns.length>0&&gameTurns[0].player==='X'){
    currentPlayer='O';
  }
  return currentPlayer;
}
function App() {
  const[gameTurns,SetGameTruns]=useState([]);
  // const[hasWinner,setHasWinner]=useState(false);
  // const [activePlayer,setActivePlayer]=useState('X');

  const activePlayer = deriveActivePlayer(gameTurns);
  let gameBoard=initialGameBoard;
    for(const turn of gameTurns){
        const {square,player}=turn;
        const{row,col}=square;
        gameBoard[row][col]=player;
    }
    let winner;
  for(const combination of WINNING_COMBINATIONS){
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].col];
    const secondSquareSymbol=gameBoard[combination[1].row][combination[1].col];
    const thirdSquareSymbol=gameBoard[combination[2].row][combination[2].col];
   
    if(firstSquareSymbol && 
      firstSquareSymbol===secondSquareSymbol &&
      firstSquareSymbol===thirdSquareSymbol){
        winner=firstSquareSymbol;
    }
  }
function handleselectSquare(rowIndex,colIndex){
  // setActivePlayer((curActivePlayer)=>curActivePlayer==='X'?'O':'X');
  SetGameTruns((prevTurns)=>{
    const currentPlayer = deriveActivePlayer(prevTurns);
    const updatedTurns=[
      {square:{row:rowIndex,col:colIndex},player:currentPlayer},
      ...prevTurns];
      return updatedTurns;
  });
}
  return (
    <>
    <div id="game-container">
      <ol id="players" className="highlight-player" >
        <Player initialName="player 1" symbol="X" 
        isActive={activePlayer==='X'}/>
        <Player initialName="player 2" symbol="O" 
        isActive={activePlayer==='O'}/>
      </ol>
      {winner && <p>You won,{winner}!</p>}
      <GameBoard onSelectSquare={handleselectSquare}
      board={gameBoard}
       />
    </div>
    <Log turns={gameTurns}/>
    </>
  ) 
}

export default App
