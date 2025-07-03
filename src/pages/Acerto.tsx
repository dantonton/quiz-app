import { useQuiz } from '../context/QuizContext'
import './styles.css'

export default function Acerto() {
  const { resetQuiz } = useQuiz()

  const handleClick = () => {
    resetQuiz()
    window.dispatchEvent(new CustomEvent('setTela', { detail: 'home' }))
  }

  return (
    <div className="tela fundo acerto" onClick={handleClick}>
    </div>
  )
}