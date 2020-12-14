import { Component, OnInit } from '@angular/core';
import * as CanvasJS from './canvasjs.min';
//var CanvasJS = require('./canvasjs.min');
import { OnoApiService } from '../../../service/ono-api.service';

@Component({
	selector: 'chartCurrent',
	templateUrl: './chartCurrent.html'
})

export class ChartCurrent implements OnInit {
	constructor(public connectionService: OnoApiService) { }
	lamps = [];
	drawers = [];

	ngOnInit() {
		var me = this
		me.connectionService.getLamps().then(function (val) {
			var a = []
			val.forEach(function (va) {
				if (va.Channel1CurrentIntensity + va.Channel2CurrentIntensity +va.Channel3CurrentIntensity +va.Channel4CurrentIntensity > 0) {
					a.push({ y: 1, label: va.Type+va.Address.toString() })
				}
			})
			a.push({ y: val.length - a.length, label: "Not used" })

			me.lamps = a
			me.connectionService.getFullDrawerss().then(function (val2) {
				var b = []
				val2.forEach(function (va2) {
					if (va2.CurrentOrder != "") {
						b.push({ y: 1, label: va2.CurrentOrder })
					}
				})
				b.push({ y: val2.length - b.length, label: "Not used" })
				me.drawers = b

				let chartaa = new CanvasJS.Chart("chartContaineraa", {
					zoomEnabled: true,
					animationEnabled: true,
					title: {
						text: "Current light drawers usage",
						titleFontSize: 15,
					},
					data: [{
						type: "pie",
						// showInLegend: true,
						indexLabel: "{label}",
						dataPoints: me.lamps
					}]
				})
				let chartab = new CanvasJS.Chart("chartContainerab", {
					zoomEnabled: true,
					animationEnabled: true,
					title: {
						text: "Current growth drawers usage",
						titleFontSize: 15,
					},
					data: [{
						type: "pie",
						// showInLegend: true,
						// toolTipContent: "<b>{label}</b>: {y} (#percent%)",
						// indexLabel: "{label} - #percent%",
						toolTipContent: "<b>{label}</b>: {y}",
						indexLabel: "{label}",
						dataPoints: me.drawers
					}]
				})
				chartaa.render();
				chartab.render();
			})
		})


	}
}