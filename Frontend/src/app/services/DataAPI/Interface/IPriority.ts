import { Observable } from 'rxjs';
import { Category } from 'src/app/model/Category';
import { Priority } from 'src/app/model/Priority';
import { SearchValues } from '../search/SearchValues';
import { ICommon } from './ICommon';


export interface IPriority extends ICommon<Priority> {
    search (searchValues: SearchValues): Observable<any>;
}
