import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatTableModule} from '@angular/material/table';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CategoriesComponent } from './views/categories/categories.component';
//import { DataHandlerService } from './services/DataHandler.service';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { TasksComponent } from './views/tasks/tasks.component';
import { MatDialogModule} from '@angular/material/dialog';
import { EditTaskDialogComponent } from './dialog/edit-task-dialog/edit-task-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule} from '@angular/material/input';
import { MatIconModule} from '@angular/material/icon';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import { TaskDatePipe } from './pipe/taskDate.pipe';
import { MatCheckboxModule} from '@angular/material/checkbox'
import { EditCategoryDialogComponent } from './dialog/edit-category-dialog/edit-category-dialog.component';
import { FooterComponent } from './views/footer/footer.component';
import { HeaderComponent } from './views/header/header.component';
import { StatComponent } from './views/stat/stat.component';
import { StatCardComponent } from './views/stat/statCard/statCard.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { SettingsDialogComponent } from './dialog/settings-dialog/settings-dialog.component';
import { PrioritiesComponent } from './views/priorities/priorities.component';
import { EditPriorityDialogComponent } from './dialog/edit-priority-dialog/edit-priority-dialog.component';
import { ConfirmDialogComponent } from './dialog/confirm-dialog/confirm-dialog.component';
import { Sidebar, SidebarModule } from 'ng-sidebar';
import {DeviceDetectorService} from "ngx-device-detector";
import { HttpClientModule } from '@angular/common/http';
import { CATEGORY_URL_TOKEN } from './services/DataAPI/ImplementationService/CategoryService';
import { PRIORITY_URL_TOKEN } from './services/DataAPI/ImplementationService/PriorityService.service';
import { STAT_URL_TOKEN } from './services/DataAPI/ImplementationService/StatService.service';
import { TASK_URL_TOKEN } from './services/DataAPI/ImplementationService/TaskService.service';


//npm run start
registerLocaleData(localeRu); 

@NgModule({
  declarations: [
    AppComponent,
    CategoriesComponent,
    TasksComponent,
    EditTaskDialogComponent,
    EditCategoryDialogComponent,
    TaskDatePipe,
    FooterComponent,
    HeaderComponent,
    StatComponent,
    StatCardComponent,
    SettingsDialogComponent,
    PrioritiesComponent,
    EditPriorityDialogComponent,
    ConfirmDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatDialogModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatOptionModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    ColorPickerModule,
    SidebarModule,
    HttpClientModule
        
  ],
  providers: [
    DeviceDetectorService,
    { provide:CATEGORY_URL_TOKEN,
      useValue:"http://localhost:8080/category"},
    { provide:PRIORITY_URL_TOKEN,
      useValue:"http://localhost:8080/priority"},
    { provide:STAT_URL_TOKEN,
      useValue:"http://localhost:8080/stat"},
      { provide:TASK_URL_TOKEN,
        useValue:"http://localhost:8080/task"},
      
  ],
  
  entryComponents:[     
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
function forRoot(): any[] | import("@angular/core").Type<any> | import("@angular/core").ModuleWithProviders<{}> {
  throw new Error('Function not implemented.');
}

