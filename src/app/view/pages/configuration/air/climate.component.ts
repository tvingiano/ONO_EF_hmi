import { Component, Inject } from '@angular/core';
import { OnoApiService } from '../../../../service/ono-api.service';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { UtilsService } from 'src/app/service/helper/utils.service';

export interface DialogData {
  text: string;
}
export interface Climate {
  address: string;
  status: string;
  temperature: number;
  humidity: number;
  Fan: number;

}


@Component({
  selector: 'climate',
  templateUrl: './climate.component.html',
  styleUrls: ['./climate.component.css']
})
export class Climate {
  address: string;
  status: string;
  temperature: number;
  humidity: number;
  fan: number;
  dataSource: Climate[]
  displayedColumns: string[] = ['address', 'status', 'temperature', 'humidity', 'fan', 'changestat', 'changetemp', 'changehum', 'changefan'];

  constructor(public dialog: MatDialog, public connectionService: OnoApiService, private router: Router,
    private utilsService: UtilsService) { }

  ngOnInit() {
    this.getClimateList();
  }
  onStatus(element): void {
    var me = this
    if (element.status == "off") {
      this.utilsService.showLoader();
      this.connectionService
        .turnon()
        .subscribe(
          value => {
            setTimeout(function () {
              me.updateClimateInfoList();
            }, 2000)
          }
        );
    } else {
      this.utilsService.showLoader();
      this.connectionService
        .turnoff()
        .subscribe(
          value => {
            setTimeout(function () {
              me.updateClimateInfoList();
            }, 2000)
          }
        );
    }
  }
  onTemperature(element): void {
    const dialogRef = this.dialog.open(Temp, {
      width: '500px',
      data: { temperature: this.temperature }
    });
    var me = this
    dialogRef.afterClosed().subscribe(result => {
      result.temperature = Math.floor(result.temperature * 10)
      me.utilsService.showLoader();
      me.connectionService
        .changetemperature(result.temperature)
        .subscribe(
          value => {
            setTimeout(function () {
              me.updateClimateInfoList();
            }, 2000)
          }
        );
    });
  }
  onHumidity(element): void {
    const dialogRef = this.dialog.open(Hum, {
      width: '500px',
      data: { humidity: this.humidity }
    });
    var me = this
    dialogRef.afterClosed().subscribe(result => {
      result.humidity = Math.floor(result.humidity * 10)
      me.utilsService.showLoader();
      me.connectionService
        .changehumidity(result.humidity)
        .subscribe(
          value => {
            setTimeout(function () {
              me.updateClimateInfoList();
            }, 2000)
          }
        );
    });
  }
  onFan(element): void {
    const dialogRef = this.dialog.open(Fan, {
      width: '500px',
      data: { fan: this.fan }
    });
    var me = this
    dialogRef.afterClosed().subscribe(result => {
      result.fan = Math.floor(result.fan * 10)
      me.utilsService.showLoader();
      me.connectionService
        .changefan(result.fan)
        .subscribe(
          value => {
            setTimeout(function () {
              me.updateClimateInfoList();
            }, 2000)
          }
        );
    });
  }
  onReset(): void {
    var me = this
    this.utilsService.showLoader();
    this.connectionService
      .resetAlarms()
      .subscribe(
        value => {
          setTimeout(function () {
            me.updateClimateInfoList();
          }, 2000)
        }
      );
  }
  updateClimateInfoList() {
    this.getClimateList();
  }
  getClimateList() {
    var me = this
    me.utilsService.showLoader();
    me.connectionService
      .getClimateSetpoints()
      .subscribe(
        valueTemp => {
          me.connectionService
            .getClimate()
            .subscribe(
              value => {
                me.utilsService.hideLoader();
                var ext = []
                value.forEach(function (val) {
                  ext.push({
                    address: val.Address, status: val.Status, temperature: valueTemp.SetpointRaffreddamento, humidity: valueTemp.SetpointUmidita, fan: val.Fan / 10
                  })
                })
                me.dataSource = ext || [];
              }
            );
        }
      );
  }
  return() {
    this.router.navigate(['plc'])
  }
}

@Component({
  selector: 'temp-page',
  templateUrl: 'temp-page.html',
})
export class Temp {
  constructor(
    public dialogRef: MatDialogRef<Temp>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }
  ngOnInit() {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}


@Component({
  selector: 'hum-page',
  templateUrl: 'hum-page.html',
})
export class Hum {
  constructor(
    public dialogRef: MatDialogRef<Hum>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }
  ngOnInit() {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'fan-page',
  templateUrl: 'fan-page.html',
})
export class Fan {
  constructor(
    public dialogRef: MatDialogRef<Fan>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }
  ngOnInit() {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}



