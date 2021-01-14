import { Injectable, ComponentFactoryResolver} from '@angular/core';
import { ILightData, ISolutionData, IGenericData, IClimateData, IPeriod, IGroup, FinalJson } from '../classes/dataFormat';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { DomSanitizer } from '@angular/platform-browser';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DataService {

  constructor(
    private sanitizer: DomSanitizer,
    public snackBar: MatSnackBar,
    public http: HttpClient
  ) {}

  fileUrl;
  fileName;


  public light: ILightData[] = [] ;
  public solution: ISolutionData[] = [];
  public generic: IGenericData[] = [];
  public climate: IClimateData[] = [];
  public recipe: IPeriod[] = [];
  public finalRecipe: IPeriod[] = [];

  public groups: IGroup[] = [];
  public finalJson: FinalJson;

  public expJSON;

  Preset_a = [
    {
      type: 0,
      pid: -1,
      name: 'sprout_A',
      note: '',
      photoperiod: {
        day: 0,
        night: 1440
      },
      lightintensity: 0,
      lightspectrum: 'OFF',
      drawerdistance: 10,
      solution: 'Water',
      solutionquantity: 5,
      refill: {
        ph: {
          min: 6.8,
          max: 7.3
        },
        ec: {
          min: 200,
          max: 300
        },
        refilltype: 1,
        frequency: 1440
      },
      spray: {
        active: true,
        frequency: 720,
        solution: 'water'
      },
      temperature: 27,
      humidity: 50,
      periodduration: 14400,
      FirstRefill: {
        active: true,
        solution: 'Water',
        type: 'Spray',
        quantity: 5,
      }
  }, {
    type: 0,
    pid: -1,
    name: 'sprout_B',
    note: '',
    photoperiod: {
      day: 0,
      night: 1440
    },
    lightintensity: 0,
    lightspectrum: 'OFF',
    drawerdistance: 10,
    solution: 'Hoagland',
    solutionquantity: 10,
    refill: {
      ph: {
        min: 7,
        max: 8
      },
      ec: {
        min: 900,
        max: 1000
      },
      refilltype: 1,
      frequency: 1440
    },
    spray: {
      active: true,
      frequency: 720,
      solution: 'water'
    },
    temperature: 27,
    humidity: 50,
    periodduration: 15840,
    FirstRefill: {
      active: true,
      solution: 'Water',
      type: 'Spray',
      quantity: 5,
    }
  }, {
    type: 0,
    pid: -1,
    name: 'sprout_C',
    note: '',
    photoperiod: {
      day: 1080,
      night: 360
    },
    lightintensity: 80,
    lightspectrum: 'White',
    drawerdistance: 10,
    solution: 'Water',
    solutionquantity: 8,
    refill: {
      ph: {
        min: 6.9,
        max: 7.1
      },
      ec: {
        min: 300,
        max: 400
      },
      refilltype: 0,
      frequency: 1440
    },
    spray: {
      active: true,
      frequency: 720,
      solution: 'water'
    },
    temperature: 26,
    humidity: 50,
    periodduration: 20160,
    FirstRefill: {
      active: true,
      solution: 'Water',
      type: 'Spray',
      quantity: 5,
    }
  }, {
    type: 0,
    pid: -1,
    name: 'sprout_D',
    note: '',
    photoperiod: {
      day: 960,
      night: 480
    },
    lightintensity: 500,
    lightspectrum: 'RedAndBlue',
    drawerdistance: 20,
    solution: 'Hoagland',
    solutionquantity: 7,
    refill: {
      ph: {
        min: 6.8,
        max: 7.2
      },
      ec: {
        min: 950,
        max: 1000
      },
      refilltype: 2,
      frequency: 2880
    },
    spray: {
      active: true,
      frequency: 720,
      solution: 'water'
    },
    temperature: 26,
    humidity: 60,
    periodduration: 4320,
    FirstRefill: {
      active: true,
      solution: 'Water',
      type: 'Spray',
      quantity: 5,
    }
  }, {
    type: 0,
    pid: -1,
    name: 'seedling_A',
    note: '',
    photoperiod: {
      day: 960,
      night: 480
    },
    lightintensity: 152,
    lightspectrum: 'White',
    drawerdistance: 20,
    solution: 'Water',
    solutionquantity: 13,
    refill: {
      ph: {
        min: 6.5,
        max: 7.5
      },
      ec: {
        min: 200,
        max: 300
      },
      refilltype: 3,
      frequency: 1440
    },
    spray: {
      active: true,
      frequency: 720,
      solution: 'water'
    },
    temperature: 26,
    humidity: 50,
    periodduration: 10080,
    FirstRefill: {
      active: true,
      solution: 'Water',
      type: 'Spray',
      quantity: 5,
    }
  }, {
    type: 0,
    pid: -1,
    name: 'seedling_B',
    note: '',
    photoperiod: {
      day: 960,
      night: 480
    },
    lightintensity: 129,
    lightspectrum: 'RedAndBlue',
    drawerdistance: 20,
    solution: 'Hoagland',
    solutionquantity: 24,
    refill: {
      ph: {
        min: 6.3,
        max: 7.3
      },
      ec: {
        min: 900,
        max: 1050
      },
      refilltype: 1,
      frequency: 2880
    },
    spray: {
      active: true,
      frequency: 720,
      solution: 'water'
    },
    temperature: 25,
    humidity: 50,
    periodduration: 20160,
    FirstRefill: {
      active: true,
      solution: 'Water',
      type: 'Spray',
      quantity: 5,
    }
  }, {
    type: 0,
    pid: -1,
    name: 'vegetative_A',
    note: '',
    photoperiod: {
      day: 960,
      night: 480
    },
    lightintensity: 500,
    lightspectrum: 'RedAndBlue',
    drawerdistance: 20,
    solution: 'Baseplant',
    solutionquantity: 13,
    refill: {
      ph: {
        min: 6.6,
        max: 7.6
      },
      ec: {
        min: 700,
        max: 800
      },
      refilltype: 4,
      frequency: 2880
    },
    spray: {
      active: true,
      frequency: 720,
      solution: 'water'
    },
    temperature: 25,
    humidity: 50,
    periodduration: 10080,
    FirstRefill: {
      active: true,
      solution: 'Water',
      type: 'Spray',
      quantity: 5,
    }
  }, {
    type: 0,
    pid: -1,
    name: 'vegetative_B',
    note: '',
    photoperiod: {
      day: 1440,
      night: 0
    },
    lightintensity: 500,
    lightspectrum: 'Purple',
    drawerdistance: 20,
    solution: 'Water',
    solutionquantity: 16,
    refill: {
      ph: {
        min: 6.5,
        max: 7.5
      },
      ec: {
        min: 700,
        max: 800
      },
      refilltype: 2,
      frequency: 1440
    },
    spray: {
      active: true,
      frequency: 720,
      solution: 'water'
    },
    temperature: 24,
    humidity: 50,
    periodduration: 17280,
    FirstRefill: {
      active: true,
      solution: 'Water',
      type: 'Spray',
      quantity: 5,
    }
  }, {
    type: 0,
    pid: -1,
    name: 'flowering',
    note: '',
    photoperiod: {
      day: 1200,
      night: 240
    },
    lightintensity: 170,
    lightspectrum: 'White',
    drawerdistance: 30,
    solution: 'Baseplant',
    solutionquantity: 24,
    refill: {
      ph: {
        min: 6.6,
        max: 7.6
      },
      ec: {
        min: 1050,
        max: 1250
      },
      refilltype: 0,
      frequency: 2880
    },
    spray: {
      active: true,
      frequency: 720,
      solution: 'water'
    },
    temperature: 28,
    humidity: 67,
    periodduration: 10080,
    FirstRefill: {
      active: true,
      solution: 'Water',
      type: 'Spray',
      quantity: 5,
    }
  }, {
    type: 0,
    pid: -1,
    name: 'ripening',
    note: '',
    photoperiod: {
      day: 1140,
      night: 300
    },
    lightintensity: 201,
    lightspectrum: 'StarLight 2000',
    drawerdistance: 30,
    solution: 'Hoagland',
    solutionquantity: 18,
    refill: {
      ph: {
        min: 6,
        max: 7.5
      },
      ec: {
        min: 800,
        max: 900
      },
      refilltype: 1,
      frequency: 1440
    },
    spray: {
      active: true,
      frequency: 720,
      solution: 'water'
    },
    temperature: 25,
    humidity: 50,
    periodduration: 10080,
    FirstRefill: {
      active: true,
      solution: 'Water',
      type: 'Spray',
      quantity: 5,
    }
  }];


  spectrumList = ['Red', 'Blue', 'RedAndBlue', 'Purple', 'White', 'OFF'];
  solutionList = ['Water', 'Hydroplant', 'Hoagland', 'Baseplant'];
  refillTypes = [
    {value: 1, view: 'Flood w/ solution recycle'},
    {value: 2, view: 'Flood w/o solution recycle'},
    {value: 3, view: 'Ebb & Flow'},
    {value: 4, view: 'Spray'}
  ];

  stages = [
    {
      name: 'Sprout',
      img: 'sprout_mine.svg'
    }, {
      name: 'Seedling',
      img: 'seedling_mine.svg'
    }, {
      name: 'Vegetative',
      img: 'vegetative_mine.svg'
    }, {
      name: 'Flowering',
      img: 'flowering_mine.svg'
    }, {
      name: 'Ripening',
      img: 'ripening_mine.svg'
    },
  ];

  lClasses;

  preview = [];
  presets = this.Preset_a;

  savedPeriods: IPeriod[] = [];
  savedGroups: IGroup[] = [];
  savedGroupPeriods: IPeriod[] = [];

  /*
    ADD... push form resoult into an array I...Data
  */
  addLight(l) {
    for (let i = 0; i < this.light.length; i++) {
      if (this.light[i].pid === l.pid) {
        this.light[i] = l;
        return;
      }
    }
    this.light.push(l);
    this.checkRecipe();
  }
  addSolution(s) {
    for (let i = 0; i < this.solution.length; i++) {
      if (this.solution[i].pid === s.pid) {
        this.solution[i] = s;
        return;
      }
    }
    this.solution.push(s);
    this.checkRecipe();
  }
  addClimate(c) {
    for (let i = 0; i < this.climate.length; i++) {
      if (this.climate[i].pid === c.pid) {
        this.climate[i] = c;
        return;
      }
    }
    this.climate.push(c);
    this.checkRecipe();
  }
  addGeneric(g) {
    for (let i = 0; i < this.generic.length; i++) {
      if (this.generic[i].pid === g.pid) {
        this.generic[i] = g;
        return;
      }
    }
    this.generic.push(g);
    this.checkRecipe();
  }

  addSettings(s) {
    let groupIndex;
    let itemIndex;

    this.groups.forEach(group => {
      group.items.forEach(item => {
        if (item.pid === s.pid) {
          groupIndex = this.groups.indexOf(group);
          itemIndex = group.items.indexOf(item);
        }
      });
    });

    this.groups[groupIndex].items[itemIndex].name = s.name;
    this.groups[groupIndex].items[itemIndex].note = s.note;
  }

  addPeriod(item: IPeriod) {
    let found = false;
    for (let i = 0; i < this.recipe.length; i++) {
      if (this.recipe[i].pid === item.pid) {
        found = true;
        this.recipe[i] = item;
      }
    }
    if (found === false) {
      this.recipe.push(item);
    }
  }

  /*
  get ask dataservice to return the corrispective value
  */

  getLight(): ILightData[] {
      return this.light;
  }
  getSolution(): ISolutionData[] {
    return this.solution;
  }
  getGeneric(): IGenericData[] {
    return this.generic;
  }
  getClimate(): IClimateData[] {
    return this.climate;
  }
  getRecipe(): IPeriod[] {
    return this.recipe;
  }

  /*
  create an array with all periods in groups
  */

  getFinalRecipe() {
    this.finalRecipe = [];
    for (const group of this.groups) {
      for (let i = 0; i < group.exp; i++) {
        for (const item of group.items) {
          for (const rec of this.recipe) {
            if (rec.pid === item.pid) {
              this.finalRecipe.push(rec);
            }
          }
        }
      }
    }
  }

  /*
  main function that return the finalJson file and download it
  */

  exportRecipe() {
    this.checkRecipe();

    // check if there are some wrog settings
    for (const g of this.groups) {
      for (const p of g.items) {
        if (p.refill.frequency > p.periodduration) {
          p.refill.frequency = p.periodduration;
        }
      }
    }


    const exp = [];

    for (const g of this.groups) {
      if (g.items[0]) {
        exp.push(g);
      }
    }

    /**
     * export everytghing if groups is not empty
     */

    if (exp.length !== 0 ) {

      this.finalJson.Periods = exp;

      this.expJSON = JSON.stringify(this.finalJson, null, 2);

      // console.log('#########################');
      // console.log('RECIPE COMPLETED! HURRAY! ');
      // console.log(this.finalJson);
      // console.log('JSON: ');
      // console.log('%c ' + this.expJSON , 'background: #000; color: #00FF00');

      const successConfig = new MatSnackBarConfig();
      successConfig.duration = 2000;
      successConfig.panelClass = 'successSnackBar';


      const errorConfig = new MatSnackBarConfig();
      errorConfig.duration = 2000;
      errorConfig.panelClass = 'errorSnackBar';


      if (this.recipe.length !== 0) {
        this.snackBar.open('Your recipe is ready to be downloaded!', 'close', successConfig);
      } else {
        this.snackBar.open('Your recipe is empty :(', 'close', errorConfig);
      }

      if (this.finalRecipe.length === 1) {
      // tslint:disable-next-line:max-line-length
      console.warn('NOTE: Your recipe consists of only one period, Add more empty periods with the green "aggiungi!" button or just drag them from the \"presets area\"');
      }
      console.log('#########################');
    } else {
      console.error('there are no recipes ready to get exported');
    }
    this.checkRecipe();

    const blob = new Blob([this.expJSON], { type: 'json' });

    this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
    const d = new Date();
    this.fileName = this.finalJson.Recipename + '_' + d.getFullYear() + d.getMonth() + d.getDate() + '_' + d.getHours() + d.getMinutes();

  }

  /*
  main function that check for avaiable completed recipes
  It is called every time somethig change in a period or in a group, like new per,
  new groups, new values, changes in positioning, etc
  */

  checkRecipe() {
    // console.log('cheking for changes...')
    this.recipe = [];
    for (const group of this.groups) {
      for (const item of group.items) {
        const lr = this.light.filter( x => x.pid === item.pid);
        const cr = this.climate.filter( x => x.pid === item.pid);
        const sr = this.solution.filter( x => x.pid === item.pid);
        const gr = this.generic.filter( x => x.pid === item.pid);
        const l = lr[0];
        const c = cr[0];
        const s = sr[0];
        const g = gr[0];

        if (lr.length && cr.length && gr.length && sr.length) {
          const newRec = {
            type: item.type,
            pid: item.pid,
            group: {
              gid: group.gid,
              name: group.title,
              stage: group.stage
            },
            name: item.name,
            note: item.note,
            photoperiod: {
              day: l.photoperiod.day,
              night: l.photoperiod.night
            },
            lightintensity: l.lightintensity,
            lightspectrum: l.lightspectrum,
            drawerdistance: l.drawerdistance,
            solution: s.solution,
            solutionquantity: s.solutionquantity,
            refill: {
              ph: {
                min: s.refill.ph.min,
                max: s.refill.ph.max
              },
              ec: {
                min: s.refill.ec.min,
                max: s.refill.ec.max
              },
              refilltype: s.refill.refilltype,
              frequency: s.refill.frequency
            },
            spray: {
              active: s.spray.active,
              frequency: s.spray.frequency,
              solution: s.spray.solution
          },
            temperature: c.temperature,
            humidity: c.humidity,
            periodduration: g.periodduration,
          };
          this.recipe.push(newRec);
        }
      }

    }

  }

  /*
  It will add in the selected position the selected period from presPer
  */

  addFromPresets(presPer, contId, currIndex) {

    // search for the max avaiable id

    let maxid = -1;
    for (const group of this.groups) {
      for (const item of group.items) {
        if (item.pid > maxid) {
          maxid = item.pid;
        }
      }
    }
    const newId = maxid + 1;

    // check if the element contain everythig based on his id ([id = -1] => completed preset period, [id = -2] =>empty period)
    if (presPer.pid === -1) {

      const newLight: ILightData = {
        pid: newId,
        photoperiod: {
          day: presPer.photoperiod.day,
        night: presPer.photoperiod.night,
        },
        lightintensity: presPer.lightintensity,
        lightspectrum: presPer.lightspectrum,
        drawerdistance: presPer.drawerdistance,
      };

      const newSolution: ISolutionData = {
        pid: newId,
        solution: presPer.solution,
        solutionquantity: presPer.solutionquantity,
        refill: {
          ph: {
              min: presPer.refill.ph.min,
              max: presPer.refill.ph.max,
          },
          ec: {
              min: presPer.refill.ec.min,
              max: presPer.refill.ec.max,
          },
          refilltype: presPer.refill.refilltype,
          frequency: presPer.refill.frequency
        },
        spray: {
          active: presPer.spray.active,
          frequency: presPer.spray.frequency,
          solution: presPer.spray.solution
        }
      };

      const newClimate: IClimateData = {
        pid: newId,
        temperature: presPer.temperature,
        humidity: presPer.humidity
      };

      const newGeneric: IGenericData = {
        pid: newId,
        periodduration: presPer.periodduration
      };

      this.light.push(newLight);
      this.solution.push(newSolution);
      this.generic.push(newGeneric);
      this.climate.push(newClimate);

    }

    presPer.pid = newId;
    presPer.type = presPer.type ? presPer.type : 2;
    this.recipe.push(presPer);

    const groupElem =  this.groups.filter(ele => ele.gid === parseInt(contId, 10));
    const groupIndex = this.groups.indexOf(groupElem[0]);
    this.groups[groupIndex].items.push(presPer);
    moveItemInArray(this.groups[groupIndex].items, this.groups[groupIndex].items.length - 1, currIndex);

    this.checkRecipe();
  }

  /*
  Main function for importing recipes from json file
  */

  uploadRecipe(r) {


    let rec = JSON.parse(JSON.stringify(r));



    try {

      // this will remove spaces and breakline, they're annoying
      rec = rec.replace(/(\r\n|\n|\r|\s)/gm, '');
      rec = JSON.parse(rec);

      // find the max id in group list, i will start adding group based on this id
      let maxGroupId = Math.max.apply(Math, this.groups.map(x => x.gid));

      rec.forEach(ele => {

        let maxPerId;
        if (this.recipe.length > 0) {
          maxPerId = Math.max.apply(Math, this.recipe.map(x => x.pid));
        } else {
          maxPerId = -1;
        }

        const newItems = JSON.parse(JSON.stringify(ele.items));

        newItems.forEach(item => {
          maxPerId ++;
          item.pid = maxPerId;
        });

        maxGroupId ++;

        const pushGroup: IGroup = {
          gid: (ele.gid) ? ele.gid + maxGroupId : maxGroupId,
          title: (ele.title) ? ele.title : 'group ' + maxGroupId,
          exp: (ele.exp) ? ele.exp : 1,
          stage: (ele.stage) ? ele.stage : 'sprout',
          extended: (ele.extended) ? ele.extended : true,
          totalPeriod: (ele.totalPeriod) ? ele.totalPeriod : 0,
          items: (newItems) ? newItems : []
        };

        this.groups.push(pushGroup);

      });

      const pushLight: ILightData[] = [];
      const pushClimate: IClimateData[] = [];
      const pushSolution: ISolutionData[] = [];
      const pushGeneric: IGenericData[] = [];

      rec.forEach(group => {
        let maxPerId;
        if (this.recipe.length > 0) {
          maxPerId = Math.max.apply(Math, this.recipe.map(x => x.pid));
        } else {
          maxPerId = -1;
        }
        group.items.forEach(item => {
          maxPerId ++;
          let newLight: ILightData;
          let newSolution: ISolutionData;
          let newGeneric: IGenericData;
          let newClimate: IClimateData;

          // ------------------------
          // check basic informations


          item.name = (item.name) ? item.name : 'period ' + maxPerId;
          item.pid = (item.pid) ? item.pid : maxPerId;
          item.type = (item.type) ? item.type : 2;


          // ------------------------------------------------------------------
          // check if everythig except id inhereit of this.light exists in item
          if (
            item.photoperiod !== undefined &&
            item.photoperiod.day !== undefined &&
            item.photoperiod.night !== undefined &&
            item.drawerdistance !== undefined &&
            item.lightintensity !== undefined &&
            item.lightspectrum !== undefined
          ) {

            newLight = {
              pid: maxPerId,
              photoperiod: {
                day: item.photoperiod.day,
              night: item.photoperiod.night
              },
              lightintensity: item.lightintensity,
              lightspectrum: item.lightspectrum,
              drawerdistance: item.drawerdistance,
            };

            pushLight.push(newLight);
          } else {
            console.error('light', maxPerId, ' is INVALID');
          }

          // --------------------------------------------------------------------
          // check if everythig except id inhereit of this.climate exists in item
          if (
            item.humidity !== undefined &&
            item.temperature !== undefined
          ) {
            newClimate = {
              pid: maxPerId,
              temperature: item.temperature,
              humidity: item.humidity
            };

            pushClimate.push(newClimate);
          } else {
            console.error('climate', maxPerId, ' is INVALID');
          }

          // ---------------------------------------------------------------------
          // check if everythig except id inhereit of this.solution exists in item
          if (
            item.refill !== undefined &&
            item.refill.ph !== undefined &&
            item.refill.ec !== undefined &&
            item.refill.ph.min !== undefined &&
            item.refill.ph.max !== undefined &&
            item.refill.ec.min !== undefined &&
            item.refill.ec.max !== undefined &&
            item.solution !== undefined &&
            item.solutionquantity !== undefined &&
            item.spray !== undefined &&
            item.spray.active !== undefined &&
            item.spray.frequency !== undefined &&
            item.spray.solution !== undefined
          ) {

            newSolution = {
              pid: maxPerId,
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
              },
              spray: {
                active: item.spray.active,
                frequency: item.spray.frequency,
                solution: item.spray.solution
              }
            };

            pushSolution.push(newSolution);
          } else {
            console.error('solution', maxPerId, ' is INVALID');
          }


          // ---------------------------------------------------------------------
          // check if everythig except id inhereit of this.solution exists in item
          if (
              item.periodduration !== undefined
          ) {

            newGeneric = {
              pid: maxPerId,
              periodduration: item.periodduration,
            };


            pushGeneric.push(newGeneric);
          } else {
            console.error('generic', maxPerId, ' is INVALID');
          }
        });
      });

      pushLight.forEach(element => this.light.push(element));
      pushClimate.forEach(element => this.climate.push(element));
      pushSolution.forEach(element => this.solution.push(element));
      pushGeneric.forEach(element => this.generic.push(element));

      this.checkRecipe();
  } catch (err) {
    console.error(err.message);
  }

  }

  /*
  tool for compare 2 object elements
  */

  compare(input, data) {

    let res = false;

    data.forEach(element => {
      if (JSON.stringify(element).toLowerCase() === JSON.stringify(input).toLowerCase()) {
        res = true;
      }
    });

    return res;
  }

  /*
  It is called when the user clicks on the "fav Star", it will save the period object in var savedPer in dataservice
  */


  savePeriod(recId) {

    const appo = this.recipe.filter(x => x.pid === recId);
    const newSaved: IPeriod = appo[0];

    const pid = -1;

    newSaved.pid = pid;
    newSaved.type = 1;

    // comparo l'oggetto che deve essere inserito in dataservice.savedPeriods con gli oggetti già presenti nel medesimo array
    // se già esiste non lo inserisco e ritorno

    if ((this.compare(newSaved, this.savedPeriods) === false) && (this.compare(newSaved, this.presets) === false) ) {
      this.savedPeriods.push(newSaved);
      this.presets[0].pid = -2;


      this.openSnackBar('New period added in "myPer"', 'close', 'favSnackBar');
    } else {
      this.presets[0].pid = -2;

      // tslint:disable-next-line:max-line-length
      this.openSnackBar('[DENIED]: one other preset or saved period has exactly the same attributes.', 'close', 'errorSnackBar');
      return;
    }
  }

  saveGroup(group: IGroup) {
    this.checkRecipe();
    const g = group;

    let gId = -1;
    for (const item of this.savedGroups) {
      if (item.gid > gId) {
        gId = item.gid;
      }
    }
    gId ++;

    for (const item of g.items) {
      let pId = 0;
      for (const x of this.savedGroupPeriods) {
        if (x.pid > pId) {
          pId = x.pid;
        }
      }
      pId ++;

      let toPush;
      for (const rec of this.recipe) {
        if (rec.pid === item.pid) {
          toPush = rec;
          break;
        }
      }

      toPush.pid = pId;
      this.savedGroupPeriods.push(toPush);

      const gIndex = g.items.indexOf(item);
      g.items[gIndex].pid = pId;
    }

    this.savedGroups.push(g);

  }

  /*
  Shortcut for open a snackbar, accept 3 parameters:
  -message: any string, the main message
  -action: any string, to close or make an action
  -panelClass: classes of style.css for styiling the snackbar.

  Avaiable classes: "errorSnackBar","successSnackBar","favSnackBar"
  */

  openSnackBar(message: string, action: string, panelClass: string) {
    const config = new MatSnackBarConfig();
    config.duration = 4000;
    config.panelClass = panelClass;

    this.snackBar.open(message, action, config);
  }


  sentRecipe(recipe) {
    // console.log(recipe, 'found');

    this.finalJson = recipe;

    const periods = recipe.Periods;

    let newPid = 0;

    periods.forEach(group => {

      const newPerItems = [];

      group.Items.forEach(item => {

        const  newPer: IPeriod = {
          type: 0,
          pid: item.Pid,
          name: (item.Name) ? item.Name : 'period ' + newPid,
          note: item.Note,
          photoperiod: {
            day: item.Photoperiod.Day ,
            night: item.Photoperiod.Night ,
          },
          lightintensity: item.LightIntensity,
          lightspectrum: item.LightSpectrum,
          drawerdistance: item.DrawerDistance,
          solution: item.Solution,
          solutionquantity: item.SolutionQuantity,
          refill: {
              refilltype: item.Refill.RefillType,
              frequency: item.Refill.Frequency,
              ph: {
                  min: item.Refill.Ph.Min,
                  max: item.Refill.Ph.Max,
              },
              ec: {
                  min: item.Refill.Ec.Min,
                  max: item.Refill.Ec.Max,
              },
          },
          spray: {
            active: item.spray.active,
            frequency: item.spray.frequency,
            solution: item.spray.solution
          },
          temperature: item.Temperature,
          humidity: item.Humidity,
          periodduration: item.PeriodDuration
        };

        newPerItems.push(newPer);

        newPid ++ ;
      });

      const pushGroup: IGroup = {
        gid:          group.Gid,
        title:        (group.Title)       ? group.Title : 'group ' + group.Gid,
        exp:          (group.Exp)         ? group.Exp : 1,
        stage:        (group.Stage)       ? group.Stage : 'sprout',
        extended:     (group.Extended)    ? group.Extended : true,
        totalPeriod:  (group.TotalPeriod) ? group.TotalPeriod : 0,
        items : newPerItems
      };

      this.groups.push(pushGroup);

    });


    const pushLight: ILightData[] = [];
    const pushClimate: IClimateData[] = [];
    const pushSolution: ISolutionData[] = [];
    const pushGeneric: IGenericData[] = [];

    periods.forEach(group => {

      group.Items.forEach(item => {

          let newLight: ILightData;
          let newSolution: ISolutionData;
          let newGeneric: IGenericData;
          let newClimate: IClimateData;


          // ------------------------------------------------------------------
          // check if everythig except id inhereit of this.light exists in item
          if (
            item.Photoperiod !== undefined &&
            item.Photoperiod.Day !== undefined &&
            item.Photoperiod.Night !== undefined &&
            item.DrawerDistance !== undefined &&
            item.LightIntensity !== undefined &&
            item.LightSpectrum !== undefined
          ) {

            newLight = {
              pid: item.Pid,
              photoperiod: {
                day: item.Photoperiod.Day,
              night: item.Photoperiod.Night
              },
              lightintensity: item.LightIntensity,
              lightspectrum: item.LightSpectrum,
              drawerdistance: item.DrawerDistance,
            };

            pushLight.push(newLight);
          } else {
            console.error('light', item.Pid, ' is INVALID');
          }

          // --------------------------------------------------------------------
          // check if everythig except id inhereit of this.climate exists in item
          if (
            item.Humidity !== undefined &&
            item.Temperature !== undefined
          ) {
            newClimate = {
              pid: item.Pid,
              temperature: item.Temperature,
              humidity: item.Humidity
            };

            pushClimate.push(newClimate);
          } else {
            console.error('climate', item.Pid, ' is INVALID');
          }

          // ---------------------------------------------------------------------
          // check if everythig except id inhereit of this.solution exists in item
          if (
            item.Refill !== undefined &&
            item.Refill.Ph !== undefined &&
            item.Refill.Ec !== undefined &&
            item.Refill.Ph.Min !== undefined &&
            item.Refill.Ph.Max !== undefined &&
            item.Refill.Ec.Min !== undefined &&
            item.Refill.Ec.Max !== undefined &&
            item.Solution !== undefined &&
            item.SolutionQuantity !== undefined
          ) {

            newSolution = {
              pid: item.Pid,
              solution: item.Solution,
              solutionquantity: item.SolutionQuantity,
              refill: {
                ph: {
                    min: item.Refill.Ph.Min,
                    max: item.Refill.Ph.Max,
                },
                ec: {
                    min: item.Refill.Ec.Min,
                    max: item.Refill.Ec.Max,
                },
                refilltype: item.Refill.RefillType,
                frequency:  item.Refill.Frequency
              },
              spray: {
                active: item.spray.active,
                frequency: item.spray.frequency,
                solution: item.spray.solution
              }
            };

            pushSolution.push(newSolution);
          } else {
            console.error('solution', item.Pid, ' is INVALID');
          }


          // ---------------------------------------------------------------------
          // check if everythig except id inhereit of this.solution exists in item
          if (item.PeriodDuration !== undefined ) {

            newGeneric = {
              pid: item.Pid,
              periodduration: item.PeriodDuration
            };

            pushGeneric.push(newGeneric);
          } else {
            console.error('generic', item.Pid, ' is INVALID');
          }
        });

    });

    pushLight.forEach(element => this.light.push(element));
    pushClimate.forEach(element => this.climate.push(element));
    pushSolution.forEach(element => this.solution.push(element));
    pushGeneric.forEach(element => this.generic.push(element));


    this.checkRecipe();
  }


  /**
   * accept refilltype code (0,1,2,3,4) and return litteral 
   */
  refillTypeEncoder(x) {
    switch (x) {
      case 'only measure':                    return 0;
      case 'flood with solution recycle':     return 1;
      case 'flood without solution recycle':  return 2;
      case 'Ebb&Flow':                        return 3;
      case 'spray':                           return 4;
      default: return '';
    }
  }
}

