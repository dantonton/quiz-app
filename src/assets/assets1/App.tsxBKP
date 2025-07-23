import { QuizProvider } from './context/QuizContext'

import Home from './pages/Home'
import Pergunta from './pages/Pergunta'
import Erro from './pages/Erro'
import Acerto from './pages/Acerto'
import { useEffect, useState } from 'react'

function App() {
  const [tela, setTela] = useState<'home' | 'quiz' | 'erro' | 'acerto'>('home')

  useEffect(() => {
    const listener = (e: Event) => {
      const tela = (e as CustomEvent).detail
      setTela(tela)
    }
    window.addEventListener('setTela', listener)
    return () => window.removeEventListener('setTela', listener)
  }, [])

  return (
    <QuizProvider>
      {tela === 'home' && <Home />}
      {tela === 'quiz' && <Pergunta />}
      {tela === 'erro' && <Erro />}
      {tela === 'acerto' && <Acerto />}
    </QuizProvider>
  )
}

export default App
