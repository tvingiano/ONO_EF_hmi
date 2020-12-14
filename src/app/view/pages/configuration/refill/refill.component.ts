import { Component, Inject, OnInit } from '@angular/core';
import { OnoApiService } from '../../../../service/ono-api.service';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { UtilsService } from 'src/app/service/helper/utils.service';

export interface DialogData {
  text: string;
}

@Component({
  selector: 'refill',
  templateUrl: './refill.component.html',
  styleUrls: ['./refill.component.css']
})
export class RefillComponent implements OnInit{
  tanks = [1, 2, 3]
  constructor(
    public onoApiService: OnoApiService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }
  ngOnInit() {
  }
  start(data) {
  }
  // refill(element): void {
  //   const dialogRef = this.dialog.open(Refill, {
  //     width: '500px',
  //     data: {
  //       type: this.type, tank: this.tank, volume: this.volume, ph: this.ph,
  //       ec: this.ec, frequency: this.frequency
  //     }
  //   });
  //   var me = this
  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log(element)
  //     console.log(result)
  //     var a
  //     var b
  //     var suctionqty
  //     var transferqty

  //     if (result.measures == "on" && result.correction == "on") {
  //       a = "1"
  //     } else if (result.measures == "on" && result.correction == "off") {
  //       a = "2"
  //     } else if (result.measures == "off" && result.correction == "on") {
  //       a = "3"
  //     } else if (result.measures == "off" && result.correction == "off") {
  //       a = "4"
  //     }
  //     if (result.suctiontype == "no" && result.transfertype == "no") {
  //       b = "1"
  //     } else if (result.suctiontype != "no" && result.transfertype == "no") {
  //       b = "2"
  //       if (result.suctiontype == "all") {
  //         suctionqty = 0
  //       } else {
  //         suctionqty = result.suction
  //       }
  //     } else if (result.suctiontype == "no" && result.transfertype != "no") {
  //       b = "3"
  //       if (result.transfertype == "all") {
  //         transferqty = 0
  //       } else {
  //         transferqty = result.transfer
  //       }
  //     } else if (result.suctiontype != "no" && result.transfertype != "no") {
  //       b = "4"
  //       if (result.suctiontype == "all") {
  //         suctionqty = 0
  //       } else {
  //         suctionqty = result.suction
  //       }
  //       if (result.transfertype == "all") {
  //         transferqty = 0
  //       } else {
  //         transferqty = result.transfer
  //       }
  //     }
  //     switch (a.concat(b)) {
  //       case "11": {
  //         // OK --> refill con misura e correzione senza aspirazione e trasferimento
  //         console.log("Aggiungi acqua al tank, misura e correggi") 
  //         break;
  //       }
  //       case "12": {
  //         // OK --> refill con misura e correzione con aspirazione e senza trasferimento
  //         console.log("Prendi soluzione dalla vasca, aggiungi acqua al tank, misura e correggi")
  //         break;
  //       }
  //       case "13": {
  //         // refill con misura e correzione senza aspirazione con trasferimento
  //         console.log("Aggiungi acqua al tank, misura, correggi e invia alle vasche")
  //         break;
  //       }
  //       case "14": {
  //         // refill con misura e correzione con aspirazione e trasferimento
  //         console.log("Prendi soluzione dalla vasca, aggiungi acqua al tank, misura, correggi e invia alle vasche")
  //         break;
  //       }
  //       case "21": {
  //         // refill con misura e senza correzione senza aspirazione e trasferimento
  //         console.log("Aggiungi acqua al tank e misura")

  //         break;
  //       }
  //       case "22": {
  //         // refill con misura e senza correzione con aspirazione e senza trasferimento
  //         console.log("Prendi soluzione dalla vasca, aggiungi acqua al tank e misura")
  //         break;
  //       }
  //       case "23": {
  //         // refill con misura e senza correzione senza aspirazione con trasferimento
  //         console.log("Aggiungi acqua al tank, misura e invia alle vasche")
  //         break;
  //       }
  //       case "24": {
  //         // refill con misura e senza correzione con aspirazione e trasferimento
  //         console.log("Prendi soluzione dalla vasca, aggiungi acqua al tank, misura e invia alle vasche")
  //         break;
  //       }
  //       case "31": {
  //         // refill senza misura e con correzione senza aspirazione e trasferimento
  //         console.log("Aggiungi acqua al tank e correggi")
  //         break;
  //       }
  //       case "32": {
  //         // refill senza misura e con correzione con aspirazione e senza trasferimento
  //         console.log("Prendi soluzione dalla vasca, aggiungi acqua al tank e correggi")
  //         break;
  //       }
  //       case "33": {
  //         // refill senza misura e con correzione senza aspirazione con trasferimento
  //         console.log("Aggiungi acqua al tank, correggi e invia alle vasche")
  //         break;
  //       }
  //       case "34": {
  //         // refill senza misura e con correzione con aspirazione e trasferimento
  //         console.log("Prendi soluzione dalla vasca, aggiungi acqua al tank, correggi e invia alle vasche")
  //         break;
  //       }
  //       case "41": {
  //         // refill senza misura e correzione senza aspirazione e trasferimento 
  //         console.log("Aggiungi acqua al tank")
  //         break;
  //       }
  //       case "42": {
  //         // refill senza misura e correzione con aspirazione e senza trasferimento
  //         console.log("Prendi soluzione dalla vasca e aggiungi acqua al tank")
  //         break;
  //       }
  //       case "43": {
  //         // refill senza misura e correzione senza aspirazione con trasferimento 
  //         console.log("Aggiungi acqua al tank e invia alle vasche")
  //         break;
  //       }
  //       case "44": {
  //         // refill senza misura e correzione con aspirazione e trasferimento 
  //         console.log("Prendi soluzione dalla vasca, aggiungi acqua al tank e invia alle vasche")
  //         break;
  //       }
  //       default: {
  //         // errore  
  //         break;
  //       }
  //     }

  //   });
  // }
}


