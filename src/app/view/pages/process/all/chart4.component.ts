import { Component, OnInit } from '@angular/core';
import * as CanvasJS from './canvasjs.min';
//var CanvasJS = require('./canvasjs.min');

@Component({
	selector: 'chartheight2',
	templateUrl: './chartheight2.html'
})

export class ChartHeight2 implements OnInit {
	ngOnInit() {

		let dataPoints = [{ y: 0, x: 0 }, { y: 0, x: 1 }, { y: 0, x: 2 }, { y: 0.1, x: 3 }, { y: 0.15, x: 4 }, { y: 0.2, x: 5 }, { y: 0.22, x: 6 }, { y: 0.3, x: 7 }, { y: 0.5, x: 8 }, { y: 0.5, x: 9 }, { y: 0.6, x: 10 },
		{ y: 0.8, x: 11 }, { y: 0.85, x: 12 }, { y: 0.9, x: 13 }, { y: 1, x: 14 }, { y: 1.5, x: 15 }, { y: 2, x: 16 }, { y: 2.5, x: 17 }, { y: 3.5, x: 18 }, { y: 4.5, x: 19 }, { y: 6, x: 20 }];
		let dataPoints2 = [{ y: 0, x: 0 }, { y: 0, x: 1 }, { y: 0, x: 2 }, { y: 0, x: 3 }, { y: 0.1, x: 4 }, { y: 0.1, x: 5 }, { y: 0.3, x: 6 }, { y: 0.3, x: 7 }, { y: 0.4, x: 8 }, { y: 0.4, x: 9 }, { y: 0.4, x: 10 },
		{ y: 0.5, x: 11 }, { y: 0.85, x: 12 }, { y: 0.9, x: 13 }, { y: 0.9, x: 14 }, { y: 1.4, x: 15 }, { y: 1.9, x: 16 }, { y: 2.5, x: 17 }, { y: 3.4, x: 18 }, { y: 4.4, x: 19 }, { y: 6, x: 20 }];
		let chartheight = new CanvasJS.Chart("chartheight", {
			zoomEnabled: true,
			animationEnabled: true,
			axisX: {
				title: "day",
			},
			axisY: {
				title: "[cm]",
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

		chartheight.render();
	}
}