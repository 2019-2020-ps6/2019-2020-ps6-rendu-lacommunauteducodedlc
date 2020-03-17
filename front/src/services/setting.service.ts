import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of, throwError} from 'rxjs';
import { Setting } from '../models/setting.model';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {subscribeToIterable} from 'rxjs/internal-compatibility';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  }),
  responseType: 'blob' as 'json'
};

@Injectable({
  providedIn: 'root'
})
export class SettingService {
  /**
   * Services Documentation:
   * https://angular.io/docs/ts/latest/tutorial/toh-pt4.html
   */

  private setting : Setting;
  private url = 'http://localhost:9428/api';

  /**
   * Observable which contains the list of the quiz.
   * Naming convention: Add '$' at the end of the variable name to highlight it as an Observable.
   */
  public settings$: BehaviorSubject<Setting> = new BehaviorSubject(this.setting);

  constructor(private httpClient: HttpClient) {
    this.getSettings();
  }

  getSettings() {
    this.httpClient.get<Setting>(this.url + '/settings').subscribe((settings) => {
      this.setting = settings;
      this.settings$.next(this.setting);
      console.log(this.setting);
    });
  }

  updateSettings(setting: Setting) {
    this.settings$.next(this.setting);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }
}
