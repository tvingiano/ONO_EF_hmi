import { Component, OnInit, Input } from '@angular/core';
/* Imports */
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

@Component({
  selector: 'app-growth-chart',
  templateUrl: './growth-chart.component.html',
  styleUrls: ['./growth-chart.component.scss']
})
export class GrowthChartComponent implements OnInit {

  @Input() seed;

  color = '#fff';

  constructor() { }

  ngOnInit() {

    setTimeout(_ => {

      /* Chart code */
    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end

    // Create chart instance
    const chart = am4core.create('chartdiv-' + this.seed.ID, am4charts.XYChart);
    chart.paddingRight = 20;

    chart.data = this.seed.Quality.HeightCurve;

    const title = chart.titles.create();
    title.text = 'Natural growth';
    title.fill = am4core.color(this.color);
    title.fontSize = 25;
    title.marginBottom = 20;

    // Create axes
    const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = 'Day';
    categoryAxis.renderer.minGridDistance = 50;
    categoryAxis.renderer.grid.template.location = 0.5;
    categoryAxis.startLocation = 0.5;
    categoryAxis.endLocation = 0.5;
    categoryAxis.title.text = 'Days';
    categoryAxis.renderer.labels.template.fill = am4core.color(this.color);
    categoryAxis.renderer.grid.template.stroke = am4core.color(this.color);
    categoryAxis.title.fill = am4core.color(this.color);
    categoryAxis.cursorTooltipEnabled = false;
    categoryAxis.renderer.line.strokeOpacity = 1;
    categoryAxis.renderer.line.strokeWidth = 2;
    categoryAxis.renderer.line.stroke = am4core.color(this.color);

    // Create value axis
    const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.title.text = 'Weight (g/m2)';
    valueAxis.renderer.labels.template.fill = am4core.color(this.color);
    valueAxis.renderer.grid.template.stroke = am4core.color(this.color);
    valueAxis.title.fill = am4core.color(this.color);
    valueAxis.cursorTooltipEnabled = false;
    valueAxis.renderer.line.strokeOpacity = 1;
    valueAxis.renderer.line.strokeWidth = 2;
    valueAxis.renderer.line.stroke = am4core.color(this.color);

    // Create series
    const series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = 'Value';
    series.dataFields.categoryX = 'Day';
    series.strokeWidth = 2;
    series.tensionX = 0.77;
    series.fillOpacity = 0.3;


    chart.logo.disabled = true;
    }, 500);

  }
}
