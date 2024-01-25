import SingleCard from './Components/SingleCard';
import { useEffect, useState } from 'react';
import './App.css';
import Confetti, { ReactConfetti } from 'react-confetti';
import Congrats from './Components/Congrats';
import ScorePalette from './Components/ScorePalette';


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
  
  const [confetti, setConfetti] = useState(false);
  const [visibility, setVisibility] = useState(["invisible"]);


  // shuffle cards
  const shuffleCards = () => {

    const shuffledCards = [...cardImages, ...cardImages]
    .sort(() => Math.random() - 0.5)
    .map((card) => ({ ...card, id: Math.random() }))

    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffledCards) 
    setVisibility(["invisible"])
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
  // and then it will fire the function again whenever a dependency changes

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

  //dependency inside []. If we select a card and if we update choiceOne inside handleChoice,
  // It's ginna find this function useEffect() again. If we update choiceTwo, it gonna find again

  //Confetti celebration
  useEffect(() => {
    if(score == 6){
      setConfetti(true)
      setVisibility(["visible"])
      setTimeout(() => setConfetti(false), 10000)
      setTimeout(() => shuffleCards(), 10000)
    }
  },[score])

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
    <div className="App min-h-screen text-white font-serif font-bold p-2">
      
      <div className='text-xl flex flex-row float-left md:text-5xl sm:mt-2'>
        <img src='Images\logo.png' 
            alt='App Icon - lighten bulb'
            width={50}
            className='mr-1'/>
        <h2 className='invisible md:visible'>Memory Test</h2>
      </div>
      
      <ScorePalette turns={turns} score={score}/>

      <div className='flex flex-col items-center mt-20 justify-items-center'>
        <div>
            <h5 className='text-lg md:text-2xl mt-5'>Match the tiles !</h5>
        </div>
      
        <div className='grid grid-cols-4 gap-0 mt-5'>
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

        {confetti && <Confetti/>}
        <div>
          <Congrats confetti={confetti} visibility={visibility}/>
        </div>

        <div>
          <button className='text-lg mt-5 md:text-2xl p-2 border rounded-md' onClick={shuffleCards}>New Game</button>
        </div>

      </div>


    </div>
  );
}

export default App;
