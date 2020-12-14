


import { Component, OnInit } from '@angular/core';
import * as CanvasJS from './canvasjs.min';
//var CanvasJS = require('./canvasjs.min');
import { OnoApiService } from '../../../service/ono-api.service';

@Component({
	selector: 'lamp-consump',
	template: '<div id="chartContainerL" style="width: 100%; height: 600px;float: left;">'

})

export class LampConsump implements OnInit {
	constructor(public connectionService: OnoApiService) { }

	ngOnInit() {
		var ext = []
		this.connectionService.readEstimated()
			.subscribe(
				val => {
					val.forEach(function (va) {
						ext.push({ x: new Date(va.Timestamp), y: va.TotalConsumption })
					})
					let chartl = new CanvasJS.Chart("chartContainerL", {
						zoomEnabled: true,
						animationEnabled: true,
						data: [

							{
								type: "line",
								dataPoints: ext
							}
						]
					})
					chartl.render();

				})

	}
}