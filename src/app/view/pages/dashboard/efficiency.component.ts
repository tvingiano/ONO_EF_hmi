import { Component, OnInit } from '@angular/core';
import * as CanvasJS from './canvasjs.min';
//var CanvasJS = require('./canvasjs.min');
import { OnoApiService } from '../../../service/ono-api.service';

@Component({
	selector: 'efficiency',
	templateUrl: './efficiency.html'
})



export class Efficiency implements OnInit {
	constructor(public connectionService: OnoApiService) { }

	totalGrowth: number;
	totalLight: number;

	ngOnInit() {
		var me = this

		me.connectionService.modulesGet().subscribe((mod) => {
			me.totalGrowth = mod[0].GrowthSlotsNumber;
			me.totalLight = mod[0].LightSlotsNumber;
		})


		me.connectionService.efficiency().then(function (val) {
			var a = []
			var b = []
			val.sort(function (a, b) {
				a = new Date(a.Timestamp);
				b = new Date(b.Timestamp);
				return a > b ? -1 : a < b ? 1 : 0;
			});
			val.forEach(function (va) {
				if (va.Type == "growth") {
					a.push({ y: (va.Value * 100) / (me.totalGrowth), x: new Date(va.Timestamp) })
				} else if (va.Type == "light") {
					b.push({ y: (va.Value * 100) / (me.totalGrowth), x: new Date(va.Timestamp) })
				}
			})

			let charta = new CanvasJS.Chart("chartContainera", {
				zoomEnabled: true,
				animationEnabled: true,
				title: {
					text: "Growth drawers usage [%]",
					titleFontSize: 20,
				},
				data: [
					{
						type: "stepArea",
						interval: 1,
						dataPoints: a,
						axisX: {
							valueFormatString: "DDDD MMM YYYY HH:mm:ss",
							interval: 1,
							labelAngle: -50
						},
					}
				]
			})
			let chartb = new CanvasJS.Chart("chartContainerb", {
				zoomEnabled: true,
				animationEnabled: true,
				title: {
					text: "Light drawers usage [%]",
					titleFontSize: 20,
				},
				data: [
					{
						type: "stepArea",
						dataPoints: b,
						axisX: {
							valueFormatString: "DDDD MMM YYYY HH:mm:ss",
							interval: 1,
							labelAngle: -50
						},
					}
				]
			})
			charta.render();
			chartb.render();

			// var charta = new CanvasJS.Chart("chartContainera",
			// 	{
			// 		title: {
			// 		},
			// 		toolTip: {
			// 			shared: true
			// 		},
			// 		axisX: {
			// 			valueFormatString: "DD-MMM",
			// 			interval: 1,
			// 			labelAngle: -50
			// 		},

			// 		legend: {
			// 			verticalAlign: "bottom",
			// 			horizontalAlign: "center"
			// 		},
			// 		data: [
			// 			{
			// 				type: "splineArea",
			// 				name: "Growth drawer usage [%]",
			// 				showInLegend: "true",
			// 				dataPoints: a
			// 			},
			// 			{
			// 				type: "splineArea",
			// 				name: "Light drawer usage [%]",
			// 				showInLegend: "true",
			// 				dataPoints: b
			// 			}
			// 		]
			// 	})

			// charta.render();
		})

	}
}