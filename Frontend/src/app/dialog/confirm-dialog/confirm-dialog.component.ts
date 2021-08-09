import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {

  public dialogTitle: string;
  public message: string;

  constructor(
    private dialogRef: MatDialogRef<ConfirmDialogComponent>, // // для возможности работы с текущим диалог. окном
    @Inject(MAT_DIALOG_DATA) private data: { dialogTitle: string, message: string }, // данные, которые передали в диалоговое окно
  ) {
    this.dialogTitle = data.dialogTitle;
    this.message = data.message;
  }

  ngOnInit() {
  }
  // нажали ОК
  public OnConfirm(): void {
    this.dialogRef.close(true);
  }

  // нажали отмену (ничего не сохраняем и закрываем окно)
  public OnCancel(): void {
    this.dialogRef.close(false);
  }
}
