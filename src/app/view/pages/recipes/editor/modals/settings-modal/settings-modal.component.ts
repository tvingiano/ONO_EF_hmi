import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DataService } from '../../services/data.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { IInfoData } from '../../classes/dataFormat';
import { DelModalComponent } from '../del-modal/del-modal.component';
import { emit } from 'process';
// import { constants } from 'buffer';

@Component({
  selector: 'app-settings-modal',
  templateUrl: './settings-modal.component.html',
  styleUrls: ['../modal.scss']
})
export class SettingsModalComponent implements OnInit {

  @Output() deleted: EventEmitter < IInfoData > = new EventEmitter < IInfoData > ();
  @Output() closeSett  = new EventEmitter ();

  @Input() public data;
  @Input() public group;

  settingsForm;

  settings: IInfoData;


  constructor(
    public settingsDialogRef: MatDialogRef<SettingsModalComponent>,
    public dataService: DataService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {

    for (const group of this.dataService.groups) {
      for (const item of group.items) {
        if (item.pid === this.data.pid) {
          this.settings = {pid: this.data.pid, group: group.gid, name: item.name, note: item.note};
        }
      }
    }

    this.settingsForm = new FormGroup({
      name: new FormControl(this.settings.name, [Validators.minLength(3), Validators.maxLength(14)]),
      note: new FormControl(this.settings.note)
    });
  }

  submit() {
    const name = this.settingsForm.value.name;
    const note = this.settingsForm.value.note;
    if (name) {
      this.settings.name = name;
    }
    if (note) {
      this.settings.note = note;
    }
    this.dataService.addSettings(this.settings);


    this.settingsDialogRef.close();
  }


  close() {
    const me = this;
    me.settingsDialogRef.close();
  }

  openDelTab() {
    const delDialogRef = this.dialog.open(DelModalComponent, {
      width: '350px',
    });
    delDialogRef.componentInstance.settings = this.settings;
    delDialogRef.afterClosed().subscribe(res => {

      // console.log(res);

      if (res === true) {
        let groupIndex;
        let itemIndex;

        for (const group of this.dataService.groups) {
          for (const item of group.items) {
            if (item.pid === this.settings.pid) {
              groupIndex = this.dataService.groups.indexOf(group);
              itemIndex = this.dataService.groups[groupIndex].items.indexOf(item);
              break;
            }
          }
        }

        this.dataService.groups[groupIndex].items.splice(itemIndex, 1);

        this.dataService.light = this.dataService.light.filter(x => x.pid !== this.settings.pid);
        this.dataService.climate = this.dataService.climate.filter(x => x.pid !== this.settings.pid);
        this.dataService.solution = this.dataService.solution.filter(x => x.pid !== this.settings.pid);
        this.dataService.generic = this.dataService.generic.filter(x => x.pid !== this.settings.pid);
        this.dialog.closeAll();
      }
      this.dataService.checkRecipe();
    });
  }

  incomplete() {

    for (const item of this.dataService.recipe) {
      if (item.pid === this.data.pid) {
        return false;
      }
    }
    return true;

  }

  save() {
    this.submit();
    this.settingsDialogRef.afterClosed().subscribe(x => {
      this.dataService.savePeriod(this.data.pid);
      this.dataService.checkRecipe();
    });

  }

}
