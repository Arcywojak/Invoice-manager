import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteInvoiceButtonComponent } from './delete-invoice-button.component';

describe('DeleteInvoiceButtonComponent', () => {
  let component: DeleteInvoiceButtonComponent;
  let fixture: ComponentFixture<DeleteInvoiceButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteInvoiceButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteInvoiceButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
