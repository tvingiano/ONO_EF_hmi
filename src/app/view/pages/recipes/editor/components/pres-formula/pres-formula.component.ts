import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../../services/data.service';
import { DelModalComponent } from '../../modals/del-modal/del-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-pres-formula',
  templateUrl: './pres-formula.component.html',
  styleUrls: ['./pres-formula.component.css']
})
export class PresFormulaComponent implements OnInit {

  @Input() data;


  constructor(
    public dataService: DataService,
    private dialog: MatDialog,
  ) { }

  contextmenu = false;

  preview;

  ngOnInit(): void {
  }

  // The functions in here are exactly the same as the ones in formulaCOmponents, it just get the data from a json

  updateLightTab() {
    if (this.data.pid === -1) {
      for (const ele of this.dataService.spectrumList) {
        if (ele === this.data.lightspectrum) {
          return this.data.lightspectrum; }
      }
      return 'custom';
    } else {
      return 'None';
    }
  }

  updateSolutionTab() {
    if (this.data.pid === -1) {
      for (const ele of this.dataService.solutionList) {
        if (ele === this.data.solution) {
          return this.data.solution;
        }
      }
      return 'custom';
    } else {
      return 'None';
    }
  }

  updateGenStyle() {
    if (this.data.pid === -1) {
      const cM = 280;  // color max
      const cm = 0; // color min
      const rM = 31; // range max
      const rm = 1; // range min

      const col = (rM - (this.data.periodduration / 1440)) / (rM - rm) * (cM - cm);
      const color =  'hsl(' + col + ', 100%, 80%)';
      return {
        fill : color,
        filter : 'drop-shadow(0 0 10px black) drop-shadow(0 0 10px ' + color + ') drop-shadow(0 0 12px ' + color + ')'
      };
    } else {
      return {
        fill: 'grey'
      };
    }
  }

  updateClimateStyle() {
    if (this.data.pid === -1) {

      const cM = 240;  // color max
      const cm = 0; // color min
      const rM = 30; // range max
      const rm = 18; // range min


      const col = (rM - this.data.temperature) / (rM - rm) * (cM - cm);

      const color =  'hsl(' + col + ', 100%, 80%)';
      return {
        fill : color,
        filter : 'drop-shadow(0 0 5px black) drop-shadow(0 0 10px ' + color + ') drop-shadow(0 0 12px ' + color + ')'
        };
      } else {
        return {
          fill: 'grey'
        };
      }
  }

  isPeriodCompleted() {
    if (this.data.pid === -1) {
      return 'completed';
    }
  }

  showDetails() {
    if (this.data.pid === -1) {
      this.dataService.preview[0] = this.data;
    }
  }
  hideDetails() {
    if (this.data.pid === -1) {
      this.dataService.preview = [];
    }
  }

  openDelConfirm() {

    switch (this.data.type) {
      case 0: {
        this.dataService.openSnackBar('[DENIED]: This period can\'t be deleted', 'close', 'errorSnackBar');
      }       break;
      case 1: {
        const settings = {
          name: this.data.name
        };
        const dialogRef = this.dialog.open(DelModalComponent, {width: '400px'});
        dialogRef.componentInstance.settings = settings;
        dialogRef.afterClosed().subscribe(res => {
          if (res === true) {
            const newSaved = [];
            for (const x of this.dataService.savedPeriods) {
              if (x !== this.data) {
                newSaved.push(x);
              }
            }

            this.dataService.savedPeriods = newSaved;
          }
        });
      }       break;
    }


  }

}
