import { Component, OnInit, Optional, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ILightData } from '../../classes/dataFormat';
import { DataService } from '../../services/data.service';
import { FormGroup, FormControl, Validators, Validator } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';

@Component({
  selector: 'app-light-dialog-modal',
  templateUrl: './light-dialog-modal.component.html',
  styleUrls: ['../modal.scss'],
})
export class LightDialogModalComponent implements OnInit {

  @Input() public data;
  @Input() public group;

  lightForm = new FormGroup({
    lightspectrum: new FormControl('', [Validators.maxLength(14)]),
  });

  public light: ILightData;

  lightOn = true;



  spectrumlist;
  drawerlist = [10, 20, 30];

  constructor(
    public lightDialogRef: MatDialogRef<LightDialogModalComponent>,
    public dataService: DataService
  ) { }

ngOnInit() {

  if (
    (this.data) && (
    this.data.photoperiod.day === 0 ||
    this.data.lightintensity === 0 ||
    this.data.lightSpectrum === 'OFF'
    )
    ) {
      this.lightOn = false;
    }


  this.spectrumlist = ['Red', 'Blue', 'RedAndBlue', 'Purple', 'White'];

  this.getStarterValue();
  }

  getStarterValue() {
    for (const item of this.dataService.light) {
      if (item.pid === this.data.pid) {
        const app = {
          pid: this.data.pid,
          photoperiod: {
            day: item.photoperiod.day,
            night: item.photoperiod.night
          },
          lightintensity: item.lightintensity,
          drawerdistance: item.drawerdistance,
          lightspectrum: item.lightspectrum,
        };
        this.light = app;
        return;
      }
    }
    const appo = {
      pid: this.data.pid,
      photoperiod: {
        day: 16,
        night: 8,
      },
      lightintensity: 500,
      drawerdistance: 20,
      lightspectrum: 'White',
    };
    this.light = appo;
  }

  setLightOn() {
    if (this.lightOn === true) {
      this.light.photoperiod.day = 720;
      this.light.photoperiod.night = 720;
      this.light.lightspectrum = 'White';
      this.lightForm.value.lightspectrum = 'White';
      this.light.lightintensity = 200;
    } else {
      this.light.photoperiod.day = 0;
      this.light.photoperiod.night = 1440;
      this.light.lightspectrum = 'OFF';
      this.light.lightintensity = 0;
      this.lightForm.value.lightspectrum = 'OFF';
    }
  }


  submit() {
    if (this.lightForm.value.lightspectrum !== '') {
      this.light.lightspectrum = this.lightForm.value.lightspectrum;
    }

    let add = true;
    for (const i of this.dataService.light) {
      if (i.pid === this.data.pid) {
        if (i.photoperiod.day === this.light.photoperiod.day &&   // just checked day, night is module 24 with day
          i.lightintensity === this.light.lightintensity &&
          i.drawerdistance === this.light.drawerdistance &&
          i.lightspectrum === this.light.lightspectrum) {
            add = false;
          }
      }
    }
    if (add === true) {
      this.dataService.addLight(this.light);
    }

    this.lightDialogRef.close(this.light);
  }


  close() {
    const me = this;
    me.lightDialogRef.close();
  }


  setDay(t) {
    if (t.source) {
      this.light.photoperiod.day = t.value * 60;
    } else {
      if (t.srcElement.value <= 0) {
        this.light.photoperiod.day = 0;
      } else if (t.srcElement.value >= 24) {
        this.light.photoperiod.day = 1440;
      } else {
        this.light.photoperiod.day = t.srcElement.value * 60;
      }
    }
    this.light.photoperiod.night = 1440 - this.light.photoperiod.day;
  }
  setNight(t) {
    if (t.source) {
      this.light.photoperiod.night = t.value * 60;
    } else {
      if (t.srcElement.value <= 0) {
        this.light.photoperiod.night = 0;
      } else if (t.srcElement.value >= 24) {
        this.light.photoperiod.night = 1440;
      } else {
        this.light.photoperiod.night = t.srcElement.value * 60;
      }
    }
    this.light.photoperiod.day = 1440 - this.light.photoperiod.night;
  }
  setIntensity(t) {
    if (t.source) {
      this.light.lightintensity = t.value;
    } else {
      if (t.srcElement.value <= 0) {
        this.light.lightintensity = 0;
      } else if (t.srcElement.value >= 500) {
        this.light.lightintensity = 500;
      } else {
        this.light.lightintensity = t.srcElement.value;
      }
    }
  }
  setDist(t) {
    if (t.source) {
      this.light.drawerdistance = t.value;
    } else {
      if (t.srcElement.value < 5) {
        this.light.drawerdistance = 0;
      }
      if (15 > t.srcElement.value && t.srcElement.value >= 5) {
        this.light.drawerdistance = 10;
      }
      if (25 > t.srcElement.value && t.srcElement.value >= 15) {
        this.light.drawerdistance = 20;
      }
      if (t.srcElement.value >= 25) {
        this.light.drawerdistance = 30;
      }
    }
  }
}


