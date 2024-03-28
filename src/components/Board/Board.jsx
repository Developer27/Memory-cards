/* eslint-disable no-unused-vars */
import './Board.css'
import Tile from '../Tile/Tile'
import { useRef, useState } from 'react'
import {v4 as uuidv4} from 'uuid';

function Board() {
  const [flippedCount, setFlippedCount] = useState(0);
  const [firstFlipped, setFirstFlipper] = useState(null);
  const [secondFlipped, setSecondFlipped] = useState(null);
  const [isRestart, setIsRestart] = useState(false);
  const [isFirst, setIsFirst] = useState(false);
  const [count, setCount] = useState(0);

  const wrapperRef = useRef(null);
  const gameBoardRef = useRef(null);

  let symbols = ['&#9729;','&#9729;','&#9731;','&#9731;','&#9728;','&#9728;','&#9752;','&#9752;','&#9765;','&#9765;','&#9773;','&#9773;','&#9784;','&#9784;','&#9812;','&#9812;'];
  const BOARD_SIZE = 4;
  

  const [board, setBoard] = useState(new Array(BOARD_SIZE).fill(0).map(row => new Array(BOARD_SIZE).fill(0)));
 
  function startGame() {
    gameBoardRef.current.classList.remove('disabled');
    const cells = document.getElementsByClassName('flip-card__back-side');
    let newCells = Array.from(cells);
    if(count >= 8) {
        const cells1 = document.getElementsByClassName('flip-card__back-side');
        let newCells1 = Array.from(cells1);
        newCells1.map(cell => {
          cell.previousSibling.classList.remove('rotateFront');
          cell.classList.remove('rotateBack');
        })
        // for(let i = 0; i < newCells.length; i++) {
        //   newCells1[i].previousSibling.classList.remove('rotateFront');
        //   newCells1[i].classList.remove('rotateBack');
        // }
      setCount(0);
    } 
      for(let i = 0; i < 16; i++) {
        const random = Math.floor(Math.random() * (((Math.pow(BOARD_SIZE, 2)-i)-1) - 0 + 1) + 0);
        const random1 = Math.floor(Math.random() * (((Math.pow(BOARD_SIZE, 2)-i)-1) - 0 + 1) + 0);
        newCells[random].children[0].innerHTML = symbols[random1];
        symbols = symbols.filter((e, i) => i !== random1);
        newCells = newCells.filter((e, i) => i !== random );
      }
  } 

  function check(target) {
    if(!isFirst) {
      setFirstFlipper(target);
    } else {
      setSecondFlipped(target);
    }
  }


  return (
    <div ref={wrapperRef} className='wrapper '>
      <p className='game-title'>Memory game</p>
      <div ref={gameBoardRef} className="game-board disabled">
        {board.map((row, rowIdx) => (
            <div key={rowIdx} className='row'>{
              row.map((cell, cellIdx) => (
                <Tile key={cellIdx} check={check} id={uuidv4()} 
                  setFlippedCount={setFlippedCount} 
                  flippedCount={flippedCount}
                  firstFlipped={firstFlipped}
                  secondFlipped={secondFlipped}  
                  setFirstFlipper={setFirstFlipper}
                  setSecondFlipped={setSecondFlipped}
                  wrapperRef={wrapperRef}
                  setIsFirst={setIsFirst}
                  isFirst={isFirst}
                  setIsRestart={setIsRestart}
                  isRestart={isRestart}
                  setCount={setCount}
                  count={count}
                />
                ))
              } 
          </div>
          ))}
      </div>
      <button className='start-btn' onClick={startGame}>{!isRestart ? 'Start the game' : 'Restart the game'}</button>
    </div>
  )
}

export default Board;