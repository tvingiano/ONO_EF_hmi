import { Component, OnInit } from '@angular/core';
import * as CanvasJS from './canvasjs.min';
//var CanvasJS = require('./canvasjs.min');

@Component({
	selector: 'chartarea2',
	templateUrl: './chartarea2.html'
})

export class ChartArea2 implements OnInit {
	ngOnInit() {

		let dataPoints = [{ y: 0, x: 0 }, { y: 0, x: 1 }, { y: 0, x: 2 }, { y: 1, x: 3 }, { y: 2, x: 4 }, { y: 3, x: 5 }, { y: 5, x: 6 }, { y: 8, x: 7 }, { y: 13, x: 8 }, { y: 21, x: 9 }, { y: 34, x: 10 },
		{ y: 55, x: 11 }, { y: 89, x: 12 }, { y: 130, x: 13 }, { y: 250, x: 14 }, { y: 380, x: 15 }, { y: 420, x: 16 }, { y: 500, x: 17 }, { y: 520, x: 18 }, { y: 530, x: 19 }, { y: 535, x: 20 }];
		let dataPoints2 = [{ y: 0, x: 0 }, { y: 0, x: 1 }, { y: 0, x: 2 }, { y: 1, x: 3 }, { y: 1, x: 4 }, { y: 4, x: 5 }, { y: 5, x: 6 }, { y: 7, x: 7 }, { y: 12, x: 8 }, { y: 20, x: 9 }, { y: 20, x: 10 },
		{ y: 40, x: 11 }, { y: 89, x: 12 }, { y: 127, x: 13 }, { y: 240, x: 14 }, { y: 375, x: 15 }, { y: 418, x: 16 }, { y: 490, x: 17 }, { y: 518, x: 18 }, { y: 528, x: 19 }, { y: 535, x: 20 }];
		let chartarea = new CanvasJS.Chart("chartarea", {
			zoomEnabled: true,

			animationEnabled: true,
			axisX: {
				title: "day",
			},
			axisY: {
				title: "[cm^2]",
			},

			title: {
			},
			data: [
				{
					showInLegend: true,
					type: "line",
					name: "Expected values",
					dataPoints: dataPoints
				},
				{
					showInLegend: true,

					type: "line",
					name: "Measured values",
					dataPoints: dataPoints2
				}]
		});

		chartarea.render();
	}
}