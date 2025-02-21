import { BaseFormComponent } from 'src/app/models/base-form-component';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, forwardRef } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FormsModule } from '@angular/forms';
import { IconFieldModule } from 'primeng/iconfield';
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputIconModule } from 'primeng/inputicon';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { QuestionHintsService } from 'src/app/services/question-hints.service';
import { lastValueFrom } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { QuestionHints } from 'src/app/models/question-hints';
import { SelectModule } from 'primeng/select';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-hints-field',
  imports: [
    ButtonModule,
    CommonModule,
    CardModule,
    DialogModule,
    IftaLabelModule,
    FormsModule,
    FloatLabelModule,
    InputGroupModule,
    InputGroupAddonModule,
    InputNumberModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    SelectModule,
  ],
  templateUrl: './hints-field.component.html',
  styleUrl: './hints-field.component.scss',
})
export class HintsFieldComponent
  extends BaseFormComponent<string>
  implements OnInit
{
  constructor(
    private messageService: MessageService,
    private questionHintsService: QuestionHintsService
  ) {
    super();
  }

  @Input() label = '';
  @Input() questionId = '';

  displayAddQuestionHints = false;
  hintsOptions: { label: string; value: string }[] = [];
  questionHints: {value: string} [] = [];

  async ngOnInit(): Promise<void> {
    await this.loadQuestionHints();
  }

  async loadQuestionHints() {
    const questionHints = (await lastValueFrom(
      this.questionHintsService.get(this.questionId)
    )) as QuestionHints;

    if (questionHints) {
      this.hintsOptions = questionHints.hints.map((x) => {
        return { label: x, value: x };
      });
      this.questionHints = questionHints.hints.map((x) => {
        return { value: x };
      });
    }
  }

  handleAddQuestionHints() {
    this.displayAddQuestionHints = true;
  }

  handleAddQuestionHint() {
    this.questionHints.push({
      value: '',
    });
  }

  async handleSaveQuestionHints() {
    const item = {
      questionId: this.questionId,
      hints: this.questionHints.map(x => x.value)
    } as QuestionHints

    const res = (await lastValueFrom(
      this.questionHintsService.save(item)
    )) as QuestionHints;

    if (res) {
      this.loadQuestionHints();
      this.displayAddQuestionHints = false;
    } else {
      this.messageService.add({
        severity: 'error',
        summary: `Erreur lors de l'enregistrement`,
        detail: '',
      });
    }
  }

  handleRemoveQuestionHint(hint: any) {
    const index = this.questionHints.indexOf(hint);
    if (index > -1) {
      this.questionHints.splice(index, 1);
    }
  }
}
