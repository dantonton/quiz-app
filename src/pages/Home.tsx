import './styles.css'

export default function Home() {
  const handleClick = () => {
    window.dispatchEvent(new CustomEvent('setTela', { detail: 'quiz' }))
  }

  return (
    <div className="tela fundo" onClick={handleClick}>
      <h1 className="titulo">Toque para começar</h1>
    </div>
  )
}