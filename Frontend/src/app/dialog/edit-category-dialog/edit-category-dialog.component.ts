import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from 'src/app/model/Category';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { OperType } from '../OperType';

@Component({
  selector: 'app-edit-category-dialog',
  templateUrl: './edit-category-dialog.component.html',
  styleUrls: ['./edit-category-dialog.component.css']
})
export class EditCategoryDialogComponent implements OnInit {

  public dialogTitle: string; // заголовок окна
  public category: Category; // задача для редактирования/создания
  public operType:OperType;
  // сохраняем все значения в отдельные переменные
  // чтобы изменения не сказывались на самой задаче и можно было отменить изменения
  public tmpTitle: string;

  constructor(
    private dialogRef: MatDialogRef<EditCategoryDialogComponent>, // // для возможности работы с текущим диалог. окном
    @Inject(MAT_DIALOG_DATA) private data: [Category, string,OperType], // данные, которые передали в диалоговое окно
    private delDialog: MatDialog
  ) { }

  ngOnInit() {
    this.category = this.data[0]; // категория для редактирования/создания
    this.dialogTitle = this.data[1]; // текст для диалогового окна
        this.operType = this.data[2];
    this.tmpTitle=this.category.title;
  }
  // нажали ОК
  public OnConfirm(): void {

    // считываем все значения для сохранения в поля кактегории
    this.category.title = this.tmpTitle;
    // передаем добавленную/измененную задачу в обработчик
    // что с ним будут делать - уже на задача этого компонента
    this.dialogRef.close(this.category);
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
        message: 'Вы действительно хотите удалить категорию "${this.category.title}"?'
      },
      autoFocus: false
    });
    dialog.afterClosed().subscribe(result => {
      if (result) {// если нажали ОК и есть результат   
        this.dialogRef.close('delete');//нажали удалить
      }
    });
  }
  public CanDelete():Boolean{
    return this.operType===OperType.EDIT
  }

}
