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
import { Plastron } from 'src/app/models/plastron';
import { MatiereComponent } from '../matiere/matiere.component';
import { PlastronDimensionsComponent } from '../plastron-dimensions/plastron-dimensions.component';

@Component({
  selector: 'app-plastron',
  imports: [
    CommonModule,
    CardModule,
    IftaLabelModule,
    FormsModule,
    FloatLabelModule,
    MatiereComponent,
    PlastronDimensionsComponent,
    InputNumberModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
  ],
  templateUrl: './plastron.component.html',
  styleUrl: './plastron.component.css',
})
export class PlastronComponent extends BaseFormComponent<Plastron> {
}
