import { Component, EventEmitter, Input, Output } from '@angular/core';
import IFieldEmitter = LiveEdit.IFieldEmitter;

@Component({
  selector: 'control-field',
  templateUrl: './control-field.component.html',
  styleUrls: ['./control-field.component.scss']
})
export class ControlFieldComponent {
  @Input() value: string;
  @Input() inProgress: boolean;
  @Output() editingStatus = new EventEmitter<IFieldEmitter>();
  public inFocus = false;

  constructor() {
  }

  isDisable(){
    return this.inProgress && !this.inFocus
  }

  public sendEditingStatus(status: boolean): void {
    this.inFocus = status;
    this.editingStatus.emit({ value: this.value, status });
  }

}
