// src/pages/Pergunta.jsx
import { useQuiz } from '../context/QuizContext'
import { useState } from 'react'
import './styles.css'

export default function Pergunta() {
  const { pergunta, avancarPergunta, terminou } = useQuiz()
  const [erro, setErro] = useState(false)

  if (!pergunta) return null

  const handleResposta = (resposta: string) => {
    if (resposta === pergunta.correta) {
      if (terminou) {
        setTela('acerto')
      } else {
        avancarPergunta()
      }
    } else {
      setErro(true)
    }
  }

  const setTela = (tela: 'home' | 'erro' | 'acerto' | 'quiz') => {
    window.dispatchEvent(new CustomEvent('setTela', { detail: tela }))
  }

  if (erro) {
    setTela('erro')
    return null
  }

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