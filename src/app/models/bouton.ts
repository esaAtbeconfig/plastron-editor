import { Position } from './position';

export interface Bouton {
  description: string;
  type: string;
  positions: { position: Position[] };
}
