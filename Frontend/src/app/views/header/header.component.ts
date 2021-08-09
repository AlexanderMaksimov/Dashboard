import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SettingsDialogComponent } from 'src/app/dialog/settings-dialog/settings-dialog.component';
import { Category } from 'src/app/model/Category';
import { IntroService } from 'src/app/services/Intro.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public categoryName: string;
  public viewStat: boolean;
  public buttonTitle: string;

  @Input('SelectedCategory')
  public set SetCategoryName(category: Category) {
    if (category === null)
      this.categoryName = "All";
    else
      this.categoryName = category.title;
  }

  @Output()
  public ViewStat = new EventEmitter<boolean>();
  @Output()
  public ViewMenu = new EventEmitter();

  constructor(private dialog: MatDialog, private introService: IntroService) { }

  ngOnInit() {
    this.buttonTitle = "показать статистику"
  }
  public ViewStatistic(value: boolean) {
    if (value)
      this.buttonTitle = "показать статистику"
    else
      this.buttonTitle = "скрыть статистику"
    this.viewStat = !this.viewStat;
    this.ViewStat.emit(this.viewStat);
  }

  public ShowSettings(){
    let dialogRef=this.dialog.open(SettingsDialogComponent,{autoFocus:false,width:'30%'});
  }
  public ShowHelp(){
  this.introService.startIntroJS(false);
  }
  public onToggleMenu() {
    this.ViewMenu.emit(); // показать/скрыть меню
}
}
