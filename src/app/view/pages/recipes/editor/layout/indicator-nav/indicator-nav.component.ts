import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { MatDialog } from '@angular/material/dialog';
import { RecipeSettingsModalComponent } from '../../modals/recipe-settings-modal/recipe-settings-modal.component';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-indicator-nav',
  templateUrl: './indicator-nav.component.html',
  styleUrls: ['./indicator-nav.component.css']
})
export class IndicatorNavComponent implements OnInit {

  constructor(
    public dataService: DataService,
    public dialog: MatDialog,
    public httpService: HttpService
  ) { }

  totDol = 0;
  totDuration = 0;
  avgTemp = 0;
  avgHum = 0;

  seeds;


  ngOnInit(): void {
    this.httpService.getSeed().subscribe(x => {
      this.seeds = x;
    });
    this.update();
  }

  update() {
    // update of recipe info too
    this.dataService.finalJson = {
      Recipename: 'Ono Nameless Recipe',
      Version: 1,
      Recipetype: 'any',
      SeedType: 'any',
      Periods: this.dataService.groups,
      EstimatedProduction: 0,
      Description: 'Doesn\'t have a description yet',
      Note: 'Doesn\'t have notes yet',
      Tag: 'Choose them wisely',
    };

    // It gets executed every 10ms, it will get the value that must be shown in the indicators-bar

    setInterval(() => {

      this.totDol = 0;
      this.totDuration = 0;
      this.avgTemp = 0;
      this.avgHum = 0;

      // imposto totDuration
      let parDuration = 0;
      this.dataService.groups.forEach(group => {
        parDuration = parDuration + group.totalPeriod * group.exp;
      });
      this.totDuration = parDuration;

      // imposto totDol
      let parDol = 0;
      this.dataService.groups.forEach(group => {
        group.items.forEach(item => {
          if (item.photoperiod && item.lightspectrum !== 'OFF' && item.lightintensity !== 0) {
            parDol = parDol + (item.photoperiod.day * (item.periodduration / 1440)) * group.exp;
          }
        });
      });
      this.totDol = parDol / 1440;
      this.totDol = Math.round((this.totDol + Number.EPSILON) * 10) / 10; // arrotondo alla prima cifra decimale

      // impost medie temperatura ed umidità
      let totTemp = 0;
      let totHum = 0;

      this.dataService.groups.forEach(group => {
        let pT = 0;
        let pH = 0;
        group.items.forEach(item => {
          if (item.temperature) {
            pT = pT + item.temperature * item.periodduration;
            pH = pH + item.humidity * item.periodduration;
          }
        });

        totTemp = totTemp + (pT * group.exp);
        totHum = totHum + (pH * group.exp);
      });

      this.avgTemp = totTemp / this.totDuration;
      this.avgTemp = Math.round((this.avgTemp + Number.EPSILON) * 10) / 10; // arrotondo alla prima cifra decimale

      this.avgHum = totHum / this.totDuration;
      this.avgHum = Math.round((this.avgHum + Number.EPSILON) * 10) / 10; // arrotondo alla prima cifra decimale
    }, 100);
  }

  openRecipeSettings() {

      const dialogRef = this.dialog.open(RecipeSettingsModalComponent, {panelClass: 'custom-recipe-settings-dialog-component'});
      dialogRef.componentInstance.seeds = this.seeds;
      dialogRef.afterClosed().subscribe(res => {
        this.dataService.checkRecipe();
      });

  }

}
