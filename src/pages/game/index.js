import "./index.css";
import { useState } from 'react';
// 单个方块组件
function Square({value,onSquareClick}) {
  // 每个 Square 都会收到一个 value props，对于空方块，该 props 将是 'X'、'O' 或 null
  return <button className="square"  onClick={onSquareClick}>{value}</button>;
}
// 九宫格组件
 function Board({ xIsNext, squares, onPlay }) {
  // Array(9).fill(null) 创建了一个包含九个元素的数组，并将它们中的每一个都设置为 null
  // const [squares, setSquares] = useState(Array(9).fill(null));
  // 每次玩家落子时，xIsNext（一个布尔值）将被翻转以确定下一个玩家
  // const [xIsNext, setXIsNext] = useState(true);
  
  function handleClick(i) {
    // 该方块是否已经具有X或O值  或者  来检查玩家是否获胜
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    // handleClick 函数使用 JavaScript 数组的 slice() 方法创建 squares 数组（nextSquares）的副本
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
    // setSquares(nextSquares);
    // setXIsNext(!xIsNext);
  }
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <>
     <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={()=>{handleClick(0)}}/>
        <Square value={squares[1]} onSquareClick={()=>{handleClick(1)}}/>
        <Square value={squares[2]} onSquareClick={()=>{handleClick(2)}}/>
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={()=>{handleClick(3)}}/>
        <Square value={squares[4]} onSquareClick={()=>{handleClick(4)}}/>
        <Square value={squares[5]} onSquareClick={()=>{handleClick(5)}}/>
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={()=>{handleClick(6)}}/>
        <Square value={squares[7]} onSquareClick={()=>{handleClick(7)}}/>
        <Square value={squares[8]} onSquareClick={()=>{handleClick(8)}}/>
      </div>
    </>
  );
}

//todo 添加一个辅助函数 它接受 9 个方块的数组，检查获胜者并根据需要返回 'X'、'O' 或 null
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
// todo 添加时间旅行
export default function Game() {
  // const [xIsNext, setXIsNext] = useState(true);
  // currentMove 计算出来
  const [history, setHistory] = useState([Array(9).fill(null)]);
  // 在你可以实现 jumpTo 之前，你需要 Game 组件来跟踪用户当前正在查看的步骤。为此，定义一个名为 currentMove 的新 state 变量，默认为 0：
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;

  const currentSquares = history[currentMove];
  // const currentSquares = history[history.length - 1]; 
  function handlePlay(nextSquares) {
    // setHistory([...history, nextSquares]);
    // setXIsNext(!xIsNext);
    // 如果你“回到过去”然后从那一点开始采取新的行动，你只想保持那一点的历史。不是在 history 中的所有项目（... 扩展语法）之后添加 nextSquares，而是在 history.slice(0, currentMove + 1) 中的所有项目之后添加它，这样你就只保留旧历史的那部分。
// 每次落子时，你都需要更新 currentMove 以指向最新的历史条目。

    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }
  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
    // setXIsNext(nextMove % 2 === 0);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });
  return (
    <div className="game">
      <div className="game-board">
      <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
      <ol>{moves}</ol>
      </div>
    </div>
  );
}
