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
        <Route path="/memoria" element={<MemoryGame />} />
        <Route path="/institucional" element={<Institucional />} />
        <Route path="/quiz" element={<QuizProvider><Pergunta /></QuizProvider>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </HashRouter>
  )
}