import { ICategory } from './ICategory';
import { IPriority } from './IPriority';

export interface ITask{
   id: number;
   title: string;
   status: boolean;
   priority?: IPriority; //? необязательные параметры
   category?: ICategory;
   date?: Date;
}