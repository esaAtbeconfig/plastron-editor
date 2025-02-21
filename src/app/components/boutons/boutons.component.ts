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
import { Bouton } from 'src/app/models/bouton';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { DropdownModule } from 'primeng/dropdown';
import { HintsFieldComponent } from '../hints-field/hints-field.component';

@Component({
  selector: 'app-boutons',
  imports: [
    ButtonModule,
    CommonModule,
    CardModule,
    DropdownModule,
    IftaLabelModule,
    FormsModule,
    FloatLabelModule,
    PositionsComponent,
    InputNumberModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    InputGroupModule,
    InputGroupAddonModule,
    HintsFieldComponent
  ],
  templateUrl: './boutons.component.html',
  styleUrl: './boutons.component.css',
})
export class BoutonsComponent extends BaseFormComponent<Bouton[]> {
  handleAddBouton() {
    this.item.push({
      positions: { position: [] },
    } as any as Bouton);
    this.handleChange();
  }

  handleRemoveBouton(bouton: Bouton) {
    const index = this.item.indexOf(bouton);
    if (index > -1) {
      this.item.splice(index, 1);
      this.handleChange();
    }
  }
}
