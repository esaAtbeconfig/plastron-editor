import { Aeration } from './aeration';
import { Afficheur } from './afficheur';
import { Bouton } from './bouton';
import { EclairageSecouru } from './eclairage-secouru';
import { Entete } from './entete';
import { Fixations } from './fixation';
import { GoujonMasse } from './goujon-masse';
import { Gravure } from './gravure';
import { HautParleur } from './haut-parleur';
import { LogoPlastron } from './logo-plastron';
import { Phonie } from './phonie';
import { PlaqueSignaletique } from './plaque-signaletique';
import { Plastron } from './plastron';

export interface Commande {
  entete: Entete;
  plastron: Plastron;
  fixations: Fixations;
  afficheur: Afficheur;
  plaque_signaletique: PlaqueSignaletique;
  haut_parleur: HautParleur;
  phonie: Phonie;
  eclairage_secouru: EclairageSecouru;
  logo_plastron: LogoPlastron;
  aeration: Aeration;
  goujon_masse: GoujonMasse;
  gravure: Gravure;
  boutons: { button: Bouton[] };
}
