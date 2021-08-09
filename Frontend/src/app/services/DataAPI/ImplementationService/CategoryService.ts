import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/model/Category';
import { ICategory } from '../Interface/ICategory';
import { SearchValues } from '../search/SearchValues';
import { CommonService } from './CommonService.service';

//глобальная переменная для хранения URL
export const CATEGORY_URL_TOKEN = new InjectionToken<string>('url')
@Injectable({
  providedIn: 'root'
})
export class CategoryService extends CommonService<Category> implements ICategory {

  // url:string="http://localhost:4201/category";
  
constructor(@Inject(CATEGORY_URL_TOKEN) protected baseUrl,protected httpClient:HttpClient) {
  super(baseUrl,httpClient);
}
  
  search(searhValues: SearchValues): Observable<any> {
    try{
      this.httpClient.post<Category[]>(this.baseUrl+'/search',searhValues).subscribe(x=> console.log(x));
      let val= this.httpClient.post<Category[]>(this.baseUrl+'/search',searhValues)
      return val;
    }
    catch(ex)
    { 
      //console.log(ex);
      let val=ex;
    }
  }
  getUncompletedCountInCategory(item: Category): Observable<number> {
    throw new Error('Method not implemented.');
  }
  

}
