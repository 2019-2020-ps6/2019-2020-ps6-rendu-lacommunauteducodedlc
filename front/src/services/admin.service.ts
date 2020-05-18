import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of, Subscription, throwError} from 'rxjs';
import { Admin } from '../models/admin.model';
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
export class AdminService {
  /**
   * Services Documentation:
   * https://angular.io/docs/ts/latest/tutorial/toh-pt4.html
   */

  /**
   * The list of quiz.
   * The list is retrieved from the mock.
   */
  private admins: Admin[] = [];
  private url = 'http://localhost:9428/api';

  /**
   * Observable which contains the list of the quiz.
   * Naming convention: Add '$' at the end of the variable name to highlight it as an Observable.
   */
  public admins$: BehaviorSubject<Admin[]> = new BehaviorSubject(this.admins);

  constructor(private httpClient: HttpClient) {

    this.getAdmins();
  }

  addAdmin(admin: Admin) {
    // You need here to update the list of admin and then update our observable (Subject) with the new list
    // More info: https://angular.io/tutorial/toh-pt6#the-searchterms-rxjs-subject
    const copy = JSON.parse(JSON.stringify(admin));
    console.log(admin);
    delete copy.confirmPassword
    this.httpClient.post<Admin>(this.url + '/admins', copy, httpOptions)
      .pipe(
        catchError(this.handleError)
      ).subscribe((quiz1) => this.admins.push(admin));
  }

  // deleteUser(admin: Admin) {
  //   this.admins.splice(this.admins.indexOf(admin), 1);
  //   this.admins$.next(this.admins);
  //   this.httpClient.delete<Admin>(this.url + '/admins/'+admin.id, httpOptions)
  //     .pipe(
  //       catchError(this.handleError)
  //     ).subscribe((question) => {
  //
  //   });
  // }

  getAdmins() {
    this.httpClient.get<Admin[]>(this.url + '/admins').subscribe((quizzes) => {
      this.admins = quizzes;
      this.admins$.next(this.admins);
      console.log(this.admins);
    });
  }

  // checkPassword(adminId: string, password: string): Observable<Admin> {
  //   return this.admins$.pipe(
  //     map((users: Admin[]) => users.find(
  //       (user: Admin) => user.id === id
  //       )
  //     )
  //   );
  // }


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

  containIdAdmin(idAdmin: string) {
    return this.admins.find((admin) => admin.adminId === idAdmin);
  }
}
