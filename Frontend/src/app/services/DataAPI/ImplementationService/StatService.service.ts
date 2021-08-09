import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { Stat } from 'src/app/model/Stat';
import { IStat } from '../Interface/IStat';
import { CommonService } from './CommonService.service';

//глобальная переменная для хранения URL
export const STAT_URL_TOKEN = new InjectionToken<string>('url')

@Injectable({
  providedIn: 'root'
})
export class StatService extends CommonService<Stat>  implements IStat  {
  //url:string="http://localhost:4201/stat";
  
  constructor(@Inject(STAT_URL_TOKEN) protected baseUrl,protected httpClient:HttpClient) {
    super(baseUrl,httpClient);
  }


}
