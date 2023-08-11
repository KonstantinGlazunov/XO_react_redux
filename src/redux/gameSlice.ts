import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface BoardState {
    squares: Array<string | null>
    xIsNext: boolean; 
}

const initialState : BoardState = {
    squares: Array(9).fill(null),
    xIsNext: true,
}

const boardSlice = createSlice({
    name: 'board', 
    initialState,
    reducers: {
handelClick: (state , actions: PayloadAction<number>) =>{ //number это номер ячейки на которую хотим сходить 
    if (actions.payload === -1){ //для кнопки сброса
        state.squares = Array(9).fill(null);
        state.xIsNext = true;
        return;
    }
const squares = [...state.squares];
if (calculateWinner(squares) || squares[actions.payload]) { //если игра закончиласи или ячейка занята
    return;
}
squares[actions.payload] = state.xIsNext? 'X' : 'O'; //ставим в зависимостои от того чей ход 
state.squares = squares; // сохраняем копию в глобальном состоянии 
state.xIsNext = !state.xIsNext;  //меняем последовательность кода 
}

    }
})

export function calculateWinner(squares: Array<string | null>) :string | null { // принимает  : возвращает
const lines = [
[0,1,2],
[3,4,5],
[6,7,8],
[0,3,6],
[1,4,7],
[2,5,8],
[0,4,8],
[2,4,6],
]

/* //класический вариант for
for (let i = 0; i < lines.length - 1; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
*/

for (const [a,b,c] of lines) { //пробегись по массиву и деструктуризируй каждый из маленьких 
if (squares[a] && squares[a]===squares[b] && squares[b]===squares[c]){
    return squares[a]; 
}
}
if (squares.every(square =>square !==null)){
    return 'Draw'
}
return null;
}

export const { handelClick } = boardSlice.actions;

export const selectSquares = ((state: { board: BoardState }) => state.board.squares);

export default boardSlice.reducer