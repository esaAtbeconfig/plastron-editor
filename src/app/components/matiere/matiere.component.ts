import { BaseFormComponent } from 'src/app/models/base-form-component';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FormsModule } from '@angular/forms';
import { IconFieldModule } from 'primeng/iconfield';
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputIconModule } from 'primeng/inputicon';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { Matiere } from 'src/app/models/matiere';
import { HintsFieldComponent } from '../hints-field/hints-field.component';

@Component({
  selector: 'app-matiere',
  imports: [
    CommonModule,
    CardModule,
    IftaLabelModule,
    FormsModule,
    FloatLabelModule,
    InputNumberModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    HintsFieldComponent
  ],
  templateUrl: './matiere.component.html',
  styleUrl: './matiere.component.css',
})
export class MatiereComponent extends BaseFormComponent<Matiere> {}
