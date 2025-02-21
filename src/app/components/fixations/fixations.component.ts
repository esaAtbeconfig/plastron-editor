import { BaseFormComponent } from 'src/app/models/base-form-component';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Fixations } from 'src/app/models/fixation';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FormsModule } from '@angular/forms';
import { IconFieldModule } from 'primeng/iconfield';
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputIconModule } from 'primeng/inputicon';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { FixationsDimensionsComponent } from '../fixations-dimensions/fixations-dimensions.component';
import { PositionsComponent } from '../positions/positions.component';
import { HintsFieldComponent } from '../hints-field/hints-field.component';

@Component({
  selector: 'app-fixations',
  imports: [
    CommonModule,
    CardModule,
    IftaLabelModule,
    FormsModule,
    FloatLabelModule,
    FixationsDimensionsComponent,
    PositionsComponent,
    InputNumberModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    HintsFieldComponent
  ],
  templateUrl: './fixations.component.html',
  styleUrl: './fixations.component.css',
})
export class FixationsComponent extends BaseFormComponent<Fixations> {}
