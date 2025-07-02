import { useQuiz } from '../context/QuizContext'
import './styles.css'

export default function Acerto() {
  const { resetQuiz } = useQuiz()

  const handleClick = () => {
    resetQuiz()
    window.dispatchEvent(new CustomEvent('setTela', { detail: 'home' }))
  }

  return (
    <div className="tela fundo" onClick={handleClick}>
      <h1 className="titulo">Parabéns! Você acertou tudo!</h1>
    </div>
  )
}