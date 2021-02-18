import React, { useEffect, useState } from 'react';
import { IgnorePlugin } from 'webpack';
import DB, { IGame } from '../Database';
import ActiveGame from './ActiveGame';
import ListGames from './ListGames';
import NewGame from './NewGame';


const insertGames = async (setGames: (games: IGame[]) => void, db: DB) => {
    const games = await db.games.toArray();
    setGames(games);
}

const updateGame = async (game: IGame, db: DB) => {
    db.games.update(game, { rounds: game.rounds });
}

const App = () => {
    const [db, setDb] = useState<DB>(new DB());
    const [games, setGames] = useState<IGame[]>([]);
    const [activeGame, setActiveGame] = useState<IGame | null>(null);
    useEffect(() => {
        insertGames(setGames, db);
    }, []);

    if (activeGame !== null) {
        return <ActiveGame updateGame={(game: IGame) => {
            updateGame(game, db);
            setActiveGame(game);
        }} game={activeGame} backAction={() => setActiveGame(null)} />
    }

    return <div>
        <ListGames games={games} setGame={setActiveGame} />
        <NewGame db={db} onInsert={() => insertGames(setGames, db)} />
    </div>

}

export default App;