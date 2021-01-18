import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-step-progress',
  templateUrl: './step-progress.component.html',
  styleUrls: ['./step-progress.component.scss']
})
export class StepProgressComponent implements OnInit {

  @Input() nodes; // starts from 1 to N -> 0 is "nothing done"
  @Input() state; // starts from 1 to N

  constructor() { }

  ngOnInit() {
  }

  activeStep(i) {
    return i < this.state;
  }

}
