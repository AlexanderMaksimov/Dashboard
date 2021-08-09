import { Observable } from 'rxjs';
import { Category } from 'src/app/model/Category';
import { SearchValues } from '../search/SearchValues';
import { ICommon } from './ICommon';


export interface ICategory extends ICommon<Category>{

    search(categorySearhValues:SearchValues): Observable<any>;
    getUncompletedCountInCategory(item: Category): Observable<number>;
}
