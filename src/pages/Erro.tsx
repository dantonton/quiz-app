// src/pages/Erro.tsx
import { useQuiz } from '../context/QuizContext'
import './styles.css'

export default function Erro() {
  const { resetQuiz } = useQuiz()

  const handleClick = () => {
    resetQuiz()
    window.dispatchEvent(new CustomEvent('setTela', { detail: 'home' }))
  }

  return (
    <div className="tela fundo" onClick={handleClick}>
      <h1 className="titulo">Você errou! Tente novamente.</h1>
    </div>
  )
}
