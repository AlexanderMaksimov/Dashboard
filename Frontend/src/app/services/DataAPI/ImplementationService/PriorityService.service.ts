import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { Priority } from 'src/app/model/Priority';
import { IPriority } from '../Interface/IPriority';
import { SearchValues } from '../search/SearchValues';
import { CommonService } from './CommonService.service';

//глобальная переменная для хранения URL
export const PRIORITY_URL_TOKEN = new InjectionToken<string>('url')
@Injectable({
  providedIn: 'root'
})
export class PriorityService extends CommonService<Priority> implements IPriority {
  //url:string="http://localhost:4201/priority";

  constructor(@Inject(PRIORITY_URL_TOKEN) protected baseUrl,protected httpClient:HttpClient) {
    super(baseUrl,httpClient);
  }

  search(searchValues: SearchValues): Observable<any> {
    let val= this.httpClient.post<Priority[]>(this.baseUrl+'/search',searchValues);
    return val;
  }

}
