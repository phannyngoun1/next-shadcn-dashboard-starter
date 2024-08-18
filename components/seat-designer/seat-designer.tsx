'use client';

import React, { useState } from 'react';
import Grid from './grid';
import Seat from './seat';
import { DndContext, useSensor, useSensors, MouseSensor } from '@dnd-kit/core';
import { Seat as SeatType } from './types';

const SeatDesigner: React.FC = () => {
  const [rows] = useState(10);
  const [columns] = useState(10);
  const [seats, setSeats] = useState<SeatType[]>([]);
  const [selectedSeat, setSelectedSeat] = useState<SeatType | null>(null);
  const sensors = useSensors(useSensor(MouseSensor));

  const handleCellClick = (index: number) => {
    const row = Math.floor(index / columns);
    const col = index % columns;
    const existingSeat = seats.find(
      (seat) => seat.row === row && seat.column === col
    );

    if (!existingSeat) {
      const newSeat = {
        id: seats.length + 1,
        row,
        column: col,
        status: 'available'
      };
      setSeats([...seats, newSeat]);
      setSelectedSeat(newSeat);
    } else {
      const updatedSeats = seats.filter((seat) => seat !== existingSeat);
      setSeats(updatedSeats);
      if (selectedSeat && selectedSeat.id === existingSeat.id) {
        setSelectedSeat(null);
      }
    }
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (over) {
      const updatedSeats = seats.map((seat) =>
        seat.id === Number(active.id)
          ? {
              ...seat,
              row: Math.floor(Number(over.id) / columns),
              column: Number(over.id) % columns
            }
          : seat
      );
      setSeats(updatedSeats);
    }
  };

  const handleSeatClick = (seat: SeatType) => {
    setSelectedSeat(seat);
  };

  const handleDrop = (index: number) => {
    if (selectedSeat) {
      const row = Math.floor(index / columns);
      const col = index % columns;

      const updatedSeats = seats.map((seat) =>
        seat.id === selectedSeat.id ? { ...seat, row, column: col } : seat
      );

      setSeats(updatedSeats);
      setSelectedSeat(null); // Deselect after drop
    }
  };

  const handlePropertyChange = (property: keyof SeatType, value: any) => {
    if (selectedSeat) {
      const updatedSeats = seats.map((seat) =>
        seat.id === selectedSeat.id ? { ...seat, [property]: value } : seat
      );
      setSeats(updatedSeats);
      setSelectedSeat({ ...selectedSeat, [property]: value });
    }
  };

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div style={{ display: 'flex' }}>
        <Grid
          rows={rows}
          columns={columns}
          onCellClick={handleCellClick}
          onDrop={handleDrop}
        />
        <div style={{ marginLeft: '20px' }}>
          {seats.map((seat) => (
            <Seat
              key={seat.id}
              seat={seat}
              onClick={() => handleSeatClick(seat)}
            />
          ))}
        </div>
        {selectedSeat && (
          <div
            style={{
              marginLeft: '20px',
              padding: '10px',
              border: '1px solid #ccc'
            }}
          >
            <h2>Seat Properties</h2>
            <div>
              <label>ID: {selectedSeat.id}</label>
            </div>
            <div>
              <label>
                Row:
                <input
                  type="number"
                  value={selectedSeat.row}
                  onChange={(e) =>
                    handlePropertyChange('row', Number(e.target.value))
                  }
                />
              </label>
            </div>
            <div>
              <label>
                Column:
                <input
                  type="number"
                  value={selectedSeat.column}
                  onChange={(e) =>
                    handlePropertyChange('column', Number(e.target.value))
                  }
                />
              </label>
            </div>
            <div>
              <label>
                Status:
                <select
                  value={selectedSeat.status}
                  onChange={(e) =>
                    handlePropertyChange('status', e.target.value)
                  }
                >
                  <option value="available">Available</option>
                  <option value="reserved">Reserved</option>
                  <option value="selected">Selected</option>
                </select>
              </label>
            </div>
            <div>
              <label>
                Type:
                <input
                  type="text"
                  value={selectedSeat.type || ''}
                  onChange={(e) => handlePropertyChange('type', e.target.value)}
                />
              </label>
            </div>
          </div>
        )}
      </div>
    </DndContext>
  );
};

export default SeatDesigner;
