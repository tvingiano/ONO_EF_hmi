import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Current usage', cols: 1, rows: 1 },
          //{ title: 'Efficiency', cols: 1, rows: 1 },
          { title: 'Growth drawers movements', cols: 1, rows: 1 },
          { title: 'Yearly m^2 production [Kg]', cols: 1, rows: 1 },
          { title: 'Ambiental', cols: 1, rows: 1 },
          { title: 'Measured Power [kW]', cols: 1, rows: 1 },
          { title: 'Estimated Lamp Power [W]', cols: 1, rows: 1 },
          // { title: 'Growth drawers usage', cols: 1, rows: 1 },
          // { title: 'Daily LED panel usage [h]', cols: 1, rows: 1 },

        ];
      }

      return [
        { title: 'Current usage', cols: 1, rows: 1 },
       // { title: 'Efficiency', cols: 1, rows: 1 },
        { title: 'Growth drawers movements', cols: 1, rows: 1 },
        { title: 'Yearly m^2 production [Kg]', cols: 1, rows: 1 },
        { title: 'Power [kW]', cols: 1, rows: 1 },
        { title: 'Estimated Lamp Power [W]', cols: 1, rows: 1 },
        { title: 'Ambiental', cols: 1, rows: 1 },
        // { title: 'Growth drawers usage', cols: 1, rows: 1 },
        // { title: 'Daily LED panel usage [h]', cols: 1, rows: 1 },
      ];
    })
  );
  cardss = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Running processes', cols: 1, rows: 1 }];
      }

      return [
        { title: 'Running processes', cols: 1, rows: 1 }];
    })
  );

  getUrl() {
    return "url('assets/images/ONO_interfaccia_sfondo_azzurro.png')";
  }

  constructor(private breakpointObserver: BreakpointObserver) { }
}
