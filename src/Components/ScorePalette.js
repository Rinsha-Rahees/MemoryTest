import React from 'react'

function ScorePalette({turns, score}) {
  return (

    <div className='text-md md:text-2xl flex flex-col items-center float-right sm:mt-2 sm:mr-6'>
        <div className='flex flex-row items-center'> 
          <img src='Images\turnIcon.png' 
            alt='Turn Icon'
            width={20}
            className='mr-2'/>
          <h5>Turns: {turns}</h5>
        </div>
        <div className='flex flex-row items-center mt-2'>
          <img src='Images\trophyStarIcon.png' 
            alt='Star Icon'
            width={24}
            className='mr-2'/>
          <h5>Score: {score}</h5>
        </div>
      </div>
    
  )
}

export default ScorePalette