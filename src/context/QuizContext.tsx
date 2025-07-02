// src/context/QuizContext.jsx
import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import perguntasJson from '../assets/assets1/perguntas.json'

export interface Pergunta {
  id: number
  pergunta: string
  opcoes: string[]
  correta: string
}

interface QuizContextType {
  pergunta?: Pergunta
  perguntaAtual: number
  avancarPergunta: () => void
  resetQuiz: () => void
  terminou: boolean
}

const QuizContext = createContext<QuizContextType | undefined>(undefined)

function embaralhar<T>(array: T[]): T[] {
  return [...array].sort(() => Math.random() - 0.5)
}

export const QuizProvider = ({ children }: { children: ReactNode }) => {
  const [perguntas, setPerguntas] = useState<Pergunta[]>([])
  const [perguntaAtual, setPerguntaAtual] = useState<number>(0)

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
    <QuizContext.Provider value={{ pergunta, perguntaAtual, avancarPergunta, resetQuiz, terminou }}>
      {children}
    </QuizContext.Provider>
  )
}

export const useQuiz = (): QuizContextType => {
  const context = useContext(QuizContext)
  if (!context) throw new Error('useQuiz must be used within QuizProvider')
  return context
}
