import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { INVOICE_NUMBER_PREFIX } from 'src/app/features/invoice-manager/constants/invoice-numeration-prefix.constant';
import { InvoiceFormType } from 'src/app/features/invoice-manager/enums/invoice-form-type.enum';
import { InvoiceStore } from 'src/app/features/invoice-manager/invoice.store';
import { InvoicePosition } from 'src/app/features/invoice-manager/models/invoice-position.model';
import { Invoice } from 'src/app/features/invoice-manager/models/invoice.model';
import { InvoiceService } from 'src/app/features/invoice-manager/services/invoice.service';

@Component({
  selector: 'app-invoice-form',
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.scss']
})
export class InvoiceFormComponent implements OnChanges, OnInit { 

  @Input() set invoice(invoice: Invoice) {
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


  constructor(private invoiceService: InvoiceService, private invoiceStore: InvoiceStore) { }

  ngOnChanges() {
    console.log("INVOICE FORM RE-RENDERED")
    const currentInvoiceNumber = this.invoiceService.getNextInvoiceNumber();
    this.invoiceNumberFormControl.setValue(`${INVOICE_NUMBER_PREFIX}${currentInvoiceNumber}`);
  }

  ngOnInit() {
    const currentInvoiceNumber = this.invoiceService.getNextInvoiceNumber();
    this.invoiceNumberFormControl.setValue(`${INVOICE_NUMBER_PREFIX}${currentInvoiceNumber}`);
  }

  updatePositions(positions: InvoicePosition[]) {
    this.positionFormControl.setValue(positions);
  }

  setFormValues(invoice: Invoice) {
    this.invoiceNumberFormControl.setValue(invoice.number);
    this.remarkFormControl.setValue(invoice.remark);
    this.sellerFullNameFormControl.setValue(invoice.sellerFullName);
    this.buyerFullNameFormControl.setValue(invoice.buyerFullName);
    this.positionFormControl.setValue(invoice.positions);
  }

  onSubmit() {
    const newInvoice = {
      id: this.invoice?.id,
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
    this.invoiceStore.refreshInvoices();
  }

  editInvoice(invoice: Invoice) {
    this.invoiceService.updateInvoice(invoice);
    this.invoiceStore.refreshInvoices();
  }

}
