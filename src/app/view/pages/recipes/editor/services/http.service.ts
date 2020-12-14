import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private http: HttpClient
  ) { }

  /**
   * we need to replace this url with the final one http://192.168.60.3/8000/seeds
   */
  getSeed() {
    return this.http.get('http://192.168.60.3:8000/seeds');
  }
}
