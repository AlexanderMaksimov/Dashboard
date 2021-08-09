import { Observable } from 'rxjs';
import { Category } from 'src/app/model/Category';
import { Priority } from 'src/app/model/Priority';
import { Task } from 'src/app/model/Task';
import { TaskSearchValues } from '../search/TaskSearchValues';
import { ICommon } from './ICommon';

export interface ITask extends ICommon<Task> {
    search(taskSearchValues: TaskSearchValues): Observable<any>;
    //поиск задач по всем параметрам 
    //Search(category: Category, searchText: string, status: boolean, priority: Priority): Observable<Task[]>;
    
    //колличество завершенных задая в заданной категории (null то для всех категорий)
  //  GetComplitedCountInCategory(category: Category): Observable<number>;

    //колличество незавершенных задая в заданной категории (null то для всех категорий)
   // GetUncomplitedCountInCategory(category: Category): Observable<number>;

    //колличество всех задач в заданной категории (null то для всех категорий)
   // GetTotalCountInCategory(category: Category): Observable<number>;

    //колличество всех задач в общем (null то для всех категорий)
  //  GetTotalCount( ): Observable<number>;
}
