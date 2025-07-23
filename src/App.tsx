import { useEffect, useState } from 'react'
import back from './assets/cindes/3.png'
import car1 from './assets/cindes/5.png'
import car2 from './assets/cindes/7.png'
import car3 from './assets/cindes/9.png'
import car4 from './assets/cindes/11.png'
import car5 from './assets/cindes/13.png'
import car6 from './assets/cindes/15.png'

type CardType = {
  id: number
  image: string
  matched: boolean
}

type GameState = 'start' | 'playing' | 'win' | 'fail'

const images = [
  car1, car2,car3,
  car4, car5, car6,
]

function shuffleCards(): CardType[] {
  const duplicated = [...images, ...images]
  return duplicated
    .map((img, index) => ({
      id: index,
      image: img,
      matched: false
    }))
    .sort(() => Math.random() - 0.5)
}


export default function App() {
  const [gameState, setGameState] = useState<GameState>('start')
  const [cards, setCards] = useState<CardType[]>([])
  const [selected, setSelected] = useState<number[]>([])
  const [matched, setMatched] = useState<number[]>([])
  const [time, setTime] = useState(60)

  useEffect(() => {
    let timer: any
    if (gameState === 'playing' && time > 0) {
      timer = setTimeout(() => setTime(t => t - 1), 1000)
    } else if (time === 0) {
      setGameState('fail')
    }
    return () => clearTimeout(timer)
  }, [time, gameState])

  useEffect(() => {
    if (matched.length === 12) {
      setGameState('win')
    }
  }, [matched])

  const startGame = () => {
    setCards(shuffleCards())
    setSelected([])
    setMatched([])
    setTime(60)
    setGameState('playing')
  }

  const handleCardClick = (index: number) => {
    if (selected.length === 2 || selected.includes(index) || matched.includes(index)) return
    const newSelected = [...selected, index]
    setSelected(newSelected)

    if (newSelected.length === 2) {
      const [first, second] = newSelected
      if (cards[first].image === cards[second].image) {
        setMatched([...matched, first, second])
        setSelected([])
      } else {
        setTimeout(() => setSelected([]), 1000)
      }
    }
  }

  const handleScreenClick = () => {
    if (gameState === 'start') {
      startGame()
    } else if (gameState === 'fail' || gameState === 'win') {
      setCards(shuffleCards())
      setSelected([])
      setMatched([])
      setTime(60)
      setGameState('start')
    }
  }

  return (
    <div className="container" onClick={handleScreenClick}>
      {gameState === 'start' && <div className="screen fundo inicio"></div>}
      {gameState === 'playing' && (
        <div className="game fundo">
          <div className="timer">Tempo: {time}s</div>
          <div className="grid">
            {cards.map((card, index) => {
              const isFlipped = selected.includes(index) || matched.includes(index)
              return (
                <div
                  key={index}
                  className={`card ${isFlipped ? 'flipped' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation()
                    handleCardClick(index)
                  }}
                >
                  <img
                    className="front"
                    src={card.image}
                    alt="card"
                  />
                  <img
                    className="back"
                    src={back}
                    //src={`/src/assets/${gameName}/3.png`}
                    alt="back"
                  />
                </div>
              )
            })}
          </div>
        </div>
      )}
      {gameState === 'win' && <div className="screen fundo acerto"></div>}
      {gameState === 'fail' && <div className="screen fundo erro"></div>}
    </div>
  )
}

