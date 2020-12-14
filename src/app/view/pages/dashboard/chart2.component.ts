import { Component, OnInit } from '@angular/core';
import * as CanvasJS from './canvasjs.min';
//var CanvasJS = require('./canvasjs.min');
 
@Component({
	selector: 'chart-two',
	templateUrl: './chart2.html'
}) 
 
export class Charttwo implements OnInit {
	ngOnInit() {
	let chart2 = new CanvasJS.Chart("chartContainer2", { 
		theme: "light2",
		animationEnabled: true,
		title:{
		},
		data: [{
			type: "pie",
			showInLegend: true,
			toolTipContent: "<b>{name}</b>: {y} (#percent%)",
			indexLabel: "{name} - #percent%",
			dataPoints: [
				{ y: 1, name: "Ocimum basilicum_3" },
				{ y: 1, name: "Lactuca sativa (foglie lisce)" },
				{ y: 1, name: "Lactuca sativa (foglie lisce) + Ocimum basilicum_3" },
				{ y: 11, name: "Not used" }
			]
		}]
	});
		
	chart2.render();
    }
}