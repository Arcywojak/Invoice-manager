import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { InvoicePosition } from 'src/app/features/invoice-manager/models/invoice-position.model';

@Component({
  selector: 'app-edit-positions-table',
  templateUrl: './edit-positions-table.component.html',
  styleUrls: ['./edit-positions-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditPositionsTableComponent {
  @Input() positions: InvoicePosition[] = [];
  @Output() idToDeleteEmitter = new EventEmitter();

  displayedColumns: string[] = ['description', 'netValue', 'vatTax', 'deleteColumn'];

  constructor() { }

  emitIdToDelete(id: string) {
    this.idToDeleteEmitter.emit(id);
  }

}
