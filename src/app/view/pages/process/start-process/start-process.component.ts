import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { IInfoProcess } from 'src/app/model/interface/IInfoProcess';
import { OnoApiService } from 'src/app/service/ono-api.service';
import { UrlService } from 'src/app/service/url.service';
import { BusyService } from '../../../../service/busy.service';
import {  trigger,  transition,  state,  style,  animate} from '@angular/animations';

@Component({
  selector: 'app-start-process',
  templateUrl: './start-process.component.html',
  styleUrls: ['./start-process.component.scss'],
  animations: [
    trigger(
      'fade',
      [
        state(
          'in', style({ opacity: 1 })),
          transition(
            ':enter',
            [
              style({ opacity: 0 }),
              animate(600)
            ]
          ),
          transition(
            ':leave',
            animate(600, style({ opacity: 0 }))
        ),

        state(
          'out', style({ opacity: 0 })),
          transition(
            ':enter',
            [
              style({ opacity: 1 }),
              animate(600)
            ]
          ),
          transition(
            ':leave',
            animate(600, style({ opacity: 1 }))
        )
      ]
    )
  ]

})
export class StartProcessComponent implements OnInit {


  process: IInfoProcess;

  constructor(
    private router: Router,
    private urlService: UrlService,
    private api: OnoApiService,
    private busyService: BusyService,
    private snack: MatSnackBar,
  ) {
  }

  currentState = 0;
  movingDrawer = false;

  message = '';
  refill;
  trayList;

  processData: {
    ProcessID: number;
    DrawerID: number;
    Recipe: string;
    LoadPhases: {Title: string, Description: string}[];
  } = undefined;

  ngOnInit() {

    this.process = history.state.process;

    if (this.process === undefined) {
      this.router.navigate(['/processes/manage']);

      return;
    } else {
      this.processData = {
        ProcessID: this.process.ProcessID,
        DrawerID: 10,
        Recipe: this.process.Recipe,
        LoadPhases: [
          {
            Title: 'Ingredients',
            Description: 'The recipe requires 1Kg of "tropical basil" seeds and rockwool as a substrate. \n Be sure to have all these stuff near by.'
          },
          {
            Title: 'Substrates and supports',
            Description: 'Place supports and then substrates on the tray.'
          },
          {
            Title: 'Seed',
            Description: 'Seed 1Kg of "tropical basil" seeds on the substrate.'
          }
      ]};
    }

    console.warn('input processdata= ', this.processData)


    // check for recipe firstrefill info
    this.refill = this.api.getFullRecipes().then(res => {
      const f = res.find(x => x.Recipename === this.processData.Recipe);
      return f.FirstRefill;
    });

    // get process's tray ID that needs to get moving
    this.trayList = this.api.getFullDrawers().subscribe(x => {
      console.log('full drawers: ', x);
      return x;
    });

  }

  test() {
    console.log('==================================================');
    console.log('$currentState = ', this.currentState, '/', this.processData.LoadPhases.length);
    console.log('$refill = ', this.refill);
  }

  next() {

    const data = this.processData;

    if (!this.refill) {
      switch (this.currentState) {
        case 0: this.toExternal(data.DrawerID); break;
        case 1: break;
        case 2: this.toHome(); break;
        case 3: this.getNextProcess(); break;
        case 4: break;
      }
    } else {
      switch (this.currentState) {
        case 0: this.toExternal(data.DrawerID);
          break;
        case 1: this.makeRefill()
          break;
        case 2: this.toHome();
          break;
        case 3:
          break;
        case 4: this.getNextProcess();
          break;
      }
    }
  }

  increment() {
    if (this.currentState < this.processData.LoadPhases.length) {
      this.currentState ++;
    } else  {
      this.currentState = 0;
    }
  }

  /**
   * It's used to move any tray in external based on input TrayID
   * @param trayID - Tray ID to move to External
   */
  toExternal(trayID: number) {
    const val = Math.random() * 10 * 1000;
    this.openSnackbar(val, `We\'re taking the tray to you, pls wait ${(val / 1000).toPrecision(2)} seconds`);
    this.movingDrawer = true;
    setTimeout(_ => {
      this.movingDrawer = false;
    }, val + 1000);
  }

  /**
   * It's used to make firstRefill before seed the tray
   */
  makeRefill(): void {
    const val = Math.random() * 10 * 1000;
    this.openSnackbar(val, `We\'re moistening the soil, pls wait ${(val / 1000).toPrecision(2)} seconds`);
    this.movingDrawer = true;
    setTimeout(_ => {
      this.movingDrawer = false;
    }, val + 1000);
  }

  /**
   * It's used to move the newly seed tray in home
   */
  toHome(): void {
    const val = Math.random() * 10 * 1000;
    this.openSnackbar(val, `We\'re moving the tray at home, pls wait ${(val / 1000).toPrecision(2)} seconds`);
    this.movingDrawer = true;
    setTimeout(_ => {
      this.movingDrawer = false;
    }, val + 1000);
  }

  /**
   * used to go to next "to-start" process
   */
  getNextProcess() {
    const val = Math.random() * 10 * 1000;
    this.openSnackbar(val, `We\'re preparing next process, pls wait ${(val / 1000).toPrecision(2)} seconds`);
    this.movingDrawer = true;
    setTimeout(_ => {
      this.movingDrawer = false;
    }, val + 1000);
  }

  openSnackbar(time, msg) {
    this.snack.open(msg, '', { duration: time});
    setTimeout(_ => {
      this.snack.open('COMPLETATO', '', {
        panelClass: 'successSnackBar'
      });
      this.increment();
    }, time + 500);
  }


}
