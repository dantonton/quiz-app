// src/pages/Pergunta.jsx
import { useQuiz } from '../context/QuizContext'
import { useEffect, useState } from 'react'
import './styles.css'
import { useSearchParams } from 'react-router-dom';
import { allQuiz } from '../models/Quiz';

export default function Pergunta() {
  
  const [searchParams] = useSearchParams();
  const gameKey = searchParams.get("game") ?? '';
  // Se allQuiz é uma função que recebe baseUrl:
  const gameConfig = allQuiz(import.meta.env.BASE_URL)[gameKey];

  const [screen, setScreen] = useState<'home' | 'erro' | 'acerto' | 'quiz'>('home')
  
  const { pergunta, avancarPergunta, resetQuiz, terminou, erros } = useQuiz()
  const [selected, setSelected] = useState<string | null>(null)


  const handleResposta = (resposta: string) => {
    if(selected) return;
    setSelected(resposta);

    setTimeout(() => {
      setSelected(null); // <<-- corrigido aqui
      avancarPergunta(resposta === pergunta?.right);
      
    }, 1000)
  }

  const reset = () => {
    resetQuiz();
    
    setScreen('home');
  }

  useEffect(() => {
    if (terminou) {
      setScreen(erros ? 'erro' : 'acerto');
    }
  }, [terminou, erros]);

  // ---------- TELAS ----------
  if (!gameConfig) {
    return <div>Configuração inválida para o jogo</div>;
  }

  if (!pergunta) {
    return <div>Carregando pergunta...</div>;
  }

   // ---------- TELAS ----------
   if (screen === 'home') {
    return (
      
    <div className="container">
      <div className="screen fundo home" style={{ backgroundImage: `url(${gameConfig.startBackground})` }} 
      onClick={() => setScreen('quiz')}>
      </div>
      </div>
    )
  }

  if (screen === 'acerto') {
    return (
      
    <div className="container">
      <div className="screen fundo home" style={{ backgroundImage: `url(${gameConfig.winBackground})` }} 
      onClick={() => reset()}>
      </div>
      </div>
    )
  }

  if (screen === 'erro') {
    return (
      
    <div className="container">
      <div className="screen fundo home" style={{ backgroundImage: `url(${gameConfig.failBackground})` }} 
      onClick={() => reset()}>
      </div>
      </div>
    )
  }

  return (
    <div className="tela fundo" style={{ backgroundImage: `url(${gameConfig.playingBackground})` }}>
      <h2 className="titulo">{pergunta.ask}</h2>
      <div className="opcoes">
        {pergunta.options.map((opcao, index) => (
          <div
            key={index}
            className={`opcao ${selected && opcao == pergunta.right? '--certo':''} ${selected == opcao && opcao != pergunta.right? '--errado':''}`}
            onClick={() => handleResposta(opcao)}
          >
            {opcao}
          </div>
        ))}
      </div>
    </div>
  )
}