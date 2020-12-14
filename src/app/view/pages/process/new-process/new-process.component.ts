import { Component, OnInit } from '@angular/core';
import { addProcess } from 'src/app/model/processes/addProcess';
import { OnoApiService } from 'src/app/service/ono-api.service';
import {MatIconModule} from '@angular/material/icon';
import { BusyService } from 'src/app/service/busy.service';

@Component({
  selector: 'app-new-process',
  templateUrl: './new-process.component.html',
  styleUrls: ['./new-process.component.scss']
})
export class NewProcessComponent implements OnInit {

  constructor(
    private onoApiService: OnoApiService,
    private busyService: BusyService,
  ) { }

  trayList;
  slotList;
  configList = ['Red', 'Blue', 'Red&Blue', 'Purple', 'White'];
  recipeList;
  orderIdList = [];

  openProcess;

  trans = [
    { str: 'External bay', num: 0 },
    { str: 'Pit-stop', num: 101 },
    { str: 'Spray', num: 200 },
    { str: 'Window1', num: 5 },
    { str: 'Window2', num: 7 },
    { str: 'Window3', num: 9 },
    { str: 'Window4', num: 11 },
    { str: 'Window6', num: 15 },
    { str: 'Window7', num: 17 },

    { str: 'Full11-30cm', num: 103 },
    { str: 'Full11-20cm', num: 104 },
    { str: 'Full11-10cm', num: 105 },
    { str: 'Full11-0cm', num: 106 },

    { str: 'Shadow3', num: 108 },
    { str: 'Shadow4', num: 126 },
    { str: 'Shadow5', num: 20 },

    { str: 'Full7-0cm', num: 36 },
    { str: 'Full7-10cm', num: 35 },
    { str: 'Full7-20cm', num: 34 },

    { str: 'Red&Blue6-0cm', num: 122 },
    { str: 'Red&Blue6-10cm', num: 121 },
    { str: 'Red&Blue6-20cm', num: 120 },
    { str: 'Red&Blue6-30cm', num: 119 },

    { str: 'White9-0cm', num: 33 },
    { str: 'White9-10cm', num: 32 },
    { str: 'White9-20cm', num: 31 },
    { str: 'White9-30cm', num: 30 },

    { str: 'Purple5-0cm', num: 113 },
    { str: 'Purple5-10cm', num: 112 },
    { str: 'Purple5-20cm', num: 111 },
    { str: 'Purple5-30cm', num: 110 },

    { str: 'Full1-0cm', num: 116 },
    { str: 'Full1-10cm', num: 115 },
    { str: 'Full1-20cm', num: 114 },
    { str: 'Full1-30cm', num: 113 },

    { str: 'Red&Blue3-0cm', num: 29 },
    { str: 'Red&Blue3-10cm', num: 28 },
    { str: 'Red&Blue3-20cm', num: 27 },
    { str: 'Red&Blue3-30cm', num: 26 },


    { str: 'Red&Blue4-0cm', num: 4 },
    { str: 'Red&Blue4-10cm', num: 3 },
    { str: 'Red&Blue4-20cm', num: 2 },
    { str: 'Red&Blue4-30cm', num: 1 },

    { str: 'Red&Blue2-0cm', num: 40 },
    { str: 'Red&Blue2-10cm', num: 39 },
    { str: 'Red&Blue2-20cm', num: 38 },
    { str: 'Red&Blue2-30cm', num: 37 },


    { str: 'Purple8-0cm', num: 102 },

    { str: 'Purple10-0cm', num: 130 },
    { str: 'Purple10-10cm', num: 129 },
    { str: 'Purple10-20cm', num: 128 },
    { str: 'Purple10-30cm', num: 127 }

  ];


  model = new addProcess();


  ngOnInit() {
    this.getData();
  }

  getData() {
    this.onoApiService.getFullDrawers().subscribe(res => {
      this.trayList = res;
    });

    this.onoApiService.slotsGet().subscribe(res => {
      this.slotList = res.filter(x => x.Area.includes('cm'));
    });

    this.onoApiService.getRecipes().then(res => {
      this.recipeList = res;
    });

    this.onoApiService.infoprocess().subscribe(res => {
      res.forEach(ele => {
        this.orderIdList.push(ele.OrderID);
      });
    });
  }

  isShadow(y) {

    if (!y) {return false; }

    const state = this.slotList.filter(x => {
      return x.Area === y;
    });

    if (state[0].Slotstatus === 'shadowed' || state[0].Slotstatus === 'couldShadow') {
      return true;
    } else {
      return false;
    }
  }

  submit() {
    this.busyService.commitSettingState();
    this.onoApiService.addProcess(this.model).subscribe(res => {
      this.busyService.inactiveSettingState(res);
      this.getData();
    });

    this.model = new addProcess();
  }

  check() {
    this.onoApiService.infoprocess().subscribe(res => {
      this.openProcess = res;
    });
  }

  foundOrderID() {
    try {
      const res = this.orderIdList.filter(x => x === this.model.OrderID);
      if (res.length > 0) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  }

  validForm() {
    try {

      if (
        this.model.OrderID !== ''       &&
        this.model.DrawerSerial         &&
        this.model.Light !== ''         &&
        this.model.Configuration !== '' &&
        this.model.Duration             &&
        this.model.FinalWeight          &&
        this.model.Recipe !== ''        &&
        this.foundOrderID() === false 
          ) {
          return true;
        } else {
          return false;
        }
    } catch (err) {
      return false;
    }
  }
}
