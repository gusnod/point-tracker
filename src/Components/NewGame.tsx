import React, { useState } from 'react';
import DB, { IGame, IPlayer } from '../Database';


interface IProps {
    db: DB
}

const insertGame = async (db: DB, game: IGame) => {
    await db.games.add(game).then(k => (console.log(k)));
}

const NewGame = ({ db }: IProps) => {
    const [gameName, setGameName] = useState<string>("");
    const [players, setPlayers] = useState<string[]>(["",]);
    return <form onSubmit={e => {
        e.preventDefault();
        const contenstants: IPlayer[] = players.map(player => ({ name: player }));
        const game: IGame = {
            active: true,
            players: contenstants,
            title: gameName,
            rounds: [],
            settings: { reverseScore: false }
        }

        insertGame(db, game);
    }}

    >
        <input type="text" placeholder="Game Name" value={gameName} onChange={(e) => {
            setGameName(e.target.value);
        }} />
        <h1>{gameName}</h1>
        <div>
            {players.map((player, key) => (
                <input key={key} placeholder="Player Name" value={player} onChange={e => {
                    var items = [...players];
                    items[key] = e.target.value;
                    setPlayers(items);
                }} />
            ))}
        </div>
        <button type="button" onClick={() => {

            setPlayers([...players, ""]);
        }}>
            Add Player
        </button>
        <button>Submit</button>
    </form>
}



export default NewGame;