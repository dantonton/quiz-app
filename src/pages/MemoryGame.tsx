import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { allGames } from '../models/Game'
import VirtualKeyboard, { type keyType } from './VirtualKeyboard'

type CardType = {
  id: number
  image: string
  matched: boolean
}

type GameState = 'start' | 'playing' | 'win' | 'fail'



function shuffleCards(images: string[]): CardType[] {
  const duplicated = [...images, ...images]
  return duplicated
    .map((img, index) => ({
      id: index,
      image: img,
      matched: false
    }))
    .sort(() => Math.random() - 0.5)
}

function changeCardSizeByCardsAmount(amount: number) {
  const config = {size : 300, columns: 3}
  if(amount > 6){
    config.size = 200
    config.columns = 4
  }

  document.documentElement.style.setProperty('--card-size', `${config.size}px`)
  document.documentElement.style.setProperty('--column-count', `${config.columns}`)
}


// === [CSV / storage] ===
type Submission = {
  name: string
  phone: string
  city: string
  email: string
  timestampIso: string 
}

const STORAGE_KEY = 'memory_submissions'

function loadSubmissions(): Submission[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as Submission[]) : []
  } catch {
    return []
  }
}

function saveSubmission(s: Submission) {
  const arr = loadSubmissions()
  arr.push(s)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(arr))
}

function csvEscape(value: string) {
  // Escapa aspas duplas e envolve com aspas
  const v = String(value ?? '').replace(/"/g, '""')
  return `"${v}"`
}

function toCSV(rows: Submission[]) {
  const header = [
    'timestampIso',
    'name',
    'phone',
    'city',
    'email',
  ]
  const lines = [header.join(',')]
  for (const r of rows) {
    lines.push([
      csvEscape(r.timestampIso),
      csvEscape(r.name),
      csvEscape(r.phone),
      csvEscape(r.city),
      csvEscape(r.email),
    ].join(','))
  }
  // BOM para Excel abrir corretamente
  return '\ufeff' + lines.join('\r\n')
}

function triggerCsvDownload(filename: string, csv: string) {
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}

export default function App() {
  
  const [searchParams] = useSearchParams();

  const gameConfig = allGames(import.meta.env.BASE_URL) [searchParams.get("game")?? ''];

  const [gameState, setGameState] = useState<GameState>('start')
  const [cards, setCards] = useState<CardType[]>([])
  const [selected, setSelected] = useState<number[]>([])
  const [matched, setMatched] = useState<number[]>([])
  const [time, setTime] = useState(gameConfig.time)
  const [type, setType] = useState<keyType>('name')


  type Field = 'name' | 'phone' | 'city' | 'email' | null
  const [activeField, setActiveField] = useState<Field>('name')

  changeCardSizeByCardsAmount(gameConfig.cardsUrl.length)

  const setField = (field: Field) => {
    setActiveField(field)
    if(field == 'phone') {
      setType('number')
      return
    }
    if(field == 'email') {
      setType('email')
      return
    } 
    setType('name')
  }

  const [form, setForm] = useState({
    name: '',
    phone: '',
    city: '',
    email: '',
  })

  const isFormValid = () => {
    const nameOk = form.name.trim().length >= 2
    const cityOk = form.city.trim().length >= 2
    const phoneDigits = form.phone.replace(/\D/g, '')
    const phoneOk = phoneDigits.length >= 10 // regra simples
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
    return nameOk && cityOk && phoneOk && emailOk
  }

  // formata telefone simples: (99) 99999-9999 (adapta comprimentos)
  const formatPhone = (raw: string) => {
    const d = raw.replace(/\D/g, '').slice(0, 11)
    if (d.length <= 10) {
      return d
        .replace(/^(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{4})(\d)/, '$1-$2')
    }
    return d
      .replace(/^(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2')
  }


  useEffect(() => {
    let timer: any
    if (gameState === 'playing' && time > 0) {
      timer = setTimeout(() => setTime(t => t - 1), 1000)
    } else if (time === 0) {
      setGameState('fail')
    }
    return () => clearTimeout(timer)
  }, [time, gameState])

  useEffect(() => {
    if (matched.length === gameConfig.cardsUrl.length * 2) {
      setGameState('win')
    }
  }, [matched])

  const startGame = () => {
    setCards(shuffleCards(gameConfig.cardsUrl))
    setSelected([])
    setMatched([])
    setTime(gameConfig.time)
    setGameState('playing')
  }

  const handleCardClick = (index: number) => {
    if (selected.length === 2 || selected.includes(index) || matched.includes(index)) return
    const newSelected = [...selected, index]
    setSelected(newSelected)

    if (newSelected.length === 2) {
      const [first, second] = newSelected
      if (cards[first].image === cards[second].image) {
        setMatched([...matched, first, second])
        setSelected([])
      } else {
        setTimeout(() => setSelected([]), 1000)
      }
    }
  }

  const handleScreenClick = () => {
    if (gameState === 'start') {
      if(gameConfig.requiresForm) return
      startGame()
    } else if (gameState === 'fail' || gameState === 'win') {
      setCards(shuffleCards(gameConfig.cardsUrl))
      setSelected([])
      setMatched([])
      setTime(gameConfig.time)
      setGameState('start')
    }
  }

  // === [CSV / storage] ===
  // salva submissão com horário local em America/Sao_Paulo + ISO
  const saveFormIfNeeded = () => {
    const now = new Date()
    const timestampIso = now.toISOString()

    const submission: Submission = {
      name: form.name.trim(),
      phone: form.phone.trim(),
      city: form.city.trim(),
      email: form.email.trim(),
      timestampIso,
    }
    
    saveSubmission(submission)
  }

  // Exporta CSV quando a URL tem ?export=csv
  useEffect(() => {
    if (searchParams.get('export') === 'csv') {
      const rows = loadSubmissions()


      const csv = toCSV(rows)
      const stamp = new Date()
        .toISOString()
        .replace(/[:.]/g, '-')
        .replace('T', '_')
        .slice(0, 19)
      const filename = `submissoes_${gameConfig.name || 'todos'}_${stamp}.csv`
      triggerCsvDownload(filename, csv)
    }
  }, [])
  // === [/CSV / storage] ===


  // Teclado virtual -> injeta no campo ativo
  const onVirtualKey = (key: string) => {
    if (!activeField) return
    setForm((prev) => {
      let value = prev[activeField]
      if (key === '{bksp}') {
        value = value.slice(0, -1)
      } else if (key === '{space}') {
        value = value + ' '
      } else if (key === '{clear}') {
        value = ''
      } else {
        value = value + key
      }

      // aplica máscara no telefone
      if (activeField === 'phone') {
        value = formatPhone(value)
      }

      return { ...prev, [activeField]: value }
    })
  }

  const onVirtualEnter = () => {
    if (gameConfig.requiresForm) {
      if (isFormValid()) {
        setForm({
          name: '',
          phone: '',
          city: '',
          email: '',
        })
        saveFormIfNeeded()
        startGame()
      }
    } else {
      startGame()
    }
  }

  return (
    <div className="container" onClick={handleScreenClick}>
      {gameState === 'start' && <div className="screen fundo inicio" style={{ backgroundImage: `url(${gameConfig.startBackground})` }}>
      {!gameConfig.requiresForm ? (
            <div className="start-cta">Clique ou Enter para começar</div>
          ) : (
            <div className="start-form" onClick={(e) => e.stopPropagation()}>
              <div className={`form-row ${activeField === 'name' ? 'active' : ''}`}>
                <input
                  type="text"
                  value={form.name}
                  onFocus={() => setField('name')}
                  placeholder="Seu nome"
                />
              </div>

              <div className={`form-row ${activeField === 'phone' ? 'active' : ''}`} style={{marginTop: '5.8rem'}}>
                <input
                  type="tel"
                  value={form.phone}
                  onFocus={() => setField('phone')}
                  placeholder="(99) 99999-9999"
                  inputMode="numeric"
                />
              </div>

              <div className={`form-row ${activeField === 'city' ? 'active' : ''}`}  style={{marginTop: '5.7rem'}}>
                <input
                  type="text"
                  value={form.city}
                  onFocus={() => setField('city')}
                  placeholder="Sua cidade"
                />
              </div>

              <div className={`form-row ${activeField === 'email' ? 'active' : ''}`}  style={{marginTop: '5.8rem'}}>
                <input
                  type="email"
                  value={form.email}
                  onFocus={() => setField('email')}
                  placeholder="voce@exemplo.com"
                />
              </div>

              <div className={`form-hint ${isFormValid() ? 'ok' : 'ko'}`}>
                {isFormValid() ? 'Pressione Enter para começar' : 'Complete todos os campos'}
              </div>

              <VirtualKeyboard type={type} onKey={onVirtualKey} onEnter={onVirtualEnter} />
            </div>
          )}
        </div>}
      {gameState === 'playing' && (
        <div className="game fundo" style={{ backgroundImage: `url(${gameConfig.playingBackground})` }}>
          <div className="timer">Tempo: {time}s</div>
          <div className="grid">
            {cards.map((card, index) => {
              const isFlipped = selected.includes(index) || matched.includes(index)
              return (
                <div
                  key={index}
                  className={`card ${isFlipped ? 'flipped' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation()
                    handleCardClick(index)
                  }}
                >
                  <img
                    className="front"
                    src={card.image}
                    alt="card"
                  />
                  <img
                    className="back"
                    //src={back}
                    src={gameConfig.cardUrlBack}
                    alt="back"
                  />
                </div>
              )
            })}
          </div>
        </div>
      )}
      {gameState === 'win' && <div className="screen fundo acerto" style={{ backgroundImage: `url(${gameConfig.winBackground})` }}></div>}
      {gameState === 'fail' && <div className="screen fundo erro" style={{ backgroundImage: `url(${gameConfig.failBackground})` }}></div>}
    </div>
  )
}

