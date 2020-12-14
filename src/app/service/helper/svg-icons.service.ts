import {Injectable} from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SvgIconsService {

  constructor(
      private matIconRegistry: MatIconRegistry,
      private domSanitizer: DomSanitizer
  ) {
    /* init svg icons */
    this.matIconRegistry.addSvgIcon(
        'flag-en',
        this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/svg/flag.en.svg')
    );
    this.matIconRegistry.addSvgIcon(
        'flag-it',
        this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/svg/flag.it.svg')
    );
  }
}
