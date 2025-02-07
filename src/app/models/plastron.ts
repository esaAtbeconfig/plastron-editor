import { Matiere } from './matiere';
import { PlastronDimensions } from './plastron-dimensions';

export interface Plastron {
  type: string;
  description: string;
  dimensions: PlastronDimensions;
  matiere: Matiere;
}
