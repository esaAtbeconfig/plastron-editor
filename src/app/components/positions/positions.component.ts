import { BaseFormComponent } from 'src/app/models/base-form-component';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FloatLabel } from 'primeng/floatlabel';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { Position } from 'src/app/models/position';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-positions',
  imports: [
    ButtonModule,
    CardModule,
    CommonModule,
    FloatLabel,
    FormsModule,
    InputNumberModule,
    TooltipModule,
  ],
  templateUrl: './positions.component.html',
  styleUrl: './positions.component.css',
})
export class PositionsComponent extends BaseFormComponent<Position[]> {
  handleAddPosition() {
    this.item.push({ x: 0, y: 0 });
    this.handleChange();
  }

  handleRemovePosition(position: Position) {
    const index = this.item.indexOf(position);
    if (index > -1) {
      this.item.splice(index, 1);
    }
  }
}
