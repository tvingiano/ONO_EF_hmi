import { Component, OnInit } from '@angular/core';
import * as CanvasJS from './canvasjs.min';
import { OnoApiService } from '../../../service/ono-api.service';

//var CanvasJS = require('./canvasjs.min');

@Component({
	selector: 'chart-four',
	templateUrl: './chart4.html'
})

export class ChartFour implements OnInit {
	constructor(public connectionService: OnoApiService) { }

	ngOnInit() {

		this.connectionService.getMovem().then(function (val) {
			let chart1 = new CanvasJS.Chart("chartContainer10", {
				animationEnabled: true,
				title: {},

				data: [{
					type: "splineArea",
					name: "Covered distance [m]",
					showInLegend: true,

					dataPoints: [
						{ y: val[0].MetersTraveled, label: "D01" },
						{ y: val[1].MetersTraveled, label: "D02" },
						{ y: val[2].MetersTraveled, label: "D03" },
						{ y: val[3].MetersTraveled, label: "D04" },
						{ y: val[4].MetersTraveled, label: "D05" },
						{ y: val[5].MetersTraveled, label: "D06" },
						{ y: val[6].MetersTraveled, label: "D07" },
						{ y: val[7].MetersTraveled, label: "D08" },
						{ y: val[8].MetersTraveled, label: "D10" },
						{ y: val[9].MetersTraveled, label: "D09" },
						{ y: val[10].MetersTraveled, label: "D11" },
						{ y: val[11].MetersTraveled, label: "D12" },
						{ y: val[12].MetersTraveled, label: "D13" },
						{ y: val[13].MetersTraveled, label: "D14" }

					]
				},
				{
					type: "line",
					name: "Puts [nr]",
					showInLegend: true,

					dataPoints: [
						{ y: val[0].NumberOfPut, label: "D01" },
						{ y: val[1].NumberOfPut, label: "D02" },
						{ y: val[2].NumberOfPut, label: "D03" },
						{ y: val[3].NumberOfPut, label: "D04" },
						{ y: val[4].NumberOfPut, label: "D05" },
						{ y: val[5].NumberOfPut, label: "D06" },
						{ y: val[6].NumberOfPut, label: "D07" },
						{ y: val[7].NumberOfPut, label: "D08" },
						{ y: val[8].NumberOfPut, label: "D10" },
						{ y: val[9].NumberOfPut, label: "D09" },
						{ y: val[10].NumberOfPut, label: "D11" },
						{ y: val[11].NumberOfPut, label: "D12" },
						{ y: val[12].NumberOfPut, label: "D13" },
						{ y: val[13].NumberOfPut, label: "D14" }

					]
				},
				{
					type: "line",
					name: "Gets [nr]",
					showInLegend: true,

					dataPoints: [
						{ y: val[0].NumberOfGet, label: "D01" },
						{ y: val[1].NumberOfGet, label: "D02" },
						{ y: val[2].NumberOfGet, label: "D03" },
						{ y: val[3].NumberOfGet, label: "D04" },
						{ y: val[4].NumberOfGet, label: "D05" },
						{ y: val[5].NumberOfGet, label: "D06" },
						{ y: val[6].NumberOfGet, label: "D07" },
						{ y: val[7].NumberOfGet, label: "D08" },
						{ y: val[8].NumberOfGet, label: "D10" },
						{ y: val[9].NumberOfGet, label: "D09" },
						{ y: val[10].NumberOfGet, label: "D11" },
						{ y: val[11].NumberOfGet, label: "D12" },
						{ y: val[12].NumberOfGet, label: "D13" },
						{ y: val[13].NumberOfGet, label: "D14" }

					]
				}
				]

			});
			// let chart2 = new CanvasJS.Chart("chartContainer11", {
			// 	animationEnabled: true,
			// 	title: {
			// 		text: "Puts number"

			// 	},
			// 	data: [{
			// 		type: "line",
			// 		dataPoints: [
			// 			{ y: val[0].NumberOfPut, label: "D01" },
			// 			{ y: val[1].NumberOfPut, label: "D02" },
			// 			{ y: val[2].NumberOfPut, label: "D03" },
			// 			{ y: val[3].NumberOfPut, label: "D04" },
			// 			{ y: val[4].NumberOfPut, label: "D05" },
			// 			{ y: val[5].NumberOfPut, label: "D06" },
			// 			{ y: val[6].NumberOfPut, label: "D07" },
			// 			{ y: val[7].NumberOfPut, label: "D08" },
			// 			{ y: val[8].NumberOfPut, label: "D10" },
			// 			{ y: val[9].NumberOfPut, label: "D09" },
			// 			{ y: val[10].NumberOfPut, label: "D11" },
			// 			{ y: val[11].NumberOfPut, label: "D12" },
			// 			{ y: val[12].NumberOfPut, label: "D13" },
			// 			{ y: val[13].NumberOfPut, label: "D14" }

			// 		]
			// 	}]

			// });
			// let chart3 = new CanvasJS.Chart("chartContainer12", {
			// 	animationEnabled: true,
			// 	title: {
			// 		text: "Gets number"

			// 	},
			// 	data: [{
			// 		type: "line",
			// 		dataPoints: [
			// 			{ y: val[0].NumberOfGet, label: "D01" },
			// 			{ y: val[1].NumberOfGet, label: "D02" },
			// 			{ y: val[2].NumberOfGet, label: "D03" },
			// 			{ y: val[3].NumberOfGet, label: "D04" },
			// 			{ y: val[4].NumberOfGet, label: "D05" },
			// 			{ y: val[5].NumberOfGet, label: "D06" },
			// 			{ y: val[6].NumberOfGet, label: "D07" },
			// 			{ y: val[7].NumberOfGet, label: "D08" },
			// 			{ y: val[8].NumberOfGet, label: "D10" },
			// 			{ y: val[9].NumberOfGet, label: "D09" },
			// 			{ y: val[10].NumberOfGet, label: "D11" },
			// 			{ y: val[11].NumberOfGet, label: "D12" },
			// 			{ y: val[12].NumberOfGet, label: "D13" },
			// 			{ y: val[13].NumberOfGet, label: "D14" }

			// 		]
			// 	}]


			// });

			chart1.render();

		})



	}
}