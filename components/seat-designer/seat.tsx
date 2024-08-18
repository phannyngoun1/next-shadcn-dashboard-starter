import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { Seat as SeatType } from './types';

interface SeatProps {
  seat: SeatType;
  onClick: () => void;
}

const Seat: React.FC<SeatProps> = ({ seat, onClick }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: seat.id.toString(),
    data: { seat }
  });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    width: '50px',
    height: '50px',
    backgroundColor:
      seat.status === 'available'
        ? 'green'
        : seat.status === 'reserved'
        ? 'red'
        : 'blue',
    border: '1px solid black',
    cursor: 'pointer'
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      onClick={onClick}
    >
      {seat.id}
    </div>
  );
};

export default Seat;
