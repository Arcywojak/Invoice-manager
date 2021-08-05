import { ChangeDetectionStrategy, Component, Input, ViewChild, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { INVOICE_NUMBER_PREFIX } from 'src/app/features/invoice-manager/constants/invoice-numeration-prefix.constant';
import { InvoiceFormType } from 'src/app/features/invoice-manager/enums/invoice-form-type.enum';
import { InvoiceStore } from 'src/app/features/invoice-manager/invoice.store';
import { InvoicePosition } from 'src/app/features/invoice-manager/models/invoice-position.model';
import { Invoice } from 'src/app/features/invoice-manager/models/invoice.model';
import { InvoiceService } from 'src/app/features/invoice-manager/services/invoice.service';
import { PositionFormComponent } from './components/position-form/position-form.component';

@Component({
  selector: 'app-invoice-form',
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InvoiceFormComponent implements OnInit { 

  @Input() set invoice(invoice: Invoice | null) {
    if(invoice && InvoiceFormType.EDIT) {
      this.currentInvoice = invoice;
      this.setFormValues(invoice);
    }
  }
  @Input() formType: InvoiceFormType = InvoiceFormType.CREATE;

  @ViewChild(PositionFormComponent)
  positionForm!: PositionFormComponent;

  errorMessageDuringSubmit = "";
  currentInvoice: Invoice | null = null;

  //Form controls
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


  constructor(
    private invoiceService: InvoiceService, 
    private invoiceStore: InvoiceStore,
    private snackBar: MatSnackBar) { }

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
      this.invoiceForm.get(key)?.setErrors(null);
    });
  }

  onSubmit() {
    const newInvoice = this.createNewInvoice();

    const validationResult = this.invoiceService.validate(newInvoice);

    if(validationResult.isError) {
      this.errorMessageDuringSubmit = validationResult.message;
      return;
    }
    
    //If earlier an error occured, now we want to clear it.
    this.errorMessageDuringSubmit = "";
    this.positionForm.resetForm();

    if(this.formType === InvoiceFormType.CREATE) {
      this.createInvoice(newInvoice);
      return;
    }

    //There are no other cases so I do not put another if
    //if this.formType === InvoiceFormType.EDIT...
    this.editInvoice(newInvoice);
  }

  createInvoice(invoice: Invoice) {
    this.invoiceService.createInvoice(invoice);
    this.snackBar.open("Invoice has been created!", "SUCCESS", {duration: 2000})
    this.resetForm();
    this.invoiceStore.refreshInvoices();
    this.setNewInvoiceNumber();
  }

  editInvoice(invoice: Invoice) {
    this.invoiceService.updateInvoice(invoice);
    this.snackBar.open("Invoice has been edited!", "SUCCESS", {duration: 2000})
    this.invoiceStore.refreshInvoices();
    this.invoiceForm.markAsPristine();
  }

  createNewInvoice() {
    return {
      id: this.currentInvoice?.id,
      number: this.invoiceNumberFormControl.value,
      remark: this.remarkFormControl.value,
      sellerFullName: this.sellerFullNameFormControl.value,
      buyerFullName: this.buyerFullNameFormControl.value,
      positions: this.positionFormControl.value
    } as Invoice;
  }

  setNewInvoiceNumber() {
    const currentInvoiceNumber = this.invoiceService.getNextInvoiceNumber();
    this.invoiceNumberFormControl.setValue(`${INVOICE_NUMBER_PREFIX}${currentInvoiceNumber}`);
  }

}
