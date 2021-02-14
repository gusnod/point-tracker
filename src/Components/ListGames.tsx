import React from 'react';
import { IGame } from '../Database';

interface IProps {
    games: IGame[]
    setGame: (game: IGame) => void
}

const ListGames = ({ games, setGame }: IProps) => {
    return <ul>{games.map(game => (
        <li key={game.id}>
            <span>{game.title}</span>
            <button onClick={() => (setGame(game))}>Choose</button>
        </li>))}</ul>
}


export default ListGames;