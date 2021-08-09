import { Component, Input, OnInit } from '@angular/core';
import { StatCardComponent } from './statCard/statCard.component';

@Component({
  selector: 'app-stat',
  templateUrl: './stat.component.html',
  styleUrls: ['./stat.component.css']
})
export class StatComponent implements OnInit {
  public totalTasksInCategory:number;
  public completeTasksInCategory:number;
  public uncompleteTasksInCategory:number;
  
  @Input('TotalTasksInCategory')
  public set SetTotalTasksInCategory(totalTasksInCategory: number) {
    this.totalTasksInCategory = totalTasksInCategory;
  }

  @Input('CompleteTasksInCategory')
  public set SetCompleteTasksInCategory(completeTasksInCategory: number) {
    this.completeTasksInCategory = completeTasksInCategory;
    this.uncompleteTasksInCategory=this.totalTasksInCategory-this.completeTasksInCategory;
  }

  constructor() { }

  ngOnInit() {
  }

}
