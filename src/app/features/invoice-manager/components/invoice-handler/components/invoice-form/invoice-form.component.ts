import { Component, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { InvoiceFormType } from 'src/app/features/invoice-manager/enums/invoice-form-type.enum';
import { InvoicePosition } from 'src/app/features/invoice-manager/models/invoice-position.model';
import { Invoice } from 'src/app/features/invoice-manager/models/invoice.model';

@Component({
  selector: 'app-invoice-form',
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.scss']
})
export class InvoiceFormComponent { 

  @Input() set invoice(invoice: Invoice) {
    if(invoice && InvoiceFormType.EDIT) {
      this.currentInvoice = invoice;
      this.setFormValues(invoice);
    }
  }
  @Input() formType: InvoiceFormType = InvoiceFormType.CREATE;

  currentInvoice: Invoice | null = null;
  invoiceNumberFormControl = new FormControl('', Validators.required);
  remarkFormControl = new FormControl('');
  sellerFullNameFormControl = new FormControl('', Validators.required);
  buyerFullNameFormControl = new FormControl('', Validators.required);
  positionFormControl = new FormControl([]);


  constructor() { }

  updatePositions(positions: InvoicePosition[]) {
    this.positionFormControl.setValue(positions);
  }

  setFormValues(invoice: Invoice) {
    this.invoiceNumberFormControl.setValue(invoice.number);
    this.remarkFormControl.setValue(invoice.remark);
    this.sellerFullNameFormControl.setValue(invoice.sellerFullName);
    this.buyerFullNameFormControl.setValue(invoice.buyerFullName);
    this.positionFormControl.setValue(invoice.position);
  }

}
