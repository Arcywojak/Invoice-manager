import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceManipulateComponent } from './invoice-manipulate.component';

describe('InvoiceManipulateComponent', () => {
  let component: InvoiceManipulateComponent;
  let fixture: ComponentFixture<InvoiceManipulateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoiceManipulateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceManipulateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
