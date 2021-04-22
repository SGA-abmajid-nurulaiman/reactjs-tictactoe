import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function HeaderCol(props) {
  return (
    <div className="header header-col">
        {props.value}
    </div>
  );
}

function HeaderRow(props) {
  return (
    <div className="header header-row">
        {props.value}
    </div>
  );
}

function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
          {props.value}
        </button>
      );
}
  
  
class Board extends React.Component {
    renderSquare(i) {
      return (
        <Square value={this.props.squares[i]} 
            onClick={() => this.props.onClick(i)}/>
            );
    }
  
    render() {
      return (
        <div>
          <div className="board-row">
            <div className="header header-empty"/>
            <HeaderCol value="1"/>
            <HeaderCol value="2"/>
            <HeaderCol value="3"/>
          </div>
          <div className="board-row">
            <HeaderRow value="1"/>
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            <HeaderRow value="2"/>
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            <HeaderRow value="3"/>
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  

class Game extends React.Component {
    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if(calculateWinner(squares)){
            alert('Game already ended.')
        } else if(squares[i]){
            alert('Square already marked. Pls choose another one.')
        } else{
            squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares,
            }]),            
            xIsNext: !this.state.xIsNext,
            stepNumber: history.length,
        });
        }
    }

    jumpTo(step){
        this.setState({
            xIsNext: (step%2==0),
            stepNumber: step,
        })
    }

    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            xIsNext: true,
            stepNumber: 0,
        };
    }
    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        const moves = history.map((step, move) => {
            const desc = move ?
                `Go to move #${move}` :
                `Start Game`;
            
            return(
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            )
        })

        let status;
        if(winner){
            status = `Winner: ${winner}, Loser: ${(winner == 'X') ? 'O' : 'X'}`
            alert(`Game ended.\n${status}`)
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div className="game">
            <div className="game-board">
                <Board
                 squares={current.squares}
                 onClick={(i) => this.handleClick(i)}/>
            </div>
            <div className="game-info">
                <div>{status}</div>
                <ol>{moves}</ol>
            </div>
            </div>
        );
    }
  }

  // helper func
  function calculateWinner(squares) {
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
  
  // ========================================
  
ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  