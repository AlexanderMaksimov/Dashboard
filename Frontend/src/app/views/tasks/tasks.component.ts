import { AfterViewInit, Component, EventEmitter, Input, Output, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, MatSortHeader } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from 'src/app/dialog/confirm-dialog/confirm-dialog.component';
import { EditTaskDialogComponent } from 'src/app/dialog/edit-task-dialog/edit-task-dialog.component';
import { Category } from 'src/app/model/Category';
import { Priority } from 'src/app/model/Priority';
import { Task } from 'src/app/model/Task';
import {DeviceDetectorService} from "ngx-device-detector";
import { TaskSearchValues } from 'src/app/services/DataAPI/search/TaskSearchValues';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit, AfterViewInit {

  public tasks: Task[];
  public priorities:Priority[];
  public selectedCategory: Category;
  //public dialog: MatDialog;
  public isMobile: boolean;
  
  //текущие задачи для отображения на странице
  @Input('Tasks')
  public set SetTasks(tasks: Task[]) {
    this.tasks = tasks;
    this.fillrefreshTable();
  }

  @Input('Priorities')
  public set SetPriorities(priorities: Priority[]) {
    this.priorities = priorities;
  }

  //сколько всего найдено задач
  @Input('TotalTaskFounded')
  public set SetTotalTaskFounded(totalTaskFounded:number){
  this.totalTaskFounded=totalTaskFounded;
  }
  
  @Input('TaskSearchValues')
  public set SetTaskSearchValues(taskSearchValues:TaskSearchValues){
    this.taskSearchValues=taskSearchValues;
  } 

  @Output()
  public UpdateTask = new EventEmitter<Task>();
  @Output()
  public DeleteTask = new EventEmitter<Task>();
  @Output()
  public СhooseCategoryE = new EventEmitter<Category>();

  @Output()
  public TaskSearch = new EventEmitter<TaskSearchValues>();

  @Output()
  public FilterByStatus = new EventEmitter<number>();
  
  @Output()
  public FilterByPriority = new EventEmitter<Priority>();

  @Output()
  public AddTask=new EventEmitter<Task>();

  @Output()
  public Paging=new EventEmitter<PageEvent>();
  // поиск
  public filterTitle: string; // текущее значение для поиска задач
  public selectedStatusFilter: number = null;   //null-все по-умолчанию будут показываться задачи по всем статусам (решенные и нерешенные)
  public selectedPriorityFilter: Priority = null;   // по-умолчанию будут показываться задачи по всем статусам (решенные и нерешенные)
  public taskSearchValues: TaskSearchValues;
  // поля для таблицы (те, что отображают данные из задачи - должны совпадать с названиями переменных класса)
  public displayedColumns: string[] = ['color', 'id', 'title', 'date', 'priority', 'category', 'operations', 'select'];
  public dataSource: MatTableDataSource<Task>; // контейнер - источник данных для таблицы
  public totalTaskFounded:number;
  public filterChanged: boolean; // были ли изменения в параметре поиска
  //ссылки на компоненты таблицы декоратор
  @ViewChild(MatPaginator, { static: false }) private paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) private sort: MatSort;


  constructor(private dialog: MatDialog,
    private deviceService: DeviceDetectorService) {
     this.isMobile = this.deviceService.isMobile();
 }

  public CheckStatus(task: Task) {
    //toggleTaskCompleted
    // this.dataHandlerService.CheckStatus(task);
  }

  ngOnInit() {
    // датасорс обязательно нужно создавать для таблицы, в него присваивается любой источник (БД, массивы, JSON и пр.)
    this.dataSource = new MatTableDataSource();
    this.taskSearchValues=new TaskSearchValues();
    this.fillrefreshTable();// заполняем таблицы данными (задачи) и всеми метаданными
  }

  ngAfterViewInit(): void {
    //throw new Error('Method not implemented.');
    this.addTableObjects()
  }

  // в зависимости от статуса задачи - вернуть цвет названия
  public getPriorityColor(task: Task): string {

    if (task.completed==1) {
      return '#0000e6'
    }
    if (task.priority && task.priority.color) {
      return task.priority.color;
    }

    return '#fff';

  }

  // показывает задачи с применением всех текущий условий (категория, поиск, фильтры и пр.)
  public fillrefreshTable(): string {

    if (!this.dataSource) {
      return;
    }

    this.dataSource.data = this.tasks; // обновить источник данных (т.к. данные массива tasks обновились)
    this.addTableObjects();
    // когда получаем новые данные..
    // чтобы можно было сортировать по столбцам "категория" и "приоритет", т.к. там не примитивные типы, а объекты
    // @ts-ignore - показывает ошибку для типа даты, но так работает, т.к. можно возвращать любой тип
    this.dataSource.sortingDataAccessor = (task, colName) => {

      // по каким полям выполнять сортировку для каждого столбца
      switch (colName) {
        case 'priority': {
          return task.priority ? task.priority.id : null;
        }
        case 'category': {
          return task.category ? task.category.title : null;
        }
        case 'date': {
          return task.date ? task.date : null;
        }

        case 'title': {
          return task.title;
        }
      }
    };
  }

  public addTableObjects(): void {
    this.dataSource.sort = this.sort;//компонент для сортировки данных(если необходимо)
    this.dataSource.paginator = this.paginator;//обновить компонент постраничности (кол-во записей, страниц)
  }
  // диалоговое редактирования для добавления задачи
  public OpenEditTaskDialog(task: Task): void {
    let dialog = this.dialog.open(EditTaskDialogComponent, { data: [task, 'Update task'], autoFocus: false });
    dialog.afterClosed().subscribe(result => {

      if (result === 'delete') {
        this.DeleteTask.emit(task);
        return;
      }
      if (result as Task) {// если нажали ОК и есть результат
        this.UpdateTask.emit(task);
        return
      }
    });
  }
  public OpenDeleteDialog(task: Task) {
    let mes='Вы действительно хотите удалить задачу '+ task.title +' ?';
    let dialog = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '500px',
      data: {
        dialogTitle: "Сonfirm action",
        message: mes},autoFocus: false
    });
    dialog.afterClosed().subscribe(result => {
      if (result) {// если нажали ОК и есть результат   
        this.DeleteTask.emit(task);//нажали удалить
      }
    });
  }

  public OnToggleStatus(task: Task) {
    task.completed==0?1:0;
   // task.completed = task.completed;
    this.UpdateTask.emit(task);
  }

  public ChooseCategory(task: Task) {
    this.selectedCategory=task.category;
    this.СhooseCategoryE.emit(task.category);
  }
  // фильтрация по названию
  public OnFilterByTitle() {
    this.taskSearchValues.sortColumn='title';
    this.Search();
    //this.FilterByTitle.emit(this.filterTitle);
  }
  // фильтрация по статусу
  public OnFilterByStatus(value: number) {

    // на всякий случай проверяем изменилось ли значение (хотя сам UI компонент должен это делать)
    if (value !== this.selectedStatusFilter) {
      this.selectedStatusFilter = value;
      this.taskSearchValues.sortColumn='status';
      this.Search();
      //this.FilterByStatus.emit(this.selectedStatusFilter);
    }
  }

  public OnFilterByPriority(priority:Priority) {
    this.selectedPriorityFilter=priority;
    this.taskSearchValues.sortColumn='priority';
    this.Search();
    //this.FilterByPriority.emit(this.selectedPriorityFilter);
  }

  public OpenAddTaskDialog()
  {
    let task=new Task(null,'',0,null,this.selectedCategory);
    let dialog = this.dialog.open(EditTaskDialogComponent, { data: [task, 'Add task'], autoFocus: false });
    dialog.afterClosed().subscribe(result => {
      if (result) {// если нажали ОК и есть результат
        this.AddTask.emit(task);
        return
      }
    });
  }

  // в зависимости от статуса задачи - вернуть фоноввый цвет
  public GetMobilePriorityBgColor(task: Task) {

    if (task.priority != null && task.completed==0) {
        return task.priority.color;
    }

    return 'none';
}
public pageChanged(pageEvent:PageEvent){
  this.Paging.emit(pageEvent);
}

     // поиск категории
public  Search() {
  this.filterChanged = false; // сбросить
  if (!this.taskSearchValues) { // если объект с параметрами поиска непустой
      return;
  }
      this.taskSearchValues.title = this.filterTitle;
      this.TaskSearch.emit(this.taskSearchValues);
  }

public  ClearAndSearch() {
    this.filterTitle = null;
    this.Search();
}
 // проверяет, были ли изменены какие-либо параметры поиска (по сравнению со старым значением)
 public CheckFilterChanged() {

  this.filterChanged = false;

  if (this.filterTitle !==(this.taskSearchValues==undefined?null: this.taskSearchValues.title)){
      this.filterChanged = true;
  }

  return this.filterChanged;

}

}
