import { Component, Input, OnInit } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { IOrderInfo } from 'src/app/model/orders/orders-info';

@Component({
  selector: 'app-order-gantt',
  templateUrl: './order-gantt.component.html',
  styleUrls: ['./order-gantt.component.scss']
})
export class OrderGanttComponent implements OnInit {

  @Input() data: IOrderInfo[];

  constructor() { }

  ngOnInit() {

    am4core.useTheme(am4themes_animated);

    console.log(this.data)

    let colorSet = new am4core.ColorSet();

    const dataSource = [];

    this.data.forEach( (element,index) => {
      dataSource.push({
        name: element.OrderName,
        fromDate: this.formatData(element.ScheduledStartTime),
        toDate: this.formatData(element.ScheduledEndTime),
        color: colorSet.getIndex(index * 3),
      })
    });
    console.log(dataSource);

    let chart = am4core.create("chartdiv", am4charts.XYChart);
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

    chart.paddingRight = 30;
    chart.dateFormatter.inputDateFormat = "yyyy-MM-dd HH:mm";

    colorSet.saturation = 0.4;

    chart.data = dataSource;

    let categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "name";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.inversed = true;

    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.dateFormatter.dateFormat = "yyyy-MM-dd HH:mm";
    dateAxis.renderer.minGridDistance = 70;
    dateAxis.baseInterval = { count: 30, timeUnit: "minute" };
    dateAxis.max = new Date().getTime() + 31;
    dateAxis.strictMinMax = true;
    dateAxis.renderer.tooltipLocation = 0;

    let series1 = chart.series.push(new am4charts.ColumnSeries());
    series1.columns.template.width = am4core.percent(80);
    series1.columns.template.tooltipText = "{name}: {openDateX} - {dateX}";

    series1.dataFields.openDateX = "fromDate";
    series1.dataFields.dateX = "toDate";
    series1.dataFields.categoryY = "name";
    series1.columns.template.propertyFields.fill = "color"; // get color from data
    series1.columns.template.propertyFields.stroke = "color";
    series1.columns.template.strokeOpacity = 1;

    chart.scrollbarX = new am4core.Scrollbar();
    chart.logo.disabled = true;
  }

  formatData(x) {
    let data = new Date(x);

    let year    = JSON.stringify(data.getFullYear());
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
