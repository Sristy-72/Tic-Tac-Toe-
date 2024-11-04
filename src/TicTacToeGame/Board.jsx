import React, { useState } from 'react';
import Square from './square';

const Board = () => {
    const [state, setState] = useState(Array(9).fill(null));
    const [isXTurn, setIsXTurn] = useState(true);

    const WinnerCheck = () => {
        const WinnerLogic = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let logic of WinnerLogic) {
            const [a, b, c] = logic;
            if (state[a] !== null && state[a] === state[b] && state[a] === state[c]) {
                return state[a];  // Return the winning symbol ("X" or "0")
            }
        }
        return null;
    };

    const isWinner = WinnerCheck();
    console.log("Winner:", isWinner);  // Debugging log

    const handleClick = (index) => {
        // Prevent click if game has a winner or square is already occupied
        if (isWinner || state[index] !== null) return;

        const CopyState = [...state];
        CopyState[index] = isXTurn ? "X" : "0";
        setState(CopyState);
        setIsXTurn(!isXTurn);
    };
    const handleReset = () => {
        setState(Array(9).fill(null));
    };

    return (
        <div className='board'>
            {isWinner ? (
                <>{isWinner} won the game {" "}
                    <button onClick={handleReset} > play again</button>
                </>
            ) : (
                <>
                    <h4> player {isXTurn ? "X" : "O"} please move</h4>
                    <div className='board-row'>
                        <Square onClick={() => handleClick(0)} value={state[0]} />
                        <Square onClick={() => handleClick(1)} value={state[1]} />
                        <Square onClick={() => handleClick(2)} value={state[2]} />
                    </div>
                    <div className='board-row'>
                        <Square onClick={() => handleClick(3)} value={state[3]} />
                        <Square onClick={() => handleClick(4)} value={state[4]} />
                        <Square onClick={() => handleClick(5)} value={state[5]} />
                    </div>
                    <div className='board-row'>
                        <Square onClick={() => handleClick(6)} value={state[6]} />
                        <Square onClick={() => handleClick(7)} value={state[7]} />
                        <Square onClick={() => handleClick(8)} value={state[8]} />
                    </div>
                </>
            )}
        </div>
    );
};

export default Board;
