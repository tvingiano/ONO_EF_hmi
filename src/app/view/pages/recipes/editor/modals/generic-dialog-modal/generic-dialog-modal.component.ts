import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DataService } from '../../services/data.service';
import { IGenericData } from '../../classes/dataFormat';

@Component({
  selector: 'app-generic-dialog-modal',
  templateUrl: './generic-dialog-modal.component.html',
  styleUrls: ['../modal.scss'],
})
export class GenericDialogModalComponent implements OnInit {

  @Input() public data;
  @Input() public group;

  show;

  public generic: IGenericData;

  constructor(
    public genericDialogRef: MatDialogRef<GenericDialogModalComponent>,
    public dataService: DataService
  ) { }

  ngOnInit() {
    this.getStarterValue();
  }

  getStarterValue() {
    for (const item of this.dataService.generic) {
      if (item.pid === this.data.pid) {
        const app = { pid: this.data.pid , periodduration : item.periodduration };
        this.generic = app;
        this.show = this.generic.periodduration / 1440;
        return;
      }
    }
    const appo = { pid: this.data.pid , periodduration : 2880};
    this.generic = appo;

    this.show = this.generic.periodduration / 60;
  }

  submit() {
    let add = true;
    for (const i of this.dataService.generic) {
      if (i.pid === this.data.pid) {
        if (i.periodduration === this.generic.periodduration ) {
            add = false;
          }
      }
    }
    if (add === true) {
      this.dataService.addGeneric(this.generic);
    }

    this.genericDialogRef.close(this.generic);
  }


  close() {
    const me = this;
    me.genericDialogRef.close();
  }

  setPeriod(period) {
    this.show = period.value;
    if (period.source) {
      this.generic.periodduration = period.value * 1440;
    } else {
      if (period.srcElement.value <= 1) {
        this.generic.periodduration = 1 * 1440;
      } else if (period.srcElement.value >= 31) {
        this.generic.periodduration = 31 * 1440;
      } else {
        this.generic.periodduration = period.srcElement.value * 1440;
      }
    }
  }



}
