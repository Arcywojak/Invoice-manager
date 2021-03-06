import { NgModule } from "@angular/core";
import { InvoiceListComponent } from './components/invoice-list/invoice-list.component';
import { InvoiceHandlerComponent } from './components/invoice-handler/invoice-handler.component';
import { InvoiceFilterComponent } from './components/invoice-filter/invoice-filter.component';
import { InvoiceViewComponent } from './components/invoice-handler/components/invoice-view/invoice-view.component';
import { InvoiceCreateComponent } from './components/invoice-handler/components/invoice-create/invoice-create.component';
import { InvoiceEditComponent } from './components/invoice-handler/components/invoice-edit/invoice-edit.component';
import { MaterialModule } from "src/app/material.module";
import { InvoiceFormComponent } from './components/invoice-handler/components/invoice-form/invoice-form.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PositionFormComponent } from './components/invoice-handler/components/invoice-form/components/position-form/position-form.component';
import { EditPositionsTableComponent } from './components/invoice-handler/components/invoice-form/components/edit-positions-table/edit-positions-table.component';
import { SingleInvoiceComponent } from './components/invoice-list/single-invoice/single-invoice.component';
import { InvoicePositionTableComponent } from './components/invoice-handler/components/invoice-view/invoice-position-table/invoice-position-table.component';
import { InvoiceSharedModule } from "./shared/invoice-shared.module";

@NgModule({
    declarations: [
      InvoiceListComponent,
      InvoiceHandlerComponent,
      InvoiceFilterComponent,
      InvoiceViewComponent,
      InvoiceCreateComponent,
      InvoiceEditComponent,
      InvoiceFormComponent,
      PositionFormComponent,
      EditPositionsTableComponent,
      SingleInvoiceComponent,
      InvoicePositionTableComponent
  ],
  entryComponents: [
    InvoiceFilterComponent
  ],
  imports: [
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    InvoiceSharedModule
  ],
  exports: [
      InvoiceListComponent,
      InvoiceHandlerComponent,
      InvoiceFilterComponent
  ]
})

export class InvoiceManagerModule {}