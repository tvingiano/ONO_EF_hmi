import { Component, Inject, OnInit } from '@angular/core';
import { OnoApiService } from '../../../service/ono-api.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
}
)
export class DemoComponent implements OnInit {
  constructor(public dialog: MatDialog, private onoApiService: OnoApiService, private router: Router) { }
  ngOnInit() {
    this.onoApiService.demo()
  }
}