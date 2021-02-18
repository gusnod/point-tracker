import React, { useEffect, useState } from 'react';
import { IGame, IRound, IPlayer } from '../Database';
import Round from './Round';

interface IProps {
    game: IGame
    backAction: () => void
    updateGame: (game: IGame) => void
}


interface IExtendedPlayer extends IPlayer {
    sum: number
}

const ActiveGame = ({ game, backAction, updateGame }: IProps) => {
    const [isScoring, setScoring] = useState<boolean>(false);
    const [exPlayers, setPlayers] = useState<IExtendedPlayer[]>([]);

    useEffect(() => {
        setPlayers(calculateTotals(game.players, game.rounds));
    }, [game])
    if (isScoring) {
        return <Round players={game.players} submitScore={(round: IRound) => {
            var newGame = { ...game };
            newGame.rounds = [...newGame.rounds, round];
            updateGame(newGame);
            setScoring(false);
        }} />
    }

    return <div>
        <button onClick={backAction}>Back</button>
        <h1>{game.title}</h1>
        <ol>
            {exPlayers.map((p, k) => (<li key={k}>{p.name} Score: {p.sum}</li>))}
        </ol>
        <button onClick={() => {
            setScoring(true);
        }} >Round</button>
        <table>
            <thead>
                <tr>
                    <th>#</th>
                    {game.players.map((p, k) => (<th key={k}>{p.name}</th>))}
                </tr>
            </thead>
            <tbody>
                {game.rounds.map((r, k) => (<tr key={k}>
                    <td>{k}</td>
                    {r.scores.map((s, j) => (<td key={j}>{s.score}</td>))}
                </tr>))}
            </tbody>
        </table>
    </div>
}

const calculateTotals = (players: IPlayer[], rounds: IRound[]): IExtendedPlayer[] => {
    return players.map((player): IExtendedPlayer => {
        return {
            ...player, sum: rounds.reduce((acc, round): number => {
                return acc + round.scores.reduce((count, score): number => {
                    if (score.player.name === player.name) {
                        return count + score.score;
                    }
                    return count;
                }, 0)
            }, 0)
        }
    }).sort((a, b): number => {
        if (a.sum === b.sum) return 0;
        if (a.sum < b.sum) return 1;
        if (a.sum > b.sum) return -1;
    });
}

export default ActiveGame;