import React from 'react'
interface SquareProps {
    value: string | null;
    onClick: ()=> void;
}

//компонент квадратика. Внутри квадратика есть value(x | 0) и  действие
const Square: React.FC<SquareProps> = ({value, onClick}):JSX.Element => {
  return (
    <button className='square' onClick={onClick}>{value}</button>
  )
}

export default Square