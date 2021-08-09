import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

// преобразовывает дату в нужный текстовый формат
@Pipe({
  name: 'taskDate'
})
export class TaskDatePipe implements PipeTransform {

  transform(date: Date|string, format: string='mediumDate'): string {
    if(date==null){
      return 'без срока'
    }
    date= new Date(date);
    let currentDate=new Date().getDate()
    if(date.getDate()===currentDate){
      return 'сегодня'
    }
    if(date.getDate()===currentDate-1){
      return 'вчера'
    }
    if(date.getDate()===currentDate+1){
      return 'завтра'
    }
    return new DatePipe('ru-Ru').transform(date,format);//показывать дату в нужной локали
  }

}
