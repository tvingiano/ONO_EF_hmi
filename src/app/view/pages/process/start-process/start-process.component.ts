import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IInfoProcess } from 'src/app/model/interface/IInfoProcess';
import { OnoApiService } from 'src/app/service/ono-api.service';
import { UrlService } from 'src/app/service/url.service';

import { trigger, state, style, animate, transition } from '@angular/animations';
import { userInfo } from 'os';
import { Observable } from 'rxjs';
import { IResponse } from 'src/app/model/interface/IResponse';
import { FinalJson } from '../../recipes/editor/model/dataFormat';
import { BusyService } from '../../../../service/busy.service';

@Component({
  selector: 'app-start-process',
  templateUrl: './start-process.component.html',
  styleUrls: ['./start-process.component.scss'],
  animations: []

})
export class StartProcessComponent implements OnInit {


  process: IInfoProcess;

  constructor(
    private router: Router,
    private urlService: UrlService,
    private api: OnoApiService,
    private busyService: BusyService
  ) {
  }

  currentState = 0;
  movingDrawer = false;

  phases = [
    {
      title: 'Ingredients',
      description: 'The recipe requires 1Kg of "tropical basil" seeds and rockwool as a substrate. \n Be sure to have all these stuff near by and then go to next step.'
    },
    {
      title: 'Substrates and supports',
      description: 'Place supports and then substrates on the tray. Then go to next step.'
    },
    {
      title: 'Seed',
      description: 'Seed 1Kg of "tropical basil" seeds on the substrate. Then go to next step.'
    }
  ];

  message = '';
  refill;
  trayList;

  processData: {
    ProcessID: string;
    DrawerID: string;
    RecipeID: string;
    LoadPhases: {Title: string, Description: string}[];
  };

  ngOnInit() {

    this.process = history.state.process;

    if (this.process === undefined) {
      this.router.navigate(['/processes/manage']);

      return;
    }


    // check for recipe firstrefill info
    this.refill = this.api.getFullRecipes().then(res => {
      const f = res.find(x => x.Recipename === this.process.Recipe);
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
    console.log('$currentState = ', this.currentState, '/', this.phases.length);
    console.log('$refill = ', this.refill);
  }

  next() {

    const data = this.processData;

    if (this.currentState < this.phases.length) {
      this.currentState ++;
    } else  {
      this.currentState = 0;
    }

    console.log('avanzato!  ', this.currentState);

    if (!this.refill) {
      switch (this.currentState) {
        case 1: alert('I\'m moving the tray to you'); this.toExternal(data.DrawerID); break;
        case 2: alert('Bene!'); break;
        case 3: alert('I\'m giving these seeds a warm new home'); this.toHome(); break;
        case 4: alert('Gonna get a new empty tray'); this.getNextProcess(); break;
        case 0: alert('Be ready bro'); break;
      }
    } else {
      switch (this.currentState) {
        case 1:
          alert('I\'m moving the tray to you'); this.toExternal(data.DrawerID);
          break;
        case 2:
          alert('OK, I\'m gonna moisten the soil first. Gimme a sec!');
          break;
        case 3:
          alert('I\'m giving these seeds a warm new home');
          break;
        case 4:
          alert('Gonna get a new empty tray'); this.toHome();
          break;
        case 0:
          alert('Be ready bro');
          break;
      }
    }

  }

  /**
   * It's used to move any tray in external based on input TrayID
   * @param trayID - Tray ID to move to External
   */
  toExternal(trayID: string) {
    return 'ciao';
  }

  /**
   * It's used to make firstRefill before seed the tray
   */
  makeRefill(): void {

  }

  /**
   * It's used to move the newly seed tray in home
   */
  toHome(): void {

  }

  /**
   * used to go to next "to-start" process
   */
  getNextProcess() {

  }


}
