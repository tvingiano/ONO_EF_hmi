
import { Component, OnInit, Input } from '@angular/core';
import { IOrderInfo } from 'src/app/model/orders/orders-info';

@Component({
  selector: 'app-order-production-chart',
  templateUrl: './order-production-chart.component.html',
  styleUrls: ['./order-production-chart.component.scss']
})
export class OrderProductionChartComponent implements OnInit {

  @Input() data: IOrderInfo;

  constructor() { }

  dataSource: {
    day: string;
    value: number;
    min: number;
    max: number;
  }[] = [];

  ngOnInit() {
    console.log('ehi i have data!', this.data);

    let observedDuration;
    let duration;

    if (this.data.RealStartTime) {
      duration = (new Date(this.data.RealEndTime).getTime() - new Date(this.data.RealStartTime).getTime())  / (1440 * 60 * 60 * 24);
      observedDuration = (new Date().getTime() - new Date(this.data.RealStartTime).getTime())  / (1440 * 60 * 60 * 24);
    } else {
      duration = (new Date(this.data.ScheduledEndTime).getTime() - new Date(this.data.ScheduledStartTime).getTime())/(1440 * 60 * 60 * 24);
      observedDuration = (new Date().getTime() - new Date(this.data.ScheduledStartTime).getTime())  / (1440 * 60 * 60 * 24);
    }

    console.log(duration + '/' + observedDuration);


  }

}
