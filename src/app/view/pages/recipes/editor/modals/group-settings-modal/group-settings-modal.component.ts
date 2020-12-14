import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DataService } from '../../services/data.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { DelModalComponent } from '../del-modal/del-modal.component';

@Component({
  selector: 'app-group-settings-modal',
  templateUrl: './group-settings-modal.component.html',
  styleUrls: ['../modal.scss']
})
export class GroupSettingsModalComponent implements OnInit{

  @Input() public group;

  groupSettingsForm;

  title;
  stage;


  constructor(
    public settingsDialogRef: MatDialogRef<GroupSettingsModalComponent>,
    public dataService: DataService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.title = this.group.title;
    this.stage = this.group.stage;

    this.groupSettingsForm = new FormGroup({
      title: new FormControl(this.title, [Validators.minLength(3), Validators.maxLength(14)]),
      stage: new FormControl(this.stage),
    });
  }

  submit(){
    const groupIndex = this.dataService.groups.indexOf(this.group);
    const newTitle = this.groupSettingsForm.value.title;
    const newStage = this.groupSettingsForm.value.stage;


    this.group.title = newTitle;
    this.group.stage = newStage;

    this.dataService.groups[groupIndex] = this.group;
    this.settingsDialogRef.close(false);
  }


  close(){
    const me = this;
    me.settingsDialogRef.close(false);
  }

  delGroup(){
    const settings = {
      name: this.group.title
    };

    const dialogRef = this.dialog.open(DelModalComponent, {width: '300px'});
    dialogRef.componentInstance.settings = settings;
    dialogRef.afterClosed().subscribe(res => {
      if (res === true){
        this.settingsDialogRef.close(true);
      }else{
        this.settingsDialogRef.close(false);
      }
    });
  }

  incompleteG(){
    if (this.group.items.length === 0){
      return true;
    }else{
      return false;
    }
  }

  saveG(group){
    this.submit();
    this.settingsDialogRef.afterClosed().subscribe(x => {
      this.dataService.saveGroup(group);
    });
  }

}
