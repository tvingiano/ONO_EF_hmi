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

  ngOnInit() {
    try {
      this.process = this.router.getCurrentNavigation().extras.state.process;
    } catch (err) {
      const last_url = this.urlService.history[this.urlService.history.length - 1];
      this.router.navigate(last_url);
    }
    console.log('history: ', this.urlService.history);
  }

}
