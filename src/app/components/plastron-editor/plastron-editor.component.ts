import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { Clipboard } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DimensionsComponent } from '../dimensions/dimensions.component';
import { EnteteComponent } from '../entete/entete.component';
import { FixationsComponent } from '../fixations/fixations.component';
import { FormsModule } from '@angular/forms';
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { MessageService } from 'primeng/api';
import { Plastron } from '../../models/plastron';
import { PositionsComponent } from '../positions/positions.component';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { toXML } from 'to-xml';

@Component({
  selector: 'app-plastron-editor',
  imports: [
    ButtonModule,
    CardModule,
    CommonModule,
    DimensionsComponent,
    EnteteComponent,
    FixationsComponent,
    FormsModule,
    IftaLabelModule,
    InputNumberModule,
    InputTextModule,
    PositionsComponent,
    ToastModule,
    TooltipModule,
  ],
  templateUrl: './plastron-editor.component.html',
  styleUrl: './plastron-editor.component.css',
})
export class PlastronEditorComponent {
  plastron: Plastron = {
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
  @Input() set value(value: Plastron) {
    this.plastron = value;
  }
  get value() {
    return this.plastron;
  }

  @Output() valueChange = new EventEmitter<Plastron>();

  xmlString!: string;

  constructor(
    private clipboard: Clipboard,
    private messageService: MessageService
  ) {}

  handleChange() {
    this.valueChange.emit(this.plastron);
    this.xmlString = toXML({ plastron: this.plastron });
  }

  handleCopyToClipboard() {
    this.clipboard.copy(this.xmlString);
    this.messageService.add({
      severity: 'success',
      summary: 'Succès',
      detail: 'Le xml a bien été copié dans le presse-papier',
    });
  }
}
