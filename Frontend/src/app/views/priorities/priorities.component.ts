import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/dialog/confirm-dialog/confirm-dialog.component';
import { EditPriorityDialogComponent } from 'src/app/dialog/edit-priority-dialog/edit-priority-dialog.component';
import { OperType } from 'src/app/dialog/OperType';
import { Priority } from 'src/app/model/Priority';

@Component({
  selector: 'app-priorities',
  templateUrl: './priorities.component.html',
  styleUrls: ['./priorities.component.css']
})
export class PrioritiesComponent implements OnInit {


  @Input()
  public priorities:  [Priority];

  @Output()
  public UpdatePriority = new EventEmitter<Priority>();
  @Output()
  public DeletePriority = new EventEmitter<Priority>();
  @Output()
  public AddPriority = new EventEmitter<Priority>();

  public priorityTitle: string;
  public d:string
  @Input()
  public updateTitle: boolean;

  constructor(private dialog: MatDialog // для открытия нового диалогового окна (из текущего
  ) { }

  ngOnInit() {
    this.updateTitle = true;
  }
  public OnDeletePriority(priorty: Priority) {
    let mes='Вы действительно хотите удалить приоритет '+ priorty.title +' ?';
    let dialog = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '500px',
      data: {
        dialogTitle: "Сonfirm action",
        message: mes
      },
      autoFocus: false
    });
    dialog.afterClosed().subscribe(result => {
      if (result) {// если нажали ОК и есть результат   
        this.DeletePriority.emit(priorty);//нажали удалить
      }
    });
  }

  public OnEditPriority(priority: Priority) {
    let dialog = this.dialog.open(EditPriorityDialogComponent, { data: [priority, 'Update priority',OperType.EDIT], autoFocus: true });
    dialog.afterClosed().subscribe(result => {

      if (result === 'delete') {
        this.DeletePriority.emit(priority);
        return;
      }
      if (result as Priority) {// если нажали ОК и есть результат
        this.UpdatePriority.emit(priority);
        return
      }
    });
  }
  public OnAddPriority() {
    let priority=new Priority(null,'','white');
    let dialog = this.dialog.open(EditPriorityDialogComponent, { data: [priority, 'Add priority',OperType.ADD], autoFocus: true });
    dialog.afterClosed().subscribe(result => {
      if (result) {// если нажали ОК и есть результат
        this.AddPriority.emit(priority);
        return
      }
    });
  }
  public OnConfirm() {

  }
}
