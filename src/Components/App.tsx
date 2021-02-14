import React, { useEffect, useState } from 'react';
import DB, { IGame } from '../Database';
import ActiveGame from './ActiveGame';
import ListGames from './ListGames';
import NewGame from './NewGame';


const insertGames = async (setGames: (games: IGame[]) => void, db: DB) => {
    const games = await db.games.toArray();
    console.log(games);
    setGames(games);
}

const App = () => {
    const [db, setDb] = useState<DB>(new DB());
    const [games, setGames] = useState<IGame[]>([]);
    const [activeGame, setActiveGame] = useState<IGame | null>(null);
    useEffect(() => {
        insertGames(setGames, db);
    }, []);

    if (activeGame !== null) {
        return <ActiveGame game={activeGame} backAction={() => setActiveGame(null)} />
    }

    return <div>
        <ListGames games={games} setGame={setActiveGame} />
        <NewGame db={db} onInsert={() => insertGames(setGames, db)} />
    </div>

}

export default App;