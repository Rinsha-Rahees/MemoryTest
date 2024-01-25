import React from 'react'

function Congrats({confetti, visibility}) {

    if(confetti){
        return (
        <div className={`card relative m-1 ${visibility}`}>
            <h className='flex -mt-72 text-xl md:text-5xl lg:text-6xl text-yellow-400'>
                Yay!!Congratulations.
            </h>
        </div>
        )
    }
}

export default Congrats