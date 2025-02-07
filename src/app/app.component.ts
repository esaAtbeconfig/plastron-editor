import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { Component } from '@angular/core';
import { IconFieldModule } from 'primeng/iconfield';
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputIconModule } from 'primeng/inputicon';
import { InputNumberModule } from 'primeng/inputnumber';
import { MessageService } from 'primeng/api';
import { PlastronEditorComponent } from './components/plastron-editor/plastron-editor.component';
import { RouterModule } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { Commande } from './models/commande';
import { Fixations } from './models/fixation';
import { Entete } from './models/entete';
import { Plastron } from './models/plastron';
import { Afficheur } from './models/afficheur';
import { PlaqueSignaletique } from './models/plaque-signaletique';
import { HautParleur } from './models/haut-parleur';
import { Phonie } from './models/phonie';
import { EclairageSecouru } from './models/eclairage-secouru';
import { LogoPlastron } from './models/logo-plastron';
import { Aeration } from './models/aeration';
import { GoujonMasse } from './models/goujon-masse';
import { Gravure } from './models/gravure';
import { Boutons } from './models/boutons';
import { Position } from './models/position';
import { PlastronDimensions } from './models/plastron-dimensions';
import { Matiere } from './models/matiere';
import { FixationsDimensions } from './models/fixations-dimensions';

@Component({
  imports: [
    ButtonModule,
    CardModule,
    IconFieldModule,
    IftaLabelModule,
    InputIconModule,
    InputNumberModule,
    PlastronEditorComponent,
    RouterModule,
    ToastModule,
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [MessageService],
})
export class AppComponent {
  title = 'myangularapp';

  commande = {
    entete: {
      id: '',
      production: '',
      reference: '',
      path: '',
      version: ''
    } as Entete,
    plastron: {
      type: '',
      description: '',
      dimensions: {} as PlastronDimensions,
      matiere: {} as Matiere
    } as Plastron,
    fixations: {
      type: '',
      description: '',
      dimensions: {} as FixationsDimensions,
      positions: [] as Position[]
    } as Fixations,
    afficheur: {
      position: {} as Position
    } as Afficheur,
    plaque_signaletique: {
      position: {} as Position
    } as PlaqueSignaletique,
    haut_parleur: {
      position: {} as Position
    } as HautParleur,
    phonie: {
      position: {} as Position
    } as Phonie,
    eclairage_secouru: {
      position: {} as Position
    } as EclairageSecouru,
    logo_plastron: {
      position: {} as Position
    } as LogoPlastron,
    aeration: {
      position: {} as Position
    } as Aeration,
    goujon_masse: {
      position: {} as Position
    } as GoujonMasse,
    gravure: {
      position: {} as Position
    } as Gravure,
    boutons: {
      positions: [] as Position[]
    } as Boutons
  } as Commande;

  private mode: 'light' | 'dark' = 'light';
  toggleDarkMode() {
    const html = document.querySelector('html');
    const mode = html?.style.getPropertyValue('color-scheme');
    this.mode = mode === 'light' ? 'dark' : 'light';
    document
      .querySelector('html')
      ?.style.setProperty('color-scheme', this.mode);
  }
}
