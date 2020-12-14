import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, Validator } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-import-modal',
  templateUrl: './import-modal.component.html',
  styleUrls: ['../modal.scss']
})
export class ImportModalComponent implements OnInit {

  constructor(
    public importDialogRef: MatDialogRef<ImportModalComponent>,
  ) { }

  importForm = new FormGroup({
    jsonRecipe: new FormControl()
  });

  res;

  ngOnInit(): void {
  }

  correct(){
    this.res = this.importForm.value.jsonRecipe;

    try{
      this.res = JSON.parse(this.res);
      if (this.res.length > 0){
        return true;
      }
    }catch (err){
      return false;
    }
  }

  submit(){
    const res = this.importForm.value.jsonRecipe;
    this.close(res);
  }

  close(res){
    this.importDialogRef.close(res);
  }
}
