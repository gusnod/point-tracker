import React from 'react';
import { IGame } from '../Database';

interface IProps {
    game: IGame
    backAction: () => void
}

const ActiveGame = ({ game, backAction }: IProps) => {
    return <div>
        <button onClick={backAction}>Back</button>
        <h1>{game.title}</h1>
        <ol>
            {game.players.map((p, k) => (<li key={k}>{p.name}</li>))}
        </ol>
    </div>
}

export default ActiveGame;