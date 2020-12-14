import { Component, OnInit } from '@angular/core';
import * as CanvasJS from './canvasjs.min';
//var CanvasJS = require('./canvasjs.min');
 
@Component({
	selector: 'chart-one',
	templateUrl: './chart.html'
})
  
export class Chartone implements OnInit {
	ngOnInit() {
		let chart = new CanvasJS.Chart("chartContainer", {
		animationEnabled: true,
		title: {
		},
		data: [{
			type: "column",
			dataPoints: [
				{ y: 0, label: "1(Full)" },
				{ y: 16, label: "2(Red&Blue)" },
				{ y: 0, label: "3(Red&Blue)" },
				{ y: 16, label: "4(Red&Blue)" },
				{ y: 0, label: "5(Purple)" },
				{ y: 0, label: "6(Red&Blue)" },
				{ y: 0, label: "7(Full)" },
				{ y: 0, label: "8(Purple)" },
				{ y: 16, label: "9(White)" },
				{ y: 0, label: "10(Purple)" }
			]
		}]
	});
		
	chart.render();
    }
}