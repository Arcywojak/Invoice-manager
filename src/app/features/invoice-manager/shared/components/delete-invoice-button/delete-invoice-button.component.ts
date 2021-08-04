import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InvoiceStore } from '../../../invoice.store';
import { InvoiceService } from '../../../services/invoice.service';
import { ConfirmActionDialogComponent } from '../confirm-action-dialog/confirm-action-dialog.component';

@Component({
  selector: 'app-delete-invoice-button',
  templateUrl: './delete-invoice-button.component.html',
  styleUrls: ['./delete-invoice-button.component.scss']
})
export class DeleteInvoiceButtonComponent {

  @Input() id!: string;

  constructor(private dialog: MatDialog, private invoiceService: InvoiceService, private invoiceStore: InvoiceStore) { }

  openDeleteDialog() {
    const message = "Are you sure to delete the invoice?"

    const dialog = this.dialog.open(ConfirmActionDialogComponent, {
      data: {
        message
      }
    });

    dialog.afterClosed().subscribe((shouldActionBeDone: Boolean) => {
      if(shouldActionBeDone) {
        this.invoiceService.removeInvoice(this.id);
        this.invoiceStore.refreshInvoices();
      }
    })
  }

}
