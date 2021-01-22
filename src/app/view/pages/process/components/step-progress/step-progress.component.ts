import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-step-progress',
  templateUrl: './step-progress.component.html',
  styleUrls: ['./step-progress.component.scss']
})
export class StepProgressComponent implements OnInit {

  @Input() nodes: [{Title: string, Description: string}]; // starts from 1 to N -> 0 is "nothing done"
  @Input() state; // starts from 1 to N

  constructor() { }

  ngOnInit() {
    this.nodes.push({Title: 'Conclusion', Description: 'do you want to load next tray?'})
  }

  activeStep(i) {
    return i < this.state;
  }

}
