


import { Component, OnInit } from '@angular/core';
import * as CanvasJS from './canvasjs.min';
//var CanvasJS = require('./canvasjs.min');
import { OnoApiService } from '../../../service/ono-api.service';

@Component({
	selector: 'consump',
	// template: '<div id="chartContainer20" style="width: 33%; height: 300px;float: left;"></div> <div id="chartContainer21" style="width: 33%; height: 300px;float: left;"></div> <div id="chartContainer22" style="width: 33%; height: 300px;float: left;"></div> <div id="chartContainer23" style="width: 33%; height: 300px;float: left;"></div> <div id="chartContainer24" style="width: 33%; height: 300px;float: left;"></div> <div id="chartContainer25" style="width: 33%; height: 300px;float: left;"></div>'
	template: '<div id="chartContainer20" style="width: 100%; height: 600px;float: left;">'

})

export class DemoComponent implements OnInit {
	constructor(public connectionService: OnoApiService) { }

	ngOnInit() {

		this.connectionService.readEnergy().then(function (val) {
			var da = val

			var tenfas1q1 = []
			var tenfas2q1 = []
			var tenfas3q1 = []
			var corrfas1q1 = []
			var corrfas2q1 = []
			var corrfas3q1 = []
			var sumpowq1 = []
			var consq1 = []
			var tenfas1qtot = []
			var tenfas2qtot = []
			var tenfas3qtot = []
			var corrfas1qtot = []
			var corrfas2qtot = []
			var corrfas3qtot = []
			var sumpowqtot = []
			var consqtot = []


			da.forEach(function (va) {
				if (va.Contatore == "Quadro1") {
					tenfas1q1.push({ x: new Date(va.Timestamp), y: va.TensioneFase1 })
					tenfas2q1.push({ x: new Date(va.Timestamp), y: va.TensioneFase2 })
					tenfas3q1.push({ x: new Date(va.Timestamp), y: va.TensioneFase3 })
					corrfas1q1.push({ x: new Date(va.Timestamp), y: va.CorrenteFase1 / 1000 })
					corrfas2q1.push({ x: new Date(va.Timestamp), y: va.CorrenteFase2 / 1000 })
					corrfas3q1.push({ x: new Date(va.Timestamp), y: va.CorrenteFase3 / 1000 })
					if (new Date(va.Timestamp) > new Date(1591646400000)) sumpowq1.push({ x: new Date(va.Timestamp), y: va.SommaPotenzaAttiva })
					consq1.push({ x: new Date(va.Timestamp), y: va.ConsumiAdOggi })

				} else if (va.Contatore == "QuadroTot") {
					tenfas1qtot.push({ x: new Date(va.Timestamp), y: va.TensioneFase1 })
					tenfas2qtot.push({ x: new Date(va.Timestamp), y: va.TensioneFase2 })
					tenfas3qtot.push({ x: new Date(va.Timestamp), y: va.TensioneFase3 })
					corrfas1qtot.push({ x: new Date(va.Timestamp), y: va.CorrenteFase1 / 100 })
					corrfas2qtot.push({ x: new Date(va.Timestamp), y: va.CorrenteFase2 / 100 })
					corrfas3qtot.push({ x: new Date(va.Timestamp), y: va.CorrenteFase3 / 100 })
					if (new Date(va.Timestamp) > new Date(1591646400000)) sumpowqtot.push({ x: new Date(va.Timestamp), y: va.SommaPotenzaAttiva })
					consqtot.push({ x: new Date(va.Timestamp), y: va.ConsumiAdOggi })
				}
			})

			var climate = []
			sumpowq1 = sumpowq1.slice(Math.max(sumpowq1.length - sumpowqtot.length, 0))
			for (var j = 0; j < sumpowq1.length; j++){
				climate.push({ x: new Date(sumpowq1[j].x), y: sumpowqtot[j].y - sumpowq1[j].y - 0.30 })  // 0.30 è il dato misurato nel rack 1
			}

			var lamps = []
			sumpowq1 = sumpowq1.slice(Math.max(sumpowq1.length - sumpowqtot.length, 0))
			for (var j = 0; j < sumpowq1.length; j++){
				lamps.push({ x: new Date(sumpowq1[j].x), y: sumpowq1[j].y - 1.29 }) // 1.29 è il dato misurato dal quadro a luci spente
			}
			var other = []

			let chart3 = new CanvasJS.Chart("chartContainer20", {
				zoomEnabled: true,
				animationEnabled: true,
				data: [

					{
						type: "line",
						name: "Total Power",
						dataPoints: sumpowqtot,
						showInLegend: true,

					},
					{
						type: "line",
						name: "Air conditioner",
						dataPoints: climate,
						showInLegend: true,

					},
					{
						type: "line",
						name: "Lamps",
						dataPoints: lamps,
						showInLegend: true,

					},
// 					{
// 						type: "line",
// 						name: "Other",
// 						dataPoints: other,
// 						showInLegend: true,
// 
// 					},
				]
			})


			// let chart3 = new CanvasJS.Chart("chartContainer20", {
			// 	zoomEnabled: true,
			// 	animationEnabled: true,
			// 	title: {
			// 		text: "Q1 - Voltage [V]"
			// 	},
			// 	data: [

			// 		{
			// 			type: "line",
			// 			name: "VoltagePh1",
			// 			dataPoints: tenfas1q1,
			// 			showInLegend: true,

			// 		},
			// 		{
			// 			type: "line",
			// 			name: "VoltagePh2",
			// 			dataPoints: tenfas2q1,
			// 			showInLegend: true,

			// 		},
			// 		{
			// 			type: "line",
			// 			name: "VoltagePh3",
			// 			dataPoints: tenfas3q1,
			// 			showInLegend: true,

			// 		},

			// 	]
			// })
			// let chart4 = new CanvasJS.Chart("chartContainer21", {
			// 	zoomEnabled: true,
			// 	animationEnabled: true,
			// 	title: {
			// 		text: "Q1 - Current [A]"
			// 	},
			// 	data: [

			// 		{
			// 			type: "line",
			// 			name: "CurrentPh1",
			// 			dataPoints: corrfas1q1,
			// 			showInLegend: true,

			// 		},
			// 		{
			// 			type: "line",
			// 			name: "CurrentPh2",
			// 			dataPoints: corrfas2q1,
			// 			showInLegend: true,

			// 		},
			// 		{
			// 			type: "line",
			// 			name: "CurrentPh3",
			// 			dataPoints: corrfas3q1,
			// 			showInLegend: true,

			// 		},

			// 	]
			// })
			// let chart5 = new CanvasJS.Chart("chartContainer22", {
			// 	zoomEnabled: true,
			// 	animationEnabled: true,
			// 	title: {
			// 		text: "Q1 - Active Power sum [kW]"
			// 	},
			// 	data: [
			// 		{
			// 			type: "line",
			// 			dataPoints: sumpowq1,

			// 		}
			// 	]

			// });
			// let chart6 = new CanvasJS.Chart("chartContainer23", {
			// 	zoomEnabled: true,
			// 	animationEnabled: true,
			// 	title: {
			// 		text: "Qtot - Voltage [V]"
			// 	},
			// 	data: [

			// 		{
			// 			type: "line",
			// 			name: "VoltagePh1",
			// 			dataPoints: tenfas1qtot,
			// 			showInLegend: true,

			// 		},
			// 		{
			// 			type: "line",
			// 			name: "VoltagePh2",
			// 			dataPoints: tenfas2qtot,
			// 			showInLegend: true,

			// 		},
			// 		{
			// 			type: "line",
			// 			name: "VoltagePh3",
			// 			dataPoints: tenfas3qtot,
			// 			showInLegend: true,

			// 		},

			// 	]
			// })
			// let chart7 = new CanvasJS.Chart("chartContainer24", {
			// 	zoomEnabled: true,
			// 	animationEnabled: true,
			// 	title: {
			// 		text: "Qtot - Current [A]"
			// 	},
			// 	data: [

			// 		{
			// 			type: "line",
			// 			name: "CurrentPh1",
			// 			dataPoints: corrfas1qtot,
			// 			showInLegend: true,

			// 		},
			// 		{
			// 			type: "line",
			// 			name: "CurrentPh2",
			// 			dataPoints: corrfas2qtot,
			// 			showInLegend: true,

			// 		},
			// 		{
			// 			type: "line",
			// 			name: "CurrentPh3",
			// 			dataPoints: corrfas3qtot,
			// 			showInLegend: true,

			// 		},

			// 	]
			// })
			// let chart8 = new CanvasJS.Chart("chartContainer25", {
			// 	zoomEnabled: true,
			// 	animationEnabled: true,
			// 	title: {
			// 		text: "Qtot - Active Power sum [kW]"
			// 	},
			// 	data: [
			// 		{
			// 			type: "line",
			// 			dataPoints: sumpowqtot,

			// 		}
			// 	]

			// });

			chart3.render();

			// chart6.render();

			// chart7.render();

			// chart8.render();

			// chart4.render();


			// chart5.render();

		})


	}
}