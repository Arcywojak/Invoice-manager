import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoicePositionTableComponent } from './invoice-position-table.component';

describe('InvoicePositionTableComponent', () => {
  let component: InvoicePositionTableComponent;
  let fixture: ComponentFixture<InvoicePositionTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoicePositionTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoicePositionTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
