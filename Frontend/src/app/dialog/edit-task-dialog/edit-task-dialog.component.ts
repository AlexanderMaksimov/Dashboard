import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { stringify } from 'querystring';
import { Category } from 'src/app/model/Category';
import { Priority } from 'src/app/model/Priority';
import { CategoryService } from 'src/app/services/DataAPI/ImplementationService/CategoryService';
import { PriorityService } from 'src/app/services/DataAPI/ImplementationService/PriorityService.service';
import { TaskService } from 'src/app/services/DataAPI/ImplementationService/TaskService.service';
import { Task } from '../../model/Task';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { OperType } from '../OperType';

@Component({
  selector: 'app-edit-task-dialog',
  templateUrl: './edit-task-dialog.component.html',
  styleUrls: ['./edit-task-dialog.component.css']
})

// редактирование/создание задачи
export class EditTaskDialogComponent implements OnInit {

  public dialogTitle: string; // заголовок окна
  public task: Task; // задача для редактирования/создания
  public categories: Category[];
  public priorities: Priority[];

  // сохраняем все значения в отдельные переменные
  // чтобы изменения не сказывались на самой задаче и можно было отменить изменения
  public tmpTitle: string;
  public tmpCategory: Category;
  public tmpPriority: Priority;
  public tmpDate: Date;
  public operType:OperType;

  constructor(
    private dialogRef: MatDialogRef<EditTaskDialogComponent>, // // для возможности работы с текущим диалог. окном
    @Inject(MAT_DIALOG_DATA) private data: [Task, string,OperType], // данные, которые передали в диалоговое окно
    private categoryServices: CategoryService,
    private priorityServices: PriorityService,
    private taskServices: TaskService,
    private delDialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.task = this.data[0]; // задача для редактирования/создания
    this.dialogTitle = this.data[1]; // текст для диалогового окна
    this.operType = this.data[2];
    // инициализация начальных значений (записывам в отдельные переменные
    // чтобы можно было отменить изменения, а то будут сразу записываться в задачу)
    this.tmpTitle = this.task.title;
    this.tmpCategory = this.task.category;
    this.tmpPriority = this.task.priority;
    this.tmpDate=this.task.date;
    this.categoryServices.getAll().subscribe(item => this.categories = item);
    this.priorityServices.getAll().subscribe(item => this.priorities = item);
  }

  // нажали ОК
  public OnConfirm(): void {

    // считываем все значения для сохранения в поля задачи
    this.task.title = this.tmpTitle;
    this.task.category = this.tmpCategory;
    this.task.priority = this.tmpPriority;
    this.task.date = this.tmpDate;
    // передаем добавленную/измененную задачу в обработчик
    // что с ним будут делать - уже на задача этого компонента
    this.dialogRef.close(this.task);

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
        message: 'Вы действительно хотите удалить задачу "${this.task.title}"?'
      },
      autoFocus: false
    });
    dialog.afterClosed().subscribe(result => {
      if (result) {// если нажали ОК и есть результат   
        this.dialogRef.close('delete');//нажали удалить
      }
    });
  }
  public OnUpdateStatus() {
    if (this.task.status) {
      this.task.status=false;
      this.dialogRef.close(this.task);//нажали активоровать задачу 
    }
    else {
      this.task.status=true;
      this.dialogRef.close(this.task);//нажали удалить
    }
  }
  public CanDelete():Boolean{
    return this.operType===OperType.EDIT
  }

}
