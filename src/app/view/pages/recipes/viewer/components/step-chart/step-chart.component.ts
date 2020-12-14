import { Component, OnInit, Input } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

@Component({
  selector: 'app-step-chart',
  templateUrl: './step-chart.component.html',
  styleUrls: ['./step-chart.component.scss']
})
export class StepChartComponent implements OnInit {

  @Input() periods: any;
  @Input() id;
  constructor() { }

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

  ngOnInit() {

    // console.log(this.periods);

    const data: {
      time: number,
      temperature: number,
      humidity: number,
      distance: number,
      ph: number,
      ec: number,
    }[] = [];

    let t = 0;

    for (const group of this.periods) {
      for (let i = 0; i < group.Exp; i++) {
        for (const item of group.Items) {
          for ( let j = 0; j < (item.PeriodDuration / 1440); j++) {
            data.push({
              time: t,
              temperature: item.Temperature,
              humidity: item.Humidity,
              distance: item.DrawerDistance,
              ph: (item.Refill.Ph.Max + item.Refill.Ph.Min) / 2,
              ec: ((item.Refill.Ec.Max + item.Refill.Ec.Min) / 2) / 100,
            });
            t++;
          }
        }
      }
    }

    // console.log(data);

    setTimeout(_ => {

      /* Chart code */
      // Themes begin
      am4core.useTheme(am4themes_animated);
      // Themes end

      // Create chart instance
      const chart = am4core.create('chartdiv-' + this.id, am4charts.XYChart);
      chart.paddingRight = 5;
      chart.paddingLeft = 5;

      chart.data = data;

      // console.log(data);




      // Create axes X
      // const xAxis = chart.xAxes.push(new am4charts.xAxis());
      // xAxis.dataFields.category = 'tempTime';
      // xAxis.title.text = 'Days';
      // xAxis.renderer.minGridDistance = 50;
      // xAxis.renderer.grid.template.location = 0.5;
      // xAxis.startLocation = 0.5;
      // xAxis.endLocation = 0.5;

      /*
        X AXES COMMON FOR ALL OTHERS
      */

      const xAxis = chart.xAxes.push(new am4charts.ValueAxis());
      xAxis.renderer.grid.template.location = 0;
      xAxis.renderer.labels.template.fill = am4core.color(this.color.white);
      xAxis.cursorTooltipEnabled = true;
      xAxis.title.text = 'Recipe days';
      xAxis.title.fontSize = 20;
      xAxis.renderer.minGridDistance = 20;
      xAxis.renderer.grid.template.stroke = am4core.color(this.color.grey);
      xAxis.title.fill = am4core.color(this.color.white);
      xAxis.renderer.line.strokeOpacity = 1;
      xAxis.renderer.line.strokeWidth = 2;
      xAxis.renderer.line.stroke = am4core.color(this.color.white);


      /*
      humidity chart
      */

      // Create value axis Y
      const hum_yAxis = chart.yAxes.push(new am4charts.ValueAxis());
      hum_yAxis.baseValue = 0;
      hum_yAxis.min = 39;
      hum_yAxis.max = 100;
      hum_yAxis.renderer.labels.template.fill = am4core.color(this.color.humidity);
      hum_yAxis.renderer.grid.template.stroke = am4core.color(this.color.grey);
      hum_yAxis.renderer.minGridDistance = 20;
      hum_yAxis.renderer.width = 30;
      hum_yAxis.tooltip.disabled = true;
      hum_yAxis.title.fill = am4core.color(this.color.humidity);
      hum_yAxis.renderer.line.strokeOpacity = 1;
      hum_yAxis.renderer.line.strokeWidth = 2;
      hum_yAxis.renderer.line.stroke = am4core.color(this.color.humidity);
      // Create series
      const hum_series = chart.series.push(new am4charts.LineSeries());
      hum_series.name = 'Humidity %';
      hum_series.dataFields.valueX = 'time';
      hum_series.dataFields.valueY = 'humidity';
      hum_series.yAxis = hum_yAxis;
      hum_series.xAxis = xAxis;
      hum_series.fill = am4core.color(this.color.humidity);
      hum_series.stroke = am4core.color(this.color.humidity);
      hum_series.strokeWidth = 1;
      hum_series.tensionX = 0.5;


      /*
      Temperature chart
      */

      // Create value axis Y
      const temp_yAxis = chart.yAxes.push(new am4charts.ValueAxis());
      temp_yAxis.baseValue = 0;
      temp_yAxis.min = 17;
      temp_yAxis.max = 31;
      temp_yAxis.renderer.labels.template.fill = am4core.color(this.color.temperature);
      temp_yAxis.renderer.grid.template.stroke = am4core.color(this.color.grey);
      temp_yAxis.renderer.minGridDistance = 20;
      temp_yAxis.renderer.width = 30;
      temp_yAxis.tooltip.disabled = true;
      temp_yAxis.renderer.line.strokeOpacity = 1;
      temp_yAxis.renderer.line.strokeWidth = 2;
      temp_yAxis.renderer.line.stroke = am4core.color(this.color.temperature);
      // Create series
      const temp_series = chart.series.push(new am4charts.LineSeries());
      temp_series.name = 'Temperature °C';
      temp_series.dataFields.valueX = 'time';
      temp_series.dataFields.valueY = 'temperature';
      temp_series.yAxis = temp_yAxis;
      temp_series.xAxis = xAxis;
      temp_series.fill = am4core.color(this.color.temperature);
      temp_series.stroke = am4core.color(this.color.temperature);
      temp_series.strokeWidth = 1;
      temp_series.tensionX = 0.5;


      /*
      distance chart
      */

      // Create value axis Y
      const dist_yAxis = chart.yAxes.push(new am4charts.ValueAxis());
      dist_yAxis.baseValue = 0;
      dist_yAxis.min = 0;
      dist_yAxis.max = 31;
      dist_yAxis.renderer.labels.template.fill = am4core.color(this.color.distance);
      dist_yAxis.renderer.grid.template.stroke = am4core.color(this.color.grey);
      dist_yAxis.renderer.minGridDistance = 20;
      dist_yAxis.renderer.width = 30;
      dist_yAxis.tooltip.disabled = true;
      dist_yAxis.renderer.line.strokeOpacity = 1;
      dist_yAxis.renderer.line.strokeWidth = 2;
      dist_yAxis.renderer.line.stroke = am4core.color(this.color.distance);
      // Create series
      const dist_series = chart.series.push(new am4charts.LineSeries());
      dist_series.name = 'Distance cm';
      dist_series.dataFields.valueX = 'time';
      dist_series.dataFields.valueY = 'distance';
      dist_series.yAxis = dist_yAxis;
      dist_series.xAxis = xAxis;
      dist_series.fill = am4core.color(this.color.distance);
      dist_series.stroke = am4core.color(this.color.distance);
      dist_series.strokeWidth = 1;
      dist_series.tensionX = 0.5;


      /*
       *ph
       */

      // Create value axis Y
      const ph_yAxis = chart.yAxes.push(new am4charts.ValueAxis());
      ph_yAxis.baseValue = 0;
      ph_yAxis.min = 3;
      ph_yAxis.max = 11;
      ph_yAxis.renderer.labels.template.fill = am4core.color(this.color.ph);
      ph_yAxis.renderer.grid.template.stroke = am4core.color(this.color.grey);
      ph_yAxis.renderer.minGridDistance = 20;
      ph_yAxis.renderer.width = 30;
      ph_yAxis.tooltip.disabled = true;
      ph_yAxis.renderer.line.strokeOpacity = 1;
      ph_yAxis.renderer.line.strokeWidth = 2;
      ph_yAxis.renderer.line.stroke = am4core.color(this.color.ph);
      // Create series
      const ph_series = chart.series.push(new am4charts.LineSeries());
      ph_series.name = 'ph';
      ph_series.dataFields.valueX = 'time';
      ph_series.dataFields.valueY = 'ph';
      ph_series.yAxis = ph_yAxis;
      ph_series.xAxis = xAxis;
      ph_series.fill = am4core.color(this.color.ph);
      ph_series.stroke = am4core.color(this.color.ph);
      ph_series.strokeWidth = 1;
      ph_series.tensionX = 0.5;


      /*
       *ec
       */

      // Create value axis Y
      const ec_yAxis = chart.yAxes.push(new am4charts.ValueAxis());
      ec_yAxis.baseValue = 0;
      ec_yAxis.min = 1;
      ec_yAxis.max = 15;
      ec_yAxis.renderer.labels.template.fill = am4core.color(this.color.ec);
      ec_yAxis.renderer.grid.template.stroke = am4core.color(this.color.grey);
      ec_yAxis.renderer.minGridDistance = 20;
      ec_yAxis.renderer.width = 30;
      ec_yAxis.tooltip.disabled = true;
      ec_yAxis.renderer.line.strokeOpacity = 1;
      ec_yAxis.renderer.line.strokeWidth = 2;
      ec_yAxis.renderer.line.stroke = am4core.color(this.color.ec);
      // Create series
      const ec_series = chart.series.push(new am4charts.LineSeries());
      ec_series.name = 'ec (x100)';
      ec_series.dataFields.valueX = 'time';
      ec_series.dataFields.valueY = 'ec';
      ec_series.yAxis = ec_yAxis;
      ec_series.xAxis = xAxis;
      ec_series.fill = am4core.color(this.color.ec);
      ec_series.stroke = am4core.color(this.color.ec);
      ec_series.strokeWidth = 1;
      ec_series.tensionX = 0.5;

      chart.cursor = new am4charts.XYCursor();
      chart.cursor.xAxis = xAxis;

      chart.legend = new am4charts.Legend();
      chart.legend.parent = chart.plotContainer;
      chart.legend.zIndex = 100;
      chart.legend.labels.template.fill = am4core.color(this.color.white);
      chart.legend.valueLabels.template.fill = am4core.color(this.color.white);

      const title = chart.titles.create();
      title.text = 'Recipe progression';
      title.fill = am4core.color(this.color.white);
      title.fontSize = 25;
      title.marginBottom = 30;




      chart.logo.disabled = true;
    }, 200);
  }

}
