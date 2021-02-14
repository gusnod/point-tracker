import React, { useEffect, useState } from 'react';
import DB, { IGame } from '../Database';
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

    return <div>
        <ListGames games={games} />
        <NewGame db={db} onInsert={() => insertGames(setGames, db)} />
    </div>

}

export default App;