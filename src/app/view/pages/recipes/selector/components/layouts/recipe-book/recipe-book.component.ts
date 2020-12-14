import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/service/helper/utils.service';
import { HttpService } from '../../../../selector/services/http.service';

@Component({
  selector: 'app-recipe-book',
  templateUrl: './recipe-book.component.html',
  styleUrls: ['./recipe-book.component.scss']
})
export class RecipeBookComponent implements OnInit {

  constructor(
    public httpService: HttpService,
    private utils: UtilsService
  ) { }

  farmings;
  species;
  seeds;

  ngOnInit(): void {
    this.utils.showLoader();
    this.obtainData();
  }

  obtainData() {

    this.httpService.req('farmings').toPromise().then(f => {
      this.farmings = f;
      // console.log(this.farmings);

      this.httpService.req('species').toPromise().then(sp => {
        this.species = sp;
        // console.log('species: ' , this.species);

        this.httpService.req('seeds').toPromise().then(se => {
          this.seeds  = se;
          // console.log(this.seeds);
          this.utils.hideLoader();

        });
      });
    });


  }

}
