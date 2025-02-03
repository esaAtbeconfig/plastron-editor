import { Dimensions } from './dimension';
import { Entete } from './entete';
import { Fixations } from './fixation';

export interface Plastron {
  entete: Entete;
  dimensions: Dimensions;
  fixations: Fixations;
}
