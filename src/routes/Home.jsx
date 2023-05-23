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
        if(player === 'X') {
          setScorePlayer1(scorePlayer1 + 1);
          setWinner(player1);
        } else {
          setScorePlayer2(scorePlayer2 + 1);
          setWinner(player2);
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
            <div className="flex flex-row absolute top-0 bg-gray-50 rounded-b-[20px] px-10 border border-gray-200">
              <h2 className="text-xl mb-2 text-gray-500 font-medium me-10">
                {player1}:
                <span className="ms-2 text-blue-500">{scorePlayer1}</span>
              </h2>
              <h2 className="text-xl mb-2 text-gray-500 font-medium">
                {player2}:
                <span className="ms-2 text-blue-500">{scorePlayer2}</span>
              </h2>
            </div>
            <div className="flex flex-col p-10 bg-gray-50 rounded-lg border border-gray-200 board mt-3">
              <h2 className="text-xl mb-2 text-gray-500 font-medium text-center">
                Vez do Jogador:
                <span className="ms-2 text-blue-500">{currentPlayer}</span>
              </h2>
              <div className="grid grid-cols-3 w-[300px] mx-auto">
                {board.map((square, index) => (
                  <button
                    key={index}
                    className="text-5xl font-bold h-[100px] w-[100px] rounded-md	text-center text-blue-500 border border-gray-300 transition-all duration-700 hover:bg-blue-500 hover:text-white"
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
              <h2>É um empate!</h2>
            ) : (
              <h2>{winner} Ganhou !</h2>
            )}
            <button
              className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded transition-all duration-700 mt-4"
              onClick={() => resetData()}
            >
              Restart
            </button>
          </div>
        )}
      </div>
      <p className="absolute bottom-0 justify-center w-full text-center text-gray-500">
        Feito com 💙 pelo{' '}
        <a
          href="https://matheuschiodi.github.io/Portfolio/"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors hover:text-blue-500"
        >
          <span className="font-bold text-blue-500">&lt;</span>
          Matheus Chiodi{' '}
          <span className="font-bold text-blue-500">/&gt;</span>
        </a>
      </p>
    </>
  );
};

export default Home;
