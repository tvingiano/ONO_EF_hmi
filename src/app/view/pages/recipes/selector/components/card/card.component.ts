import { Component, OnInit, Input } from '@angular/core';
import { BodyComponent } from '../layouts/body/body.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() seed;

  constructor(
    private body: BodyComponent,
    private router: Router,
  ) { }

  ngOnInit() {

    /*
      active 'quality page as default for all cards
    */
    this.activateCard(this.seed.ID, 'quality');

  }

  activateCard(id, x) {
    // console.log('active card: ', this.body.activeCard);
    for (const i in this.body.activeCard) {
      if (this.body.activeCard[i].ID === id) {

        this.body.activeCard[i].active = x;

        // console.log(this.body.activeCard);
        return;
      }
    }
  }

  getActive(id) {
    for (const i in this.body.activeCard) {
      if (this.body.activeCard[i].ID === id) {
        return this.body.activeCard[i].active;
      }
    }
  }

  getStarClass(x, val) {
    x = x / 10 * 5;

    if (val <= x) {
      return 'full-star';
    }
    if (val > x && val < (x + 1)) {
      return 'half-star';
    }
    return 'empty-star';
  }


  goToViewer(seed) {
    // console.log(seed);
    this.router.navigate(['/recipes/viewer'], {state: {data: {seed}}});
  }

}
