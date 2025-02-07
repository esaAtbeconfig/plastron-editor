import { FixationsDimensions } from './fixations-dimensions';
import { Position } from './position';

export interface Fixations {
  type: string;
  description: string;
  dimensions: FixationsDimensions;
  positions: Position[];
}
