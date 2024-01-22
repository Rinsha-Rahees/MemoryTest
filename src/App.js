import { useState } from 'react';
import './App.css';


const cardImages = [
  {"src":"/Images/catbluebg.png"},
  {"src":"/Images/catbw.png"},
  {"src":"/Images/butterflycat.png"},
  {"src":"/Images/catsurprise.png"},
  {"src":"/Images/catpeep.png"},
  {"src":"/Images/catstare.png"}
]

function App() {

  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)

  // shuffle cards

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
    .sort(() => Math.random() - 0.5)
    .map((card) => ({ ...card, id: Math.random() }))

    setCards(shuffledCards) 
    setTurns(0)
  }

  console.log(cards, turns)

  return (
    <div className="App text-white bg-slate-600 min-h-screen">
      
    
      <div className='content text-white font-serif font-bold p-2 flex flex-col items-center'>

        <div className='header p-2'>
            <h2 className='heading text-2xl md:text-5xl'>Memory Test !</h2>
            <h5 className='subhead text-lg md:text-2xl mt-5'>Match the tiles</h5>
        </div>

        <div className='card-grid grid grid-cols-4 gap-0 mt-5'>
          {cards.map(card => (
            <div className='carditem flex items-center max-h-auto max-w-auto w-20 md:w-28 border-2 ' key={card.id}>
                <img className='cardfront' src={card.src} alt='card front' />
                <img className='cardback' src='Images\bluestarry.jpg' alt='card back' />
             </div>
          ))}
        </div>

        <div>
          <h5 className='subhead text-lg md:text-2xl mt-5'>Score:</h5>
          <button className='newgame text-lg md:text-2xl mt-5 p-2 border rounded-md' onClick={shuffleCards}>New Game</button>
        </div>

      </div>


    </div>
  );
}

export default App;
