import { ArrowRight } from 'lucide-react';
import { useState } from 'react';

const Home = () => {
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');
  const [currentPlayer, setCurrentPlayer] = useState('');
  const [board, setBoard] = useState(Array(9).fill(''));
  const [winner, setWinner] = useState('');
  const [scorePlayer1, setScorePlayer1] = useState(0);
  const [scorePlayer2, setScorePlayer2] = useState(0);

  const handleStartGame = () => {
    if (player1 && player2) {
      setCurrentPlayer('X');
    }
  };

  const handleSquareClick = (index) => {
    if (board[index] || winner) {
      return;
    }

    const updatedBoard = [...board];
    updatedBoard[index] = currentPlayer;

    setBoard(updatedBoard);

    checkWinner(updatedBoard, currentPlayer);
    switchPlayer();
  };

  const checkWinner = (board, player) => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // horizontal
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // vertical
      [0, 4, 8],
      [2, 4, 6], // diagonal
    ];

    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (board[a] === player && board[b] === player && board[c] === player) {
        setWinner(player);
        if(player === 'X') {
          setScorePlayer1(scorePlayer1 + 1);
        } else {
          setScorePlayer2(scorePlayer2 + 1);
        }
        return;
      }
    }

    if (board.every((square) => square !== '')) {
      setWinner('Draw');
    }
  };

  const switchPlayer = () => {
    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
  };

  function resetData() {
    setBoard(Array(9).fill(''));
    setWinner('');
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen gap-0">
        {!currentPlayer && (
          <div className="flex flex-col p-10 bg-gray-50 rounded-lg border border-gray-200">
            <input
              type="text"
              placeholder="Jogador 1 (X)"
              className="mb-2 p-2 border rounded-md text-center"
              value={player1}
              onChange={(e) => setPlayer1(e.target.value)}
            />
            <input
              type="text"
              placeholder="Jogador 2 (O)"
              className="mb-2 p-2 border rounded-md text-center"
              value={player2}
              onChange={(e) => setPlayer2(e.target.value)}
            />
            <button
              className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded transition-all duration-700"
              onClick={handleStartGame}
            >
              Iniciar
              <ArrowRight className="inline-block ml-2" size={16} />
            </button>
          </div>
        )}
        {currentPlayer && !winner && (
          <>
            <div className="flex flex-row absolute top-0 bg-gray-300 rounded-b-[20px] px-10">
              <h2 className="text-xl mb-2 text-gray-500 font-medium me-10">
                {player1}:
                <span className="ms-2 text-blue-500">{scorePlayer1}</span>
              </h2>
              <h2 className="text-xl mb-2 text-gray-500 font-medium">
                {player2}:
                <span className="ms-2 text-blue-500">{scorePlayer2}</span>
              </h2>
            </div>
            <div className="flex flex-col p-10 bg-gray-50 rounded-lg border border-gray-200 board">
              <h2 className="text-xl mb-2 text-gray-500 font-medium">
                Vez do Jogador:
                <span className="ms-2 text-blue-500">{currentPlayer}</span>
              </h2>
              <div className="grid grid-cols-3 w-[150px] mx-auto">
                {board.map((square, index) => (
                  <button
                    key={index}
                    className="bg-gray-200 text-md font-bold h-[50px] w-[50px] rounded-md	text-center text-blue-500"
                    onClick={() => handleSquareClick(index)}
                  >
                    {square}
                  </button>
                ))}
              </div>
            </div>
          </>
          
        )}

        {winner && (
          <div>
            {winner === 'Draw' ? (
              <h2>It's a Draw!</h2>
            ) : (
              <h2>{winner} Wins!</h2>
            )}
            <button
              className="p-2 bg-blue-500 text-white rounded mt-4"
              onClick={() => resetData()}
            >
              Restart
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
