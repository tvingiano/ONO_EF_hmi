import { Component, Input, OnInit } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { random } from '@amcharts/amcharts4/.internal/core/utils/String';

@Component({
  selector: 'app-production-chart',
  templateUrl: './production-chart.component.html',
  styleUrls: ['./production-chart.component.scss']
})
export class ProductionChartComponent implements OnInit {

  @Input() seed;
  @Input() recipe;

  color = {
    white: '#fff',
    black: '#000',
    grey: '#7e8596',
    temperature: '#ED953A',
    humidity: '#7FB9F2',
    distance: '#FFF2AB',
    ec: '#C1FFBF',
    ph: '#fd5189',

  };

  constructor() { }

  ngOnInit() {

    if (!this.recipe.EstimatedGrowth) {
      this.recipe.EstimatedGrowth = [];

      let g = 0;

      for (let i = 0; i <= this.recipe.TotalDuration / 1440; i++) {

        g = g + Math.random() * 5;


        this.recipe.EstimatedGrowth.push({recipe: g, base: g * 1.5 * (0.5 + this.getRandomFloat(-0.05, 0.05, 2)), time: i});

      }
    }


    const data = this.recipe.EstimatedGrowth;
    const arr = this.recipe.EstimatedGrowth[this.recipe.EstimatedGrowth.length - 1];

    // get the percentage increment and rout it to 2 decimal
    const appo = (arr.recipe / arr.base) * 100 - 100;
    const increment = Math.round(appo * 100) / 100;

    setTimeout(_ => {
      /* Chart code */
      // Themes begin
      am4core.useTheme(am4themes_animated);
      // Themes end

      const chart = am4core.create('chartdiv-' + this.recipe.id, am4charts.XYChart);
      chart.hiddenState.properties.opacity = 0;           // this creates initial fade-in

      chart.data = data;

      const xAxis = chart.xAxes.push(new am4charts.ValueAxis());
      xAxis.title.text = 'Recipe days';
      xAxis.title.fill = am4core.color(this.color.white);
      xAxis.cursorTooltipEnabled = true;
      xAxis.renderer.labels.template.fill = am4core.color(this.color.white);
      xAxis.renderer.minGridDistance = 20;
      xAxis.renderer.grid.template.stroke = am4core.color(this.color.grey);
      xAxis.title.fill = am4core.color(this.color.white);
      xAxis.renderer.line.strokeOpacity = 1;
      xAxis.renderer.line.strokeWidth = 2;
      xAxis.renderer.line.stroke = am4core.color(this.color.white);

      const yAxis = chart.yAxes.push(new am4charts.ValueAxis());
      yAxis.title.text = 'Kg/m2';
      yAxis.title.fill = am4core.color(this.color.white);
      yAxis.renderer.labels.template.fill = am4core.color(this.color.white);
      yAxis.renderer.grid.template.stroke = am4core.color(this.color.grey);
      yAxis.renderer.minGridDistance = 20;
      yAxis.renderer.line.strokeOpacity = 1;
      yAxis.renderer.line.strokeWidth = 2;
      yAxis.renderer.line.stroke = am4core.color(this.color.white);

      const recipe_series = chart.series.push(new am4charts.LineSeries());
      recipe_series.name = 'recipe';
      recipe_series.dataFields.valueX = 'time';
      recipe_series.dataFields.valueY = 'recipe';
      recipe_series.dataFields.openValueY = 'base';
      recipe_series.sequencedInterpolation = true;
      recipe_series.fillOpacity = 0.3;
      recipe_series.defaultState.transitionDuration = 1500;
      recipe_series.tensionX = 0.8;
      recipe_series.tooltipText = '{valueX}: [bold]{valueY}[/]';

      const base_series = chart.series.push(new am4charts.LineSeries());
      base_series.name = 'natural';
      base_series.dataFields.valueX = 'time';
      base_series.dataFields.valueY = 'base';
      base_series.sequencedInterpolation = true;
      base_series.defaultState.transitionDuration = 1000;
      base_series.stroke = chart.colors.getIndex(6);
      base_series.tensionX = 0.8;
      base_series.fillOpacity = 0.02;
      base_series.tooltip.text = '{valueX}: [bold]{valueY}[/]';

      const axisTooltip = xAxis.tooltip;
      axisTooltip.background.fill = am4core.color('#000');
      axisTooltip.background.opacity = 0.5;
      axisTooltip.dy = 5;

      chart.cursor = new am4charts.XYCursor();

      const title = chart.titles.create();
      title.text = 'Natural vs Recipe growth';
      title.fill = am4core.color(this.color.white);
      title.fontSize = 25;
      title.marginBottom = 30;

      setTimeout(x => {
        const increment_label = chart.createChild(am4core.Label);
        increment > 0 ? increment_label.text = '[#00FF00]+' + increment + '%[/]' : increment_label.text = '[#FF0000]' + increment + '%[/]';
        increment_label.fontSize = 20;
        increment_label.align = 'center';
        increment_label.isMeasured = false;
        increment_label.x = am4core.percent(90);
        increment_label.horizontalCenter = 'middle';
        increment_label.y = am4core.percent(10);
        increment_label.verticalCenter = 'middle';
      }, 2000);

      chart.legend = new am4charts.Legend();
      chart.legend.parent = chart.plotContainer;
      chart.legend.labels.template.fill = am4core.color(this.color.white);
      chart.legend.valueLabels.template.fill = am4core.color(this.color.white);
      chart.legend.zIndex = 100;


      chart.logo.disabled = true;

    }, 200);
  }

  getRandomFloat(min, max, decimals) {
    const dec = Math.pow(10, decimals);
    let x = Math.random() * ( max - min) + min;
    x = Math.round(x * dec) / dec;
    return x;
  }

}
