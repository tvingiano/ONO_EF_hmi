import { Component, Inject, OnInit } from '@angular/core';
import { OnoApiService } from '../../../../service/ono-api.service';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { UtilsService } from 'src/app/service/helper/utils.service';
import { BusyService } from 'src/app/service/busy.service';
import { subscribeOn } from 'rxjs/operators';

export interface DialogData {
  text: string;
}
export interface Drawer {
  serial: number;
  order: string;
  slot: number;
  status: string;
}

@Component({
  selector: 'drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.css']
})

export class Drawer implements OnInit {
  serial: number; order: string; slot: number; status: string; drawer: number; to: number;

  // displayedColumns: string[] = ['ProcessID', 'OrderID', 'Description','DrawerSerial', 'StartTime','measurements','delete','edit'];
  displayedColumns: string[] = ['serial', 'order', 'slot', 'area', 'status', 'move'];

  dataSource: Drawer[];
  constructor(
    public dialog: MatDialog,
    public connectionService: OnoApiService,
    private router: Router,
    private utilsService: UtilsService,
    private drawerState: BusyService,
    ) { }

  ngOnInit() {
    this.getDrawerList();
  }

  //
  onMove(element): void {

    this.toggleState();

    const dialogRef = this.dialog.open(TestPlc, {
      width: '500px',
      data: { from: this.drawer, to: this.to }
    });
    const me = this;
    dialogRef.afterClosed().subscribe(result => {
      if (!result) {this.toggleState(); return; } // doesn't continue the code if result is null/undefined

      result.From = parseInt(element.serial, 10);

      // result.To = this.translate(result.To);  transform from litteral destination to code (ex. 'window1' = 12)
      if (result.to === 'Pit-stop') { result.To = 101; } else if (result.to ===  'External Bay') { result.To = 0; } else if (result.to === 'Window1') { result.To = 5; } else if (result.to === 'Window2') { result.To = 7; } else if (result.to === 'Window3') { result.To = 9; } else if (result.to === 'Window4') { result.To = 11; } else if (result.to === 'Window6') { result.To = 15; } else if (result.to === 'Window7') { result.To = 17; } else if (result.to === 'Window8') { result.To = 20; } else if (result.to === 'Full11-30cm') {result.To = 103; } else if (result.to === 'Full11-20cm') { result.To = 104; } else if (result.to === 'Full11-10cm') { result.To = 105; } else if (result.to === 'Full11-0cm') { result.To = 106; } else if (result.to === 'Shadow3') { result.To = 108; } else if (result.to === 'Shadow4') { result.To = 126; } else if (result.to === 'Shadow5') { result.To = 20; } else if (result.to === 'Full7-0cm') { result.To = 36; } else if (result.to === 'Full7-10cm') { result.To = 35; } else if (result.to === 'Full7-20cm') { result.To = 34; } else if (result.to === 'Red&Blue6-0cm') { result.To = 122; } else if (result.to === 'Red&Blue6-10cm') { result.To = 121; } else if (result.to === 'Red&Blue6-20cm') { result.To = 120; } else if (result.to === 'Red&Blue6-30cm') { result.To = 119; } else if (result.to === 'White9-0cm') { result.To = 33; } else if (result.to === 'White9-10cm') { result.To = 32; } else if (result.to === 'White9-20cm') { result.To = 31; } else if (result.to === 'White9-30cm') { result.To = 30; } else if (result.to === 'Purple5-0cm') { result.To = 113; } else if (result.to === 'Purple5-10cm') { result.To = 112; } else if (result.to === 'Purple5-20cm') { result.To = 111; } else if (result.to === 'Purple5-30cm') { result.To = 110; } else if (result.to === 'Full1-0cm') { result.To = 116; } else if (result.to === 'Full1-10cm') { result.To = 115; } else if (result.to === 'Full1-20cm') { result.To = 114; } else if (result.to === 'Red&Blue3-0cm') { result.To = 29; } else if (result.to === 'Red&Blue3-10cm') { result.To = 28; } else if (result.to === 'Red&Blue3-20cm') { result.To = 27; } else if (result.to === 'Red&Blue3-30cm') { result.To = 26; } else if (result.to === 'Red&Blue4-0cm') { result.To = 4; } else if (result.to === 'Red&Blue4-10cm') { result.To = 3; } else if (result.to === 'Red&Blue4-20cm') { result.To = 2; } else if (result.to === 'Red&Blue4-30cm') { result.To = 1; } else if (result.to === 'Red&Blue2-0cm') { result.To = 40; } else if (result.to === 'Red&Blue2-10cm') { result.To = 39; } else if (result.to === 'Red&Blue2-20cm') { result.To = 38; } else if (result.to === 'Red&Blue2-30cm') { result.To = 37; } else if (result.to === 'Purple8-0cm') { result.To = 102; } else if (result.to === 'Purple10-0cm') { result.To = 130; } else if (result.to === 'Purple10-10cm') { result.To = 129; } else if (result.to === 'Purple10-20cm') { result.To = 128; } else if (result.to === 'Purple10-30cm') { result.To = 127; } else { result.To = parseInt(result.to, 10); }

      if (result.To === 0) {
        if (confirm('Hai controllato i pistoni del modulo di refill?')) {
          this.commitState(result); // set activity variable to true to disable buttons and other concurrency

        this.connectionService.toExternal(result.From)
        .subscribe(
          value => {
            setTimeout(_ => {
              me.updateDrawerInfoList();
              me.inactiveState(value);
            }, 3000);

          }
        );
      }
      } else {

        this.connectionService
          .slotGet(result.To)
          .subscribe(
            value => {
              if (value.Slotstatus === 'shadowed') {
                if (confirm('The slots is shadowed from another drawer; are you sure you want to move it?')) {

                  this.commitState(result); // set activity variable to true to disable buttons and other concurrency
                  this.connectionService
                    .newTests(result)
                    .subscribe(
                      val => {
                        setTimeout(function() {
                          me.updateDrawerInfoList();
                          this.inactiveState(val);
                        }, 3000);

                      }
                    );
                }
              } else if (value.Slotstatus === 'couldShadow') {
                if (confirm('The drawer will shadow another drawer put under the light; are you sure you want to move it?')) {

                  this.commitState(result); // set activity variable to true to disable buttons and other concurrency
                  this.connectionService
                    .newTests(result)
                    .subscribe(
                      val => {

                        setTimeout(function() {
                          me.updateDrawerInfoList();
                          this.inactiveState(val);
                        }, 3000);
                      }
                    );
                }
              } else {

                this.commitState(result); // set activity variable to true to disable buttons and other concurrency
                this.connectionService
                  .newTests(result)
                  .subscribe(
                    val => {
                      setTimeout(_ => {
                        this.inactiveState(val);
                        me.updateDrawerInfoList();
                      }, 3000);
                    }
                  );
              }
            });
        }
    });

  }

  updateDrawerInfoList() {
    this.getDrawerList();
  }

  getDrawerList() {
    const me = this;
    // me.utilsService.showLoader();
    me.connectionService
      .slotsGetSimple()
      .subscribe(
        valueTemp => {
          me.connectionService
            .getFullDrawers()
            .subscribe(
              values => {
                // me.utilsService.hideLoader();
                const ext = [];
                let p;
                values.forEach(value => {
                  let p;
                  valueTemp.forEach(u => {
                    if (u.Slotname === value.Slotname) { p = u.Area; }
                  });
                  ext.push({
                    serial: value.Serial, order: value.CurrentOrder, slot: value.Slotname, status: value.DrawerStatus,
                    area: p
                  });
                });
                me.dataSource = ext || [];
              }
            );
        }
      );
  }

  onReset(): void {
    // this.utilsService.showLoader();
    this.connectionService
      .resetParams()
      .subscribe(
        value => {
          // this.utilsService.hideLoader();
          this.updateDrawerInfoList();
        }
      );
  }
  onZero(): void {

    this.connectionService.height({ height: 0, acceleration: 1, speed: 0.05, deceleration: 1 });
  }
  return() {
    this.router.navigate(['plc']);
  }

  toggleState() {
    this.drawerState.toggleDrawerState();
  }
  commitState(res) {
    this.drawerState.commitDrawerState(res);
  }

  inactiveState(response) {
    this.drawerState.inactiveDrawerState(response);
  }
  state() {
    return (this.drawerState.state.drawer.active === true || this.drawerState.state.refill.active === true) ? true : false;
  }

  translate(x) { // translate the drawer position from litteral to code
    x === 'Pit-stop'        ? x = 101
      : x === 'External Bay'    ? x = 0
      : x === 'Window1'         ? x = 5
      : x === 'Window2'         ? x = 7
      : x === 'Window3'         ? x = 9
      : x === 'Window4'         ? x = 11
      : x === 'Window6'         ? x = 15
      : x === 'Window7'         ? x = 17
      : x === 'Window8'         ? x = 20
      : x === 'Full11-30cm'       ? x = 103
      : x === 'Full11-20cm'     ? x = 104
      : x === 'Full11-10cm'     ? x = 105
      : x === 'Full11-0cm'      ? x = 106
      : x === 'Shadow3'         ? x = 108
      : x === 'Shadow4'         ? x = 126
      : x === 'Shadow5'         ? x = 20
      : x === 'Full7-0cm'       ? x = 36
      : x === 'Full7-10cm'      ? x = 35
      : x === 'Full7-20cm'      ? x = 34
      : x === 'Red&Blue6-0cm'   ? x = 122
      : x === 'Red&Blue6-10cm'  ? x = 121
      : x === 'Red&Blue6-20cm'  ? x = 120
      : x === 'Red&Blue6-30cm'  ? x = 119
      : x === 'White9-0cm'      ? x = 33
      : x === 'White9-10cm'     ? x = 32
      : x === 'White9-20cm'     ? x = 31
      : x === 'White9-30cm'     ? x = 30
      : x === 'Purple5-0cm'     ? x = 113
      : x === 'Purple5-10cm'    ? x = 112
      : x === 'Purple5-20cm'    ? x = 111
      : x === 'Purple5-30cm'    ? x = 110
      : x === 'Full1-0cm'       ? x = 116
      : x === 'Full1-10cm'      ? x = 115
      : x === 'Full1-20cm'      ? x = 114
      : x === 'Red&Blue3-0cm'   ? x = 29
      : x === 'Red&Blue3-10cm'  ? x = 28
      : x === 'Red&Blue3-20cm'  ? x = 27
      : x === 'Red&Blue3-30cm'  ? x = 26
      : x === 'Red&Blue4-0cm'   ? x = 4
      : x === 'Red&Blue4-10cm'  ? x = 3
      : x === 'Red&Blue4-20cm'  ? x = 2
      : x === 'Red&Blue4-30cm'  ? x = 1
      : x === 'Red&Blue2-0cm'   ? x = 40
      : x === 'Red&Blue2-10cm'  ? x = 39
      : x === 'Red&Blue2-20cm'  ? x = 38
      : x === 'Red&Blue2-30cm'  ? x = 37
      : x === 'Purple8-0cm'     ? x = 102
      : x === 'Purple10-0cm'    ? x = 130
      : x === 'Purple10-10cm'   ? x = 129
      : x === 'Purple10-20cm'   ? x = 128
      : x === 'Purple10-30cm'   ? x = 127
      : x = parseInt(x, 10);

    return x;
  }

}


@Component({
  selector: 'drawer-page',
  templateUrl: 'drawer-page.html',
})
export class TestPlc implements OnInit {
  slots = ['External Bay', 'Pit-stop', 
    'Window1', 'Window2', 'Window3', 'Window4', 'Window6', 'Window7', 'Window8',
    'Shadow3', 'Shadow4', 'Shadow5', 
    'Full1-0cm', 'Full1-10cm', 'Full1-20cm',
    'Red&Blue2-10cm', 'Red&Blue2-20cm', 'Red&Blue2-30cm', 'Red&Blue3-0cm', 'Red&Blue3-10cm', 'Red&Blue3-20cm', 'Red&Blue3-30cm',
    'Red&Blue4-0cm', 'Red&Blue4-10cm', 'Red&Blue4-20cm', 'Red&Blue4-30cm', 'Purple5-0cm', 'Purple5-10cm', 'Purple5-20cm', 'Purple5-30cm',
    'Red&Blue6-0cm', 'Red&Blue6-10cm', 'Red&Blue6-20cm', 'Red&Blue6-30cm', 'Full7-0cm', 'Full7-10cm', 'Full7-20cm', 'Purple8-0cm',
    'White9-0cm', 'White9-10cm', 'White9-20cm', 'White9-30cm',
    'Purple10-0cm', 'Purple10-10cm', 'Purple10-20cm',
    'Full11-0cm', 'Full11-10cm', 'Full11-20cm', 'Full11-30cm'];

  constructor(
    public dialogRef: MatDialogRef<TestPlc>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }
  ngOnInit() {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
