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
import { PositionsComponent } from '../positions/positions.component';
import { Boutons } from 'src/app/models/boutons';

@Component({
  selector: 'app-boutons',
  imports: [
    CommonModule,
    CardModule,
    IftaLabelModule,
    FormsModule,
    FloatLabelModule,
    PositionsComponent,
    InputNumberModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
  ],
  templateUrl: './boutons.component.html',
  styleUrl: './boutons.component.css',
})
export class BoutonsComponent extends BaseFormComponent<Boutons> {}
