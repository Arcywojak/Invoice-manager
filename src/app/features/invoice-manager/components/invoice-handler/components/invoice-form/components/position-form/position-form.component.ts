import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InvoicePosition } from 'src/app/features/invoice-manager/models/invoice-position.model';
import { getRandomId } from 'src/app/features/invoice-manager/utils/generate-random-id';

@Component({
  selector: 'app-position-form',
  templateUrl: './position-form.component.html',
  styleUrls: ['./position-form.component.scss']
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
    console.log("SUBIMT")
    const newPosition = {
      id: getRandomId(),
      description: this.descriptionFormControl.value,
      netValue: this.netValueFormControl.value as Number,
      vatTax: this.vatTaxFormControl.value
    } as InvoicePosition

    this.newPositionEmitter.emit([...this.positions, newPosition]);
  }

}
