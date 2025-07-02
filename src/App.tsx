import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { QuizProvider } from './context/QuizContext'

import Home from './pages/Home'
import Pergunta from './pages/Pergunta'
import Erro from './pages/Erro'
import Acerto from './pages/Acerto'

function App() {
  return (
    <QuizProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz" element={<Pergunta />} />
          <Route path="/erro" element={<Erro />} />
          <Route path="/acerto" element={<Acerto />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </QuizProvider>
  )
}

export default App
