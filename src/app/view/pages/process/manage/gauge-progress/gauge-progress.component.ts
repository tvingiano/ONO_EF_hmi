import { Component, Input, OnInit } from '@angular/core';
import { IInfoProcess } from 'src/app/model/interface/IInfoProcess';

import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { updateDefaultValues } from '@syncfusion/ej2-angular-diagrams';

@Component({
  selector: 'app-gauge-progress',
  templateUrl: './gauge-progress.component.html',
  styleUrls: ['./gauge-progress.component.scss']
})
export class GaugeProgressComponent implements OnInit {

  @Input() data: IInfoProcess;
  @Input() colors: {
    date: string;
    growth: string;
    empty: string;
    completed: string;
  };

  hand;
  hand2;
  label;

  constructor() { }

  

  ngOnInit() {
    setTimeout(x => {this.genChart(this.data); }, 100);
  }

  genChart(process: IInfoProcess) {


    am4core.useTheme(am4themes_animated);

  // create chart
    const chart = am4core.create('chartdiv-' + process.ProcessID, am4charts.GaugeChart);
    chart.innerRadius = am4core.percent(82);
    chart.startAngle = -90;
    chart.endAngle = 270;
    chart.logo.disabled = true;


    const axis = chart.xAxes.push(new am4charts.ValueAxis() as any);
    axis.min = 0;
    axis.max = 100;
    axis.renderer.innerRadius = am4core.percent(80);
    axis.strictMinMax = true;
    axis.renderer.labels.template.disabled = true;
    axis.renderer.ticks.template.disabled = true;
    axis.renderer.grid.template.disabled = true;

    this.hand = chart.hands.push(new am4charts.ClockHand());
    this.hand.axis = axis;
    this.hand.value = 0;
    this.hand.disabled = true;
    this.hand.events.on('propertychanged', ev => {
      range0.endValue = ev.target.value;
      range1.value = ev.target.value;
      axis.invalidate();
    });

    const range0 = axis.axisRanges.create();
    range0.value = 0;
    range0.endValue = 0;
    range0.axisFill.fillOpacity = 1;
    range0.axisFill.fill = am4core.color(this.getColor(this.getDateProgress(process)));

    const range1 = axis.axisRanges.create();
    range1.value = 0;
    range1.endValue = 100;
    range1.axisFill.fillOpacity = 0.1;
    range1.axisFill.fill = am4core.color(this.colors.empty);





    const axis2 = chart.xAxes.push(new am4charts.ValueAxis() as any);
    axis2.min = 0;
    axis2.max = 100;
    axis2.renderer.innerRadius = am4core.percent(95);
    axis2.strictMinMax = true;
    axis2.renderer.labels.template.disabled = true;
    axis2.renderer.ticks.template.disabled = true;
    axis2.renderer.grid.template.disabled = true;

    this.hand2 = chart.hands.push(new am4charts.ClockHand());
    this.hand2.axis = axis2;
    this.hand2.value = 0;
    this.hand2.disabled = true;
    this.hand2.stroke = am4core.color('#000');
    this.hand2.events.on('propertychanged', ev => {
      range2.endValue = ev.target.value;
      range3.value = ev.target.value;
      axis2.invalidate();
    });

    const range2 = axis2.axisRanges.create();
    range2.value = 0;
    range2.endValue = 0;
    range2.axisFill.fillOpacity = 1;
    range2.axisFill.fill = am4core.color(this.colors.growth);

    const range3 = axis2.axisRanges.create();
    range3.value = 0;
    range3.endValue = 100;
    range3.axisFill.fillOpacity = 0.1;
    range3.axisFill.fill = am4core.color(this.colors.empty);


    /**
     * Label
     */

    this.label = chart.radarContainer.createChild(am4core.Label);
    this.label.isMeasured = false;
    this.label.fontSize = 20;
    this.label.fill = am4core.color(this.getColor(this.getDateProgress(process)));
    this.label.x = am4core.percent(100);
    this.label.y = am4core.percent(100);
    this.label.horizontalCenter = 'middle';
    this.label.verticalCenter = 'middle';
    this.label.text = '';


    setTimeout(_ => {
      this.updateValues(process);

      setInterval(_ => {
        this.updateValues(process);

      }, 1000 * 60 * 60 * 1);
    }, 100);
  }

  updateValues(process) {
    const value = this.getDateProgress(process);

    this.label.text = value + '%';
    const animation = new am4core.Animation(this.hand, {
      property: 'value',
      to: value
    }, 1000, am4core.ease.cubicOut).start();

    const value2 = this.getGrowthProgress(process);

    const animation2 = new am4core.Animation(this.hand2, {
      property: 'value',
      to: value2
    }, 1000, am4core.ease.cubicOut).start();
  }

  getDateProgress(process: IInfoProcess) {
    const d1 = new Date(process.StartTime).getTime();
    const d2 = new Date(process.EndTime).getTime();
    const now = Date.now();

    const res = Math.round((now - d1) / (d2 - d1) * 100)

    return res >= 100 ? 100 : res;
  }

  getGrowthProgress(process: IInfoProcess) {
    if (process.CvMeasures.length > 0) {
      const res = process.CvMeasures.sort(
        (a, b) => new Date(b.Timestamp).valueOf() - new Date(a.Timestamp).valueOf()
      )[0].Percentage;
      return res >= 100 ? 100 : res;
    } else {
      return undefined;
    }
  }

  getColor(x) {
    return x >= 100 ? this.colors.completed : this.colors.date;
  }

}
