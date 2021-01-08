import { Component, OnInit, Optional, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ISolutionData, IGroup } from '../../classes/dataFormat';
import { DataService } from '../../services/data.service';
import { FormGroup, FormControl, Validators, Validator } from '@angular/forms';
import { Options } from 'ng5-slider';


@Component({
  selector: 'app-solution-dialog-modal',
  templateUrl: './solution-dialog-modal.component.html',
  styleUrls: ['../modal.scss'],
})
export class SolutionDialogModalComponent implements OnInit {

  @Input() public data: ISolutionData;
  @Input() public group: IGroup;

  solutionForm = new FormGroup({
    solution: new FormControl('', [Validators.required, Validators.maxLength(14)]),
  });

  show;

  refillTypes = [
    {value: 0, view: 'Only measure'},
    {value: 1, view: 'Flood w/ solution recycle'},
    {value: 2, view: 'Flood w/o solution recycle'},
    {value: 3, view: 'Ebb & Flow'},
    {value: 4, view: 'Spray'}
  ];

  phOptions: Options = {
    floor: 5,
    ceil: 10,
    step: 0.1,
    showTicks: false
  };

  ecOptions: Options = {
    floor: 0,
    ceil: 3000,
    step: 10,
    showTicks: false
  };

  public solution: ISolutionData;

  type = true;


  constructor(
    public solutionDialogRef: MatDialogRef<SolutionDialogModalComponent>,
    public dataService: DataService
  ) { }

  ngOnInit() {
    this.getStarterValue();
  }

  getStarterValue() {
    for (const item of this.dataService.solution) {
      if (item.pid === this.data.pid) {
        const app = {
          pid: this.data.pid,
          solution: item.solution,
          solutionquantity: item.solutionquantity,
          refill: {
            ph: {
                min: item.refill.ph.min,
                max: item.refill.ph.max,
            },
            ec: {
                min: item.refill.ec.min,
                max: item.refill.ec.max,
            },
            refilltype: item.refill.refilltype,
            frequency: item.refill.frequency
        }
      };
        this.solution = app;
        this.show = this.solution.refill.frequency / 1440;
        return;
      }
    }
    const appo = {
      pid: this.data.pid,
      solution: 'water',
      solutionquantity: 24,
      refill: {
        ph: {
          min: 6,
          max: 8,
        },
        ec: {
          min: 200,
          max: 300,
        },
        refilltype: 1,
        frequency: 1
      }

    };
    this.solution = appo;
    this.show = this.solution.refill.frequency / 1440;
  }

  submit() {

    if (this.solutionForm.value.solution) {
      this.solution.solution = this.solutionForm.value.solution;
    }

    let add = true;
    for (const i of this.dataService.solution) {
      if (i.pid === this.data.pid) {
        if (i.solution === this.solution.solution &&
          i.solutionquantity === this.solution.solutionquantity &&
          i.refill.ph.min === this.solution.refill.ph.min &&
          i.refill.ph.max === this.solution.refill.ph.max &&
          i.refill.ec.min === this.solution.refill.ec.min &&
          i.refill.ec.max === this.solution.refill.ec.max &&
          i.refill.frequency === this.solution.refill.frequency &&
          i.refill.refilltype === this.solution.refill.refilltype) {
            add = false;
          }
      }
    }
    if (add === true) {
      this.dataService.addSolution(this.solution);
    }

    this.solutionDialogRef.close(this.solution);
  }


  close() {
    const me = this;
    me.solutionDialogRef.close();
  }

  setQuantity(t) {
    if (t.source) {
      this.solution.solutionquantity = t.value;
    } else {
      if (t.srcElement.value <= 0) {
        this.solution.solutionquantity = 0;
      } else if (t.srcElement.value >= 25) {
        this.solution.solutionquantity = 25;
      } else {
        this.solution.solutionquantity = t.srcElement.value;
      }
    }
  }
  setPh(t) {
    this.solution.refill.ph.max = t.value.refill.ph.max;
    this.solution.refill.ph.min = t.value.refill.ph.min;
  }
  setEc(t) {
    this.solution.refill.ec.max = t.value.refill.ec.max;
    this.solution.refill.ec.min = t.value.refill.ec.min;
  }

  getFrequencyVal() {
    const perDuration = this.group.items.filter(x => x.pid === this.data.pid)[0].periodduration;
    if (this.data.refill.frequency > perDuration) {
      return perDuration;
    } else {
      return this.solution.refill.frequency;
    }
  }

  maxFrequency() {
    const perDuration = this.group.items.filter(x => x.pid === this.data.pid)[0].periodduration;
    return perDuration / 1440;
  }

  setFrequency(val) {
    this.solution.refill.frequency = val * 1440;
    this.show = val;
  }
}
