import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Priority } from 'src/app/model/Priority';
import { PriorityService } from 'src/app/services/DataAPI/ImplementationService/PriorityService.service';


@Component({
  selector: 'app-settings-dialog',
  templateUrl: './settings-dialog.component.html',
  styleUrls: ['./settings-dialog.component.css']
})
export class SettingsDialogComponent implements OnInit {

  public priorities :Priority[];
  constructor( private dialogRef: MatDialogRef<SettingsDialogComponent>, // для возможности работы с текущим диалог. окном
    private priorityService: PriorityService // ссылка на сервис для работы с данными
    ) { }

  ngOnInit() {
    // получаем все значения, чтобы отобразить настроку цветов
    this.priorityService.getAll().subscribe(priorities => this.priorities = priorities);
  }
  // нажали Закрыть
  public OnClose() {
    this.dialogRef.close(false);
  }
  public OnUpdatePriority(priority:Priority){
    this.priorityService.update(priority).subscribe();
  }
  public OnDeletePriority(priority:Priority){
    this.priorityService.delete(priority.id).subscribe();
  }
  public OnAddPriority(priority:Priority){
    this.priorityService.add(priority).subscribe();
  }
}
