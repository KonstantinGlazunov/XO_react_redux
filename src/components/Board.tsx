import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  calculateWinner,
  handelClick,
  selectSquares,
} from "../redux/gameSlice";
import Square from "./Square";

const Board: React.FC = (): JSX.Element => {
  const squares = useSelector(selectSquares);
  const dispatch = useDispatch();
  const winner = calculateWinner(squares);

  //как будем ренедерить square
  const renderSquare = (i: number) => {
    return (
      <Square value={squares[i]} onClick={() => dispatch(handelClick(i))} />
    );
  };

const renderResult = ()=>{
    if (winner ==='Draw') {
        return <div className="result">It`s draw!</div>
    }else if(winner) {
        return <div className="result"> Winner: {winner} </div>
    }else {return null;
    }
}

  return (
    <div className="board">
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      {renderResult()}
      <button
        className="restart-button"
        onClick={() => dispatch(handelClick(-1))}>
        Restart game
      </button>
      
    </div>
  );
};

export default Board;
