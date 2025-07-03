import './styles.css'

export default function Home() {
  const handleClick = () => {
    window.dispatchEvent(new CustomEvent('setTela', { detail: 'quiz' }))
  }

  return (
    <div className="tela fundo inicio" onClick={handleClick}>
    </div>
  )
}