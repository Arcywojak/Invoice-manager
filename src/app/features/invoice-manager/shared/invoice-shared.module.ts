import { NgModule } from "@angular/core";
import { PositionValuePipe } from "./pipes/position-value.pipe";
import { DeleteInvoiceButtonComponent } from './components/delete-invoice-button/delete-invoice-button.component';
import { ConfirmActionDialogComponent } from './components/confirm-action-dialog/confirm-action-dialog.component';
import { MaterialModule } from "src/app/material.module";
import { DateFromMilisecondsPipe } from './pipes/date-from-miliseconds.pipe';

@NgModule({
    declarations: [
        PositionValuePipe,
        DeleteInvoiceButtonComponent,
        ConfirmActionDialogComponent,
        DateFromMilisecondsPipe
    ],
    imports: [
        MaterialModule
    ],
    exports: [
        PositionValuePipe,
        DateFromMilisecondsPipe,
        DeleteInvoiceButtonComponent
    ]
})

export class InvoiceSharedModule {}