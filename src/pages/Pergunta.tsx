// src/pages/Pergunta.jsx
import { useQuiz } from '../context/QuizContext'
import { useState } from 'react'
import './styles.css'

export default function Pergunta() {
  const { pergunta, avancarPergunta, terminou, erros } = useQuiz()
  const [selected, setSelected] = useState<string | null>(null)

  if (!pergunta) return null

  const handleResposta = (resposta: string) => {
    if(selected) return;
    setSelected(resposta);

    setTimeout(() => {
      setSelected('')
      avancarPergunta(resposta === pergunta.correta)
      if (terminou) {
        if (erros) {
          setTela('erro')
        } else {
          setTela('acerto')
        }
      } else {
      }
    }, 1000)
  }

  const setTela = (tela: 'home' | 'erro' | 'acerto' | 'quiz') => {
    window.dispatchEvent(new CustomEvent('setTela', { detail: tela }))
  }

  return (
    <div className="tela fundo">
      <h2 className="titulo">{pergunta.pergunta}</h2>
      <div className="opcoes">
        {pergunta.opcoes.map((opcao, index) => (
          <div
            key={index}
            className={`opcao ${selected && opcao == pergunta.correta? '--certo':''} ${selected == opcao && opcao != pergunta.correta? '--errado':''}`}
            onClick={() => handleResposta(opcao)}
          >
            {opcao}
          </div>
        ))}
      </div>
    </div>
  )
}