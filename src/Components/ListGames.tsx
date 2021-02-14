import React from 'react';
import { IGame } from '../Database';

interface IProps {
    games: IGame[]
}

const ListGames = ({ games }: IProps) => {
    return <ul>{games.map(game => (<li key={game.id}>{game.title}</li>))}</ul>
}


export default ListGames;