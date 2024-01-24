import SingleCard from './Components/SingleCard';
import { useEffect, useState } from 'react';
import './App.css';


const cardImages = [
  { "src": "/Images/catbluebg.png", matched: false },
  { "src": "/Images/catbw.png", matched: false },
  { "src": "/Images/butterflycat.png", matched: false },
  { "src": "/Images/catsurprise.png", matched: false },
  { "src": "/Images/catpeep.png", matched: false },
  { "src": "/Images/catstare.png", matched: false }
]

function App() {

  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [score, setScore] = useState(0)
  const [disabled, setDisabled] = useState(false)
  //To compare
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)

  // shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
    .sort(() => Math.random() - 0.5)
    .map((card) => ({ ...card, id: Math.random() }))

    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffledCards) 
    setTurns(0)
    setScore(0)
  }

  //Handle choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)

    //Not comparing here. Cos, it may not work. 
    // It's gonna fire first before it even updates the state

  }

  //Compare 2 selected cards

  // useEffect is gonna fire when the component 1st mounts once automatically
  // and then it will fire the funcation again whenever a dependency changes

  useEffect(() => {
    
    if(choiceOne && choiceOne){  //This is gonna fire initially & we don't have to do any comparison. Cos, this func will be triggered if we have choiceOne and if we don't have choiceTwo, won't go inside - So, there is no need of extra comparison. This will work only if we have 2 choices
      setDisabled(true)
      if(choiceOne.src === choiceTwo.src) {
        setScore(prevScore => prevScore + 1)
        setCards(prevCards => {
          return prevCards.map(card => {
            if(card.src === choiceOne.src){
              return {...card, matched: true};
            }else {
              return card
            }
          })
        })
        resetTurn()
      }
      else {
        setTimeout(() => resetTurn(), 500)
      }
    }
  },[choiceTwo]) 
console.log(cards)
  //dependency inside []. If we select a card and if we update choiceOne inside handleChoice,
  // It's ginna find this function useEffect() again. If we update choiceTwo, it gonna find again

  //Reset choices & uncrease turns
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }

  //Start new game automatically
  useEffect(() => {
    shuffleCards()
  },[])

  return (
    <div className="App min-h-screen  text-white font-serif font-bold p-2">

      <div className='score'>
        <h5 className='subhead flex float-left ml-20 mt-10 text-lg md:text-2xl'>Turns: {turns}</h5>
        <h5 className='subhead flex float-right mr-20 mt-10 text-lg md:text-2xl'>Score: {score}</h5>
      </div>

      <div className='content flex flex-col items-center'>

        <div className='header p-2'>
            <h2 className='heading text-2xl md:text-5xl'>Memory Test !</h2>
            <h5 className='subhead text-lg md:text-2xl mt-5'>Match the tiles</h5>
        </div>
      
        <div className='card-grid grid grid-cols-4 gap-0 mt-5'>
          {cards.map(card => (
           <SingleCard 
           key={card.id} 
           card={card}
           handleChoice={handleChoice}
           flipped={card === choiceOne || card === choiceTwo || card.matched}
           disabled={disabled}
           />
          ))}
        </div>

        <div>
          <button className='newgame text-lg md:text-2xl mt-5 p-2 border rounded-md' onClick={shuffleCards}>New Game</button>
        </div>

      </div>


    </div>
  );
}

export default App;
