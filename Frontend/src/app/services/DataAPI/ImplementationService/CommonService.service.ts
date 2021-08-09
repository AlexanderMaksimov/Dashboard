import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICommon } from '../Interface/ICommon';

@Injectable({
  providedIn: 'root'
})
export class CommonService<T> implements ICommon<T>{

constructor(url:string,private commonHttpClient:HttpClient) {
  this.url=url;
 }
private url:string;

getAll(): Observable<T[]> {
  try{
    this.commonHttpClient.get<T[]>(this.url+'/all').subscribe(x=> console.log(x));
  let val= this.commonHttpClient.get<T[]>(this.url+'/all');
  //let val2= this.commonHttpClient.get("http://localhost:8080/priority/all").subscribe(x=> console.log(x))
  return val;
  }
  catch(ex)
  { 
    //console.log(ex);
    let val=ex;
  }
}
get(id: number): Observable<T> {
  let val= this.commonHttpClient.get<T>(this.url+'/id/'+id);
  return val;
}
add(item: T): Observable<T> {
 let val= this.commonHttpClient.post<T>(this.url+'/add',item);
  return val;
}
update(item: T): Observable<T> {
  let val= this.commonHttpClient.put<T>(this.url+'/update',item);
  return val;
}
delete(id: number): Observable<T> {
  let val= this.commonHttpClient.delete<T>(this.url+'/delete'+id);
  return val;
}
}
