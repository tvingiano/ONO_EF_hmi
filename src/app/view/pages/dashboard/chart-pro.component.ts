import { Component, OnInit } from '@angular/core';
import * as CanvasJS from './canvasjs.min';
//var CanvasJS = require('./canvasjs.min');
import { OnoApiService } from '../../../service/ono-api.service';

@Component({
	selector: 'chart-pro',
	templateUrl: './chart-pro.html'
})

export class ChartPro implements OnInit {
	constructor(public connectionService: OnoApiService) { }

	ngOnInit() {

		// this.connectionService.getProcesses().then(function (val) {
		// 	var a = []
		// 	val.forEach(function (va) {
		// 		if(va.ProcessStatus == "stop"){
		// 		const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
		// 		const diffDays = Math.round(Math.abs((new Date(va.StartTime).getTime() - new Date(va.EndTime).getTime()) / oneDay));
		// 		a.push({ y: diffDays, label: va.OrderID })
		// 	}
		// 	})

		this.connectionService
			.readSurveys()
			.subscribe(
				value => {
					var surveys = value.filter(function (el) {
						return el.Status == "closed"
					});
					var ext = []
					surveys.forEach(function (experiment) {
						var water = 0
						var solution = 0
						var lightHours = 0
						experiment.Refill.forEach(function (vv) {
							water = water + vv.Water
							solution = solution + vv.NutrientSolution
						})
						for (var i = 0; i < experiment.Light.length - 1; i++) {
							if (i == 0) {
								var a = new Date(experiment.StartTime).getTime()
							} else {
								var a = new Date(experiment.Light[i].Timestamp).getTime()
							}
							if (experiment.Light[i].LightSpectrum !== "None") {
								if (experiment.Light[i].LightSpectrum !== "") {
									var date = Math.round((new Date(experiment.Light[i + 1].Timestamp).getTime() - a) / (1000 * 60 * 60 * 24));
									lightHours = lightHours + (experiment.Light[i + 1].LightHours * date)
								}
							}
						}
						if (experiment.Light[experiment.Light.length - 1].LightSpectrum != "None") {
							var date = Math.round((new Date(experiment.EndTime).getTime() - new Date(experiment.Light[experiment.Light.length - 1].Timestamp).getTime()) / (1000 * 60 * 60 * 24));
							lightHours = lightHours + (experiment.Light[experiment.Light.length - 1].LightHours * date)
						}
						water = Math.round(water)
						solution = Math.round(solution)
						var hold = experiment.Holder
						if (hold == "Radi") {
							var pl = 184
						} else if (hold == "Medi") {
							var pl = 296
						} else {
							var pl = 536
						}
						var l = (experiment.Sampling).length
						var c = []
						for (var i = 0; i < l; i++) {
							var fi = experiment.Sampling[i].FreshWeight
							var date = Math.round((new Date(experiment.Sampling[i].Timestamp).getTime() - new Date(experiment.StartTime).getTime()) / (1000 * 60 * 60 * 24));
							if (date > 0) {
								var cyc = Math.round(365 / date)
								c.push({
									"growingDays": date,
									"singlePlantFreshWeight": fi / 1000,
									"cyclesPerYear": cyc,
									"pl": pl
								})
							}
						}
						var durations = []
						for (var j = 0; j < c.length; j++) {
							durations.push(c[j].growingDays)
						}
						durations = durations.filter(function (elem, index, self) {
							return index === self.indexOf(elem);
						})
						var p = []
						durations.forEach(function (val) {
							const same = c.filter(va => va.growingDays === val);
							const average = same.reduce((total, next) => total + next.singlePlantFreshWeight, 0) / same.length;
							p.push({
								"average": average,
								"growingDays": same[0].growingDays,
								"cyclesPerYear": same[0].cyclesPerYear,
								"productionPerDrawerPerYear": average * same[0].pl * 3 * cyc,
								"productionPerYearPerSquaremeter": average * same[0].pl * 3 * cyc / 3.6
							})

						})

						var obj = {
							"expid": experiment.ExpID,
							"planttype": experiment.PlantType,
							"substrate": experiment.Substrate,
							"plantsPerTank": pl,
							"singlePlantFreshWeight": p[0].average,
							"waterConsumed": water,
							"solutionConsumed": solution,
							"lightHours": lightHours,
							"statistics": p
						}
						ext.push(obj)
					})
					var datas = []
					ext.forEach(function (val) {
						if (val.statistics[val.statistics.length - 1].productionPerYearPerSquaremeter > 0) {
							var a = val.statistics[val.statistics.length - 1].productionPerYearPerSquaremeter
							datas.push({ y: a, label: val.expid })
						} else {
							var a = val.statistics[val.statistics.length - 2].productionPerYearPerSquaremeter
							datas.push({ y: a, label: val.expid })
						}
					})

					let chartPro = new CanvasJS.Chart("chartContainerPro", {

						zoomEnabled: true,
						animationEnabled: true,

						title: {
						},
						axisY: {
							title: "days",
							titleFontSize: 10,
							labelFontSize: 8,
						},
						axisX: {
							labelFontSize: 8,
							interval: 1
						},
						data: [{
							type: "bar",
							dataPoints: datas
						}]
					});
					chartPro.render();
				})

	}
}