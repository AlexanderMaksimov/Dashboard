import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { zip } from 'rxjs/internal/observable/zip';
import { Category } from './model/Category';
import { Priority } from './model/Priority';
import { Task } from './model/Task';
import { concatMap, delay, map, mergeMap } from 'rxjs/operators';
import { IntroService } from './services/Intro.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { TaskService } from './services/DataAPI/ImplementationService/TaskService.service';
import { CategoryService } from './services/DataAPI/ImplementationService/CategoryService';
import { PriorityService } from './services/DataAPI/ImplementationService/PriorityService.service';
import { TasksComponent } from './views/tasks/tasks.component';
import { TaskSearchValues } from './services/DataAPI/search/TaskSearchValues';
import { SearchValues } from './services/DataAPI/search/SearchValues';
import { StatService } from './services/DataAPI/ImplementationService/StatService.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Dashboard';
  public tasks: Task[];
  public categories: Category[];
  public selectedCategory: Category;
  public selectTask: Task;
  public priorities: Priority[];

  //public searchTaskText: string;
  //public searchStatusFilter: boolean;
  public searchPriority: Priority;
  public totalTasksInCategory: number;
  public completeTasksInCategory: number;
  public allUncomplitedCount: number;
  public totalCount: number;
  public viewStat: boolean;

  public categorySearchValues: SearchValues;
  public taskSearchValues:TaskSearchValues;
  public totalTaskFounded:number
  // параметры бокового меню с категориями
  public menuOpened: boolean; // открыть-закрыть
  public menuMode: string; // тип выдвижения (поверх, с толканием и пр.)
  public menuPosition: string; // сторона
  public showBackdrop: boolean; // показывать фоновое затемнение или нет

  protected deviceInfo:any;//инфа про устройства
  protected isMobile:boolean;
  protected isTablet:boolean;
  constructor(private taskService: TaskService,
    private statService: StatService,
    private categoryService: CategoryService,
    private priorityService: PriorityService,
    private introService: IntroService,
    private deviceService: DeviceDetectorService) {
      this.deviceInfo = this.deviceService.getDeviceInfo();
       this.isMobile = this.deviceService.isMobile();
       this.isTablet = this.deviceService.isTablet();
      const isDesktopDevice = this.deviceService.isDesktop();
      console.log(this.deviceInfo);
      this.viewStat=true?this.isMobile:false;
      this.setMenuValues();
     }//deviceService для определения типа устройства

  ngOnInit(): void {
  //  this.taskService.getAll().subscribe(z => this.tasks = z);
    this.categoryService.getAll().subscribe(z =>{
       this.categories =z;
       let uncompletedCount=0;
     // for (let item of this.categories)
     // {
     //   uncompletedCount+=item.uncompletedCount
     // }
     this.categories.filter(z=>uncompletedCount+=z.uncompletedCount);
    this.allUncomplitedCount=uncompletedCount;
      });
    this.priorityService.getAll().subscribe(z => this.priorities = z)
    this.selectedCategory = null;
    this.taskSearchValues=new TaskSearchValues();
    this.taskSearchValues.completed=null;
    this.categorySearchValues= new SearchValues();
    // заполнить меню с категориями
    //this.FillCategories();
   // this.UpdateTasksAndStat();
            // для мобильных и планшетов - не показывать интро
            if (!this.isMobile && !this.isTablet) {
              // пробуем показать приветственные справочные материалы
              this.introService.startIntroJS(true);
            }
     this.UpdateTasksAndStat();
  }

  //Выбранная категория
  public OnSelectCategory(category: Category) 
  {
   if(category==null)
   {
     this.taskService.getAll().subscribe(z => this.tasks = z);
   }
    this.selectedCategory = category;
   // let searchFilter:TaskSearchValues= new TaskSearchValues();
   // this.taskSearchValues.categoryId=this.selectedCategory.id;
   // this.taskService.search(this.taskSearchValues).subscribe(z => this.tasks = z);
    this.UpdateTasksAndStat();
  }

  //паказать все категории
  public FillCategories() {
    this.categoryService.getAll().subscribe(result=>{this.categories=result;})
    let uncompletedCount=0;
    if(this.categories!=null)
    { 
      for (let item of this.categories){
          uncompletedCount+=item.uncompletedCount
      }
    }
    //this.categories.some(z=>uncompletedCount+=z.uncompletedCount);
    //this.categories.filter(z=>uncompletedCount+=z.uncompletedCount);
    this.allUncomplitedCount=uncompletedCount;
   // if (this.categoryMap) {
    //  this.categoryMap.clear();
   // }
    //сортируем по алфавиту
  //  this.categories = this.categories.sort((a, b) => a.title.localeCompare(b.title));
    //для категории подсчитать колличество невыполненных задач 
  //  this.categories.forEach(z => {
     // this.taskService.getUncomplitedCountInCategory(z).subscribe(count => this.categoryMap.set(z, count));
   // })
   let tr=this.categories
  }

  // поиск категории
  public OnSearchCategory(searhValues: SearchValues): void {
    this.categorySearchValues = searhValues;
    //let searhFilter= new SearchValues();
   // searhFilter.text=title;
    this.categoryService.search(searhValues).subscribe(categories => {
      this.categories = categories;
     // this.FillCategories();
    });
  }

  public OnUpdateCategory(category: Category) {
    this.categoryService.update(category).subscribe(() => {
      this.OnSearchCategory(this.categorySearchValues);
    });
  }

  public OnDeleteCategory(category: Category) {
    this.categoryService.delete(category.id).subscribe(z => {
      this.selectedCategory = null; // открываем категорию "Все"
      //this.categoryMap.delete(z); // не забыть удалить категорию из карты
      this.OnSearchCategory(this.categorySearchValues);
      this.UpdateTasksAndStat();
    })
  }
  public SearhTasks(taskSearch: TaskSearchValues) {
    this.taskSearchValues = taskSearch;
    this.UpdateTasksAndStat();
  }

  public OnFilterByTitle(text: string) {
    this.taskSearchValues.title = text;
    this.UpdateTasksAndStat();
  }

  public OnFilterByStatus(value: number) {
    this.taskSearchValues.completed= value;
    this.UpdateTasksAndStat();
  }

  public OnFilterByPriority(priority: Priority) {
   this.searchPriority==undefined?null:priority.id
    this.UpdateTasksAndStat();
  }

  private UpdateTasksAndStat() {
    this.taskSearchValues.categoryId=this.selectedCategory==(undefined||null)?null:this.selectedCategory.id;
    this.taskSearchValues.priorityId =this.searchPriority==undefined?null:this.searchPriority.id
    //let taskFilter=new TaskSearchValues();
    //this.taskSearchValues.title==undefined?null:this.searchTaskText;
    //taskFilter.completed=this.searchStatusFilter==true?1:0
   // taskFilter.priorityId=this.searchPriority==undefined?null:this.searchPriority.id
    this.taskService.search(this.taskSearchValues).subscribe((result=> {
      this.totalTaskFounded=result.totalElements;//сколько данных показывается на странице
      this.tasks=result.content;
    }));
    let uncompletedCount=0;
    if(this.categories!=null)
    { 
      for (let item of this.categories)
      {
        uncompletedCount+=item.uncompletedCount
      }   
    //this.categories.some(z=>uncompletedCount+=z.uncompletedCount);
    //this.categories.filter(z=>uncompletedCount+=z.uncompletedCount);
    this.allUncomplitedCount=uncompletedCount;
    }
    //this.UpdateStat();
  }
  
  public OnAddTask(task: Task) {

    this.taskService.add(task).pipe(// сначала добавляем задачу
      concatMap(task => { // используем добавленный task (concatMap - для последовательного выполнения)
        // .. и считаем кол-во задач в категории с учетом добавленной задачи
        return this.categoryService.getUncompletedCountInCategory(task.category).pipe(map(count => {
          return ({ t: task, count }); // в итоге получаем массив с добавленной задачей и кол-вом задач для категории
        }));
      }
      )).subscribe(result => {

        const t = result.t as Task;

        // если указана категория - обновляем счетчик для соотв. категории
        if (t.category) {
         // this.categoryMap.set(t.category, result.count);
        }

        this.UpdateTasksAndStat();

      });
  }

  public OnUpdateTask(task: Task) {
   // let searhFilter=new TaskSearchValues();
   // searhFilter.categoryId=this.selectedCategory==(undefined||null)?null:this.selectedCategory.id;
    this.taskService.update(task).subscribe(() => {
      //this.taskService.search(this.taskSearchValues)
       // .subscribe(z => { this.tasks = z; });
        this.UpdateTasksAndStat()
    })
    //this.UpdateTasksAndStat()
  }

  public OnDeleteTask(task: Task) {
    this.taskService.delete(task.id).pipe(
      concatMap(t => {
        return this.categoryService.getUncompletedCountInCategory(t.category).pipe(map((count: any) => {
          return ({ t, count });
        }));
      }
      )).subscribe(result => {
        const t = result.t as Task;
       // this.categoryMap.set(t.category, result.count);
        this.UpdateTasksAndStat();
      });
  }

  public OnAddCategory(category: Category) {
    this.categoryService.add(category).subscribe(() => {
      this.categoryService.getAll().subscribe(z => { this.categories = z; });
    })
  }

  public OnTotalTasksInCategory() {
    let t= this.statService.getAll();
   // this.taskService.getTotalCountInCategory(this.selectedCategory).subscribe(z => this.totalTasksInCategory = z);
  }

  ///обновить статистику
  public UpdateStat() {
    /* zip(
      this.taskService.getTotalCountInCategory(this.selectedCategory),
      this.taskService.getComplitedCountInCategory(this.selectedCategory),
      // this.taskDataHandler.GetCompletedCount(this.SelectedCategory),
      this.taskService.getTotalCount(),
      this.taskService.getComplitedCountInCategory(null))
      .subscribe(array => {
        this.totalTasksInCategory = array[0];
        this.completeTasksInCategory = array[1];
        //  this.uncompletedCountInCategory = array[2];
        this.totalCount = array[2]; // нужно для категории Все
        this.allUncomplitedCount = array[2] - array[3];
      }); */
  }     // если закрыли меню любым способом - ставим значение false
       public onClosedMenu() {
         this.menuOpened = false;
        
     }


  // параметры меню
  public setMenuValues() {

    this.menuPosition = 'left'; // меню слева

    // настройки бокового меню для моб. и десктоп вариантов
    if (this.isMobile) {
        this.menuOpened = false; // на моб. версии по-умолчанию меню будет закрыто
        this.menuMode = 'over'; // поверх всего контента
        this.showBackdrop = true; // показывать темный фон или нет (нужно для мобильной версии)
    } else {
        this.menuOpened = true; // НЕ в моб. версии  по-умолчанию меню будет открыто (т.к. хватает места)
        this.menuMode = 'push'; // будет "толкать" основной контент, а не закрывать его
        this.showBackdrop = false; // показывать темный фон или нет
    }

  }

  // показать-скрыть меню
  public viewMenu() {
      this.menuOpened = !this.menuOpened;
  }
  public Paging(pageEvent:PageEvent){
    if(this.taskSearchValues.pageSize!=pageEvent.pageSize)
    {
      this.taskSearchValues.pageNumber=0
    }
    else
    {
      this.taskSearchValues.pageNumber=pageEvent.pageIndex;
    }
    this.taskSearchValues.pageSize=pageEvent.pageSize;
    this.taskSearchValues.pageNumber=pageEvent.pageIndex;
    this.UpdateTasksAndStat();

  }

}
