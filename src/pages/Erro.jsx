// src/pages/Erro.jsx
import { useNavigate } from 'react-router-dom'
import { useQuiz } from '../context/QuizContext'
import './styles.css'

export default function Erro() {
  const navigate = useNavigate()
  const { resetQuiz } = useQuiz()

  const handleClick = () => {
    resetQuiz()
    navigate('/')
  }

  return (
    <div className="tela fundo" onClick={handleClick}>
      <h1 className="titulo">Você errou! Tente novamente.</h1>
    </div>
  )
}
