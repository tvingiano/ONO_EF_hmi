import { Component, OnInit, ViewChild, AfterViewChecked, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OnoApiService } from '../../../../service/ono-api.service';
import { Router } from '@angular/router';
import { BusyService } from 'src/app/service/busy.service';

export interface DialogData {
  text: string;
}

@Component({
  selector: 'stress-plc',
  templateUrl: './stress.component.html',
  styleUrls: ['./stress.component.scss']
})
export class StressComponent implements OnInit, AfterViewChecked {
  height: number;
  initialHeight: number;
  finalHeight: number;
  slot: number;
  DrawerSerial: number;
  reps: number;
  from: number;
  to: number;
  interval: number;
  acceleration: number;
  speed: number;
  deceleration: number;
  side: string;
  bay: string;
  address: string;
  deck: string;
  sides = ["north", "south"]

  constructor(
    public dialog: MatDialog,
    public connectionService: OnoApiService,
    private router: Router,
    public busyService: BusyService,
  ) { }

  BUTTONLIST = [
    {
      id: 1,
      title: 'Shuttle',
      icon: 'play_for_work'
    },
    {
      id: 2,
      title: 'Porters',
      icon: 'input'
    },
    {
      id: 3,
      title: 'Drawer',
      icon: 'open_in_browser'
    },

  ];

  ngAfterViewChecked() {
  }
  home() {
    this.router.navigate(['plc'])
  }
  ngOnInit() {
  }

  transAction(id){
    switch (id) {
      case 1: { this.Shuttle(); } break;
      case 2: { this.Porters(); } break;
      case 3: { this.Drawers(); } break;
      default: alert('this should not be possible O.o'); break;
    }
  }

  drawerState() {
    const me = this.busyService.state;
    if (me.drawer.active === true || me.refill.active === true) {
      return true;
    } else {
      return false;
    }
  }


  Shuttle(): void {
    const dialogRef = this.dialog.open(ShuttleStress, {
      width: '500px',
      data: {
        initialHeight: this.initialHeight, finalHeight: this.finalHeight,
        acceleration: this.acceleration, speed: this.speed, deceleration: this.deceleration,
        reps: this.reps
      }
    });
    var me = this
    dialogRef.afterClosed().subscribe(result => {
      me.connectionService.shuttle(result)

    });
  }

  Porters(): void {
    const dialogRef = this.dialog.open(PortersStress, {
      width: '500px',
      data: {
        To: this.to, DrawerSerial: this.DrawerSerial, acceleration: this.acceleration, speed: this.speed, deceleration: this.deceleration,
        reps: this.reps
      }
    });
    var me = this
    dialogRef.afterClosed().subscribe(result => {
      result.From = parseInt(result.DrawerSerial)

      if (result.to == "Pit-stop") { result.To = 101 }
      else if (result.to == "Red&Blue4-30cm") { result.To = 1 }
      else if (result.to == "Window1") { result.To = 5 }
      else if (result.to == "Window2") { result.To = 7 }
      else if (result.to == "Window3") { result.To = 9 }
      else if (result.to == "Window4") { result.To = 11 }
      else if (result.to == "Window6") { result.To = 15 }
      else if (result.to == "Window7") { result.To = 17 }
      else if (result.to == "Window8") { result.To = 20 }
      else if (result.to == "Buio1") { result.To = 123 }
      else if (result.to == "Buio2") { result.To = 124 }
      else if (result.to == "Buio3") { result.To = 125 }
      else if (result.to == "Full7-0cm") { result.To = 36 }
      else if (result.to == "Full7-10cm") { result.To = 35 }
      else if (result.to == "Full7-20cm") { result.To = 34 }
      else if (result.to == "Red&Blue6-0cm") { result.To = 122 }
      else if (result.to == "Red&Blue6-10cm") { result.To = 121 }
      else if (result.to == "Red&Blue6-20cm") { result.To = 120 }
      else if (result.to == "Red&Blue6-30cm") { result.To = 119 }
      else if (result.to == "White9-0cm") { result.To = 33 }
      else if (result.to == "White9-10cm") { result.To = 32 }
      else if (result.to == "White9-20cm") { result.To = 31 }
      else if (result.to == "White9-30cm") { result.To = 30 }
      else if (result.to == "Purple5-0cm") { result.To = 113 }
      else if (result.to == "Purple5-10cm") { result.To = 112 }
      else if (result.to == "Purple5-20cm") { result.To = 111 }
      else if (result.to == "Purple5-30cm") { result.To = 110 }
      else if (result.to == "Full1-0cm") { result.To = 116 }
      else if (result.to == "Full1-10cm") { result.To = 115 }
      else if (result.to == "Full1-20cm") { result.To = 114 }
      else if (result.to == "Red&Blue3-0cm") { result.To = 29 }
      else if (result.to == "Red&Blue3-10cm") { result.To = 28 }
      else if (result.to == "Red&Blue3-20cm") { result.To = 27 }
      else if (result.to == "Red&Blue3-30cm") { result.To = 26 }
      else if (result.to == "Red&Blue4-0cm") { result.To = 4 }
      else if (result.to == "Red&Blue4-10cm") { result.To = 3 }
      else if (result.to == "Red&Blue4-20cm") { result.To = 2 }
      else if (result.to == "Red&Blue2-0cm") { result.To = 40 }
      else if (result.to == "Red&Blue2-10cm") { result.To = 39 }
      else if (result.to == "Red&Blue2-20cm") { result.To = 38 }
      else if (result.to == "Red&Blue2-30cm") { result.To = 37 }
      else if (result.to == "Purple8-0cm") { result.To = 102 }
      else if (result.to == "Purple10-0cm") { result.To = 130 }
      else if (result.to == "Purple10-10cm") { result.To = 129 }
      else if (result.to == "Purple10-20cm") { result.To = 128 }
      else if (result.to == "Purple10-30cm") { result.To = 127 }
      else { result.To = parseInt(result.to) }
      me.connectionService.porters(result)

    });
  }
  Drawers(): void {
    const dialogRef = this.dialog.open(DrawerStress, {
      width: '500px',
      data: {
        To: this.to, From: this.from, DrawerSerial: this.DrawerSerial,
        reps: this.reps
      }
    });
    var me = this
    dialogRef.afterClosed().subscribe(result => {
      result.From = parseInt(result.DrawerSerial)

      if (result.to == "Pit-stop") { result.To = 101 }
      else if (result.to == "Red&Blue4-30cm") { result.To = 1 }
      else if (result.to == "Window1") { result.To = 5 }
      else if (result.to == "Window2") { result.To = 7 }
      else if (result.to == "Window3") { result.To = 9 }
      else if (result.to == "Window4") { result.To = 11 }
      else if (result.to == "Window6") { result.To = 15 }
      else if (result.to == "Window7") { result.To = 17 }
      else if (result.to == "Window8") { result.To = 20 }
      else if (result.to == "Buio1") { result.To = 123 }
      else if (result.to == "Buio2") { result.To = 124 }
      else if (result.to == "Buio3") { result.To = 125 }
      else if (result.to == "Full7-0cm") { result.To = 36 }
      else if (result.to == "Full7-10cm") { result.To = 35 }
      else if (result.to == "Full7-20cm") { result.To = 34 }
      else if (result.to == "Red&Blue6-0cm") { result.To = 122 }
      else if (result.to == "Red&Blue6-10cm") { result.To = 121 }
      else if (result.to == "Red&Blue6-20cm") { result.To = 120 }
      else if (result.to == "Red&Blue6-30cm") { result.To = 119 }
      else if (result.to == "White9-0cm") { result.To = 33 }
      else if (result.to == "White9-10cm") { result.To = 32 }
      else if (result.to == "White9-20cm") { result.To = 31 }
      else if (result.to == "White9-30cm") { result.To = 30 }
      else if (result.to == "Purple5-0cm") { result.To = 113 }
      else if (result.to == "Purple5-10cm") { result.To = 112 }
      else if (result.to == "Purple5-20cm") { result.To = 111 }
      else if (result.to == "Purple5-30cm") { result.To = 110 }
      else if (result.to == "Full1-0cm") { result.To = 116 }
      else if (result.to == "Full1-10cm") { result.To = 115 }
      else if (result.to == "Full1-20cm") { result.To = 114 }
      else if (result.to == "Red&Blue3-0cm") { result.To = 29 }
      else if (result.to == "Red&Blue3-10cm") { result.To = 28 }
      else if (result.to == "Red&Blue3-20cm") { result.To = 27 }
      else if (result.to == "Red&Blue3-30cm") { result.To = 26 }
      else if (result.to == "Red&Blue4-0cm") { result.To = 4 }
      else if (result.to == "Red&Blue4-10cm") { result.To = 3 }
      else if (result.to == "Red&Blue4-20cm") { result.To = 2 }
      else if (result.to == "Red&Blue2-0cm") { result.To = 40 }
      else if (result.to == "Red&Blue2-10cm") { result.To = 39 }
      else if (result.to == "Red&Blue2-20cm") { result.To = 38 }
      else if (result.to == "Red&Blue2-30cm") { result.To = 37 }
      else if (result.to == "Purple8-0cm") { result.To = 102 }
      else if (result.to == "Purple10-0cm") { result.To = 130 }
      else if (result.to == "Purple10-10cm") { result.To = 129 }
      else if (result.to == "Purple10-20cm") { result.To = 128 }
      else if (result.to == "Purple10-30cm") { result.To = 127 }
      else { result.To = parseInt(result.to) }
      me.connectionService.drawerStress(result)

    });
  }

}


@Component({
  selector: 'porters-page',
  templateUrl: 'porters-page.html',
})
export class PortersStress {
  sides = ["north", "south"]
  drawers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
  slots = ["Pit-stop", "Window1", "Window2", "Window3", "Window4", "Window6", "Window7", "Window8", "Buio1", "Buio2", "Buio3", "Full1-0cm", "Full1-10cm", "Full1-20cm", "Full1-30cm",
    "Red&Blue2-10cm", "Red&Blue2-20cm", "Red&Blue2-30cm", "Red&Blue3-0cm", "Red&Blue3-10cm", "Red&Blue3-20cm", "Red&Blue3-30cm",
    "Red&Blue4-0cm", "Red&Blue4-10cm", "Red&Blue4-20cm", "Red&Blue4-30cm", "Purple5-0cm", "Purple5-10cm", "Purple5-20cm", "Purple5-30cm",
    "Red&Blue6-0cm", "Red&Blue6-10cm", "Red&Blue6-20cm", "Red&Blue6-30cm", "Full7-0cm", "Full7-10cm", "Full7-20cm", "Full7-30cm", "Purple8-0cm",
    "White9-0cm", "White9-10cm", "White9-20cm", "White9-30cm", "Purple10-0cm", "Purple10-10cm", "Purple10-20cm"]
  constructor(
    public dialogRef: MatDialogRef<PortersStress>,
    public connectionService: OnoApiService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }
  ngOnInit() {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  setsa(val) {
    this.data['address'] = val
  }
}


@Component({
  selector: 'draw-page',
  templateUrl: 'draw-page.html',
})
export class DrawerStress {
  drawers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
  slots = ["Pit-stop","Window1", "Window2", "Window3", "Window4", "Window6", "Window7", "Window8", "Buio1", "Buio2", "Buio3", "Full1-0cm", "Full1-10cm", "Full1-20cm", "Full1-30cm",
    "Red&Blue2-10cm", "Red&Blue2-20cm", "Red&Blue2-30cm", "Red&Blue3-0cm", "Red&Blue3-10cm", "Red&Blue3-20cm", "Red&Blue3-30cm",
    "Red&Blue4-0cm", "Red&Blue4-10cm", "Red&Blue4-20cm", "Red&Blue4-30cm", "Purple5-0cm", "Purple5-10cm", "Purple5-20cm", "Purple5-30cm",
    "Red&Blue6-0cm", "Red&Blue6-10cm", "Red&Blue6-20cm", "Red&Blue6-30cm", "Full7-0cm", "Full7-10cm", "Full7-20cm", "Full7-30cm", "Purple8-0cm",
    "White9-0cm", "White9-10cm", "White9-20cm", "White9-30cm", "Purple10-0cm", "Purple10-10cm", "Purple10-20cm"]
  constructor(
    public dialogRef: MatDialogRef<DrawerStress>,
    public connectionService: OnoApiService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }
  ngOnInit() {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  setsa(val) {
    this.data['address'] = val
  }
}



@Component({
  selector: 'shuttle-page',
  templateUrl: 'shuttle-page.html',
})
export class ShuttleStress {
  plcs: ["192.168.60.5:502"]

  constructor(
    public dialogRef: MatDialogRef<ShuttleStress>,
    public connectionService: OnoApiService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }
  ngOnInit() {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  setsa(val) {
    this.data['address'] = val
  }
}
