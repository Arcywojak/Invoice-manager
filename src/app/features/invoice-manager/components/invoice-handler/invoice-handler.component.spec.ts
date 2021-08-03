import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceHandlerComponent } from './invoice-handler.component';

describe('InvoiceHandlerComponent', () => {
  let component: InvoiceHandlerComponent;
  let fixture: ComponentFixture<InvoiceHandlerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoiceHandlerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
