// src/context/QuizContext.jsx
import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { useSearchParams } from 'react-router-dom'
import { allQuiz, type Question } from '../models/Quiz'


interface QuizContextType {
  pergunta?: Question
  perguntaAtual: number
  avancarPergunta: (acertou : boolean) => void
  resetQuiz: () => void
  terminou: boolean,
  erros: number
}

const QuizContext = createContext<QuizContextType | undefined>(undefined)

function embaralhar<T>(array: T[]): T[] {
  return [...array].sort(() => Math.random() - 0.5)
}

export const QuizProvider = ({ children }: { children: ReactNode }) => {
  const [searchParams] = useSearchParams();
  const gameKey = searchParams.get("game") ?? '';
  // Se allQuiz é uma função que recebe baseUrl:
  const gameConfig = allQuiz(import.meta.env.BASE_URL)[gameKey];
  
  const [perguntas, setPerguntas] = useState<Question[]>([])
  const [perguntaAtual, setPerguntaAtual] = useState<number>(0)
  const [erros, setErros] = useState<number>(0)

  useEffect(() => {
    // Sorteia 5 perguntas diferentes ao iniciar
    const sorteadas = embaralhar(gameConfig.questions).slice(0, 5)
    setPerguntas(sorteadas)
  }, [])

  const resetQuiz = () => {
    const sorteadas = embaralhar(gameConfig.questions).slice(0, 5)
    setPerguntas(sorteadas)
    setPerguntaAtual(0)
    setErros(0)
  }

  const avancarPergunta = (acertou : boolean) => {
    setPerguntaAtual((prev) => prev + 1)
    setErros((prev) => acertou? prev: prev + 1)
  }

  const pergunta = perguntas[perguntaAtual]
  const terminou = perguntaAtual >= perguntas.length - 1

  return (
    <QuizContext.Provider value={{ pergunta, perguntaAtual, avancarPergunta, resetQuiz, terminou, erros }}>
      {children}
    </QuizContext.Provider>
  )
}

export const useQuiz = (): QuizContextType => {
  const context = useContext(QuizContext)
  if (!context) throw new Error('useQuiz must be used within QuizProvider')
  return context
}
