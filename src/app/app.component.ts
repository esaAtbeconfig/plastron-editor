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

  plastron = {
    entete: {
      description: '',
      id: '',
      production: '',
      reference: '',
      type: '',
      version: '',
    },
    dimensions: {
      epaisseur: 0,
      finition: '',
      hauteur: 0,
      largeur: 0,
      matiereType: '',
    },
    fixations: {
      diametre: 0,
      type: '',
      positions: [],
    },
  };

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
