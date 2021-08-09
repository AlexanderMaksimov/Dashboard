import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeviceDetectorService } from 'ngx-device-detector';
import { TestData } from 'src/app/data/TestData';
import { EditCategoryDialogComponent } from 'src/app/dialog/edit-category-dialog/edit-category-dialog.component';
import { OperType } from 'src/app/dialog/OperType';
import { Category } from 'src/app/model/Category';
import { Task } from 'src/app/model/Task';
import { SearchValues } from 'src/app/services/DataAPI/search/SearchValues';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {

  public categories: Category[];
  public indexMouseMove: number; // для отображения иконки редактирования при наведении на категорию
  public searchCategoryText: string; // текущее значение для поиска категорий
 // public selectedCategoryMap: Map<Category, number>; // список всех категорий и кол-во активных задач
  public allUncomplitedCount: number; // колличество всех 
  public isMobile: boolean;
   // параметры поиска категорий
   categorySearchValues: SearchValues;

  @Input('AllUncomplitedCount')
  public set SetAllUncomplitedCount(count: number) {
    this.allUncomplitedCount = count;
  }
  @Input('Categories')
  public set SetCategories(categories: Category[]) {
    this.categories = categories;
  }
  @Input('CurrentCategory')
  public set SetSelectedCategory(category: Category) {
    this.SelectedCategory = category;
  }
  @Input('categorySearchValues')
  set setCategorySearchValues(categorySearchValues: SearchValues) {
      this.categorySearchValues = categorySearchValues;
  }
  // категории с кол-вом активных задач для каждой из них
  // @Input('СategoryMap')
  // set setCategoryMap(categoryMap: Map<Category, number>) {
  //   this.selectedCategoryMap = categoryMap;
  // }
  public SelectedCategory: Category = null;
  public filterTitle: string= null;

  public filterChanged: boolean; // были ли изменения в параметре поиска
// ----------------------- исходящие действия----------------------------
  @Output()
  public SelectCategory = new EventEmitter<Category>();
  @Output()
  public UpdateCategory = new EventEmitter<Category>();
  @Output()
  public DeleteCategory = new EventEmitter<Category>();
  @Output()
  public AddCategory = new EventEmitter<Category>();
  @Output()
  public SearchCategory = new EventEmitter<SearchValues>();

  constructor(
     private dialog: MatDialog,
     private deviceService: DeviceDetectorService) {
      this.isMobile = this.deviceService.isMobile();
  }

  public ShowTasksByCategory(category: Category) {
    // this.selectedCategory=category;
    //this.dataHandlerService.GetTasksByCategory(category);
    if (this.SelectedCategory === category) {
      return;
    }
    this.SelectedCategory = category;
    this.SelectCategory.emit(this.SelectedCategory);
  }
  /**
   * name
   */
  public ShowAllTasks() {
    this.SelectedCategory = null;
    this.SelectCategory.emit(this.SelectedCategory);
  }
  ngOnInit() {
    // this.categoryDataHandlerService.GetAll();
  }

  /**
   * ShowEditIcon
index:number   */
  public ShowEditIcon(index: number) {
    this.indexMouseMove = index;
  }
  public OpenEditDialog(category: Category) {
    let dialog = this.dialog.open(EditCategoryDialogComponent, { data: [category, 'Update category', OperType.EDIT], autoFocus: false });
    dialog.afterClosed().subscribe(result => {

      if (result === 'delete') {
        this.DeleteCategory.emit(category);
        return;
      }
      if (result as Task) {// если нажали ОК и есть результат
        this.UpdateCategory.emit(category);
        return
      }
    });
  }

  /**
   * name
   */
  public OnAddCategory() {
    let category = new Category(null, '', '')
    let dialog = this.dialog.open(EditCategoryDialogComponent, { data: [category, 'Update category', OperType.ADD], autoFocus: false });
    dialog.afterClosed().subscribe(result => {

      if (result as Task) {// если нажали ОК и есть результат
        this.AddCategory.emit(category);
        return
      }
    });
  }
  public OnFilterByCategory() {
  //  this.SearchCategory.emit(this.searchCategoryText);
  }

      // поиск категории
  public  Search() {
        this.filterChanged = false; // сбросить
        if (!this.categorySearchValues) { // если объект с параметрами поиска непустой
            return;
        }
        this.categorySearchValues.text = this.filterTitle;
        this.SearchCategory.emit(this.categorySearchValues);
    }

  public  ClearAndSearch() {
      this.filterTitle = null;
      this.Search();
  }
   // проверяет, были ли изменены какие-либо параметры поиска (по сравнению со старым значением)
   public CheckFilterChanged() {

    this.filterChanged = false;

    if (this.filterTitle !==(this.categorySearchValues==undefined?null: this.categorySearchValues.text)){
        this.filterChanged = true;
    }

    return this.filterChanged;

}

}
