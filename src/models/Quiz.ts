export interface Question {
    id: number,
    ask: string,
    options: string[],
    right: string
}

export interface Quiz {
    name: string,
    time: number,
    requiresForm: boolean,
    startBackground: string,
    playingBackground: string,
    winBackground: string,
    failBackground: string,
    questions: Question[],
}
export const allQuiz = (baseUrl: string): {[key:string] : Quiz} => {
    return {
        sesisaude:  {
            name: 'sesisaude',
            time: 90,
            requiresForm: false,
            startBackground: `${baseUrl}/assets/sesisaude/1.png`,
            playingBackground: `${baseUrl}/assets/sesisaude/quiz.png`,
            winBackground: `${baseUrl}/assets/sesisaude/12.png`,
            failBackground: `${baseUrl}/assets/sesisaude/13.png`,
            questions: [
                {
                  "id": 1,
                  "ask": "O que significa a sigla PGR?",
                  "options": [
                    "Programa de Garantia de Resultados",
                    "Plano de Gestão de Recursos",
                    "Programa de Gerenciamento de Riscos",
                    "Plano de Garantia de Recursos"
                  ],
                  "right": "Programa de Gerenciamento de Riscos"
                },
                {
                  "id": 2,
                  "ask": "O PGR é obrigatório para todas as empresas?",
                  "options": [
                    "Sim",
                    "Não",
                    "Apenas para empresas com mais de 50 funcionários",
                    "Apenas para empresas de alto risco"
                  ],
                  "right": "Sim"
                },
                {
                  "id": 3,
                  "ask": "Qual é o principal objetivo do PGR?",
                  "options": [
                    "Aumentar o lucro da empresa",
                    "Controlar o uso de EPIs",
                    "Identificar, avaliar e controlar os riscos ocupacionais",
                    "Elaborar a folha de pagamento"
                  ],
                  "right": "Identificar, avaliar e controlar os riscos ocupacionais"
                },
                {
                  "id": 4,
                  "ask": "Qual norma trata do PGR?",
                  "options": [
                    "NR-07",
                    "NR-05",
                    "NR-01",
                    "NR-35"
                  ],
                  "right": "NR-01"
                },
                {
                  "id": 5,
                  "ask": "O que é um risco ocupacional?",
                  "options": [
                    "Algo que deixa o trabalhador feliz",
                    "Algo que pode causar acidente ou doença no trabalho",
                    "Um bônus extra no salário",
                    "Um tipo de promoção"
                  ],
                  "right": "Algo que pode causar acidente ou doença no trabalho"
                },
                {
                  "id": 6,
                  "ask": "Qual dos itens abaixo é um exemplo de risco físico?",
                  "options": [
                    "Poeira",
                    "Ruído",
                    "Vírus e bactérias",
                    "Produtos de limpeza"
                  ],
                  "right": "Ruído"
                },
                {
                  "id": 7,
                  "ask": "Qual dos itens abaixo é um exemplo de risco químico?",
                  "options": [
                    "Poeira mineral",
                    "Ruído",
                    "Vírus e bactérias",
                    "Produtos de limpeza"
                  ],
                  "right": "Poeira mineral"
                },
                {
                  "id": 8,
                  "ask": "Qual dos itens abaixo é um exemplo de risco biológico?",
                  "options": [
                    "Poeira mineral",
                    "Ruído",
                    "Vírus e bactérias",
                    "Produtos de limpeza"
                  ],
                  "right": "Vírus e bactérias"
                },
                {
                  "id": 9,
                  "ask": "Qual profissional é indicado para elaborar o PGR?",
                  "options": [
                    "Técnico de segurança do trabalho",
                    "Cozinheiro",
                    "Secretário",
                    "Auxiliar de limpeza"
                  ],
                  "right": "Técnico de segurança do trabalho"
                },
                {
                  "id": 10,
                  "ask": "Qual dos itens abaixo é um exemplo de risco químico?",
                  "options": [
                    "Poeira mineral",
                    "Ruído",
                    "Vírus e bactérias",
                    "Postura em pé por longos períodos"
                  ],
                  "right": "Poeira mineral"
                }
              ]              
        },
    }
}

