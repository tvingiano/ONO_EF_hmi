import { Component, Inject } from '@angular/core';
import { OnoApiService } from '../../../../service/ono-api.service';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { UtilsService } from 'src/app/service/helper/utils.service';

export interface DialogData {
  text: string;
}
export interface Shutter {
  address: string;
  status: string;
}


@Component({
  selector: 'shutter',
  templateUrl: './shutter.component.html',
  styleUrls: ['./shutter.component.css']
})
export class ShutterComponent {
  address: string;
  status: string;
  temperature: number;
  humidity: number;
  fan: number;
  dataSource: Shutter[]
  displayedColumns: string[] = ['address', 'status', 'up', 'down'];

  constructor(public dialog: MatDialog, public connectionService: OnoApiService, private router: Router,
    private utilsService: UtilsService) { }

  ngOnInit() {
    this.getShutterList();
  }
  up(element): void {
    var me = this
    if (element.status == "down") {
      var deck
      if (element.address == "internal") {
        deck = 0
      } else {
        deck = 1
      }
      this.utilsService.showLoader();
      this.connectionService
        .shutter(deck, 1)
        .subscribe(
          value => {
            setTimeout(function () {
              me.updateShutterInfoList();
            }, 2000)
          }
        );
    }
  }
  down(element): void {
    var me = this
    if (element.status == "up") {
      var deck
      if (element.address == "internal") {
        deck = 0
      } else {
        deck = 1
      }
      this.utilsService.showLoader();
      this.connectionService
        .shutter(deck, 0)
        .subscribe(
          value => {
            setTimeout(function () {
              me.updateShutterInfoList();
            }, 2000)
          }
        );
    }
  }
  updateShutterInfoList() {
    this.getShutterList();
  }
  getShutterList() {
    var me = this
    me.utilsService.showLoader();
    me.connectionService
      .getShutter()
      .subscribe(
        value => {
          me.utilsService.hideLoader();
          var ext = []
          value.forEach(function (val) {
            ext.push({
              address: val.Address, status: val.Status
            })
          })
          me.dataSource = ext || [];
        }
      );

  }
  return() {
    this.router.navigate(['plc'])
  }
}

