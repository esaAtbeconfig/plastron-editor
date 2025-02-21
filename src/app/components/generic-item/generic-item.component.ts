import { BaseFormComponent } from 'src/app/models/base-form-component';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FormsModule } from '@angular/forms';
import { IconFieldModule } from 'primeng/iconfield';
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputIconModule } from 'primeng/inputicon';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { GenericItem } from 'src/app/models/generic-item';
import { PositionComponent } from '../position/position.component';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { QuestionHintsService } from 'src/app/services/question-hints.service';
import { ButtonModule } from 'primeng/button';
import { HintsFieldComponent } from '../hints-field/hints-field.component';

@Component({
  selector: 'app-generic-item',
  imports: [
    ButtonModule,
    CommonModule,
    CardModule,
    DropdownModule,
    IftaLabelModule,
    FormsModule,
    FloatLabelModule,
    InputGroupModule,
    InputGroupAddonModule,
    InputNumberModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    PositionComponent,
    HintsFieldComponent
  ],
  templateUrl: './generic-item.component.html',
  styleUrl: './generic-item.component.css',
})
export class GenericItemComponent extends BaseFormComponent<GenericItem> {

  constructor(private questionHintsService: QuestionHintsService) {
    super();
  }

  @Input() label = '';
  @Input() questionId = '';
}
