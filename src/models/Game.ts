export interface Game{
    name: string,
    time: number,
    requiresForm: boolean,
    cardsUrl: string[],
    cardUrlBack: string,
    startBackground: string,
    playingBackground: string,
    winBackground: string,
    failBackground: string,
}
export const allGames = (baseUrl: string): {[key:string] : Game} => {
    return {
        sicredi:  {
            name: 'sicredi',
            time: 90,
            requiresForm: true,
            cardsUrl: [
                `${baseUrl}/assets/sicredi/14.png`,
                `${baseUrl}/assets/sicredi/5.jpg`,
                `${baseUrl}/assets/sicredi/6.jpg`,
                `${baseUrl}/assets/sicredi/7.jpg`,
                `${baseUrl}/assets/sicredi/8.jpg`,
                `${baseUrl}/assets/sicredi/9.jpg`,
                `${baseUrl}/assets/sicredi/10.jpg`,
                `${baseUrl}/assets/sicredi/11.jpg`,
                `${baseUrl}/assets/sicredi/12.jpg`,
                `${baseUrl}/assets/sicredi/13.jpg`,
            ],
            cardUrlBack: `${baseUrl}/assets/sicredi/16.png`,
            startBackground: `${baseUrl}/assets/sicredi/1.jpg`,
            playingBackground: `${baseUrl}/assets/sicredi/2play.jpg`,
            winBackground: `${baseUrl}/assets/sicredi/16.jpg`,
            failBackground: `${baseUrl}/assets/sicredi/17.jpg`,
        },
    }
}

