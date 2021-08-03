import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPositionsTableComponent } from './edit-positions-table.component';

describe('EditPositionsTableComponent', () => {
  let component: EditPositionsTableComponent;
  let fixture: ComponentFixture<EditPositionsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPositionsTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPositionsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
