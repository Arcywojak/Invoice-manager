import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { InvoicePosition } from 'src/app/features/invoice-manager/models/invoice-position.model';

@Component({
  selector: 'app-edit-positions-table',
  templateUrl: './edit-positions-table.component.html',
  styleUrls: ['./edit-positions-table.component.scss']
})
export class EditPositionsTableComponent implements OnInit {
  @Input() positions: InvoicePosition[] = [];
  @Output() idToDeleteEmitter = new EventEmitter();

  displayedColumns: string[] = ['description', 'netValue', 'vatTax', 'deleteColumn'];

  constructor() { }

  ngOnInit(): void {
  }

  emitIdToDelete(id: string) {
    this.idToDeleteEmitter.emit(id);
  }

}
