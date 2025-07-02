// src/pages/Pergunta.jsx
import { useNavigate } from 'react-router-dom'
import { useQuiz } from '../context/QuizContext'
import './styles.css'

export default function Pergunta() {
  const { pergunta, avancarPergunta, terminou } = useQuiz()
  const navigate = useNavigate()

  const handleResposta = (resposta) => {
    if (resposta === pergunta.correta) {
      if (terminou) {
        navigate('/acerto')
      } else {
        avancarPergunta()
      }
    } else {
      navigate('/erro')
    }
  }

  if (!pergunta) return null

  return (
    <div className="tela fundo">
      <h2 className="titulo">{pergunta.pergunta}</h2>
      <div className="opcoes">
        {pergunta.opcoes.map((opcao, index) => (
          <div
            key={index}
            className="opcao"
            onClick={() => handleResposta(opcao)}
          >
            {opcao}
          </div>
        ))}
      </div>
    </div>
  )
}
