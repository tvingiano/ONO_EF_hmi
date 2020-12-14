import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../../selector/services/http.service';
import { UtilsService } from 'src/app/service/helper/utils.service';




@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit {

  constructor(
    public httpService: HttpService,
    private utils: UtilsService
  ) { }

  loading = true;

  farmings;
  species;
  seeds;
  seedTable;

  selected = {
    farm: 'none',
    specie: 'none',
    seed: 'none',
    filter: '',
  };

  filter = {
    nutritionals: {
      open: false,
      calories: {value: -1, major: true},
      carbohydrates: {value: -1, major: true},
      fats: {value: -1, major: true},
      proteins: {value: -1, major: true}
    },
    costs: {
      open: false,
      germRate: {value: -1, major: true},
      energy: {value: -1, major: true},
      quantity: {value: -1, major: true},
      cost: {value: -1, major: true},
      sWeight: {value: -1, major: true},
      refill: {value: -1, major: true},
      dWeight: {value: -1, major: true},
    },
    qualities: {
      open: false,
      aesthetics: {value: -1, major: true},
      color: {value: -1, major: true},
      crunchiness: {value: -1, major: true},
      fragrance: {value: -1, major: true},
      growthLevel: {value: -1, major: true},
      taste: {value: -1, major: true},
      mortality: {value: -1, major: true},
    },
    name: {
      value: '',
      open: false,
    },
    owner: {
      value: '',
      open: false,
    }
  };

  activeCard: {
    ID: string,
    active: string
  }[] = [];


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

  setFarmSelection(choice) {
    this.selected.farm = choice;

    const appo = [];

    for (const f of this.farmings) {
      if (f.Farming === choice) {
        appo.push(f);
      }
    }

    for (const f of this.farmings) {
      if (f.Farming !== choice) {
        appo.push(f);
      }
    }

    this.farmings = appo;

  }
  setSpecieSelection(choice) {
    this.selected.specie = choice;

    for (const seed of this.seeds) {
      if (seed.Specie === this.selected.specie) {
        const topush = {ID: seed.ID, active: 'none'};
        this.activeCard.push(topush);
      }
    }

    const appo = [];

    for (const s of this.species) {
      if (s.Specie === choice) {
        appo.push(s);
      }
    }

    for (const s of this.species) {
      if (s.Specie !== choice) {
        appo.push(s);
      }
    }

    this.species = appo;

  }

  resetToFarm(x) {
    this.selected.farm = x;
    this.selected.specie = 'none';
    this.selected.seed = 'none';
  }
  resetToSpecie(x) {
    this.selected.specie = x;
    this.selected.seed = 'none';
  }
  resetToSeed(x) {
    this.selected.seed = x;
  }


  imageUrl(name, type) {
    const image = '../../../../../../../../../../assets/' + type + 'Icons/' + name + '.jpg';
    return image;
  }

  childNum(type, filter) {
    try {
      switch (type) {
        case 'farm': {
          const arr = this.species.filter(x => x.Farming === filter);
          return arr.length;
        }
        case 'specie': {
          const arr = this.seeds.filter(x => x.Specie === filter);
          return arr.length;
        }
        default: break;
      }
    } catch {
      return;
    }
  }



  openFilter(x) {
    switch (x) {
      case 0: {
        this.filter.nutritionals.open = !this.filter.nutritionals.open;
        this.filter.costs.open = false;
        this.filter.qualities.open = false;
        this.filter.name.open = false;
        this.filter.owner.open = false;
        break;
      }
      case 1: {
        this.filter.nutritionals.open = false;
        this.filter.costs.open = !this.filter.costs.open;
        this.filter.qualities.open = false;
        this.filter.name.open = false;
        this.filter.owner.open = false;
        break;
      }
      case 2: {
        this.filter.nutritionals.open = false;
        this.filter.costs.open = false;
        this.filter.qualities.open = !this.filter.qualities.open;
        this.filter.name.open = false;
        this.filter.owner.open = false;
        break;
      }
      case 3: {
        this.filter.nutritionals.open = false;
        this.filter.costs.open = false;
        this.filter.qualities.open = false;
        this.filter.name.open = !this.filter.name.open;
        this.filter.owner.open = false;
        break;
      }
      case 4: {
        this.filter.nutritionals.open = false;
        this.filter.costs.open = false;
        this.filter.qualities.open = false;
        this.filter.name.open = false;
        this.filter.owner.open = !this.filter.owner.open;
        break;
      }
      default: break;
    }
    // console.log(this.filter);
  }

  closeFilter() {
    this.filter.nutritionals.open = false;
    this.filter.costs.open = false;
    this.filter.qualities.open = false;
    this.filter.name.open = false;
    this.filter.owner.open = false;
  }

  getUniqueOwners() {
    const owners: [{name: string}] = [{name: 'admin'}];
    for (const s of this.seeds) {
      if (s.Specie === this.selected.specie) {
        let found = false;
        for (const o of owners) {
          if (o.name === s.Owner) {
            found = true;
          }
        }
        if (found !== true) {
          const topush = {name: s.Owner};
          owners.push(topush);
        }
      }
    }
    return owners;
  }

  getFilteredSeeds() {
    const n = this.filter.nutritionals;
    const c = this.filter.costs;
    const q = this.filter.qualities;

    const filSeeds = [];

    for (const seed of this.seeds) {
      if (seed.Specie === this.selected.specie) {
        let pass = true;

        // calories
        if (n.calories.value !== -1) {
          if (n.calories.major === true) {
            if (seed.NutritionalFact.Calories < n.calories.value) {
              pass = false;
            }
          } else {
            if (seed.NutritionalFact.Calories > n.calories.value) {
              pass = false;
            }
          }
        }

        // carbohydrates
        if (n.carbohydrates.value !== -1) {
          if (n.carbohydrates.major === true) {
            if (seed.NutritionalFact.Carbohydrate < n.carbohydrates.value) {
              pass = false;
            }
          } else {
            if (seed.NutritionalFact.Carbohydrate > n.carbohydrates.value) {
              pass = false;
            }
          }
        }

        // fats
        if (n.fats.value !== -1) {
          if (n.fats.major === true) {
            if (seed.NutritionalFact.Fat < n.fats.value) {
              pass = false;
            }
          } else {
            if (seed.NutritionalFact.Fat > n.fats.value) {
              pass = false;
            }
          }
        }

        // proteins
        if (n.proteins.value !== -1) {
          if (n.proteins.major === true) {
            if (seed.NutritionalFact.Protein < n.proteins.value) {
              pass = false;
            }
          } else {
            if (seed.NutritionalFact.Protein > n.proteins.value) {
              pass = false;
            }
          }
        }

        // aesthetics
        if (q.aesthetics.value !== -1) {
          if (q.aesthetics.major === true) {
            if (seed.Quality.Aesthetics < q.aesthetics.value) {
              pass = false;
            }
          } else {
            if (seed.Quality.Aesthetics > q.aesthetics.value) {
              pass = false;
            }
          }
        }

        // color
        if (q.color.value !== -1) {
          if (q.color.major === true) {
            if (seed.Quality.Color < q.color.value) {
              pass = false;
            }
          } else {
            if (seed.Quality.Color > q.color.value) {
              pass = false;
            }
          }
        }

        // crunchiness
        if (q.crunchiness.value !== -1) {
          if (q.crunchiness.major === true) {
            if (seed.Quality.Crunchiness < q.crunchiness.value) {
              pass = false;
            }
          } else {
            if (seed.Quality.Crunchiness > q.crunchiness.value) {
              pass = false;
            }
          }
        }

        // fragrance
        if (q.fragrance.value !== -1) {
          if (q.fragrance.major === true) {
            if (seed.Quality.Fragrance < q.fragrance.value) {
              pass = false;
            }
          } else {
            if (seed.Quality.Fragrance > q.fragrance.value) {
              pass = false;
            }
          }
        }

        // growthlevel
        if (q.growthLevel.value !== -1) {
          if (q.growthLevel.major === true) {
            if (seed.Quality.Fragrance < q.growthLevel.value) {
              pass = false;
            }
          } else {
            if (seed.Quality.GrowthLevel > q.growthLevel.value) {
              pass = false;
            }
          }
        }

        // mortality
        if (q.mortality.value !== -1) {
          if (q.mortality.major === true) {
            if (seed.Quality.Mortality < q.mortality.value) {
              pass = false;
            }
          } else {
            if (seed.Quality.Mortality > q.mortality.value) {
              pass = false;
            }
          }
        }

        // taste
        if (q.taste.value !== -1) {
          if (q.taste.major === true) {
            if (seed.Quality.Taste < q.taste.value) {
              pass = false;
            }
          } else {
            if (seed.Quality.Taste > q.taste.value) {
              pass = false;
            }
          }
        }

        // EnergyForLightHour
        if (c.energy.value !== -1) {
          if (c.energy.major === true) {
            if (seed.Cost.EnergyForLightHour < c.energy.value) {
              pass = false;
            }
          } else {
            if (seed.Cost.EnergyForLightHour > c.energy.value) {
              pass = false;
            }
          }
        }
        // GerminatedPercentage
        if (c.germRate.value !== -1) {
          if (c.germRate.major === true) {
            if (seed.Cost.GerminatedPercentage < c.germRate.value) {
              pass = false;
            }
          } else {
            if (seed.Cost.GerminatedPercentage > c.germRate.value) {
              pass = false;
            }
          }
        }
        // QuantityForDrawer
        if (c.quantity.value !== -1) {
          if (c.quantity.major === true) {
            if (seed.Cost.GerminatedPercentage < c.quantity.value) {
              pass = false;
            }
          } else {
            if (seed.Cost.GerminatedPercentage > c.quantity.value) {
              pass = false;
            }
          }
        }
        // SeedCost
        if (c.cost.value !== -1) {
          if (c.cost.major === true) {
            if (seed.Cost.SeedCost < c.cost.value) {
              pass = false;
            }
          } else {
            if (seed.Cost.SeedCost > c.cost.value) {
              pass = false;
            }
          }
        }
        // SingleSeedWeight
        if (c.sWeight.value !== -1) {
          if (c.sWeight.major === true) {
            if (seed.Cost.SingleSeedWeight < c.sWeight.value) {
              pass = false;
            }
          } else {
            if (seed.Cost.SingleSeedWeight > c.sWeight.value) {
              pass = false;
            }
          }
        }
        // WaterForRefill
        if (c.refill.value !== -1) {
          if (c.refill.major === true) {
            if (seed.Cost.WaterForRefill < c.refill.value) {
              pass = false;
            }
          } else {
            if (seed.Cost.WaterForRefill > c.refill.value) {
              pass = false;
            }
          }
        }
        // WeightForDrawer
        if (c.dWeight.value !== -1) {
          if (c.dWeight.major === true) {
            if (seed.Cost.WeightForDrawer < c.dWeight.value) {
              pass = false;
            }
          } else {
            if (seed.Cost.WeightForDrawer > c.dWeight.value) {
              pass = false;
            }
          }
        }

        // PUSH
        if (pass ===  true) {
          filSeeds.push(seed);
        }
      }
    }

    return filSeeds;
  }

  setFilter(x) {
    x.toLowerCase();
    const res = x.split(' ');
    this.selected.filter = res;
  }

  searched(val) {

    let pass = false;
    const x = val.toLowerCase();

    if (this.selected.filter === undefined || this.selected.filter === '') {
      return true;
    } else {
      for (const e of this.selected.filter) {
        if (x.includes(e)) {
          pass = true;
        }
      }

      return pass;
    }

  }

  filterNameOwner(seed) {

    const n = this.filter.name.value;
    const o = this.filter.owner.value;

    let x = false;

    if (
        (
          n === '' ||
          seed.SeedType.toLowerCase().includes(n.toLowerCase())
        ) && (
          o === '' ||
          seed.Owner.toLowerCase().includes(o.toLowerCase())
        )
    ) {
      x = true;
     }

    return x;
  }
}
