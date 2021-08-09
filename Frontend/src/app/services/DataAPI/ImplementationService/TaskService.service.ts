import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from 'src/app/model/Task';
import { ITask } from '../Interface/ITask';
import { TaskSearchValues } from '../search/TaskSearchValues';
import { CommonService } from './CommonService.service';

//глобальная переменная для хранения URL
export const TASK_URL_TOKEN = new InjectionToken<string>('url')

@Injectable({
  providedIn: 'root'
})
export class TaskService extends CommonService<Task>  implements ITask{
 // url:string ="http://localhost:4200/task"
 constructor(@Inject(TASK_URL_TOKEN) protected baseUrl,protected httpClient:HttpClient) {
  super(baseUrl,httpClient);
}

  search(taskSearchValues: TaskSearchValues): Observable<any> {
    let val= this.httpClient.post<Task[]>(this.baseUrl+'/search',taskSearchValues);
    return val;
  }
 
}
