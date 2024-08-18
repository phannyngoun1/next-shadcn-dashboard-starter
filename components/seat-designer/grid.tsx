import React from 'react';
import { useDroppable } from '@dnd-kit/core';

interface GridCellProps {
  id: number;
  onDrop: (index: number) => void;
  children?: React.ReactNode;
}

const GridCell: React.FC<GridCellProps> = ({ id, onDrop, children }) => {
  const { isOver, setNodeRef } = useDroppable({
    id: id.toString()
    // onDrop: () => onDrop(id)
  });

  const style = {
    width: '50px',
    height: '50px',
    border: '1px solid black',
    backgroundColor: isOver ? '#a0a0a0' : '#f0f0f0'
  };

  return (
    <div ref={setNodeRef} style={style}>
      {children}
    </div>
  );
};

interface GridProps {
  rows: number;
  columns: number;
  onCellClick: (index: number) => void;
  onDrop: (index: number) => void;
}

const Grid: React.FC<GridProps> = ({ rows, columns, onCellClick, onDrop }) => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 50px)`,
        gap: '5px'
      }}
    >
      {Array.from({ length: rows * columns }).map((_, index) => (
        <GridCell key={index} id={index} onDrop={onDrop}>
          <div
            onClick={() => onCellClick(index)}
            style={{
              width: '50px',
              height: '50px',
              backgroundColor: 'transparent'
            }}
          />
        </GridCell>
      ))}
    </div>
  );
};

export default Grid;
