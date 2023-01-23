import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
type SquareProps = {
  value: string | null,
  onClick: () => void
}

function Square(props: SquareProps) {
    return (
      <button className="square" onClick={props.onClick}>
      {props.value}
      </button>
    );
}

class Board extends React.Component<{squares: (string|null)[], onClick:(i:number) => void}> {
  renderSquare(i: number) {
    return (<Square
      value={this.props.squares[i]} 
      onClick={() => {this.props.onClick(i)}}
    />);
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

type GameState = {
  history: {squares: (string|null)[]}[],
  stepNumber: number  
}


function Game() {
  const [state, setState] = useState<GameState>({
    history: [ {
      squares: Array(9).fill(null)
    }],
    stepNumber: 0
  });
    const current = state.history[state.stepNumber];
    const winner = calculateWinner(current.squares);
    let status;
    if (winner) {
        status = 'Winner: ' + winner;
    } else {
        status = 'Next player: ' + ((state.stepNumber % 2) === 0 ? 'X' : 'O');
    }
    const handleClick = (i: number) => {
        if (winner || current.squares[i]) {
            return;
        }
        const squares = current.squares.slice();
        squares[i] = (state.stepNumber % 2) === 0 ? 'X' : 'O';
        setState({
            history: state.history.concat([{
                squares: squares
            }]),
            stepNumber: state.stepNumber + 1
        })
    }
    const jumpTo = (step: number) => {
        setState({
            history: state.history.slice(0, step + 1),
            stepNumber: step
        });
    }
    const moves = state.history.map((_step, move) => {
        const desc = move ?
            'Go to move #' + move :
            'Go to game start';
        return (
            <li key={move}>
                <button onClick={() => jumpTo(move)}>{desc}</button>
            </li>
        );
    });

    return (
        <div className="game">
            <div className="game-board">
                <Board
                    squares={current.squares}
                    onClick={(i: number) => handleClick(i)}
                />
            </div>
            <div className="game-info">
                <div>{status}</div>
                <ol>{moves}</ol>
            </div>
        </div>
    );
  
}


// ========================================

const root = ReactDOM.createRoot(document.getElementById("root") as Element);
root.render(<Game />);

function calculateWinner(squares: (string|null)[]): string|null {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
