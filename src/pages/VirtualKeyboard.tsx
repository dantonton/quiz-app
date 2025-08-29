import './VirtualKeyboard.css'

export type keyType = 'name' | 'number' | 'email'

interface Props {
    type: keyType
  onKey: (key: string) => void
  onEnter: () => void
}

const rowsName: string[][] = [
  ['1','2','3','4','5','6','7','8','9','0'],
  ['Q','W','E','R','T','Y','U','I','O','P'],
  ['A','S','D','F','G','H','J','K','L'],
  ['Z','X','C','V','B','N','M'],
  ['space', 'bksp', 'clear', 'enter']
]

const rowsNumber: string[][] = [
    ['1','2','3'],
    ['4','5','6'],
    ['7','8','9'],
    ['0', 'bksp', 'enter'],
  ]

  const rowsEmail: string[][] = [
    ['1','2','3','4','5','6','7','8','9','0'],
    ['Q','W','E','R','T','Y','U','I','O','P'],
    ['A','S','D','F','G','H','J','K','L'],
    ['Z','X','C','V','B','N','M'],
    ['@', '.', '_', '-', 'bksp', 'clear', 'enter']
  ]

export default function VirtualKeyboard({type, onKey, onEnter }: Props) {
    let rows = rowsName
    if(type === 'number') rows = rowsNumber
    if(type === 'email') rows = rowsEmail

  return (
    <div className="vk">
      {rows.map((r, i) => (
        <div className="vk-row" key={i}>
          {r.map((k) => (
            <>
            {k.length == 1 &&
            <button className="vk-key" key={k} onClick={() => onKey(k)}>
              {k}
            </button>}
            
            {k == 'space' && <button className="vk-key wide" onClick={() => onKey('{space}')}>Espaço</button>}
            {k == 'bksp' && <button className="vk-key" onClick={() => onKey('{bksp}')}>⌫</button>}
            {k == 'clear' && <button className="vk-key" onClick={() => onKey('{clear}')}>Limpar</button>}
            {k == 'enter' && <button className="vk-key enter" onClick={onEnter}>Enter ⏎</button>}
            </>
            
          ))}
        </div>
      ))}

      <div className="vk-row">
      </div>
    </div>
  )
}
