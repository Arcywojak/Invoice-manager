import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NavbarComponent } from './features/navbar/navbar.component';
import { InvoiceManagerComponent } from './features/invoice-manager/invoice-manager.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { InvoiceManagerModule } from './features/invoice-manager/invoice-manager.module';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    InvoiceManagerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    InvoiceManagerModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
