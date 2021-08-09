// import { Injectable } from '@angular/core';
// import { BehaviorSubject } from 'rxjs';
// import { TestData } from '../data/TestData';
// import { Category } from '../model/Category';
// import { Task } from '../model/Task';

// @Injectable({
//   providedIn: 'root'
// })
// export class DataHandlerService {

//   public tasksSubject = new BehaviorSubject<Task[]>(TestData.Tasks);
//   public categorySubject = new BehaviorSubject<Category[]>(TestData.Categories);
  
//   public GetCategories() {
//     this.categorySubject.next(TestData.Categories)
//   }
//   public GetTasks() {
//     let tasks = TestData.Tasks;
//     this.tasksSubject.next(tasks);
//   }  
//   public GetTasksByCategory(category: Category) {
//     let tasks = TestData.Tasks.filter(task => task.category === category);
//     this.tasksSubject.next(tasks);
//   }
//   public CheckStatus(task: Task) {
//     let tasks=this.tasksSubject.value
//     tasks.forEach(element => {
//       if(element.id===task.id)
//       {element.status=!element.status;}
//     });
//     this.tasksSubject.next(tasks);
//   }
// }

