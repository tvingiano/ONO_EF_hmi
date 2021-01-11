import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-recipe-recap-modal-component',
  templateUrl: './recipe-recap-modal-component.component.html',
  styleUrls: ['../modal.scss']
})
export class RecipeRecapModalComponentComponent implements OnInit {

  constructor(
    private dataservice: DataService,
    public confirmSendDialogRef: MatDialogRef<RecipeRecapModalComponentComponent>,
  ) { }

  data = this.dataservice.finalJson;

  form;

  ngOnInit() {
    this.form = new FormGroup({
      Name: new FormControl(this.data.Recipename, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      Type: new FormControl(this.data.Recipetype, [Validators.required, Validators.minLength(1), Validators.maxLength(14)]),
      EstProd: new FormControl(this.data.EstimatedProduction, [Validators.required, Validators.min(1)]),

    });
  }

  submit() {
    this.confirmSendDialogRef.close(true);
  }

  close() {
    this.confirmSendDialogRef.close(false);
  }


}
