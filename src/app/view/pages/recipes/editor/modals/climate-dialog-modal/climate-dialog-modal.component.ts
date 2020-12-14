import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DataService } from '../../services/data.service';
import { IClimateData } from '../../classes/dataFormat';
import { Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-climate-dialog-modal',
  templateUrl: './climate-dialog-modal.component.html',
  styleUrls: ['../modal.scss'],
})
export class ClimateDialogModalComponent implements OnInit {

  @Input() public data;
  @Input() public group;

  public climate: IClimateData;

  temp = new FormControl('', [Validators.required, Validators.min(18), Validators.max(30)]);

  constructor(
    public climateDialogRef: MatDialogRef<ClimateDialogModalComponent>,
    public dataService: DataService
  ) { }

  ngOnInit() {
    this.getStarterValue();
  }

  getStarterValue() {
    for (const item of this.dataService.climate) {
      if (item.pid === this.data.pid) {
        const app = { pid: this.data.pid , temperature: item.temperature, humidity: item.humidity };
        this.climate = app;
        return;
      }
    }
    const appo = { pid: this.data.pid , temperature: 22, humidity: 50 };
    this.climate = appo;
  }

  submit() {
    let add = true;
    for (const i of this.dataService.climate) {
      if (i.pid === this.data.pid) {
        if (i.humidity === this.climate.humidity &&
          i.temperature === this.climate.temperature) {
            add = false;
          }
      }
    }
    if (add === true) {
      this.dataService.addClimate(this.climate);
    }

    this.climateDialogRef.close(this.climate);

  }


  close() {
    const me = this;
    me.climateDialogRef.close();
  }

  setTemp(t) {
    if (t.source) {
      this.climate.temperature = t.value;
    } else {
      if (t.srcElement.value <= 18) {
        this.climate.temperature = 18;
      } else if (t.srcElement.value >= 30) {
        this.climate.temperature = 30;
      } else {
        this.climate.temperature = t.srcElement.value;
      }
    }
  }
  setHum(h) {
    if (h.source) {
      this.climate.humidity = h.value;
    } else {
      if (h.srcElement.value <= 40) {
        this.climate.humidity = 40;
      } else if (h.srcElement.value >= 100) {
        this.climate.humidity = 100;
      } else {
        this.climate.humidity = h.srcElement.value;
      }
    }
  }
}
