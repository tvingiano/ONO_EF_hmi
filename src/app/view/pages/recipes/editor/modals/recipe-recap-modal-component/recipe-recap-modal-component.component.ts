import {
  Component,
  OnInit
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import {
  MatDialogRef
} from '@angular/material';
import {
  DataService
} from '../../services/data.service';

@Component({
  selector: 'app-recipe-recap-modal-component',
  templateUrl: './recipe-recap-modal-component.component.html',
  styleUrls: ['../modal.scss']
})
export class RecipeRecapModalComponentComponent implements OnInit {

  constructor(
    public dataService: DataService,
    public confirmSendDialogRef: MatDialogRef < RecipeRecapModalComponentComponent > ,
  ) {}

  data = this.dataService.finalJson;

  form;

  ngOnInit() {
    this.form = new FormGroup({
      Name: new FormControl(this.data.Recipename, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      Type: new FormControl(this.data.Recipetype, [Validators.required, Validators.minLength(1), Validators.maxLength(14)]),
      EstProd: new FormControl(this.data.FinalWeight, [Validators.required, Validators.min(1)]),
      FRsolution: new FormControl(this.data.FirstRefill.Solution, []),
      FRtype: new FormControl(this.data.FirstRefill.Type)

    });
  }

  FirstRefillValid() {
    if (this.form.status === 'INVALID') {
      return true;

    } else {
      // console.log('VALID');
      // console.log(this.form.value.FRsolution, this.data.FirstRefill.Quantity, this.form.value.FRtype);

      if (this.data.FirstRefill.Active === true) {
        if (this.form.value.FRsolution === null || !this.data.FirstRefill.Quantity || this.form.value.FRtype === null) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    }
  }

  submit() {
    this.data.FirstRefill.Solution = this.form.value.FRsolution;
    this.data.FirstRefill.Type = this.form.value.FRtype;
    this.confirmSendDialogRef.close(true);
  }

  close() {
    this.confirmSendDialogRef.close(false);
  }


}