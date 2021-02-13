import Dexie from "dexie";


interface IGame {
    id: number,
    title: string,
    active: boolean,
    players: IPlayer[],
    rounds: IRound[]
}

interface IRound {
    player: IPlayer,
    score: number
}

interface IPlayer {
    name: string
}


class TheDatabase extends Dexie {
    people: Dexie.Table<IPlayer, number>;

    constructor() {
        super("GamesDatabase");
        this.version(1).stores({
            people: '++id, title, active, players, number'
        });

        this.people = this.table("people");
    }
}

export { IGame, IPlayer, IRound };
export default TheDatabase;
