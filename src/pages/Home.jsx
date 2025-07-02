// src/pages/Home.jsx
import { useNavigate } from 'react-router-dom'
import './styles.css'

export default function Home() {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/quiz')
  }

  return (
    <div className="tela fundo" onClick={handleClick}>
      <h1 className="titulo">Toque para começar</h1>
    </div>
  )
}
