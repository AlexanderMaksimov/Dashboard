import { Observable } from 'rxjs';

//все меьоды возврвщают Observable для асинхронности и работы в реактивном стиле
export interface ICommon<T> {

    getAll():Observable<T[]>;
    get(id:number):Observable <T>;
    add(item:T):Observable <T>;
    update(item:T):Observable <T>;
    delete(id:number):Observable <T>;
}
