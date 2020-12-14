import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IResponse } from '../model/interface/IResponse';
import { SolutionDialogModalComponent } from '../view/pages/recipes/editor/modals/solution-dialog-modal/solution-dialog-modal.component';

export class IState {
  drawer: {
    active: boolean;
    lastResponse: IResponse[];
    value: any[];
  };
  refill: {
    active: boolean;
    lastResponse: IResponse[];
    value: any[];
  };
}

@Injectable({
  providedIn: 'root'
})


/**
 * this servis is used to check for busy state of drawers, lights etc.
 */


export class BusyService {

  state: IState = {
    drawer: {
      active: false,
      lastResponse: [],
      value: []
    },
    refill: {
      active: false,
      lastResponse: [],
      value: []
    }
  };

  drawerRef;
  refillRef;
  refillRefTest;
  settingsRef;

  constructor(
    private snackbar: MatSnackBar
  ) { }

  // DRAWER CONTROL FUNCTIONS
  drawerSnackbar() {
    const msg = 'Moving drawer. Please wait for completion.';
    this.drawerRef = this.snackbar.open(msg, '', {duration: 0, panelClass: 'activeSnackbar'});
  }
  toggleDrawerState() {
    this.state.drawer.active = !this.state.drawer.active;
  }
  /**
   * 
   * @param res - IResponse type: {Code: number, Response: string}
   */
  commitDrawerState(res) {
    this.drawerSnackbar();

    const lResp = this.state.drawer.lastResponse;

    res = res || {
      Code: lResp[lResp.length - 1].Code,
      Response: lResp[lResp.length - 1].Response
    };
    this.state.drawer.value.push(res);
  }

  /**
   * 
   * @param response - IResponse type: {Code: number, Response: string}
   */
  inactiveDrawerState(response) {
    this.state.drawer.active = false;
    this.state.drawer.lastResponse.push(response);
    this.closeDrawerSnackbar();
  }
  closeDrawerSnackbar() {
    try {this.drawerRef.dismiss(); } catch (err) { return; }

    let x;
    let msg;

    const lastCode = this.state.drawer.lastResponse[this.state.drawer.lastResponse.length - 1].Code;
    const lastResponse = this.state.drawer.lastResponse[this.state.drawer.lastResponse.length - 1].Response;
    const lastValue = this.state.drawer.value[this.state.drawer.value.length - 1];

    if (lastCode === 200) {
      msg = '['
      + lastCode
      + '] moving drawer ' +  lastValue.From +
      + ' in "'
      + lastValue.to
      + '" : '
      + lastResponse;

      x = 'successSnackbar';
    } else {
      msg = 'FAILED. [' + lastCode + '] : ' + lastResponse + '.';
      x = 'errorSnackbar';
    }

    this.drawerRef = this.snackbar.open(
      msg,
      'Ok',
      {duration: 8000, panelClass: x}
    );
  }

  // REFILL CONTROL FUNCTIONS
  refillSnackbar() {
    const msg = 'Refill in action. Please wait for completion.';
    this.refillRef = this.snackbar.open(msg, '', {duration: 0, panelClass: 'activeSnackbar'});
  }
  toggleRefillState() {
    this.state.refill.active = !this.state.refill.active;
  }

  /**
   * 
   * @param res -IResponse type: {Code: number, Response: string}
   */
  commitRefillState(res) {
    this.refillSnackbar();

    const lResp = this.state.refill.lastResponse[this.state.refill.lastResponse.length - 1];

    res = res || {
      Code: lResp.Code,
      Response: lResp.Response
    };
    this.state.refill.value.push(res);
  }

  /**
   * 
   * @param response - IResponse type: {Code: number, Response: string}
   */
  inactiveRefillState(response) {
    this.state.refill.active = false;
    this.state.refill.lastResponse.push(response);
    this.closeRefillSnackbar();
  }
  closeRefillSnackbar() {
    try {this.refillRef.dismiss(); } catch { return; }

    let x;
    let msg;

    const lastCode = this.state.refill.lastResponse[this.state.refill.lastResponse.length - 1].Code;
    const lastResponse = this.state.refill.lastResponse[this.state.refill.lastResponse.length - 1].Response;
    const lastValue = this.state.refill.value[this.state.refill.value.length - 1];

    if (lastCode === 200) {
      msg = '[' + lastCode + '] Refill of drawer "'
      + lastValue.Drawer + '" : ' + lastResponse;

      x = 'successSnackbar';
    } else {
      msg = 'FAILED. ['
      + lastCode + '] : '
      + lastResponse + '.';
      x = 'errorSnackbar';
    }

    this.refillRef = this.snackbar.open(
      msg,
      'Ok',
      {duration: 8000, panelClass: x}
    );
  }

  /**
   * ^Test functions are used for simple refill movements not implicating a single drawer
   */
  refillSnackbarTest(action) {
    const msg = action.toUpperCase() + ' will start soon. Please wait for completion';
    this.refillRefTest = this.snackbar.open(msg, '', {duration: 0, panelClass: 'activeSnackbar'});
  }
  toggleRefillStateTest() {
    this.state.refill.active = !this.state.refill.active;
  }
  commitRefillStateTest(res) {
    this.refillSnackbarTest(res);
  }
  inactiveRefillStateTest(response) {
    this.state.refill.active = false;
    this.state.refill.lastResponse.push(response);
    this.closeRefillSnackbarTest();
  }
  closeRefillSnackbarTest() {
    try {this.refillRefTest.dismiss(); } catch { return; }

    const lastCode = this.state.refill.lastResponse[this.state.refill.lastResponse.length - 1].Code;
    const lastResponse = this.state.refill.lastResponse[this.state.refill.lastResponse.length - 1].Response;
    const lastValue = this.state.refill.value[this.state.refill.value.length - 1];

    let x;
    let msg;

    if (lastCode === 200) {
      msg = '[' + lastCode + '] action completed! ' + lastResponse;

      x = 'successSnackbar';
    } else {
      msg = 'FAILED. [' + lastCode + '] : ' + lastResponse + '.';
      x = 'errorSnackbar';
    }

    this.refillRef = this.snackbar.open(
      msg,
      'Ok',
      { duration: 8000, panelClass: x }
    );
  }












// DRAWER SETTINGS SNACKBAR

    settingSnackbar() {
      const msg = 'Changing settings.';
      this.settingsRef = this.snackbar.open(msg, '', {duration: 0, panelClass: 'activeSnackbar'});
    }
    /**
     * 
     * @param res - IResponse type: {Code: number, Response: string}
     */
    commitSettingState() {
      this.settingSnackbar();
    }
  
    /**
     * 
     * @param response - IResponse type: {Code: number, Response: string}
     */
    inactiveSettingState(response: IResponse) {
      this.closeSettingSnackbar(response);
    }
    closeSettingSnackbar(response: IResponse) {
      try {this.settingsRef.dismiss(); } catch (err) { return; }

      let msg;
      let x;

      if (response.Code === 200) {
        msg = 'Settings changed successfully';
        x = 'successSnackbar';
      } else {
        msg = 'FAILED. [' + response.Code + '] : ' + response.Response + '.';
        x = 'errorSnackbar';
      }

      this.drawerRef = this.snackbar.open(
        msg,
        'Ok',
        {duration: 8000, panelClass: x}
      );
    }

}
