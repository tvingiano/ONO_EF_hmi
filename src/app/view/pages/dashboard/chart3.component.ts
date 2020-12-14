import { Component, OnInit } from '@angular/core';
import * as CanvasJS from './canvasjs.min';
//var CanvasJS = require('./canvasjs.min');
import { OnoApiService } from '../../../service/ono-api.service';

export interface Raw {
	intTemp;
	intHum;
	estTemp;
	estHum;
	setTemp;
	setHum;
}

@Component({
	selector: 'chart-three',
	templateUrl: './chart3.html'
})


export class Chartthree implements OnInit {
	constructor(public connectionService: OnoApiService) { }
	raw: Raw
	// daily = []
	// monthly = []
	// yearly = []
	// hourly = []

	ngOnInit() {
		var me = this
		this.connectionService.ambiental().then(function (val) {
			var da = val
			var a = []
			var b = []
			var c = []
			var d = []
			var e = []
			var f = []

			da.forEach(function (va) {
				if (va.Sensor == "internal") {
					if (va.Temperature != 0) a.push({ x: new Date(va.Timestamp), y: va.Temperature })
					if (va.Humidity != 0) b.push({ x: new Date(va.Timestamp), y: va.Humidity })

				} else {
					if (va.Temperature != 0) c.push({ x: new Date(va.Timestamp), y: va.Temperature })
					if (va.Humidity != 0) d.push({ x: new Date(va.Timestamp), y: va.Humidity })

				}


			})
			me.connectionService.climatesnapshot().then(function (valu) {
				valu.forEach(function (va) {
					if (va.SetpointRaffreddamento != 0 )e.push({ x: new Date(va.Timestamp), y: va.SetpointRaffreddamento })
					if (va.SetpointUmidita != 0) f.push({ x: new Date(va.Timestamp), y: va.SetpointUmidita })

				})
				me.raw = {
					"intTemp": a,
					"intHum": b,
					"estTemp": c,
					"estHum": d,
					"setTemp": e,
					"setHum": f
				}
				let chart3 = new CanvasJS.Chart("chartContainer3", {
					zoomEnabled: true,
					animationEnabled: true,
					title: {
						text: "Temperature"
					},
					data: [
						{
							type: "line",
							name: "external",
							dataPoints: me.raw.estTemp,
							showInLegend: true,

						},
						{
							type: "line",
							name: "internal",
							dataPoints: me.raw.intTemp,
							showInLegend: true,

						},
						{
							type: "line",
							name: "setpoint",
							dataPoints: me.raw.setTemp,
							showInLegend: true,

						}
					]
				});


				let chart4 = new CanvasJS.Chart("chartContainer4", {
					zoomEnabled: true,
					animationEnabled: true,
					title: {
						text: "Humidity"
					},
					data: [
						{
							type: "line",
							name: "external",
							dataPoints: me.raw.estHum,
							showInLegend: true,

						},
						{
							type: "line",
							name: "internal",
							dataPoints: me.raw.intHum,
							showInLegend: true,

						},
						{
							type: "line",
							name: "setpoint",
							dataPoints: me.raw.setHum,
							showInLegend: true,

						}]
				});

				setTimeout(function (val) {
					chart4.render();
					chart3.render();
				}, 1000)


			})
		})

	}

	onHourly() {
		var me = this
		me.raw = {
			intTemp: [],
			intHum: [],
			estTemp: [],
			estHum: [],
			setTemp: [],
			setHum: []
		}
		this.connectionService
			.aggregate("temperature", "internal", "hourly")
			.subscribe(
				valu => {
					valu.forEach(function (value) {
						me.raw.intTemp.push({ x: new Date(value.ID), y: value.Avg })
					})
				});

		me.raw.intTemp.sort(function (a, b) {
			new Date(b.x).getTime() - new Date(a.x).getTime()
		});
		this.connectionService
			.aggregate("temperature", "esternal", "hourly")
			.subscribe(
				valu => {
					valu.forEach(function (value) {
						me.raw.estTemp.push({ x: new Date(value.ID), y: value.Avg })
					})
				});
		me.raw.estTemp.sort(function (a, b) {
			new Date(b.x).getTime() - new Date(a.x).getTime()
		});
		this.connectionService
			.aggregate("humidity", "internal", "hourly")
			.subscribe(
				valu => {
					valu.forEach(function (value) {
						me.raw.intHum.push({ x: new Date(value.ID), y: value.Avg })
					})
				});
		me.raw.intHum.sort(function (a, b) {
			new Date(b.x).getTime() - new Date(a.x).getTime()
		});
		this.connectionService
			.aggregate("humidity", "esternal", "hourly")
			.subscribe(
				valu => {
					valu.forEach(function (value) {
						me.raw.estHum.push({ x: new Date(value.ID), y: value.Avg })
					})
				});
		me.raw.estHum.sort(function (a, b) {
			new Date(b.x).getTime() - new Date(a.x).getTime()
		});
		this.connectionService
			.aggregate("humidity", "setpoint", "hourly")
			.subscribe(
				valu => {
					valu.forEach(function (value) {
						me.raw.setHum.push({ x: new Date(value.ID), y: value.Avg })
					})
				});
		me.raw.intHum.sort(function (a, b) {
			new Date(b.x).getTime() - new Date(a.x).getTime()
		});
		this.connectionService
			.aggregate("temperature", "setpoint", "hourly")
			.subscribe(
				valu => {
					valu.forEach(function (value) {
						me.raw.setTemp.push({ x: new Date(value.ID), y: value.Avg })
					})
				});
		me.raw.estHum.sort(function (a, b) {
			new Date(b.x).getTime() - new Date(a.x).getTime()
		});

		let chart3 = new CanvasJS.Chart("chartContainer3", {
			zoomEnabled: true,
			animationEnabled: true,
			title: {
				text: "Temperature"
			},
			data: [
				{
					type: "line",
					name: "external",
					dataPoints: me.raw.estTemp,
					showInLegend: true,

				},
				{
					type: "line",
					name: "internal",
					dataPoints: me.raw.intTemp,
					showInLegend: true,

				},
				{
					type: "line",
					name: "setpoint",
					dataPoints: me.raw.setTemp,
					showInLegend: true,

				}]
		});

		let chart4 = new CanvasJS.Chart("chartContainer4", {
			zoomEnabled: true,
			animationEnabled: true,
			title: {
				text: "Humidity"
			},
			data: [
				{
					type: "line",
					name: "external",
					dataPoints: me.raw.estHum,
					showInLegend: true,

				},
				{
					type: "line",
					name: "internal",
					dataPoints: me.raw.intHum,
					showInLegend: true,

				},
				{
					type: "line",
					name: "setpoint",
					dataPoints: me.raw.setHum,
					showInLegend: true,

				}]
		});

		setTimeout(function (val) {
			chart4.render();
			chart3.render();
		}, 1000)
	}

	onDaily() {
		var me = this
		me.raw = {
			intTemp: [],
			intHum: [],
			estTemp: [],
			estHum: [],
			setTemp: [],
			setHum: []
		}
		this.connectionService
			.aggregate("temperature", "internal", "daily")
			.subscribe(
				valu => {
					valu.forEach(function (value) {
						me.raw.intTemp.push({ x: new Date(value.ID), y: value.Avg })
					})
				});

		me.raw.intTemp.sort(function (a, b) {
			new Date(b.x).getTime() - new Date(a.x).getTime()
		});
		this.connectionService
			.aggregate("temperature", "esternal", "daily")
			.subscribe(
				valu => {
					valu.forEach(function (value) {
						me.raw.estTemp.push({ x: new Date(value.ID), y: value.Avg })
					})
				});
		me.raw.estTemp.sort(function (a, b) {
			new Date(b.x).getTime() - new Date(a.x).getTime()
		});
		this.connectionService
			.aggregate("humidity", "internal", "daily")
			.subscribe(
				valu => {
					valu.forEach(function (value) {
						me.raw.intHum.push({ x: new Date(value.ID), y: value.Avg })
					})
				});
		me.raw.intHum.sort(function (a, b) {
			new Date(b.x).getTime() - new Date(a.x).getTime()
		});
		this.connectionService
			.aggregate("humidity", "esternal", "daily")
			.subscribe(
				valu => {
					valu.forEach(function (value) {
						me.raw.estHum.push({ x: new Date(value.ID), y: value.Avg })
					})
				});
		me.raw.estHum.sort(function (a, b) {
			new Date(b.x).getTime() - new Date(a.x).getTime()
		});
		this.connectionService
			.aggregate("humidity", "setpoint", "daily")
			.subscribe(
				valu => {
					valu.forEach(function (value) {
						me.raw.setHum.push({ x: new Date(value.ID), y: value.Avg })
					})
				});
		me.raw.intHum.sort(function (a, b) {
			new Date(b.x).getTime() - new Date(a.x).getTime()
		});
		this.connectionService
			.aggregate("temperature", "setpoint", "daily")
			.subscribe(
				valu => {
					valu.forEach(function (value) {
						me.raw.setTemp.push({ x: new Date(value.ID), y: value.Avg })
					})
				});
		me.raw.estHum.sort(function (a, b) {
			new Date(b.x).getTime() - new Date(a.x).getTime()
		});
		let chart3 = new CanvasJS.Chart("chartContainer3", {
			zoomEnabled: true,
			animationEnabled: true,
			title: {
				text: "Temperature"
			},
			data: [
				{
					type: "line",
					name: "external",
					dataPoints: me.raw.estTemp,
					showInLegend: true,

				},
				{
					type: "line",
					name: "internal",
					dataPoints: me.raw.intTemp,
					showInLegend: true,

				},
				{
					type: "line",
					name: "setpoint",
					dataPoints: me.raw.setTemp,
					showInLegend: true,

				}]
		});

		let chart4 = new CanvasJS.Chart("chartContainer4", {
			zoomEnabled: true,
			animationEnabled: true,
			title: {
				text: "Humidity"
			},
			data: [
				{
					type: "line",
					name: "external",
					dataPoints: me.raw.estHum,
					showInLegend: true,

				},
				{
					type: "line",
					name: "internal",
					dataPoints: me.raw.intHum,
					showInLegend: true,

				},
				{
					type: "line",
					name: "setpoint",
					dataPoints: me.raw.setHum,
					showInLegend: true,

				}]
		});

		setTimeout(function (val) {
			chart4.render();
			chart3.render();
		}, 1000)
	}


	onMonthly() {
		var me = this
		me.raw = {
			intTemp: [],
			intHum: [],
			estTemp: [],
			estHum: [],
			setTemp: [],
			setHum: []
		}
		this.connectionService
			.aggregate("temperature", "internal", "monthly")
			.subscribe(
				valu => {
					valu.forEach(function (value) {
						me.raw.intTemp.push({ x: new Date(value.ID), y: value.Avg })
					})
				});

		me.raw.intTemp.sort(function (a, b) {
			new Date(b.x).getTime() - new Date(a.x).getTime()
		});
		this.connectionService
			.aggregate("temperature", "esternal", "monthly")
			.subscribe(
				valu => {
					valu.forEach(function (value) {
						me.raw.estTemp.push({ x: new Date(value.ID), y: value.Avg })
					})
				});
		me.raw.estTemp.sort(function (a, b) {
			new Date(b.x).getTime() - new Date(a.x).getTime()
		});
		this.connectionService
			.aggregate("humidity", "internal", "monthly")
			.subscribe(
				valu => {
					valu.forEach(function (value) {
						me.raw.intHum.push({ x: new Date(value.ID), y: value.Avg })
					})
				});
		me.raw.intHum.sort(function (a, b) {
			new Date(b.x).getTime() - new Date(a.x).getTime()
		});
		this.connectionService
			.aggregate("humidity", "esternal", "monthly")
			.subscribe(
				valu => {
					valu.forEach(function (value) {
						me.raw.estHum.push({ x: new Date(value.ID), y: value.Avg })
					})
				});
		me.raw.estHum.sort(function (a, b) {
			new Date(b.x).getTime() - new Date(a.x).getTime()
		});
		this.connectionService
			.aggregate("humidity", "setpoint", "monthly")
			.subscribe(
				valu => {
					valu.forEach(function (value) {
						me.raw.setHum.push({ x: new Date(value.ID), y: value.Avg })
					})
				});
		me.raw.intHum.sort(function (a, b) {
			new Date(b.x).getTime() - new Date(a.x).getTime()
		});
		this.connectionService
			.aggregate("temperature", "setpoint", "monthly")
			.subscribe(
				valu => {
					valu.forEach(function (value) {
						me.raw.setTemp.push({ x: new Date(value.ID), y: value.Avg })
					})
				});
		me.raw.estHum.sort(function (a, b) {
			new Date(b.x).getTime() - new Date(a.x).getTime()
		});
		let chart3 = new CanvasJS.Chart("chartContainer3", {
			zoomEnabled: true,
			animationEnabled: true,
			title: {
				text: "Temperature"
			},
			data: [
				{
					type: "line",
					name: "external",
					dataPoints: me.raw.estTemp,
					showInLegend: true,

				},
				{
					type: "line",
					name: "internal",
					dataPoints: me.raw.intTemp,
					showInLegend: true,

				},
				{
					type: "line",
					name: "setpoint",
					dataPoints: me.raw.setTemp,
					showInLegend: true,

				}]
		});

		let chart4 = new CanvasJS.Chart("chartContainer4", {
			zoomEnabled: true,
			animationEnabled: true,
			title: {
				text: "Humidity"
			},
			data: [
				{
					type: "line",
					name: "external",
					dataPoints: me.raw.estHum,
					showInLegend: true,

				},
				{
					type: "line",
					name: "internal",
					dataPoints: me.raw.intHum,
					showInLegend: true,

				},
				{
					type: "line",
					name: "setpoint",
					dataPoints: me.raw.setHum,
					showInLegend: true,

				}]
		});

		setTimeout(function (val) {
			chart4.render();
			chart3.render();
		}, 1000)
	}

	onYearly() {
		var me = this
		me.raw = {
			intTemp: [],
			intHum: [],
			estTemp: [],
			estHum: [],
			setTemp: [],
			setHum: []
		}
		this.connectionService
			.aggregate("temperature", "internal", "yearly")
			.subscribe(
				valu => {
					valu.forEach(function (value) {
						me.raw.intTemp.push({ x: new Date(value.ID), y: value.Avg })
					})
				});

		me.raw.intTemp.sort(function (a, b) {
			new Date(b.x).getTime() - new Date(a.x).getTime()
		});
		this.connectionService
			.aggregate("temperature", "esternal", "yearly")
			.subscribe(
				valu => {
					valu.forEach(function (value) {
						me.raw.estTemp.push({ x: new Date(value.ID), y: value.Avg })
					})
				});
		me.raw.estTemp.sort(function (a, b) {
			new Date(b.x).getTime() - new Date(a.x).getTime()
		});
		this.connectionService
			.aggregate("humidity", "internal", "yearly")
			.subscribe(
				valu => {
					valu.forEach(function (value) {
						me.raw.intHum.push({ x: new Date(value.ID), y: value.Avg })
					})
				});
		me.raw.intHum.sort(function (a, b) {
			new Date(b.x).getTime() - new Date(a.x).getTime()
		});
		this.connectionService
			.aggregate("humidity", "esternal", "yearly")
			.subscribe(
				valu => {
					valu.forEach(function (value) {
						me.raw.estHum.push({ x: new Date(value.ID), y: value.Avg })
					})
				});
		me.raw.estHum.sort(function (a, b) {
			new Date(b.x).getTime() - new Date(a.x).getTime()
		});
		this.connectionService
			.aggregate("humidity", "setpoint", "yearly")
			.subscribe(
				valu => {
					valu.forEach(function (value) {
						me.raw.setHum.push({ x: new Date(value.ID), y: value.Avg })
					})
				});
		me.raw.intHum.sort(function (a, b) {
			new Date(b.x).getTime() - new Date(a.x).getTime()
		});
		this.connectionService
			.aggregate("temperature", "setpoint", "yearly")
			.subscribe(
				valu => {
					valu.forEach(function (value) {
						me.raw.setTemp.push({ x: new Date(value.ID), y: value.Avg })
					})
				});
		me.raw.estHum.sort(function (a, b) {
			new Date(b.x).getTime() - new Date(a.x).getTime()
		});
		let chart3 = new CanvasJS.Chart("chartContainer3", {
			zoomEnabled: true,
			animationEnabled: true,
			title: {
				text: "Temperature"
			},
			data: [
				{
					type: "line",
					name: "external",
					dataPoints: me.raw.estTemp,
					showInLegend: true,

				},
				{
					type: "line",
					name: "internal",
					dataPoints: me.raw.intTemp,
					showInLegend: true,

				},
				{
					type: "line",
					name: "setpoint",
					dataPoints: me.raw.setTemp,
					showInLegend: true,

				}]
		});

		let chart4 = new CanvasJS.Chart("chartContainer4", {
			zoomEnabled: true,
			animationEnabled: true,
			title: {
				text: "Humidity"
			},
			data: [
				{
					type: "line",
					name: "external",
					dataPoints: me.raw.estHum,
					showInLegend: true,

				},
				{
					type: "line",
					name: "internal",
					dataPoints: me.raw.intHum,
					showInLegend: true,

				},
				{
					type: "line",
					name: "setpoint",
					dataPoints: me.raw.setHum,
					showInLegend: true,

				}]
		});

		setTimeout(function (val) {
			chart4.render();
			chart3.render();
		}, 1000)
	}

}