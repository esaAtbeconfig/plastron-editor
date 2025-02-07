import { BaseFormComponent } from 'src/app/models/base-form-component';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FormsModule } from '@angular/forms';
import { IconFieldModule } from 'primeng/iconfield';
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputIconModule } from 'primeng/inputicon';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { GenericItem } from 'src/app/models/generic-item';
import { PositionComponent } from '../position/position.component';

@Component({
  selector: 'app-generic-item',
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
    PositionComponent
  ],
  templateUrl: './generic-item.component.html',
  styleUrl: './generic-item.component.css',
})
export class GenericItemComponent extends BaseFormComponent<GenericItem> {

  @Input() label = '';
}
