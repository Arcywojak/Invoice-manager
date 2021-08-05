import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { INVOICE_NUMBER_PREFIX } from 'src/app/features/invoice-manager/constants/invoice-numeration-prefix.constant';
import { InvoiceFormType } from 'src/app/features/invoice-manager/enums/invoice-form-type.enum';
import { InvoiceStore } from 'src/app/features/invoice-manager/invoice.store';
import { InvoicePosition } from 'src/app/features/invoice-manager/models/invoice-position.model';
import { Invoice } from 'src/app/features/invoice-manager/models/invoice.model';
import { InvoiceService } from 'src/app/features/invoice-manager/services/invoice.service';

@Component({
  selector: 'app-invoice-form',
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InvoiceFormComponent implements OnChanges, OnInit { 

  @Input() set invoice(invoice: Invoice | null) {
    if(invoice && InvoiceFormType.EDIT) {
      this.currentInvoice = invoice;
      this.setFormValues(invoice);
    }
  }
  @Input() formType: InvoiceFormType = InvoiceFormType.CREATE;

  errorMessageDuringSubmit = "";
  currentInvoice: Invoice | null = null;
  invoiceNumberFormControl = new FormControl('', Validators.required);
  remarkFormControl = new FormControl('');
  sellerFullNameFormControl = new FormControl('', Validators.required);
  buyerFullNameFormControl = new FormControl('', Validators.required);
  positionFormControl = new FormControl([]);

  invoiceForm = new FormGroup({
    invoiceNumber: this.invoiceNumberFormControl,
    remark: this.remarkFormControl,
    sellerFullName: this.sellerFullNameFormControl,
    buyerFullName: this.buyerFullNameFormControl,
    positions: this.positionFormControl
  })


  constructor(private invoiceService: InvoiceService, private invoiceStore: InvoiceStore) { }

  ngOnChanges() {
    //console.log("INVOICE FORM RE-RENDERED")
    //const currentInvoiceNumber = this.invoiceService.getNextInvoiceNumber();
    //this.invoiceNumberFormControl.setValue(`${INVOICE_NUMBER_PREFIX}${currentInvoiceNumber}`);
  }

  ngOnInit() {
    this.setNewInvoiceNumber();
  }

  updatePositions(positions: InvoicePosition[]) {
    this.positionFormControl.setValue(positions);
  }

  setFormValues(invoice?: Invoice): void {
    if(invoice) {
      this.invoiceNumberFormControl.setValue(invoice.number);
      this.remarkFormControl.setValue(invoice.remark);
      this.sellerFullNameFormControl.setValue(invoice.sellerFullName);
      this.buyerFullNameFormControl.setValue(invoice.buyerFullName);
      this.positionFormControl.setValue(invoice.positions);
      return;
    }
    this.invoiceNumberFormControl.setValue('');
    this.remarkFormControl.setValue('');
    this.sellerFullNameFormControl.setValue('');
    this.buyerFullNameFormControl.setValue('');
    this.positionFormControl.setValue([]);
  }

  resetForm(): void {
    this.setFormValues();
    Object.keys(this.invoiceForm.controls).forEach(key => {
      this.invoiceForm?.get(key)?.setErrors(null);
    });
  }

  onSubmit() {
    const newInvoice = {
      id: this.currentInvoice?.id,
      number: this.invoiceNumberFormControl.value,
      remark: this.remarkFormControl.value,
      sellerFullName: this.sellerFullNameFormControl.value,
      buyerFullName: this.buyerFullNameFormControl.value,
      positions: this.positionFormControl.value
    } as Invoice;

    const validationResult = this.invoiceService.validate(newInvoice);

    if(validationResult.isError) {
      this.errorMessageDuringSubmit = validationResult.message;
      return;
    }

    if(this.formType === InvoiceFormType.CREATE) {
      this.createInvoice(newInvoice);
      return;
    }

    this.editInvoice(newInvoice);
  }

  createInvoice(invoice: Invoice) {
    this.invoiceService.createInvoice(invoice);
    this.resetForm();
    this.invoiceStore.refreshInvoices();
    this.setNewInvoiceNumber();
  }

  editInvoice(invoice: Invoice) {
    this.invoiceService.updateInvoice(invoice);
    this.invoiceStore.refreshInvoices();
    this.invoiceForm.markAsUntouched();
  }

  setNewInvoiceNumber() {
    const currentInvoiceNumber = this.invoiceService.getNextInvoiceNumber();
    this.invoiceNumberFormControl.setValue(`${INVOICE_NUMBER_PREFIX}${currentInvoiceNumber}`);
  }

}
