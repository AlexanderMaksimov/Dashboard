import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Priority } from 'src/app/model/Priority';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-edit-priority-dialog',
  templateUrl: './edit-priority-dialog.component.html',
  styleUrls: ['./edit-priority-dialog.component.css']
})
export class EditPriorityDialogComponent implements OnInit {

  public dialogTitle: string; // заголовок окна
  public priority: Priority; // приоритет для редактирования/создания

  // сохраняем все значения в отдельные переменные
  // чтобы изменения не сказывались на самой задаче и можно было отменить изменения
  public tmpTitle: string;

  constructor(
    private dialogRef: MatDialogRef<EditPriorityDialogComponent>, // для возможности работы с текущим диалог. окном
    @Inject(MAT_DIALOG_DATA) private data: [Priority, string], // данные, которые передали в диалоговое окно
    private delDialog: MatDialog
  ) { }

  ngOnInit() {
    this.priority = this.data[0]; // категория для редактирования/создания
    this.dialogTitle = this.data[1]; // текст для диалогового окна
    this.tmpTitle=this.priority.title;
  }
  // нажали ОК
  public OnConfirm(): void {

    // считываем все значения для сохранения в поля кактегории
    this.priority.title = this.tmpTitle;
    // передаем добавленный/измененный приоритет в обработчик
    // что с ним будут делать - уже на задача этого компонента
    this.dialogRef.close(this.priority);

  }

  // нажали отмену (ничего не сохраняем и закрываем окно)
  public OnCancel(): void {
    this.dialogRef.close(null);
  }

  public OnDelete() {
    let dialog = this.delDialog.open(ConfirmDialogComponent, {
      maxWidth: '500px',
      data: {
        dialogTitle: "Сonfirm action",
        message: 'Вы действительно хотите удалить категорию "${this.priority.title}"?'
      },
      autoFocus: false
    });
    dialog.afterClosed().subscribe(result => {
      if (result) {// если нажали ОК и есть результат   
        this.dialogRef.close('delete');//нажали удалить
      }
    });
  }

}
