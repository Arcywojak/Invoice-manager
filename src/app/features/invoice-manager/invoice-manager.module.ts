import { NgModule } from "@angular/core";
import { InvoiceListComponent } from './components/invoice-list/invoice-list.component';
import { InvoiceHandlerComponent } from './components/invoice-handler/invoice-handler.component';
import { InvoiceFilterComponent } from './components/invoice-filter/invoice-filter.component';
import { InvoiceViewComponent } from './components/invoice-handler/components/invoice-view/invoice-view.component';
import { InvoiceCreateComponent } from './components/invoice-handler/components/invoice-create/invoice-create.component';
import { InvoiceEditComponent } from './components/invoice-handler/components/invoice-edit/invoice-edit.component';
import { InvoiceManipulateComponent } from './components/invoice-handler/components/invoice-manipulate/invoice-manipulate.component';
import { MaterialModule } from "src/app/material.module";
import { InvoiceFormComponent } from './components/invoice-handler/components/invoice-form/invoice-form.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PositionFormComponent } from './components/invoice-handler/components/invoice-form/components/position-form/position-form.component';
import { EditPositionsTableComponent } from './components/invoice-handler/components/invoice-form/components/edit-positions-table/edit-positions-table.component';

@NgModule({
    declarations: [
      InvoiceListComponent,
      InvoiceHandlerComponent,
      InvoiceFilterComponent,
      InvoiceViewComponent,
      InvoiceCreateComponent,
      InvoiceEditComponent,
      InvoiceManipulateComponent,
      InvoiceFormComponent,
      PositionFormComponent,
      EditPositionsTableComponent
  ],
  imports: [
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
      InvoiceListComponent,
      InvoiceHandlerComponent,
      InvoiceFilterComponent
  ]
})

export class InvoiceManagerModule {}