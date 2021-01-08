import { Component, OnInit, Input } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-gauge-chart',
  templateUrl: './gauge-chart.component.html',
  styleUrls: ['./gauge-chart.component.scss']
})
export class GaugeChartComponent implements OnInit {
  [x: string]: any;

  @Input() range;
  @Input() type;
  @Input() id;
  @Input() data;

  constructor() { }

  ngOnInit() {

    const color = {
      white: '#fff',
      black: '#000',
      grey: '#7e8596',
      temperature: '#ED953A',
      humidity: '#7FB9F2',
      distance: '#FFF2AB',
      ec: '#C1FFBF',
      ph: '#fd5189',
      range: {
        range1: '#5FBB97',
        range2: '#8FD66E',
        range3: '#F3D053',
        range4: '#FF370A',
        range5: '#900C3F',
        min: '#0fe800',
        max: '#e80000',
      }
    };

    setTimeout( _ => {

      // Set theme
      am4core.useTheme(am4themes_animated);
      am4core.options.autoDispose = true;

      // Create chart
      const chart = am4core.create('chartdiv-' + this.type + '-' + this.id, am4charts.GaugeChart);
      chart.startAngle = -200;
      chart.endAngle = 20;

      // Create axis
      const xAxis = chart.xAxes.push(new am4charts.ValueAxis<am4charts.AxisRendererCircular>());
      xAxis.min = this.range.min;
      xAxis.max = this.range.max;
      xAxis.strictMinMax = true;
      xAxis.renderer.labels.template.disabled = true;

      // Set inner radius
      chart.innerRadius = -10;

      /**
       * ADD RANGES
       */

      // range from 0 to 33%
      const range1 = xAxis.axisRanges.create();
      range1.value = this.range.min;                                        // starting value
      range1.endValue = (this.range.max - this.range.min) / 15 * 5;         // ending value
      range1.axisFill.fillOpacity = 1;                                      // gauge part opacity
      range1.axisFill.fill = am4core.color(color.range.range1);             // gauge part color

      // range from 33 to 60%
      const range2 = xAxis.axisRanges.create();
      range2.value = (this.range.max - this.range.min) / 15 * 5;
      range2.endValue = (this.range.max - this.range.min) / 15 * 9;
      range2.axisFill.fillOpacity = 1;
      range2.axisFill.fill = am4core.color(color.range.range2);

      // range from 60 to 80%
      const range3 = xAxis.axisRanges.create();
      range3.value = (this.range.max - this.range.min) / 15 * 9;
      range3.endValue = (this.range.max - this.range.min) / 15 * 12;
      range3.axisFill.fillOpacity = 1;
      range3.axisFill.fill = am4core.color(color.range.range3);

      // range from 80 to 93%
      const range4 = xAxis.axisRanges.create();
      range4.value = (this.range.max - this.range.min) / 15 * 12;
      range4.endValue = (this.range.max - this.range.min) / 15 * 14;
      range4.axisFill.fillOpacity = 1;
      range4.axisFill.fill = am4core.color(color.range.range4);

      // range from 93 to 100%
      const range5 = xAxis.axisRanges.create();
      range5.value = (this.range.max - this.range.min) / 15 * 14;
      range5.endValue = this.range.max;
      range5.axisFill.fillOpacity = 1;
      range5.axisFill.fill = am4core.color(color.range.range5);


      /**
       * MIN MAX LABELS
       * used for add  min and a max gauge level indications
       */

      // label for min
      const minLabel = xAxis.axisRanges.create();                                 // label creation
      minLabel.value = this.range.min;                                            // set value (and position) of the label
      minLabel.label.text = this.range.min.toString();                            // label text
      minLabel.label.fontSize = 15;                                               // label font size
      minLabel.label.fill = am4core.color(color.range.min);                       // label font color

      // label for max
      const maxLabel = xAxis.axisRanges.create();
      maxLabel.value = this.range.max;
      maxLabel.label.text = this.range.max.toString();
      maxLabel.label.fontSize = 15;
      maxLabel.label.fill = am4core.color(color.range.max);



      /**
       * HAND
       * is used to indicate the level on the gauge
       */

      // Add hand
      const hand = chart.hands.push(new am4charts.ClockHand());
      hand.value = 0;
      hand.pin.disabled = true;
      hand.fill = am4core.color(color.white);
      hand.stroke = am4core.color(color.white);
      hand.innerRadius = am4core.percent(50);
      hand.radius = am4core.percent(100);
      hand.startWidth = 5;

      const label = chart.radarContainer.createChild(am4core.Label);
      label.isMeasured = false;
      label.fontSize = 15;
      label.horizontalCenter = 'middle';
      label.verticalCenter = 'top';
      label.text = this.data;
      label.fill = am4core.color(color.white);

      chart.logo.disabled = true;

      setInterval(() => {

        let value;

        if (this.data > this.range.max) {
          value = this.range.max;
        } else {
          value = this.data;
        }

        const animation = new am4core.Animation(hand, {
          property: 'value',
          to: value
        }, 1000, am4core.ease.cubicOut).start();

      }, 100);


    }, 100);
  }


}


