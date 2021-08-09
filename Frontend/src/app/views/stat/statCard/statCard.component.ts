import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-statCard',
  templateUrl: './statCard.component.html',
  styleUrls: ['./statCard.component.css']
})
export class StatCardComponent implements OnInit {
  
  public countComplite :number|string; //можно передавать любой тип для отображения(число текст)
  public countTotal:any;
  public iconName:string;
  public status:boolean
  public title:string;

  @Input('title')
  public set SetTitle(title: string) {
    this.title = title;
  }
  @Input('countComplite')
  public set SetCountComplite(countComplite: number) {
    this.countComplite = countComplite;
  }
  @Input('countTotal')
  public set SetCountTotal(countTotal: number) {
    this.countTotal = countTotal;
  }
  @Input('status')
  public set SetStatus(status: boolean) {
    this.status = status;
  }
  @Input('iconName')
  public set SetIconName(iconName: string) {
    this.iconName = iconName;
  }
  constructor() { }

  ngOnInit() {
  }

}
