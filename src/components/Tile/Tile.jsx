/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import './Tile.css'


export default function Tile(props) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [correct, setIsCorrect] = useState(false);
  

  
  useEffect(() => {
    // props.setIsRestart(!props.isRestat);
  
    props.wrapperRef.current.classList.remove('no-event')
  
    if(props.firstFlipped && props.secondFlipped) {
      if(props.firstFlipped.nextSibling.children[0].innerHTML === props.secondFlipped.nextSibling.children[0].innerHTML) {
        setIsCorrect(true);
        props.setCount(props.count+1);
      } else {
        props.wrapperRef.current.classList.add('no-event')
        setTimeout(() => {
          props.wrapperRef.current.classList.remove('no-event')
          flipBack();
        },2000)
    
        setIsCorrect(false);
      }
    }
  }, [props.flippedCount])

  function flip() {
    const frontSide = document.getElementById(props.id);
    const backSide = document.getElementById(props.id+1);

    if( frontSide.classList.contains('rotateFront') && backSide.classList.contains('rotateBack')) {
      console.log('FLIPPED', props.flippedCount)
    } else {
      if(props.flippedCount >= 2) {
        if(!correct) {
          flipBack();
          setIsCorrect(!correct); 
        }
      }
      props.setIsFirst(!props.isFirst);
      if(!isFlipped) {
        frontSide.classList.add('rotateFront');
        backSide.classList.add('rotateBack');
        props.setFlippedCount(props.flippedCount+1)
      } else {
        frontSide.classList.remove('rotateFront');
        backSide.classList.remove('rotateBack');
        
        setIsFlipped(!isFlipped);
      }
    }
  }
  
  function flipBack() {
    props.secondFlipped.classList.remove('rotateFront');
    props.secondFlipped.nextSibling.classList.remove('rotateBack')
    props.firstFlipped.classList.remove('rotateFront')
    props.firstFlipped.nextSibling.classList.remove('rotateBack');
  }

  function checkAnswer(e) {
    if(props.flippedCount >= 2) {
      props.setFirstFlipper(null);
      props.setSecondFlipped(null);
      props.setFlippedCount(1);
    }
    props.check(e.target);
  }

  return (
    <div className='cell'>
    <div className='flip-card' onClick={(e) => checkAnswer(e)}>
      <div onClick={flip} id={props.id} className='flip-card__front-side '>
        <p className='card-title'></p>
      </div>
      <div onClick={flip} id={props.id+1} className={` flip-card__back-side`}>
        <p className='card-title'></p>
      </div>
    </div>
    
  </div>
  )
}
