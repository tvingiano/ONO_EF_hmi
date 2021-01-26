import { Component, OnInit } from '@angular/core';
import { getCurves } from 'crypto';
import { ICurve, ISeed } from 'src/app/model/registries/seeds-info';
import { SpeciesInfo } from 'src/app/model/registries/species-info';
import { OnoApiService } from 'src/app/service/ono-api.service';


@Component({
  selector: 'app-viewer-component',
  templateUrl: './viewer-component.component.html',
  styleUrls: ['./viewer-component.component.scss']
})
export class ViewerComponentComponent implements OnInit {

  constructor(
    private api: OnoApiService,
  ) {
  }

  species: SpeciesInfo[];
  seeds:ISeed[];

  ngOnInit() {

  }

  getSeeds() {
    return this.api.getSeeds().subscribe( x => {
      console.log(x);
      this.seeds = x;
    });
  }

  getSpecies() {
    return this.api.getSpecies().subscribe( x => {
      console.log(x);
      this.species = x;
      return x;
    });
  }

  /**
   * used to place new random seeds into DB
   */
  loadSeeds() {

    /**
     * rand return a random value from 0.0 to 100.0
     */
    function rand() {
      return parseFloat((Math.random() * 100).toFixed(1));
    }

    function getCurve(): ICurve[]{
      const curve: ICurve[] = [];
      const f = Math.random() * (50 - 30) + 30;
      for (let i = 0; i <= 100;  i++) {
        curve.push(
          {
            Day: i,
            Value: f - f * Math.cos(i / 30)
          }
        );
      }

      return curve;
    }

    const adj = ['_stardust', '_ONO', '_Flower', '_of_Italy'];


    const newSeeds: ISeed[] = [];

    adj.forEach(a => {
      this.species.forEach(ele => {
        const newSeed: ISeed = {
          SeedType: ele.Specie + a,
          Specie: ele.Specie,
          NutritionalFact: {
            Protein: parseFloat((rand() / 10).toFixed(0)),
            Fat: parseFloat((rand() / 10).toFixed(0)),
            Carbohydrate: parseFloat((rand() / 10).toFixed(0)),
            Calories: parseFloat((rand() / 10).toFixed(0)),
          },
          Cost: {
            QuantityForDrawer: rand() * 100,
            SingleSeedWeight: rand() / 100,
            GerminatedPercentage: rand(),
            WeightForDrawer: rand() / 10,
            WaterForRefill: 20,
            EnergyForLightHour: rand() * 10,
            SeedCost: rand() / 100,
          },
          Quality: {
            Taste:        parseFloat((rand() / 10).toFixed(0)),
            Color:        parseFloat((rand() / 10).toFixed(0)),
            Fragrance:    parseFloat((rand() / 10).toFixed(0)),
            Crunchiness:  parseFloat((rand() / 10).toFixed(0)),
            Aesthetics:   parseFloat((rand() / 10).toFixed(0)),
            Mortality:    parseFloat((rand() / 10).toFixed(0)),
            GrowthLevel:  parseFloat((rand() / 10).toFixed(0)),
            HeightCurve:  getCurve(),
            AreaCurve:    getCurve(),
            WeightCurve:  getCurve()
          },
          Contingency: 10,
          Vendor: a.replace('_', ''),
          Owner: a.replace('_', ''),
          Description: 'A very good seed',
          Note: '',
          Tag: '',
          Timestamp: '',
        };


        newSeeds.push(newSeed);
      });
    });

    console.log(newSeeds)

    newSeeds.forEach(seme => {
      this.api.postSeed(seme).subscribe(x=>{
        console.log(seme,' => ## =>', x);
      });
    });
    console.warn('COMPLETED')
    this.api.getSeeds().subscribe(s=>{console.log('nuovi semi: ', s)});
  }

  loadSeed() {

  }

}
