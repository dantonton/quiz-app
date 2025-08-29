import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import { allInstitucionais } from '../models/Institucional';
import './Institucional.css'
import type { keyType } from './VirtualKeyboard';
import VirtualKeyboard from './VirtualKeyboard';

// === [CSV / storage] ===
type Submission = {
  empresa: string
  nome: string
  telefone: string
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
    'empresa',
    'nome',
    'telefone',
    'email',
  ]
  const lines = [header.join(',')]
  for (const r of rows) {
    lines.push([
      csvEscape(r.timestampIso),
      csvEscape(r.empresa),
      csvEscape(r.nome),
      csvEscape(r.telefone),
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


export default function Institucional() {
  
  const [searchParams] = useSearchParams();

  const gameConfig = allInstitucionais(import.meta.env.BASE_URL) [searchParams.get("game")?? ''];
  
  const [screen, setScreen] = useState<'home' | 'item' | 'form'>('home')
  const [selectedItem, setSelectedItem] = useState<number | null>(null)
  const [type, setType] = useState<keyType>('name')
  
  type Field = 'empresa' | 'nome' | 'telefone' | 'email' | null
  const [activeField, setActiveField] = useState<Field>('empresa')


  const setField = (field: Field) => {
    setActiveField(field)
    if(field == 'telefone') {
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
    empresa: '',
    nome: '',
    telefone: '',
    email: '',
  })

  const isFormValid = () => {
    const nameOk = form.nome.trim().length >= 2
    const cityOk = form.empresa.trim().length >= 2
    const phoneDigits = form.telefone.replace(/\D/g, '')
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

  // === [CSV / storage] ===
  // salva submissão com horário local em America/Sao_Paulo + ISO
  const saveFormIfNeeded = () => {
    const now = new Date()
    const timestampIso = now.toISOString()

    const submission: Submission = {
      nome: form.nome.trim(),
      telefone: form.telefone.trim(),
      empresa: form.empresa.trim(),
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
      if (activeField === 'telefone') {
        value = formatPhone(value)
      }

      return { ...prev, [activeField]: value }
    })
  }

  const onVirtualEnter = () => {
    if (gameConfig.requiresForm) {
      if (isFormValid()) {
        setForm({
          nome: '',
          telefone: '',
          empresa: '',
          email: '',
        })
        saveFormIfNeeded()
        setScreen('home')
      }
    } else {
      setScreen('home')
    }
  }

  
  function cleanGoToHome() {
    
    setForm({
      nome: '',
      telefone: '',
      empresa: '',
      email: '',
    })
    setScreen('home')
  }

  function goToItem(id: number) {
    setSelectedItem(id)
    setScreen('item')
  }

  function goToForm() {
    setScreen('form')
  }


  // ---------- TELAS ----------
  if (screen === 'home') {
    return (
      
    <div className="container">
      <div className="screen fundo home" style={{ backgroundImage: `url(${gameConfig.homeBackground})` }}>
        {Array.from({ length: 7 }, (_, i) => (
          <div className="btn" 
            key={i}
            style={{  fontSize: '20px', cursor: 'pointer' }}
            onClick={() => goToItem(i)}
          >
          </div>
        ))}

        
<div className="btn-home-mais" onClick={goToForm}>Saiba mais</div>
        </div>
      </div>
    )
  }

  if (screen === 'item') {
    return (
      
      <div className="container">
      {selectedItem != null && 
        <div className="screen fundo item" style={{ backgroundImage: `url(${gameConfig.cardsUrl[selectedItem]})` }}>
        
        <div  className="btn-back" onClick={() => setScreen('home')}>
            Voltar
          </div>
          <div className="btn-mais">.</div>
        </div>
      }
      </div>
    )
  }

  if (screen === 'form') {
    return (
      
      <div className="container">
      <div className="screen fundo form" style={{ backgroundImage: `url(${gameConfig.formBackground})` }}>
        
              <div className={`form-row ${activeField === 'empresa' ? 'active' : ''}`}>
                <input
                  type="text"
                  value={form.empresa}
                  onFocus={() => setField('empresa')}
                  placeholder="Empresa"
                />
              </div>

              <div className={`form-row ${activeField === 'nome' ? 'active' : ''}`}  style={{marginTop: '5rem'}}>
                <input
                  type="text"
                  value={form.nome}
                  onFocus={() => setField('nome')}
                  placeholder="Nome"
                />
              </div>

              <div className={`form-row ${activeField === 'telefone' ? 'active' : ''}`} style={{marginTop: '5rem'}}>
                <input
                  type="tel"
                  value={form.telefone}
                  onFocus={() => setField('telefone')}
                  placeholder="(99) 99999-9999"
                  inputMode="numeric"
                />
              </div>

              <div className={`form-row ${activeField === 'email' ? 'active' : ''}`}  style={{marginTop: '5rem'}}>
                <input
                  type="email"
                  value={form.email}
                  onFocus={() => setField('email')}
                  placeholder="e-mail"
                />
              </div>

              <div className={`form-hint ${isFormValid() ? 'ok' : 'ko'}`}>
                {isFormValid() ? 'Pressione Enter para enviar' : 'Complete todos os campos'}
              </div>

              <VirtualKeyboard type={type} onKey={onVirtualKey} onEnter={onVirtualEnter} />
              <div className="btn-enviar" onClick={cleanGoToHome}>Enviar</div>
              
      </div>
      </div>
    )
  }

  return null
}
