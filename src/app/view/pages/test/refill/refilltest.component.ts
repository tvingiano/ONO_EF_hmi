import { Component, OnInit, ViewChild, AfterViewChecked, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { OnoApiService } from '../../../../service/ono-api.service';
import { Router } from '@angular/router';
import { BusyService } from 'src/app/service/busy.service';

export interface DialogData {
  text: string;
}

@Component({
  selector: 'refilltest',
  templateUrl: './refilltest.component.html',
  styleUrls: ['./refilltest.component.scss']
})
export class RefillTestComponent implements OnInit, AfterViewChecked {
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
  sides = ['north', 'south'];
  tank;
  toadd;
  toaspirate;
  totransfer;
  Min;
  Max;
  Unc;
  Del;
  DelCheck;
  purge;

  constructor(
    public dialog: MatDialog,
    public connectionService: OnoApiService,
    private router: Router,
    private busyService: BusyService,
  ) { }

  BUTTONLIST = [
    {
      title: 'Tank quantity',
      imgUrl: 'url(/assets/images/refill_image/quantity.svg)',
      id: 1,
    },
    {
      title: 'Add Water',
      imgUrl: 'url(/assets/images/refill_image/addwater.svg)',
      id: 2,
    },
    {
      title: 'Add Ozonated',
      imgUrl: 'url(/assets/images/refill_image/addozonwater.svg)',
      id: 3,
    },
    {
      title: 'Purge Solution',
      imgUrl: 'url(/assets/images/refill_image/purge.svg)',
      id: 4,
    },
    {
      title: 'Tub suction',
      imgUrl: 'url(/assets/images/refill_image/suction.svg)',
      id: 5,
    },
    {
      title: 'Tub Transfer',
      imgUrl: 'url(/assets/images/refill_image/transfer.svg)',
      id: 6,
    },
    {
      title: 'Spray',
      imgUrl: 'url(/assets/images/refill_image/spray.svg)',
      id: 7,
    },
    {
      title: 'Measure Solution',
      imgUrl: 'url(/assets/images/refill_image/measure.svg)',
      id: 8,
    },
    {
      title: 'Solution correction',
      imgUrl: 'url(/assets/images/refill_image/solCorrection.svg)',
      id: 17,
    },
    {
      title: 'Clean Filter',
      imgUrl: 'url(/assets/images/refill_image/filter.svg)',
      id: 9,
    },
    {
      title: 'Clean System',
      imgUrl: 'url(/assets/images/refill_image/totalclean.svg)',
      id: 10,
    },
    {
      title: 'Reboot',
      imgUrl: 'url(/assets/images/refill_image/reboot.svg)',
      id: 11,
    },
    {
      title: 'Settings',
      imgUrl: 'url(/assets/images/refill_image/settings.svg)',
      id: 12,
    },
    {
      title: 'Add Nutrients',
      imgUrl: 'url(/assets/images/refill_image/addNutrient.svg)',
      id: 13,
    },
    {
      title: 'Purge Nutrients',
      imgUrl: 'url(/assets/images/refill_image/purgeNutrient.svg)',
      id: 14,
    },
    {
      title: 'Fill Cart Nutrients',
      imgUrl: 'url(/assets/images/refill_image/fillNutrient.svg)',
      id: 15,
    },
    {
      title: 'Nutrient Quantity',
      imgUrl: 'url(/assets/images/refill_image/solutionQuantity.svg)',
      id: 16,
    }
  ];

  // BUTTONLIST_separated = [
  //   {
  //     group: 'water?',
  //     btns: [
  //       {
  //         title: 'Tank quantity',
  //         imgUrl: 'url(/assets/images/refill_image/quantity.svg)',
  //         id: 1,
  //       },
  //       {
  //         title: 'Add Water',
  //         imgUrl: 'url(/assets/images/refill_image/addwater.svg)',
  //         id: 2,
  //       },
  //       {
  //         title: 'Add Ozonated',
  //         imgUrl: 'url(/assets/images/refill_image/addozonwater.svg)',
  //         id: 3,
  //       },
  //       {
  //         title: 'Purge Solution',
  //         imgUrl: 'url(/assets/images/refill_image/purge.svg)',
  //         id: 4,
  //       },
  //     ]
  //   },
  //   {
  //     group: 'tub?',
  //     btns: [
  //     ]
  //   },

  //   {
  //     title: 'Tub suction',
  //     imgUrl: 'url(/assets/images/refill_image/suction.svg)',
  //     id: 5,
  //   },
  //   {
  //     title: 'Tub Transfer',
  //     imgUrl: 'url(/assets/images/refill_image/transfer.svg)',
  //     id: 6,
  //   },
  //   {
  //     title: 'Spray',
  //     imgUrl: 'url(/assets/images/refill_image/spray.svg)',
  //     id: 7,
  //   },
  //   {
  //     title: 'Measure Solution',
  //     imgUrl: 'url(/assets/images/refill_image/measure.svg)',
  //     id: 8,
  //   },
  //   {
  //     title: 'Clean Filter',
  //     imgUrl: 'url(/assets/images/refill_image/filter.svg)',
  //     id: 9,
  //   },
  //   {
  //     title: 'Clean System',
  //     imgUrl: 'url(/assets/images/refill_image/totalclean.svg)',
  //     id: 10,
  //   },
  //   {
  //     title: 'Reboot',
  //     imgUrl: 'url(/assets/images/refill_image/reboot.svg)',
  //     id: 11,
  //   },
  //   {
  //     title: 'Settings',
  //     imgUrl: 'url(/assets/images/refill_image/settings.svg)',
  //     id: 12,
  //   },
  //   {
  //     title: 'Add Nutrients',
  //     imgUrl: 'url(/assets/images/refill_image/addNutrient.svg)',
  //     id: 13,
  //   },
  //   {
  //     title: 'Purge Nutrients',
  //     imgUrl: 'url(/assets/images/refill_image/purgeNutrient.svg)',
  //     id: 14,
  //   },
  //   {
  //     title: 'Fill Cart Nutrients',
  //     imgUrl: 'url(/assets/images/refill_image/fillNutrient.svg)',
  //     id: 15,
  //   },
  //   {
  //     title: 'Nutrient Quantity',
  //     imgUrl: 'url(/assets/images/refill_image/solutionQuantity.svg)',
  //     id: 16,
  //   }
  // ];


  ngAfterViewChecked() {
  }
  home() {
    this.router.navigate(['plc']);
  }
  ngOnInit() {
  }

  nope(){
    alert('not now bro :)');
  }


  transAction(btnId) {
    switch (btnId) {
      case 1: { this.Quantity();          }break;
      case 2: { this.Addwater();          }break;
      case 3: { this.AddOzonatedWater();  }break;
      case 4: { this.Purge();             }break;
      case 5: { this.Suction();           }break;
      case 6: { this.Transfer();          }break;
      case 7: { this.Spray();             }break;
      case 8: { this.Measure();           }break;
      case 9: { this.CleanFilter();       }break;
      case 10: { this.TotalClean();       }break;
      case 11: { this.Boot();             }break;
      case 12: { this.Settings();         }break;
      case 13: { this.CartServe();        }break;
      case 14: { this.CartPurge();        }break;
      case 15: { this.CartAdd();          }break;
      case 16: { this.CartQuantity();     }break;
      case 17: { this.correctSolution();     }break;

      default: break;
    }
  }


  Purge(): void {
    this.busyService.toggleRefillStateTest();
    this.busyService.commitRefillStateTest('purge');
    this.connectionService.purge({ Frequency: 0 }).subscribe(val => {
      setTimeout(_ => {
        this.busyService.inactiveRefillStateTest(val);
      }, 3000);
    });
  }
  Quantity(): void {
    this.busyService.toggleRefillStateTest();
    this.busyService.commitRefillStateTest('get quantity');
    this.connectionService.quantity({}).subscribe(value => {
      // console.log('######' + value);
      setTimeout(_ => {
        this.busyService.inactiveRefillStateTest(value);
      }, 1000);
    });
  }
  CartQuantity(): void {
    this.busyService.toggleRefillStateTest();
    this.busyService.commitRefillStateTest('get quantity');
    this.connectionService.cartquantity().subscribe(value => {
      setTimeout(_ => {
        this.busyService.inactiveRefillStateTest(value);
      }, 1000);
    });
  }
  CleanFilter(): void {
    this.busyService.toggleRefillStateTest();
    this.busyService.commitRefillStateTest('cleaning');
    this.connectionService.cleanfilter({ Frequency: 0 }).subscribe(value => {
      setTimeout(_ => {
        this.busyService.inactiveRefillStateTest(value);
      }, 3000);
    });
  }
  TotalClean(): void {
    this.busyService.toggleRefillStateTest();
    this.busyService.commitRefillStateTest('total cleaning');
    this.connectionService.totalclean({ Frequency: 0 }).subscribe(value => {
      setTimeout(_ => {
        this.busyService.inactiveRefillStateTest(value);
      }, 3000);
    });
  }
  Boot(): void {
    this.busyService.toggleRefillStateTest();
    this.busyService.commitRefillStateTest('booting');
    this.connectionService.boot({ Frequency: 0 }).subscribe(value => {
      setTimeout(_ => {
        this.busyService.inactiveRefillStateTest(value);
      }, 3000);
    });
  }
  Suction(): void {
    this.busyService.toggleRefillStateTest();
    const dialogRef = this.dialog.open(Suction, {
      width: '500px',
      data: { tank: this.tank, toaspirate: this.toaspirate }
    });
    const me = this;
    dialogRef.afterClosed().subscribe(result => {
      if (!result) {this.busyService.inactiveRefillStateTest({Response: 'action canceled'}); return; }

      this.busyService.commitRefillStateTest('suction of tank ' + result.tank);
      me.connectionService.suction({
        Tank: parseInt(result.tank, 10),
        ToAspirate: parseFloat(result.toaspirate),
        Frequency: 0
      }).subscribe(value => {
        setTimeout(_ => {
          this.busyService.inactiveRefillStateTest(value);
        }, 3000);
      });

    });
  }
  Settings(): void {
    this.busyService.toggleRefillState();
    const dialogRef = this.dialog.open(Settings, {
      width: '500px',
      data: {
        Min: this.Min,
        Max: this.Max,
        Unc: this.Unc,
        Del: this.Del,
        DelCheck: this.DelCheck
      }
    });
    const me = this;
    dialogRef.afterClosed().subscribe(result => {
      if (!result) {this.busyService.inactiveRefillStateTest({Response: 'action canceled'}); return; }

      this.busyService.commitRefillStateTest('setting');
      me.connectionService.settings({
        Min: parseInt(result.Min, 10),
        Max: parseFloat(result.Max),
        Unc: parseInt(result.Unc, 10),
        Del: parseFloat(result.Del),
        DelCheck: parseInt(result.DelCheck, 10),
        Frequency: 0
      }).subscribe(value => {
        setTimeout(_ => {
          this.busyService.inactiveRefillStateTest(value);
        }, 3000);
      });

    });
  }
  Measure(): void {
    this.busyService.toggleRefillState();
    const dialogRef = this.dialog.open(Measure, {
      width: '500px',
      data: { purge: this.purge}
    });
    const me = this;
    dialogRef.afterClosed().subscribe(result => {
      if (!result) {this.busyService.inactiveRefillStateTest({Response: 'action canceled'}); return; }

      this.busyService.commitRefillStateTest('measuring');
      let a;
      result.purge === 'Yes' ? a = true : a = false;
      me.connectionService.measure({
        Purge: a,
        Frequency: 0
      }).subscribe(value => {
        setTimeout(_ => {
          this.busyService.inactiveRefillStateTest(value);
        }, 3000);
      });
    });
  }

  Transfer(): void {
    this.busyService.toggleRefillState();
    const dialogRef = this.dialog.open(Transfer, {
      width: '500px',
      data: { tank: this.tank, totransfer: this.totransfer }
    });
    const me = this;
    dialogRef.afterClosed().subscribe(result => {
      if (!result) {this.busyService.inactiveRefillStateTest({Response: 'action canceled'}); return; }

      this.busyService.commitRefillStateTest('transfering');
      me.connectionService.transfer({
        Tank: parseInt(result.tank, 10),
        ToTransfer: parseFloat(result.totransfer),
        Frequency: 0
      }).subscribe(value => {
        setTimeout(_ => {
          this.busyService.inactiveRefillStateTest(value);
        }, 3000);
      });

    });
  }
  Spray(): void {
    this.busyService.toggleRefillState();
    const dialogRef = this.dialog.open(Spray, {
      width: '500px',
      data: { totransfer: this.totransfer }
    });
    const me = this;
    dialogRef.afterClosed().subscribe(result => {
      if (!result) {this.busyService.inactiveRefillStateTest({Response: 'action canceled'}); return; }

      this.busyService.commitRefillStateTest('spraying');
      me.connectionService.spray({
        ToTransfer: parseFloat(result.totransfer),
        Frequency: 0
      }).subscribe(value => {
        setTimeout(_ => {
          this.busyService.inactiveRefillStateTest(value);
        }, 3000);
      });

    });
  }
  AddOzonatedWater(): void {
    this.busyService.toggleRefillState();
    const dialogRef = this.dialog.open(Addozonated, {
      width: '500px',
      data: { totransfer: this.totransfer }
    });
    const me = this;
    dialogRef.afterClosed().subscribe(result => {
      if (!result) {this.busyService.inactiveRefillStateTest({Response: 'action canceled'}); return; }

      this.busyService.commitRefillStateTest('settings');
      me.connectionService.ozonated({
        ToAdd: parseFloat(result.totransfer),
        Frequency: 0
      }).subscribe(value => {
        setTimeout(_ => {
          this.busyService.inactiveRefillStateTest(value);
        }, 3000);
      });

    });
  }
  Addwater(): void {
    this.busyService.toggleRefillState();
    const dialogRef = this.dialog.open(Addwater, {
      width: '500px',
      data: { toadd: this.toadd }
    });
    const me = this;
    dialogRef.afterClosed().subscribe(result => {
      if (!result) {this.busyService.inactiveRefillStateTest({Response: 'action canceled'}); return; }

      this.busyService.commitRefillStateTest('settings');
      me.connectionService.addwater({
        ToAdd: parseFloat(result.toadd),
        Frequency: 0
      }).subscribe(value => {
        setTimeout(_ => {
          this.busyService.inactiveRefillStateTest(value);
        }, 3000);
      });

    });
  }
  CartServe(): void {
    this.busyService.toggleRefillState();
    const dialogRef = this.dialog.open(CartServe, {
      width: '500px',
      data: { tank: this.tank, toadd: this.toadd }
    });
    const me = this;
    dialogRef.afterClosed().subscribe(result => {
      if (!result) {this.busyService.inactiveRefillStateTest({Response: 'action canceled'}); return; }

      this.busyService.commitRefillStateTest('cart serve');
      me.connectionService.cartserve({
        Tank: parseInt(result.tank, 10),
        Quantity: parseFloat(result.toadd)
      }).subscribe(value => {
        setTimeout(_ => {
          this.busyService.inactiveRefillStateTest(value);
        }, 3000);
      });

    });
  }
  CartPurge(): void {
    this.busyService.toggleRefillState();
    const dialogRef = this.dialog.open(CartPurge, {
      width: '500px',
      data: {tank: this.tank, toadd: this.toadd }
    });
    const me = this;
    dialogRef.afterClosed().subscribe(result => {
      if (!result) {this.busyService.inactiveRefillStateTest({Response: 'action canceled'}); return; }

      this.busyService.commitRefillStateTest('cart purge');
      me.connectionService.cartpurge({
        Tank: parseInt(result.tank, 10),
        Quantity: parseFloat(result.toadd)
      }).subscribe(value => {
        setTimeout(_ => {
          this.busyService.inactiveRefillStateTest(value);
        }, 3000);
      });

    });
  }
  CartAdd(): void {
    this.busyService.toggleRefillState();
    const dialogRef = this.dialog.open(CartAdd, {
      width: '500px',
      data: { tank: this.tank, toadd: this.toadd }
    });
    const me = this;
    dialogRef.afterClosed().subscribe(result => {
      if (!result) {this.busyService.inactiveRefillStateTest({Response: 'action canceled'}); return; }

      this.busyService.commitRefillStateTest('cart adding');
      me.connectionService.cartadd({
        Tank: parseInt(result.tank, 10),
        Quantity: parseFloat(result.toadd)
      }).subscribe(value => {
        setTimeout(_ => {
          this.busyService.inactiveRefillStateTest(value);
        }, 3000);
      });

    });
  }

  correctSolution() {
    this.busyService.toggleRefillState();

    const dialogRef = this.dialog.open(CorrectSolution, {
      width: '500px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {this.busyService.inactiveRefillStateTest({Response: 'action canceled'}); return; }

      const data = {
        Ec: result.Ec / 1000,
        Ph: parseFloat(result.Ph),
      };

      this.busyService.commitRefillStateTest('correct solution');

      this.connectionService
      .postSolutionCorrection(data)
      .subscribe(value => {
        this.busyService.inactiveRefillStateTest(value);
      });


      this.busyService.inactiveRefillStateTest({Code: 200, Response: 'OK'});

    });
  }

  drawerState() {
    const me = this.busyService.state;
    if (me.drawer.active === true || me.refill.active === true) {
      return true;
    } else {
      return false;
    }
  }

}
@Component({
  selector: 'cartserver-page',
  templateUrl: 'cartserver-page.html',
})
export class CartServe implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CartServe>,
    public connectionService: OnoApiService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }
  ngOnInit() {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}
@Component({
  selector: 'cartpurge-page',
  templateUrl: 'cartpurge-page.html',
})
export class CartPurge implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CartPurge>,
    public connectionService: OnoApiService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }
  ngOnInit() {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}
@Component({
  selector: 'cartadd-page',
  templateUrl: 'cartadd-page.html',
})
export class CartAdd implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CartAdd>,
    public connectionService: OnoApiService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }
  ngOnInit() {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}
@Component({
  selector: 'transfer-page',
  templateUrl: 'transfer-page.html',
})
export class Transfer implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<Transfer>,
    public connectionService: OnoApiService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }
  ngOnInit() {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}
@Component({
  selector: 'ozonated-page',
  templateUrl: 'ozonated-page.html',
})
export class Addozonated implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<Addozonated>,
    public connectionService: OnoApiService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }
  ngOnInit() {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}
@Component({
  selector: 'spray-page',
  templateUrl: 'spray-page.html',
})
export class Spray implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<Transfer>,
    public connectionService: OnoApiService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }
  ngOnInit() {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}

@Component({
  selector: 'addwater-page',
  templateUrl: 'addwater-page.html',
})
export class Addwater implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<Addwater>,
    public connectionService: OnoApiService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }
  ngOnInit() {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}
@Component({
  selector: 'settings-page',
  templateUrl: 'settings-page.html',
})
export class Settings implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<Settings>,
    public connectionService: OnoApiService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }
  ngOnInit() {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}

@Component({
  selector: 'correct-solution',
  templateUrl: 'correct-solution.html',
})
export class CorrectSolution implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<Suction>,
    public connectionService: OnoApiService,
    @Inject(MAT_DIALOG_DATA) public data: {Ph: number, Ec: number}) { }

  ngOnInit() {
  }

  updatePhSlider(e) {
    this.data.Ph = e.value;
  }
  updatePhInput(e) {
    this.data.Ph = e.srcElement.value;
  }

  updateEcSlider(e) {
    this.data.Ec = e.value;
  }
  updateEcInput(e) {
    this.data.Ec = e.srcElement.value;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}



@Component({
  selector: 'suction-page',
  templateUrl: 'suction-page.html',
})
export class Suction implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<Suction>,
    public connectionService: OnoApiService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }
  ngOnInit() {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}
@Component({
  selector: 'measure',
  templateUrl: 'measure.html',
})
export class Measure implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<Measure>,
    public connectionService: OnoApiService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }
    purges = ['Yes', 'No'];
  ngOnInit() {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}
