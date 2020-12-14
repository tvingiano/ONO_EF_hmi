import { Injectable } from '@angular/core';
import { HttpRequest, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private http: HttpClient,
  ) { }

  /**
   * Change the address in http://192.168.60.3:8000 before importing in the final version
   */

  req(what: string) {
    const url = 'http://192.168.60.3:8000/' + what;
    return this.http.get(url);
  }



}
