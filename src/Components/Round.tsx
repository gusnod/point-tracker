import React, { useEffect, useState } from 'react';
import { IPlayer, IRound, IScore } from '../Database';

interface IProps {
    players: IPlayer[]
    submitScore: (round: IRound) => void
}


const Round = ({ players, submitScore }: IProps) => {
    const [scores, setScores] = useState<IScore[]>([]);
    const [idx, setIdx] = useState<number>(0);
    const [currentScore, setCurrentStore] = useState<string>("");

    return <div>
        <input type="number" value={currentScore} placeholder={players[idx].name} onChange={(e) => {
            setCurrentStore(e.target.value);
        }} />
        <button type="button" onClick={() => {
            const sscore = parseInt(currentScore);
            const currentPlayer = players[idx]

            const newScores = [...scores, { player: currentPlayer, score: sscore }];
            setCurrentStore("");
            if (idx + 2 > players.length) {
                submitScore({ scores: newScores })
            }

            setScores(newScores);
            setIdx(idx + 1);

        }}>Submit</button>
    </div>
}



export default Round;