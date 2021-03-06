import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InvoicePosition } from 'src/app/features/invoice-manager/models/invoice-position.model';
import { getRandomId } from 'src/app/features/invoice-manager/utils/generate-random-id';

@Component({
  selector: 'app-position-form',
  templateUrl: './position-form.component.html',
  styleUrls: ['./position-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PositionFormComponent {

  @Input() positions: InvoicePosition[] = []
  @Output() newPositionEmitter = new EventEmitter();

  descriptionFormControl = new FormControl('', Validators.required);
  netValueFormControl = new FormControl('', Validators.required);
  vatTaxFormControl = new FormControl('', Validators.required);

  positionForm = new FormGroup({
    description: this.descriptionFormControl,
    netValue: this.netValueFormControl,
    vatTax: this.vatTaxFormControl
  })

  constructor() { }

  onSubmit() {
    const newPosition = this.createNewPosition();

    this.resetForm();
    this.newPositionEmitter.emit([...this.positions, newPosition]);
  }

  removePosition(id: string) {
    const newPositions = this.positions.filter(el => el.id !== id);

    this.newPositionEmitter.emit(newPositions);
  }

  resetForm() {
    this.positionForm.reset();
    Object.keys(this.positionForm.controls).forEach(key => {
      this.positionForm.get(key)?.setErrors(null);
    });
  }

  createNewPosition() {
    return {
      id: getRandomId(),
      description: this.descriptionFormControl.value,
      netValue: this.netValueFormControl.value as Number,
      vatTax: this.vatTaxFormControl.value
    } as InvoicePosition;
  }

}
