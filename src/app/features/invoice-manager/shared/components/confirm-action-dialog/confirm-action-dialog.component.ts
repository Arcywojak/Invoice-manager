import { Component, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-action-dialog',
  templateUrl: './confirm-action-dialog.component.html',
  styleUrls: ['./confirm-action-dialog.component.scss']
})
export class ConfirmActionDialogComponent {

  @Input() message = "";

  constructor( public dialogRef: MatDialogRef<ConfirmActionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {message: string}) { }

  closeDialog(shouldActionBeExecuted = false) {
    this.dialogRef.close(shouldActionBeExecuted);
  }

}
