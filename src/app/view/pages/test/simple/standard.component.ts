import { Component, OnInit, ViewChild, AfterViewChecked, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OnoApiService } from '../../../../service/ono-api.service';
import { Router } from '@angular/router';
import { BusyService } from 'src/app/service/busy.service';

export interface DialogData {
  text: string;
}

@Component({
  selector: 'standard-plc',
  templateUrl: './standard.component.html',
  styleUrls: ['./standard.component.scss']
})
export class StandardComponent implements OnInit, AfterViewChecked {
  height: number;
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
  direction: string;
  sides = ['north', 'south'];

  constructor(
    public dialog: MatDialog,
    public connectionService: OnoApiService,
    private router: Router,
    private busyService: BusyService
  ) { }

    BUTTONLIST = [
      {
        id: 1,
        title: 'Height',
        icon: 'open_in_new'
      },
      {
        id: 2,
        title: 'Get',
        icon: 'eject'
      },
      {
        id: 3,
        title: 'Put',
        icon: 'get_app'
      },
      {
        id: 4,
        title: 'Reset PLC',
        icon: 'wifi_protected_setup'
      },
      {
        id: 5,
        title: 'Poles',
        icon: 'unfold_more'
      },
      {
        id: 6,
        title: 'Belt',
        icon: 'multiple_stop'
      },
      {
        id: 7,
        title: 'Emergency PUT',
        icon: 'home'
      },
      {
        id: 8,
        title: 'Emergency BELT',
        icon: 'home'
      },

    ];

  ngAfterViewChecked() {
  }
  home() {
    this.router.navigate(['plc']);
  }
  ngOnInit() {
  }

  transAction(id){
    this.busyService.toggleDrawerState();
    switch (id) {
      case 1: { this.Height(); } break;
      case 2: { this.Get(); } break;
      case 3: { this.Put(); } break;
      case 4: { this.onReset(); } break;
      case 5: { this.onPoles(); } break;
      case 6: { this.onBelts(); } break;
      default: alert('this should not be possible O.o'); break;
    }
  }

  Height(): void {
    const dialogRef = this.dialog.open(HeightPlc, {
      width: '500px',
      data: {  height: this.height, acceleration: this.acceleration, speed: this.speed, deceleration: this.deceleration }
    });
    const me = this;
    dialogRef.afterClosed().subscribe(result => {
      if (!result) {this.busyService.inactiveDrawerState({Response: 'action canceled'}); return; }

      this.busyService.commitDrawerState(result);
      me.connectionService.height(result).subscribe(x => {
        this.busyService.inactiveDrawerState(x);
      });

    });
  }

  Get(): void {
    const dialogRef = this.dialog.open(GetPlc, {
      width: '500px',
      data: {
        side: this.side,
        acceleration: this.acceleration,
        speed: this.speed,
        deceleration: this.deceleration,
        direction: this.direction
      }
    });
    const me = this;
    dialogRef.afterClosed().subscribe(result => {
      if (!result) {this.busyService.inactiveDrawerState({Response: 'action canceled'}); return; }

      this.busyService.commitDrawerState(result);
      me.connectionService.get(result).subscribe(x => {
        this.busyService.inactiveDrawerState(x);
      });

    });
  }
  Put(): void {
    const dialogRef = this.dialog.open(PutPlc, {
      width: '500px',
      data: {
        side: this.side,
        acceleration: this.acceleration,
        speed: this.speed,
        deceleration: this.deceleration,
        direction: this.direction
      }
    });
    const me = this;
    dialogRef.afterClosed().subscribe(result => {
      if (!result) {this.busyService.inactiveDrawerState({Response: 'action canceled'}); return; }

      this.busyService.commitDrawerState(result);
      me.connectionService.put(result).subscribe(x => {
        this.busyService.inactiveDrawerState(x);
      });

    });
  }
  onReset(): void {
    this.connectionService
      .resetParams()
      .subscribe(
        value => {
          this.busyService.inactiveDrawerState(value);
        }
      );
  }

  onPoles(): void {
    const dialogRef = this.dialog.open(SetPole, {
      width: '500px',
      data: {pole: ''}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (!result) {this.busyService.inactiveDrawerState({Response: 'action canceled'}); return; }

      this.busyService.commitDrawerState(result);
      this.connectionService.SetPole(result.data.pole).subscribe(x => {
        this.busyService.inactiveDrawerState(x);
      })
    });
  }

  onBelts(): void {
    const dialogRef = this.dialog.open(SetBelt, {
      width: '500px',
      data: {belt: ''}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (!result) {this.busyService.inactiveDrawerState({Response: 'action canceled'}); return; }

      this.busyService.commitDrawerState(result);
      this.connectionService.SetBelt(result.data.belt).subscribe(x => {
        this.busyService.inactiveDrawerState(x);
      });
    });
  }

  drawerState() {
    const me = this.busyService.state;
    return (me.drawer.active === true || me.refill.active === true) ? true : false;
  }
}


@Component({
  selector: 'put-page',
  templateUrl: 'put-page.html',
})
export class PutPlc implements OnInit {
  sides = ['north', 'south'];

  constructor(
    public dialogRef: MatDialogRef<PutPlc>,
    public connectionService: OnoApiService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }
  ngOnInit() {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  setsa(val) {
    this.data['address'] = val;
  }
}


@Component({
  selector: 'get-page',
  templateUrl: 'get-page.html',
})
export class GetPlc implements OnInit {
  sides = ['north', 'south'];

  constructor(
    public dialogRef: MatDialogRef<GetPlc>,
    public connectionService: OnoApiService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }
  ngOnInit() {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  setsa(val) {
    this.data['address'] = val;
  }
}



@Component({
  selector: 'height-page',
  templateUrl: 'height-page.html',
})
export class HeightPlc implements OnInit {
  plcs: ['192.168.60.5:502'];

  constructor(
    public dialogRef: MatDialogRef<HeightPlc>,
    public connectionService: OnoApiService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }
  ngOnInit() {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  setsa(val) {
    this.data['address'] = val;
  }
}

@Component({
  selector: 'pole-page',
  templateUrl: 'pole-page.html',
})
export class SetPole implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<SetPole>,
    @Inject(MAT_DIALOG_DATA) public data: {pole: number}) { }

  ngOnInit() {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  submit() {
    this.dialogRef.close(this.data);
  }
}

@Component({
  selector: 'belt-page',
  templateUrl: 'belt-page.html',
})
export class SetBelt implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<SetPole>,
    @Inject(MAT_DIALOG_DATA) public data: {belt: number}) { }

  ngOnInit() {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  submit() {
    this.dialogRef.close(this.data);
  }
}
