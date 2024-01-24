import React from 'react'
import './SingleCard.css'

function SingleCard({card, handleChoice, flipped, disabled}) {

  const handleClick = () => {
    if(!disabled){
      handleChoice(card)
    }
  }

  return (
    <div className='card relative m-1'>
        <div 
        className={`carditem block items-center max-h-auto 
        max-w-auto w-20 md:w-28 ${flipped ? "flipped" : ""}`}
        key={card.id}
        >
            <img className='cardfront absolute rounded-md' src={card.src} alt='card front' />
            
            <img 
            className='cardback rounded-md' 
            onClick={handleClick} 
            src='Images\bluestarry.jpg' 
            alt='card back' />
        </div>
    </div>
  )
}

export default SingleCard