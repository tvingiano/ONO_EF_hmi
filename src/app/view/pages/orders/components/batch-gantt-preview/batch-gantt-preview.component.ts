import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IOrderInfo } from 'src/app/model/orders/orders-info';

import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { OnoApiService } from 'src/app/service/ono-api.service';
import { random } from '@amcharts/amcharts4/.internal/core/utils/String';

@Component({
  selector: 'app-batch-gantt-preview',
  templateUrl: './batch-gantt-preview.component.html',
})
export class BatchGanttPreviewComponent implements OnInit {
  
  @Input() order;

  @Output() goBatch: EventEmitter<string> =   new EventEmitter();

  constructor(
    private api: OnoApiService,
  ) { }

  colors = [
    '#AB2572',
    '#A3489C',
    '#8F66C0',
    '#7081DA',
    '#4699E9',
    '#00AEEF',
    '#00C7ED',
    '#00DBD6',
    '#49EBB1',
    '#A8F58A',
    '#F9F871'
  ];

  ngOnInit() {

    console.log(this.order);

    /**
     * to use when Batch api will be developed
     */
    // this.order.BatchID.forEach(b => {
    //   this.api.getBatchInfo(b).subscribe( x => {
    //     this.drawChart(x);
    //   });
    // });
    
    const batches = [];
    const r = parseInt((Math.random() * 100 % 4).toFixed(1), 10) + 1;

    for (let i = 0; i < r; i++) {
      batches.push({
        BatchID: Math.random().toString(36).substring(7),
        StartTime: this.getStartTime(i, r, true),
        EndTime: this.getStartTime(i, r, false),
        TrayID: i * i * 5,
        ProcessID: parseInt((Math.random() * 100 % 100).toFixed(1), 10),
        Status: parseInt((Math.random() * 100 % 2).toFixed(1), 10) === 0 ? 'running' : 'scheduled'
      });
    }
    
    this.drawChart(batches);
  }

  getStartTime(index, total, start) {
    let res;
    const me = this.order;

    const st = new Date(me.OrderStatus === 'running' ? me.ScheduledStartTime : me.RealStartTime);
    const et = new Date(me.OrderStatus === 'running' ? me.ScheduledEndTime : me.RealEndTime);

    if (index === 0) {
      res = st;
    } else {
      res = new Date(((et.getTime() - st.getTime()) / total) * index);
    }

    switch (start) {
      case true: return res;
      case false: return new Date(res.getTime() + ((et.getTime() - st.getTime()) / total));
    }
  }

  drawChart(data) {


    const dataSource = [];

    am4core.useTheme(am4themes_animated);


    const chart = am4core.create('chartdiv2', am4charts.XYChart);
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

    chart.paddingRight = 30;
    chart.dateFormatter.inputDateFormat = 'yyyy-MM-dd HH:mm';
    chart.dateFormatter.dateFormat = 'yyyy-MM-dd HH:mm';

    const colorSet = new am4core.ColorSet();
    colorSet.saturation = 0.4;

    chart.data = dataSource;

    const categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = 'name';

    categoryAxis.renderer.labels.template.fill = am4core.color('#fff');
    categoryAxis.renderer.labels.template.events.on('hit', e => {this.setCurrentOrder(e); }, this);
    categoryAxis.renderer.grid.template.location = 3;
    categoryAxis.renderer.grid.template.stroke = am4core.color('#c0d8ff');
    categoryAxis.renderer.grid.template.strokeWidth = 1;
    categoryAxis.renderer.baseGrid.stroke = am4core.color('#c0d8ff');
    categoryAxis.renderer.minGridDistance = 1;

    categoryAxis.renderer.inversed = true;
    categoryAxis.renderer.cellStartLocation = 0.2;
    categoryAxis.renderer.cellEndLocation = 0.8;


    const dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.dateFormatter.dateFormat = 'yyyy-MM-dd';
    dateAxis.renderer.tooltipLocation = 0;
    dateAxis.renderer.grid.template.stroke = am4core.color('#c0d8ff');
    dateAxis.renderer.grid.template.strokeWidth = 1;
    dateAxis.renderer.baseGrid.stroke = am4core.color('#c0d8ff');
    dateAxis.renderer.minGridDistance = 70;
    dateAxis.baseInterval = {count: 1, timeUnit: 'day'};

    // dateAxis.renderer.labels.template.rotation = 90;
    // dateAxis.renderer.labels.template.horizontalCenter = 'left';
    // dateAxis.renderer.labels.template.verticalCenter = 'middle';
    // dateAxis.renderer.labels.template.fill = am4core.color('#c0d8ff');
    // dateAxis.renderer.labels.template.fontSize = 10;


    dateAxis.events.on('datavalidated', e => {this.highlightNow(e); }, this);

    dateAxis.groupData = true;

    dateAxis.groupCount = 100;
    dateAxis.groupIntervals.setAll([
      { timeUnit: 'day', count: 1},
      { timeUnit: 'month', count: 1 },
      { timeUnit: 'month', count: 100 },
    ]);





    const series1 = chart.series.push(new am4charts.ColumnSeries());

    series1.dataFields.openDateX = 'fromDate';
    series1.dataFields.dateX = 'toDate';
    series1.dataFields.categoryY = 'name';
    series1.columns.template.propertyFields.fill = 'color'; // get color from data
    series1.columns.template.propertyFields.stroke = 'color';
    series1.columns.template.strokeOpacity = 1;
    series1.columns.template.height = am4core.percent(100);

    const Event = series1.columns.template.events.on('hit', e => {this.setCurrentOrder(e); }, this);

    const label = series1.columns.template.createChild(am4core.Label);
    label.text = '{name}';
    label.fill = am4core.color('#fff');
    label.strokeWidth = 0;
    label.fontSize = 20;
    label.align = 'center';
    label.valign = 'middle';


    chart.scrollbarX = new am4core.Scrollbar();
    chart.scrollbarX.disabled = true;


    chart.cursor = new am4charts.XYCursor();
    chart.cursor.lineY.disabled = true;
    chart.cursor.xAxis = dateAxis;

    const title = chart.titles.create();
    title.text = 'Order\'s planning';
    title.fontSize = 25;
    title.marginBottom = 10;
    title.marginTop = 10;
    title.fill = am4core.color('#fff');



    const startGrip = chart.scrollbarX.startGrip;
    startGrip.icon.scale = 0.4;
    const endGrip = chart.scrollbarX.endGrip;
    endGrip.icon.scale = 0.4;


    chart.logo.disabled = true;


    chart.events.on('datavalidated', _ => {

      const now = new Date();

      const startDate =  this.addDays(now, -7);
      const endDate = this.addDays(now, 24);
      dateAxis.zoomToDates(startDate, endDate);
    }, this);

  }

  setCurrentOrder(e) {
    const x = e.target.dataItem.categories.categoryY;
    const y = e.target.currentText;
    let z;

    if (x) { z = x; }
    if (y) { z = y; }

    this.goBatch.emit(z);
  }

  formatData(x) {
    const data = new Date(x);

    const year  = JSON.stringify(data.getFullYear());
    let  month  = JSON.stringify(data.getMonth() + 1);
    let  day    = JSON.stringify(data.getDate());
    let  hour   = JSON.stringify(data.getHours());
    let  min    = JSON.stringify(data.getMinutes());

    month = month.length < 2 ? 0 + month : month;
    day   = day.length  < 2 ? 0 + day : day;
    hour  = hour.length < 2 ? 0 + hour : hour;
    min   = min.length < 2 ? 0 + min : min;

    return `${year}-${month}-${day} ${hour}:${min}`;
  }

  highlightNow(e) {
    const axis = e.target;

    const start = axis.positionToDate(0);

    const rangeStart = this.addDays(start, -99);
    const rangeStop = new Date();

    const range = axis.axisRanges.create();
    range.date = rangeStart;
    range.endDate = rangeStop;
    range.axisFill.fill = am4core.color('#000');
    range.axisFill.fillOpacity = 0.4;
    range.grid.strokeOpacity = 0;
    range.axisFill.above = true;

    const range2 = axis.axisRanges.create();
    range2.value = rangeStop;
    range2.grid.stroke = am4core.color('#ff6262');
    range2.grid.strokeWidth = 2;
    range2.grid.strokeOpacity = 1;
    range2.grid.above = true;

    range2.label.inside = false;
    range2.label.text = 'today';
    range2.label.fill = range2.grid.stroke;
    range2.label.horizontalCenter = 'left';
    range2.label.align = 'bottom';
    range2.label.fontSize = 14;
    range2.label.above = true;
    range2.label.background.fill = am4core.color('#3D4754');
    range2.label.background.opacity = 0.7;

  }

  addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }
}
