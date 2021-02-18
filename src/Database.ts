import Dexie from "dexie";


interface IGame {
    id?: number,
    title: string,
    active: boolean,
    players: IPlayer[],
    rounds: IRound[],
    settings: ISettings
}

interface IRound {
    scores: IScore[]
}

interface IScore {
    player: IPlayer,
    score: number
}

interface IPlayer {
    name: string
}

interface ISettings {
    reverseScore: boolean
}


class DB extends Dexie {
    games: Dexie.Table<IGame, number>;

    constructor() {
        super("GamesDatabase");
        this.version(1).stores({
            games: '++id, title, active, players, rounds, settings'
        });

        this.games = this.table("games");
    }
}

export { IGame, IPlayer, IRound, IScore, ISettings };
export default DB;
