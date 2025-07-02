// src/context/QuizContext.jsx
import { createContext, useContext, useState, useEffect } from 'react'
import perguntasJson from '../assets/assets1/perguntas.json'

const QuizContext = createContext()

function embaralhar(array) {
  return [...array].sort(() => Math.random() - 0.5)
}

export const QuizProvider = ({ children }) => {
  const [perguntas, setPerguntas] = useState([])
  const [perguntaAtual, setPerguntaAtual] = useState(0)

  useEffect(() => {
    // Sorteia 5 perguntas diferentes ao iniciar
    const sorteadas = embaralhar(perguntasJson).slice(0, 5)
    setPerguntas(sorteadas)
  }, [])

  const resetQuiz = () => {
    const sorteadas = embaralhar(perguntasJson).slice(0, 5)
    setPerguntas(sorteadas)
    setPerguntaAtual(0)
  }

  const avancarPergunta = () => {
    setPerguntaAtual((prev) => prev + 1)
  }

  const pergunta = perguntas[perguntaAtual]
  const terminou = perguntaAtual >= perguntas.length - 1

  return (
    <QuizContext.Provider
      value={{ pergunta, perguntaAtual, avancarPergunta, resetQuiz, terminou }}
    >
      {children}
    </QuizContext.Provider>
  )
}

export const useQuiz = () => useContext(QuizContext)
