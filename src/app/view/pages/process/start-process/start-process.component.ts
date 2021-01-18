import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IInfoProcess } from 'src/app/model/interface/IInfoProcess';
import { UrlService } from 'src/app/service/url.service';

@Component({
  selector: 'app-start-process',
  templateUrl: './start-process.component.html',
  styleUrls: ['./start-process.component.scss']
})
export class StartProcessComponent implements OnInit {


  process: IInfoProcess;

  constructor(
    private router: Router,
    private urlService: UrlService,
  ) {
  }

  currentState = 0;

  phases = ['preparation', 'substrates and supports', 'seed', 'ciao', 'ciao'];

  ngOnInit() {

    this.process = history.state.process;

    if (this.process === undefined) {

      console.log('go back'); 
      this.router.navigate(['/processes/manage']);

      return;
    }

    console.log(this.process);
  }

  next() {
    if (this.currentState >= (this.phases.length - 1)) {
      this.router.navigate(['/processes']); // THIS NEEDS TO BE CHANGED TO A "COMPLETION" PAGE
    } else {
      this.currentState ++;
    }
  }
}
