import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../../services/data.service';
import { MatDialog } from '@angular/material/dialog';

import { LightDialogModalComponent } from '../../modals/light-dialog-modal/light-dialog-modal.component';
import { ClimateDialogModalComponent } from '../../modals/climate-dialog-modal/climate-dialog-modal.component';
import { SolutionDialogModalComponent } from '../../modals/solution-dialog-modal/solution-dialog-modal.component';
import { GenericDialogModalComponent } from '../../modals/generic-dialog-modal/generic-dialog-modal.component';
import { SettingsModalComponent } from '../../modals/settings-modal/settings-modal.component';

@Component({
  selector: 'app-formula',
  templateUrl: './formula.component.html',
  styleUrls: ['./formula.component.scss']
})
export class FormulaComponent implements OnInit {

  // data came from the cicle it was generated using presets periods in a json
  // it contain all the info of that period

  // group is just the istance of the group of type IGroup

  @Input() data;
  @Input() group;


  constructor(
    public dataService: DataService,
    public dialog: MatDialog,
  ) { }

  contextmenu = false;
  contextmenuX = 0;
  contextmenuY = 0;

  preview;

  openContextMenu(event) {
    // on right click it open the period settings tab
    this.openSettingTab();
  }

  ngOnInit(): void {
    // just to be sure this has the correct data, it will be removed in sucessive versions
    /*
      console.log(this.data);
      console.log(this.group);
      */
  }

  openLightTab() {
    // it will open the LightDialogModalComponent to access the data inside the period and change them
    // after it closes checkrecipe() method of dataService is called to update the period values
    const dialogRef = this.dialog.open(LightDialogModalComponent, {
      panelClass: 'custom-light-dialog-component',
  });

    dialogRef.componentInstance.data = this.data;
    dialogRef.componentInstance.group = this.group;
    dialogRef.afterClosed().subscribe(res => {

      this.dataService.checkRecipe();
      if (res !== undefined) {
        const gIndex = this.dataService.groups.indexOf(this.group);
        const el = this.dataService.groups[gIndex].items.filter(x => x.pid === this.data.pid);
        const pIndex = this.dataService.groups[gIndex].items.indexOf(el[0]);

        this.dataService.groups[gIndex].items[pIndex].lightintensity = res.lightintensity;
        this.dataService.groups[gIndex].items[pIndex].lightspectrum = res.lightspectrum;
        this.dataService.groups[gIndex].items[pIndex].photoperiod = res.photoperiod;
        this.dataService.groups[gIndex].items[pIndex].photoperiod.day = res.photoperiod.day;
        this.dataService.groups[gIndex].items[pIndex].photoperiod.night = res.photoperiod.night;
        this.dataService.groups[gIndex].items[pIndex].drawerdistance = res.drawerdistance;
      }
    });
  }
  openClimateTab() {
    // it will open the ClimateDialogModalComponent to access the data inside the period and change them
    // after it closes checkrecipe() method of dataService is called to update the period values
    const dialogRef = this.dialog.open(ClimateDialogModalComponent, {
      panelClass: 'custom-climate-dialog-component',
    });
    dialogRef.componentInstance.data = this.data;
    dialogRef.componentInstance.group = this.group;
    dialogRef.afterClosed().subscribe(res => {
      this.dataService.checkRecipe();

      if (res !== undefined) {
        const gIndex = this.dataService.groups.indexOf(this.group);
        const el = this.dataService.groups[gIndex].items.filter(x => x.pid === this.data.pid);
        const pIndex = this.dataService.groups[gIndex].items.indexOf(el[0]);

        this.dataService.groups[gIndex].items[pIndex].temperature = res.temperature;
        this.dataService.groups[gIndex].items[pIndex].humidity = res.humidity;
      }
    });
  }
  openSolutionTab() {
    // it will open the SolutionDialogModalComponent to access the data inside the period and change them
    // after it closes checkrecipe() method of dataService is called to update the period values
    const dialogRef = this.dialog.open(SolutionDialogModalComponent, {
      panelClass: 'custom-solution-dialog-component', });
    dialogRef.componentInstance.data = this.data;
    dialogRef.componentInstance.group = this.group;
    dialogRef.afterClosed().subscribe(res => {
      this.dataService.checkRecipe();
      if (res !== undefined) {
        const gIndex = this.dataService.groups.indexOf(this.group);
        const el = this.dataService.groups[gIndex].items.filter(x => x.pid === this.data.pid);
        const pIndex = this.dataService.groups[gIndex].items.indexOf(el[0]);

        this.dataService.groups[gIndex].items[pIndex].solution = res.solution;
        this.dataService.groups[gIndex].items[pIndex].solutionquantity = res.solutionquantity ;
        this.dataService.groups[gIndex].items[pIndex].refill = res.refill ;
        this.dataService.groups[gIndex].items[pIndex].refill.ph = res.refill.ph ;
        this.dataService.groups[gIndex].items[pIndex].refill.ph.min = res.refill.ph.min ;
        this.dataService.groups[gIndex].items[pIndex].refill.ph.max = res.refill.ph.max ;
        this.dataService.groups[gIndex].items[pIndex].refill.ec = res.refill.ec ;
        this.dataService.groups[gIndex].items[pIndex].refill.ec.min = res.refill.ec.min ;
        this.dataService.groups[gIndex].items[pIndex].refill.ec.max = res.refill.ec.max ;
        this.dataService.groups[gIndex].items[pIndex].refill.frequency = res.refill.frequency;
        this.dataService.groups[gIndex].items[pIndex].refill.refilltype = res.refill.refilltype;
        this.dataService.groups[gIndex].items[pIndex].spray = res.spray;
        this.dataService.groups[gIndex].items[pIndex].spray.active = res.spray.active;
        this.dataService.groups[gIndex].items[pIndex].spray.frequency = res.spray.frequency;
        this.dataService.groups[gIndex].items[pIndex].spray.solution = res.spray.solution;
      }
    });
  }
  openGenericTab() {
    // it will open the GenericDialogModalComponent to access the data inside the period and change them
    // after it closes checkrecipe() method of dataService is called to update the period values
    const dialogRef = this.dialog.open(GenericDialogModalComponent, {
      panelClass: 'custom-generic-dialog-component',
    });
    dialogRef.componentInstance.data = this.data;
    dialogRef.componentInstance.group = this.group;
    dialogRef.afterClosed().subscribe(res => {
      this.dataService.checkRecipe();
      if (res !== undefined) {
        const gIndex = this.dataService.groups.indexOf(this.group);
        const el = this.dataService.groups[gIndex].items.filter(x => x.pid === this.data.pid);
        const pIndex = this.dataService.groups[gIndex].items.indexOf(el[0]);

        this.dataService.groups[gIndex].items[pIndex].periodduration = res.periodduration;

      }
    });
  }

  openSettingTab() {
    // it will open the SettingsModalComponent to access the data inside the period and change them
    // after it closes checkrecipe() method of dataService is called to update the period values
    const dialogRef = this.dialog.open(SettingsModalComponent, {
      panelClass: 'custom-settings-dialog-component', });
    dialogRef.componentInstance.data = this.data;
    dialogRef.componentInstance.group = this.group;
    dialogRef.afterClosed().subscribe(res => {
      this.dataService.checkRecipe();
    });
  }

  getAlignment(x) {
    // dinamically assign a class if the corrispective formula is head or not ( '+' alignment problem )
    const head = this.isHead();

    if (head === true) {
      return 'L' + x;
    } else {
      return 'l' + x;
    }
  }

  updateLightTab() {
    // This function is called after a light value is changed to dinamically cang the class of the light icon
    const val = this.dataService.light.filter(x => x.pid === this.data.pid);
    if (!val.length) {
      return 'None';
    } else {
      for (const ele of this.dataService.spectrumList) {
       if (ele === val[0].lightspectrum) {
         return val[0].lightspectrum;
       }
      }
      return 'custom';
    }
  }

  updateSolutionTab() {
    // This function is called after a solution value is changed to dinamically cang the class of the solution icon
    const val = this.dataService.solution.filter(x => x.pid === this.data.pid);
    if (!val.length) {
      return 'None';
    } else {
      for (const ele of this.dataService.solutionList) {
        if (ele === val[0].solution) {
          return val[0].solution;
        }
       }
      return 'custom';
    }
  }

  updateGenStyle() {
    // This function is called after a generic value is changed to dinamically change the class of the generic icon
    const val = this.dataService.generic.filter(x => x.pid === this.data.pid);
    if (val.length) {
      const cM = 240;  // color max
      const cm = 0; // color min
      const rM = 1440 * 31; // range max
      const rm = 1440 * 1; // range min

      const col = (rM - val[0].periodduration) / (rM - rm) * (cM - cm);
      const color =  'hsl(' + col + ', 100%, 80%)';
      return {
        fill : color,
        filter : 'drop-shadow(0 0 10px black) drop-shadow(0 0 10px ' + color + ') drop-shadow(0 0 12px ' + color + ')'
      };
    } else {
      return {fill: 'hsl(0 , 0%, 50%)'};
    }
  }

  updateClimateStyle() {
    // This function is called after a climate value is changed to dinamically change the class of the climate icon
    const val = this.dataService.climate.filter(x => x.pid === this.data.pid);
    if (val.length) {
      const cM = 240;  // color max
      const cm = 0; // color min
      const rM = 30; // range max
      const rm = 18; // range min

      // col goes from cM to cm
      const col = (rM - val[0].temperature) / (rM - rm) * (cM - cm);

      const color =  'hsl(' + col + ', 100%, 80%)';
      return {
        fill : color,
        filter : 'drop-shadow(0 0 5px black) drop-shadow(0 0 10px ' + color + ') drop-shadow(0 0 12px ' + color + ')'
      };
    } else {
      return {fill: 'hsl(0 , 0%, 50%)'};
    }
  }

  isPeriodCompleted() {
    // This function is called after every changes is applied to a period
    // It is used to dinamically assign class to the period name if completed
    const val = this.dataService.recipe.filter(x => x.pid === this.data.pid);
    if (val.length) {
      return 'completed';
    } else {
      return 'empty';
    }
  }

  showDetails() {
    // It assigns the value sof the period to the preview variable that is shown on mouse over in the DOM in the table
    const rec = this.dataService.recipe.filter( x => x.pid === this.data.pid);
    if (rec.length) {
      this.dataService.preview[0] = rec[0];
    } else {
      this.dataService.preview  = [];
    }
  }
  hideDetails() {
    // It empties the values of the period to the preview variable when mouse is not over the element
    this.dataService.preview = [];
  }

  isHead() {
    // it revoe the + in front of the period if it is the first element of the group
    // return the value for an *ngIF

    if (this.group.items[0].pid === this.data.pid) {
      return true;
    } else {
      return false;
    }
  }

}
