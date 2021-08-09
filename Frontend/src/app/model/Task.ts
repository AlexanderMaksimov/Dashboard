import { Category } from './Category';
import { Priority } from './Priority';

export class Task{
  public id: number;
  public title: string;
  public completed: number;
  public priority?: Priority; //? необязательные параметры
  public category?: Category;
  public date?: Date;

  constructor(id: number,title: string,completed: number,priority?: Priority,category?: Category,date?: Date) {
    this.id = id;
    this.title = title;
    this.completed = completed;
    this.priority = priority;
    this.category = category;
    this.date = date;
   }
}