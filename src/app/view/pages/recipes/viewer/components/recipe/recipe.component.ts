import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UtilsService } from 'src/app/service/helper/utils.service';
import { Router } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { EventEmitter } from '@angular/core';
import { DataService } from '../../../editor/services/data.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private utils: UtilsService,
    private router: Router,
    private dataService: DataService,
  ) {
  }

  private disposeChart: EventEmitter<any> = new EventEmitter();

  seed;

  totRecipes;
  cert = false;

  tabs:
    {
      id: any;
      tab: [boolean, boolean, boolean, boolean, boolean]
    }[] = [];



  recipes = [];

  ngOnInit() {

    if (history.state.data === undefined) {
      this.router.navigate(['/recipes/selector']);
      this.dataService.openSnackBar('[Error] Redirecting to "Recipe selector"...', 'close', 'errorSnackBar');
    } else {
      this.seed = history.state.data.seed;
      // console.log('RECIVED SEED: ', this.seed);
    }

    // this.seed = {SeedType: 'any'};


    /* SHOW LOADER */
    this.utils.showLoader();
    /* until... */
    this.req('recipes').subscribe(x => {
      const appo: any = x;
      let i = 0;

      // console.log(appo);

      if (appo) { // controllo se esistono ricette
        for (const ele of appo) {
          if (ele.Periods && ele.Periods.length !== 0 && ele.SeedType === this.seed.SeedType) {
            ele.id = i;
            ele.EstimatedProduction = Math.round(Math.random() * (20 - 1) + 1);

            ele.TotalDuration = 0;
            for (const p of ele.Periods) {
                ele.TotalDuration = ele.TotalDuration + p.TotalPeriod * p.Exp;
            }

            // console.log(ele);
            this.recipes.push(ele);
            this.tabs.push({id: ele.id, tab: [true, false, false, false, false]});
            i++;
          }
        }

        this.totRecipes = i;

        // console.log(this.recipes);

      } else {
        this.totRecipes = 0;
      }
      this.utils.hideLoader();
    });

  }

  goBack() {
    this.router.navigate(['/recipes/selector']);
  }

  req(what: string) {
    const url = 'http://192.168.60.3:8000/' + what;
    return this.http.get(url);
  }

  search(recipe, src) {
    let pass;

    switch (this.cert) {
      case true: {
        if (recipe.Certified === true) {
          pass = true;
        } else {
          pass = false;
        }
      }          break;
      case false: {
        pass = true;
      }           break;
    }

    if (pass === true) {
      if (recipe.Recipename.toLowerCase().includes(src.toLowerCase())) {
        return true;
      }
    }

    return false;
  }

  setTabActive(id, x) {
    for (const t of this.tabs) {
      if (t.id === id) {
        const tIndex = this.tabs.indexOf(t);

        switch (x) {
          case 0: this.tabs[tIndex].tab = [true, false, false, false, false]; break;
          case 1: this.tabs[tIndex].tab = [false, true, false, false, false]; break;
          case 2: this.tabs[tIndex].tab = [false, false, true, false, false]; break;
          case 3: this.tabs[tIndex].tab = [false, false, false, true, false]; break;
          case 4: this.tabs[tIndex].tab = [false, false, false, false, true]; break;
          default: break;
        }
        return;
      }
    }
  }

  isTabActive(id, x) {
    for ( const t of this.tabs) {
      if (t.id === id) {
        const tIndex = this.tabs.indexOf(t);
        return this.tabs[tIndex].tab[x];
      }
    }
  }

  getRefillType(x) {

    // 0-"only measure"
    // 1-"flood with solution recycle"
    // 2-"flood without solution recycle"
    // 3-"Ebb&Flow"
    // 4-"spray"

    return x === 0 ? 'testing'
          : x === 1 ? 'flood w/ recycle'
          : x === 2 ? 'flood w/o recycle'
          : x === 3 ? 'ebb & flow'
          : x === 4 ? 'spray'
          : 'unknown';
  }

  goToEditor(data) {
    this.router.navigate(['/recipes/editor'], {state: {data: {data}}});
  }

  goToEditorEmpty() {
    this.router.navigate(['/recipes/editor'], {state: {seed: this.seed.SeedType}});
  }

  goToProduction(data) {
    // code here...
  }

  deleteRecipe(data) {
    // code here...
  }


}
