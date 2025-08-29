export interface Institucional {
    name: string,
    requiresForm: boolean,
    cardsUrl: string[],
    homeBackground: string,
    formBackground: string
}
export const allInstitucionais = (baseUrl: string): {[key:string] : Institucional} => {
    return {
        ntux:  {
            name: 'ntux',
            requiresForm: true,
            cardsUrl: [
                `${baseUrl}assets/ntux/2.png`,
                `${baseUrl}assets/ntux/3.png`,
                `${baseUrl}assets/ntux/4.png`,
                `${baseUrl}assets/ntux/5.png`,
                `${baseUrl}assets/ntux/6.png`,
                `${baseUrl}assets/ntux/7.png`,
                `${baseUrl}assets/ntux/8.png`,
            ],
            homeBackground: `${baseUrl}assets/ntux/1.png`,
            formBackground: `${baseUrl}assets/ntux/9.png`,
        },
    }
}

