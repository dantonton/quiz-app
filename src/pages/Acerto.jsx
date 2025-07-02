// src/pages/Acerto.jsx
import { useNavigate } from 'react-router-dom'
import { useQuiz } from '../context/QuizContext'
import './styles.css'

export default function Acerto() {
  const navigate = useNavigate()
  const { resetQuiz } = useQuiz()

  const handleClick = () => {
    resetQuiz()
    navigate('/')
  }

  return (
    <div className="tela fundo" onClick={handleClick}>
      <h1 className="titulo">Parabéns! Você acertou tudo!</h1>
    </div>
  )
}
