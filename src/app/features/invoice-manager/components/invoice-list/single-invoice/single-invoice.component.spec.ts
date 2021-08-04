import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleInvoiceComponent } from './single-invoice.component';

describe('SingleInvoiceComponent', () => {
  let component: SingleInvoiceComponent;
  let fixture: ComponentFixture<SingleInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleInvoiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
