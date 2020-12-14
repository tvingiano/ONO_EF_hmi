import { Component, Input, OnInit } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { IOrderInfo } from 'src/app/model/orders/orders-info';

@Component({
  selector: 'app-order-gantt',
  templateUrl: './order-gantt.component.html'
})
export class OrderGanttComponent implements OnInit {

  @Input() data: IOrderInfo[];

  constructor() { }

  ngOnInit() {

    am4core.useTheme(am4themes_animated);


    const chart = am4core.create('chartdiv', am4charts.XYChart);
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

    chart.paddingRight = 30;
    chart.dateFormatter.inputDateFormat = 'yyyy-MM-dd HH:mm';

    const colorSet = new am4core.ColorSet();
    colorSet.saturation = 0.4;


    const dataSource = [];

    this.data.forEach( (element, index) => {
          dataSource.push({
            name: element.OrderName,
            fromDate: this.formatData(element.ScheduledStartTime),
            toDate: this.formatData(element.ScheduledEndTime),
            color: colorSet.getIndex(index * 3),
          });
        });

    chart.data = dataSource;

    const categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = 'name';
    categoryAxis.renderer.grid.template.location = 3;
    categoryAxis.renderer.minGridDistance = 1;
    categoryAxis.renderer.inversed = true;
    categoryAxis.renderer.cellStartLocation = 0.25;
    categoryAxis.renderer.cellEndLocation = 0.75;
    categoryAxis.title.text = 'Orders';
    categoryAxis.title.fontWeight = 'bold';
    categoryAxis.title.fill = am4core.color('#fff');
    categoryAxis.renderer.grid.template.stroke = am4core.color('#fff');
    categoryAxis.renderer.grid.template.strokeWidth = 1;
    categoryAxis.renderer.baseGrid.stroke = am4core.color('#fff');

    const dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.dateFormatter.dateFormat = 'yyyy-MM-dd HH:mm';
    dateAxis.renderer.minGridDistance = 1;
    // dateAxis.baseInterval = { count: 7, timeUnit: "day" };
    // dateAxis.max = new Date();
    // dateAxis.strictMinMax = true;
    dateAxis.renderer.tooltipLocation = 0;
    dateAxis.title.text = 'Date';
    dateAxis.title.fontWeight = 'bold';
    dateAxis.renderer.grid.template.stroke = am4core.color('#fff');
    dateAxis.renderer.grid.template.strokeWidth = 1;
    dateAxis.renderer.baseGrid.stroke = am4core.color('#fff');
    dateAxis.title.fill = am4core.color('#fff');

    const series1 = chart.series.push(new am4charts.ColumnSeries());
    series1.columns.template.tooltipText = '{name}: {openDateX} - {dateX}';
    series1.dataFields.openDateX = 'fromDate';
    series1.dataFields.dateX = 'toDate';
    series1.dataFields.categoryY = 'name';
    series1.columns.template.propertyFields.fill = 'color'; // get color from data
    series1.columns.template.propertyFields.stroke = 'color';
    series1.columns.template.strokeOpacity = 1;
    series1.columns.template.height = am4core.percent(100);


    chart.scrollbarX = new am4core.Scrollbar();
    chart.scrollbarX.background.fillOpacity = 0.2;
    chart.scrollbarX.thumb.background.fillOpacity = 0.2;

    chart.logo.disabled = true;
  }

  formatData(x) {
    const data = new Date(x);

    const year    = JSON.stringify(data.getFullYear());
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
}
