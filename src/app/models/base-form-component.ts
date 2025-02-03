import { Directive, EventEmitter, Input, Output } from '@angular/core';

@Directive()
export class BaseFormComponent<T> {
  @Input() set value(value: T) {
    this.item = value;
  }
  get value() {
    return this.item;
  }
  @Output() valueChange = new EventEmitter<T>();

  item!: T;

  public handleChange() {
    this.valueChange.emit(this.item);
  }
}
