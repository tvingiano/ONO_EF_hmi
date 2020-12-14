import { Component, Inject } from '@angular/core';
import { OnoApiService } from 'src/app/service/ono-api.service';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { UtilsService } from 'src/app/service/helper/utils.service';
import { LedInfo } from 'src/app/model/configuration/led-info';

export interface DialogData {
  text: string;
}
export interface Lampss {
  Address: number;
  Type: string;
  Status: number;
}

@Component({
  selector: 'lampsNew',
  templateUrl: './lamps.component.html',
  styleUrls: ['./lamps.component.css']
})
export class LedsComponent {
  address: number; pwm1Int: number; pwm2Int: number; pwm3Int: number; pwm4Int: number; hour: number; minute: number; lightDuration: number;
  panel: string; distance: number; white: number; red: number; blue: number; purple: number;

  //displayedColumns: string[] = ['ProcessID', 'OrderID', 'Description','DrawerSerial', 'StartTime','measurements','delete','edit'];
  displayedColumns: string[] = ['address', 'type', 'status', 'on', 'custom', "off", "schedule", "delete"];

  dataSource: LedInfo[]
  constructor(public dialog: MatDialog, public onoApiService: OnoApiService, private router: Router,
    private utilsService: UtilsService) { }

  ngOnInit() {
    this.getLedInfoList();
  }

  onMax(element): void {
    if (element.Type == "Full") {
      var result = {
        "address": parseInt(element.Address),
        "pwm1Int": 0,
        "pwm2Int": 1000,
        "pwm3Int": 1000,
        "pwm4Int": 1000
      }
    } else if (element.Type == "Red&Blue") {
      var result = {
        "address": parseInt(element.Address),
        "pwm1Int": 0,
        "pwm2Int": 0,
        "pwm3Int": 1000,
        "pwm4Int": 1000
      }

    } else if (element.Type == "PLC") {
      var result = {
        "address": parseInt(element.Address),
        "pwm1Int": 1,
        "pwm2Int": 1,
        "pwm3Int": 1,
        "pwm4Int": 0
      }
    } else {
      var result = {
        "address": parseInt(element.Address),
        "pwm1Int": 1000,
        "pwm2Int": 1000,
        "pwm3Int": 1000,
        "pwm4Int": 1000
      }
    }
    this.utilsService.showLoader();
    this.onoApiService.manageLamp(result)
      .subscribe(
        value => {
          // this.utilsService.hideLoader();
          this.updateLedInfoList();
        }
      );

  }
  off(element): void {
    var result = {
      "address": parseInt(element.Address),
      "pwm1Int": 0,
      "pwm2Int": 0,
      "pwm3Int": 0,
      "pwm4Int": 0
    }
    this.utilsService.showLoader();
    this.onoApiService.manageLamp(result)
      .subscribe(
        value => {
          // this.utilsService.hideLoader();
          this.updateLedInfoList();
        }
      );

  }

  updateLedInfoList() {
    this.getLedInfoList();
  }

  getLedInfoList() {
    var me = this
    this.utilsService.showLoader();
    this.onoApiService
      .getLeds()
      .subscribe(
        value => {
          this.utilsService.hideLoader();
          me.dataSource = value || [];
        }
      );
  }
  onCustom(element): void {
    const dialogRef = this.dialog.open(LampPlc, {
      width: '400px',
      height: '630px',
      data: { address: this.address, panel: this.panel, distance: this.distance, white: this.white, red: this.red, blue: this.blue, purple: this.purple, type: element.Type }
    });
    var me = this
    dialogRef.afterClosed().subscribe(result => {
      var ext = new Object()
      result.distance = "0 cm"
      ext['address'] = parseInt(element.Address)
      if (element.Type == "Full" && result.distance == "0 cm") {
        ext['pwm1Int'] = 0
        result.white ? ext['pwm2Int'] = parseFloat(result.white) * 1000 / 114.7 : ext['pwm2Int'] = 0
        result.red ? ext['pwm3Int'] = parseFloat(result.red) * 1000 / 209.7 : ext['pwm3Int'] = 0
        result.blue ? ext['pwm4Int'] = parseFloat(result.blue) * 1000 / 129.4 : ext['pwm4Int'] = 0

      } else if (element.Type == "Full" && result.distance == "10 cm") {
        ext['pwm1Int'] = 0
        result.white ? ext['pwm2Int'] = parseFloat(result.white) * 1000 / 177 : ext['pwm2Int'] = 0
        result.red ? ext['pwm3Int'] = parseFloat(result.red) * 1000 / 346 : ext['pwm3Int'] = 0
        result.blue ? ext['pwm4Int'] = parseFloat(result.blue) * 1000 / 255 : ext['pwm4Int'] = 0

      } else if (element.Type == "Full" && result.distance == "20 cm") {
        ext['pwm1Int'] = 0
        result.white ? ext['pwm2Int'] = parseFloat(result.white) * 1000 / 177 : ext['pwm2Int'] = 0
        result.red ? ext['pwm3Int'] = parseFloat(result.red) * 1000 / 210 : ext['pwm3Int'] = 0
        result.blue ? ext['pwm4Int'] = parseFloat(result.blue) * 1000 / 130 : ext['pwm4Int'] = 0

      } else if (element.Type == "White" && result.distance == "0 cm") {
        ext['pwm1Int'] = parseFloat(result.white) * 1000 / 229.4
        ext['pwm2Int'] = parseFloat(result.white) * 1000 / 229.4
        ext['pwm3Int'] = parseFloat(result.white) * 1000 / 229.4
        ext['pwm4Int'] = parseFloat(result.white) * 1000 / 229.4

      } else if (element.Type == "White" && result.distance == "10 cm") {
        ext['pwm1Int'] = parseFloat(result.white) * 1000 / 270
        ext['pwm2Int'] = parseFloat(result.white) * 1000 / 270
        ext['pwm3Int'] = parseFloat(result.white) * 1000 / 270
        ext['pwm4Int'] = parseFloat(result.white) * 1000 / 270

      } else if (element.Type == "White" && result.distance == "20 cm") {
        ext['pwm1Int'] = parseFloat(result.white) * 1000 / 228
        ext['pwm2Int'] = parseFloat(result.white) * 1000 / 228
        ext['pwm3Int'] = parseFloat(result.white) * 1000 / 228
        ext['pwm4Int'] = parseFloat(result.white) * 1000 / 228

      } else if (element.Type == "Red&Blue" && result.distance == "0 cm") {
        ext['pwm1Int'] = 0
        ext['pwm2Int'] = 0
        result.red ? ext['pwm3Int'] = parseFloat(result.red) * 1000 / 209.7 : ext['pwm3Int'] = 0
        result.blue ? ext['pwm4Int'] = parseFloat(result.blue) * 1000 / 129.4 : ext['pwm4Int'] = 0

      } else if (element.Type == "Red&Blue" && result.distance == "10 cm") {
        ext['pwm1Int'] = 0
        ext['pwm2Int'] = 0
        result.red ? ext['pwm3Int'] = parseFloat(result.red) * 1000 / 346 : ext['pwm3Int'] = 0
        result.blue ? ext['pwm4Int'] = parseFloat(result.blue) * 1000 / 255 : ext['pwm4Int'] = 0

      } else if (element.Type == "Red&Blue" && result.distance == "20 cm") {
        ext['pwm1Int'] = 0
        ext['pwm2Int'] = 0
        result.red ? ext['pwm3Int'] = parseFloat(result.red) * 1000 / 210 : ext['pwm3Int'] = 0
        result.blue ? ext['pwm4Int'] = parseFloat(result.blue) * 1000 / 130 : ext['pwm4Int'] = 0

      } else if (element.Type == "Purple" && result.distance == "0 cm") {
        ext['pwm1Int'] = parseFloat(result.purple) * 1000 / 416
        ext['pwm2Int'] = parseFloat(result.purple) * 1000 / 416
        ext['pwm3Int'] = parseFloat(result.purple) * 1000 / 416
        ext['pwm4Int'] = parseFloat(result.purple) * 1000 / 416

      } else if (element.Type == "Purple" && result.distance == "10 cm") {
        ext['pwm1Int'] = parseFloat(result.purple) * 1000 / 316
        ext['pwm2Int'] = parseFloat(result.purple) * 1000 / 316
        ext['pwm3Int'] = parseFloat(result.purple) * 1000 / 316
        ext['pwm4Int'] = parseFloat(result.purple) * 1000 / 316

      } else if (element.Type == "Purple" && result.distance == "20 cm") {
        ext['pwm1Int'] = parseFloat(result.purple) * 1000 / 216
        ext['pwm2Int'] = parseFloat(result.purple) * 1000 / 216
        ext['pwm3Int'] = parseFloat(result.purple) * 1000 / 216
        ext['pwm4Int'] = parseFloat(result.purple) * 1000 / 216

      } else if (element.Type == "PLC") {
        var a
        var b
        var c
        result.white == "on" ? a = 1 : a = 0
        result.red == "on" ? b = 1 : b = 0
        result.blue == "on" ? c = 1 : c = 0

        ext['pwm1Int'] = a
        ext['pwm2Int'] = b
        ext['pwm3Int'] = c
        ext['pwm4Int'] = 0

      }
      me.utilsService.showLoader();
      me.onoApiService.manageLamp(ext)
        .subscribe(
          value => {
            // this.utilsService.hideLoader();
            this.updateLedInfoList();
          }
        );
    });
  }

  schedule(element): void {
    const dialogRef = this.dialog.open(LampSchedule, {
      width: '400px',
      height: '800px',
      data: {
        address: this.address, hour: this.hour, minute: this.minute, pwm1Int: this.pwm1Int, pwm2Int: this.pwm2Int, pwm3Int: this.pwm3Int, pwm4Int: this.pwm4Int,
        lightDuration: this.lightDuration, type: element.Type
      }
    });
    var me = this
    dialogRef.afterClosed().subscribe(result => {

      var ext = new Object()
      result.distance = "0 cm"
      ext['address'] = parseInt(element.Address)
      if (element.Type == "Full" && result.distance == "0 cm") {
        ext['pwm1Int'] = 0
        result.white ? ext['pwm2Int'] = parseFloat(result.white) * 1000 / 114.7 : ext['pwm2Int'] = 0
        result.red ? ext['pwm3Int'] = parseFloat(result.red) * 1000 / 209.7 : ext['pwm3Int'] = 0
        result.blue ? ext['pwm4Int'] = parseFloat(result.blue) * 1000 / 129.4 : ext['pwm4Int'] = 0

      } else if (element.Type == "Full" && result.distance == "10 cm") {
        ext['pwm1Int'] = 0
        result.white ? ext['pwm2Int'] = parseFloat(result.white) * 1000 / 177 : ext['pwm2Int'] = 0
        result.red ? ext['pwm3Int'] = parseFloat(result.red) * 1000 / 346 : ext['pwm3Int'] = 0
        result.blue ? ext['pwm4Int'] = parseFloat(result.blue) * 1000 / 255 : ext['pwm4Int'] = 0

      } else if (element.Type == "Full" && result.distance == "20 cm") {
        ext['pwm1Int'] = 0
        result.white ? ext['pwm2Int'] = parseFloat(result.white) * 1000 / 177 : ext['pwm2Int'] = 0
        result.red ? ext['pwm3Int'] = parseFloat(result.red) * 1000 / 210 : ext['pwm3Int'] = 0
        result.blue ? ext['pwm4Int'] = parseFloat(result.blue) * 1000 / 130 : ext['pwm4Int'] = 0

      } else if (element.Type == "White" && result.distance == "0 cm") {
        ext['pwm1Int'] = parseFloat(result.white) * 1000 / 229.4
        ext['pwm2Int'] = parseFloat(result.white) * 1000 / 229.4
        ext['pwm3Int'] = parseFloat(result.white) * 1000 / 229.4
        ext['pwm4Int'] = parseFloat(result.white) * 1000 / 229.4

      } else if (element.Type == "White" && result.distance == "10 cm") {
        ext['pwm1Int'] = parseFloat(result.white) * 1000 / 270
        ext['pwm2Int'] = parseFloat(result.white) * 1000 / 270
        ext['pwm3Int'] = parseFloat(result.white) * 1000 / 270
        ext['pwm4Int'] = parseFloat(result.white) * 1000 / 270

      } else if (element.Type == "White" && result.distance == "20 cm") {
        ext['pwm1Int'] = parseFloat(result.white) * 1000 / 228
        ext['pwm2Int'] = parseFloat(result.white) * 1000 / 228
        ext['pwm3Int'] = parseFloat(result.white) * 1000 / 228
        ext['pwm4Int'] = parseFloat(result.white) * 1000 / 228

      } else if (element.Type == "Red&Blue" && result.distance == "0 cm") {
        ext['pwm1Int'] = 0
        ext['pwm2Int'] = 0
        result.red ? ext['pwm3Int'] = parseFloat(result.red) * 1000 / 209.7 : ext['pwm3Int'] = 0
        result.blue ? ext['pwm4Int'] = parseFloat(result.blue) * 1000 / 129.4 : ext['pwm4Int'] = 0

      } else if (element.Type == "Red&Blue" && result.distance == "10 cm") {
        ext['pwm1Int'] = 0
        ext['pwm2Int'] = 0
        result.red ? ext['pwm3Int'] = parseFloat(result.red) * 1000 / 346 : ext['pwm3Int'] = 0
        result.blue ? ext['pwm4Int'] = parseFloat(result.blue) * 1000 / 255 : ext['pwm4Int'] = 0

      } else if (element.Type == "Red&Blue" && result.distance == "20 cm") {
        ext['pwm1Int'] = 0
        ext['pwm2Int'] = 0
        result.red ? ext['pwm3Int'] = parseFloat(result.red) * 1000 / 210 : ext['pwm3Int'] = 0
        result.blue ? ext['pwm4Int'] = parseFloat(result.blue) * 1000 / 130 : ext['pwm4Int'] = 0

      } else if (element.Type == "Purple" && result.distance == "0 cm") {
        ext['pwm1Int'] = parseFloat(result.purple) * 1000 / 416
        ext['pwm2Int'] = parseFloat(result.purple) * 1000 / 416
        ext['pwm3Int'] = parseFloat(result.purple) * 1000 / 416
        ext['pwm4Int'] = parseFloat(result.purple) * 1000 / 416

      } else if (element.Type == "Purple" && result.distance == "10 cm") {
        ext['pwm1Int'] = parseFloat(result.purple) * 1000 / 316
        ext['pwm2Int'] = parseFloat(result.purple) * 1000 / 316
        ext['pwm3Int'] = parseFloat(result.purple) * 1000 / 316
        ext['pwm4Int'] = parseFloat(result.purple) * 1000 / 316

      } else if (element.Type == "Purple" && result.distance == "20 cm") {
        ext['pwm1Int'] = parseFloat(result.purple) * 1000 / 216
        ext['pwm2Int'] = parseFloat(result.purple) * 1000 / 216
        ext['pwm3Int'] = parseFloat(result.purple) * 1000 / 216
        ext['pwm4Int'] = parseFloat(result.purple) * 1000 / 216

      } else if (element.Type == "PLC") {
        var a1
        var b1
        var c1
        result.white == "on" ? a1 = 1 : a1 = 0
        result.red == "on" ? b1 = 1 : b1 = 0
        result.blue == "on" ? c1 = 1 : c1 = 0

        ext['pwm1Int'] = a1
        ext['pwm2Int'] = b1
        ext['pwm3Int'] = c1
        ext['pwm4Int'] = 0

      }

      var a = {
        address: ext['address'],
        hour: result.hour,
        minute: result.minute,
        second: 0,
        turn: "on",
        pwm1Int: ext['pwm1Int'],
        pwm2Int: ext['pwm2Int'],
        pwm3Int: ext['pwm3Int'],
        pwm4Int: ext['pwm4Int']
      }

      var temp = parseInt(result.hour) + parseInt(result.lightDuration)
      if (temp >= 24) temp = temp - 24
      var b = {
        address: ext['address'],
        hour: temp,
        minute: result.minute,
        second: 0,
        turn: "off",
        pwm1Int: 0,
        pwm2Int: 0,
        pwm3Int: 0,
        pwm4Int: 0
      }
      this.utilsService.showLoader();
      me.onoApiService.scheduleLamp(a)
        .subscribe(
          value => {
          }
        );
      setTimeout(function () {
        me.onoApiService.scheduleLamp(b)
          .subscribe(
            value => {
              // this.utilsService.hideLoader();
              me.updateLedInfoList();
            }
          );
      }, 500);
    })
  }

  deleteSchedule(element): void {
    var me = this
    var a = {
      address: parseInt(element.Address),
      hour: -1,
      minute: 0,
      second: 0,
      turn: "on",
      pwm1Int: 0,
      pwm2Int: 0,
      pwm3Int: 0,
      pwm4Int: 0
    }

    var b = {
      address: parseInt(element.Address),
      hour: -1,
      minute: 0,
      second: 0,
      turn: "off",
      pwm1Int: 0,
      pwm2Int: 0,
      pwm3Int: 0,
      pwm4Int: 0
    }
    this.utilsService.showLoader();
    me.onoApiService.scheduleLamp(a)
      .subscribe(
        value => {
        })
    setTimeout(function () {
      me.onoApiService.scheduleLamp(b)
        .subscribe(
          value => {
            // this.utilsService.hideLoader();
            me.updateLedInfoList();
          }
        );
    }, 500);
  }

  return() {
    this.router.navigate(['plc'])
  }
}

@Component({
  selector: 'lamp-page',
  templateUrl: 'lamp-page.html',
})
export class LampPlc {
  addresses = []
  panels = ["Full", "Full White", "Red&Blue", "Purple"];
  distances = ["0 cm", "10 cm", "20 cm"]
  bools = ["on", "off"]

  constructor(
    public dialogRef: MatDialogRef<LampPlc>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }
  ngOnInit() {
  }
  whitehint(panel, distance) {
    if (panel === 'Full' && distance === '0 cm') { return 'max 177' }
    else if (panel === 'Full' && distance === '10 cm') { return 'max 135' }
    else if (panel === 'Full' && distance === '20 cm') { return 'max 114' }
    else if (panel === 'Full White' && distance === '0 cm') { return 'max 354' }
    else if (panel === 'Full White' && distance === '10 cm') { return 'max 270' }
    else if (panel === 'Full White' && distance === '20 cm') { return 'max 228' }
    else { return '' }
  }
  redhint(distance) {
    if (distance === '0 cm') { return 'max 420' }
    else if (distance === '10 cm') { return 'max 346' }
    else if (distance === '20 cm') { return 'max 210' }
    else { return '' }
  }
  bluehint(distance) {
    if (distance === '0 cm') { return 'max 315' }
    else if (distance === '10 cm') { return 'max 255' }
    else if (distance === '20 cm') { return 'max 130' }
    else { return '' }
  }
  purplehint(distance) {
    if (distance === '0 cm') { return 'max 416' }
    else if (distance === '10 cm') { return 'max 316' }
    else if (distance === '20 cm') { return 'max 216' }
    else { return '' }
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'lamp-schedule',
  templateUrl: 'lamp-schedule.html',
})
export class LampSchedule {
  addresses = []
  distances = ["0 cm", "10 cm", "20 cm"]
  bools = ["on", "off"]

  constructor(
    public dialogRef: MatDialogRef<LampSchedule>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }
  ngOnInit() {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  whitehint(panel, distance) {
    if (panel === 'Full' && distance === '0 cm') { return 'max 177' }
    else if (panel === 'Full' && distance === '10 cm') { return 'max 135' }
    else if (panel === 'Full' && distance === '20 cm') { return 'max 114' }
    else if (panel === 'Full White' && distance === '0 cm') { return 'max 354' }
    else if (panel === 'Full White' && distance === '10 cm') { return 'max 270' }
    else if (panel === 'Full White' && distance === '20 cm') { return 'max 228' }
    else { return '' }
  }
  redhint(distance) {
    if (distance === '0 cm') { return 'max 420' }
    else if (distance === '10 cm') { return 'max 346' }
    else if (distance === '20 cm') { return 'max 210' }
    else { return '' }
  }
  bluehint(distance) {
    if (distance === '0 cm') { return 'max 315' }
    else if (distance === '10 cm') { return 'max 255' }
    else if (distance === '20 cm') { return 'max 130' }
    else { return '' }
  }
  purplehint(distance) {
    if (distance === '0 cm') { return 'max 416' }
    else if (distance === '10 cm') { return 'max 316' }
    else if (distance === '20 cm') { return 'max 216' }
    else { return '' }
  }
}