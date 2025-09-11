import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import MemoryGame from './pages/MemoryGame'
import './App.css'
import Institucional from './pages/Institucional'
import Pergunta from './pages/Pergunta'
import { QuizProvider } from './context/QuizContext'

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<div>🏠 Tela Inicial</div>} />
        <Route path="/quiz-app/#quiz?game=sesisaude" element={<MemoryGame />} />
        <Route path="/#quiz?game=sesisaude" element={<Institucional />} />
        <Route path="/quiz" element={<QuizProvider><Pergunta /></QuizProvider>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </HashRouter>
  )
}