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
import { PlastronDimensions } from 'src/app/models/plastron-dimensions';

@Component({
  selector: 'app-plastron-dimensions',
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
  ],
  templateUrl: './plastron-dimensions.component.html',
  styleUrl: './plastron-dimensions.component.css',
})
export class PlastronDimensionsComponent extends BaseFormComponent<PlastronDimensions> {}
