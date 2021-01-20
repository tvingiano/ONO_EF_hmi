import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IInfoProcess } from 'src/app/model/interface/IInfoProcess';
import { OnoApiService } from 'src/app/service/ono-api.service';
import { UrlService } from 'src/app/service/url.service';

import { trigger, state, style, animate, transition } from '@angular/animations';
import { userInfo } from 'os';

@Component({
  selector: 'app-start-process',
  templateUrl: './start-process.component.html',
  styleUrls: ['./start-process.component.scss'],
  animations: [
    trigger('fadeSlideInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate('1s', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
      transition(':leave', [
        animate('1s', style({ opacity: 0, transform: 'translateY(10px)' })),
      ]),
    ]),
  ]

})
export class StartProcessComponent implements OnInit {


  process: IInfoProcess;

  constructor(
    private router: Router,
    private urlService: UrlService,
    private api: OnoApiService
  ) {
  }

  currentState = 0;

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

  botMessage = '';
  refill;

  ngOnInit() {

    this.process = history.state.process;

    if (this.process === undefined) {

      console.log('go back');
      this.router.navigate(['/processes/manage']);

      return;
    }


    // check for recipe firstrefill info
    this.api.getFullRecipes().then(res => {
      const f = res.find(x => x.Recipename === this.process.Recipe);
      this.refill = f.FirstRefill;
    });

  }

  next() {

    switch (true) {
      case this.currentState === 0:
        this.botMessage = 'OK, ti porto il cassetto fuori!'; break;

      case (this.currentState === 1 && this.refill.Active === true && this.refill.Type === 'Spray'):
        this.botMessage = 'OK, ti inzuppo il terreno prima della semina'; break;
        // mand ail cassetto a fare il refill

      case (this.currentState === 1 && this.refill.Active === true && this.refill.Type !== 'Spray'):
        this.botMessage = 'OK, porto il tuo cassetto a casina'; break;
      
      case this.currentState === 2:
        this.botMessage = 'OK, porto il tuo cassetto a casina'; break;
    }

    setTimeout(_ => {
      this.currentState ++;
    }, 2000);

  }
}
