export interface Seat {
  id: number;
  row: number;
  column: number;
  status: 'available' | 'reserved' | 'selected';
  type?: string;
}
