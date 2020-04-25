import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of, Subscription, throwError} from 'rxjs';
import { User } from '../models/user.model';
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
export class UserService {
  /**
   * Services Documentation:
   * https://angular.io/docs/ts/latest/tutorial/toh-pt4.html
   */

  /**
   * The list of quiz.
   * The list is retrieved from the mock.
   */
  private users: User[] = [];
  private url = 'http://localhost:9428/api';
  private currentUser: User = null;
  private prevUserSub: Subscription;

  /**
   * Observable which contains the list of the quiz.
   * Naming convention: Add '$' at the end of the variable name to highlight it as an Observable.
   */
  public users$: BehaviorSubject<User[]> = new BehaviorSubject(this.users);
  public currentUser$: BehaviorSubject<User> = new BehaviorSubject<User>(this.currentUser)

  constructor(private httpClient: HttpClient) {

    this.getUsers();
  }

  addUser(user: User) {
    // You need here to update the list of user and then update our observable (Subject) with the new list
    // More info: https://angular.io/tutorial/toh-pt6#the-searchterms-rxjs-subject
    if(!user.settingsId) user.settingsId = Date.now();
    const copy = JSON.parse(JSON.stringify(user));
    console.log(user);
    this.httpClient.post<User>(this.url + '/users', copy, httpOptions)
      .pipe(
        catchError(this.handleError)
      ).subscribe((quiz1) => this.users.push(user));
  }

  deleteUser(user: User) {
    this.users.splice(this.users.indexOf(user), 1);
    this.users$.next(this.users);
    this.httpClient.delete<User>(this.url + '/users/'+user.id, httpOptions)
      .pipe(
        catchError(this.handleError)
      ).subscribe((question) => {

    });
  }

  getUsers() {
    this.httpClient.get<User[]>(this.url + '/users').subscribe((quizzes) => {
      this.users = quizzes;
      this.users$.next(this.users);
      console.log(this.users);
    });
  }

  getUser(id: number): Observable<User> {
    return this.users$.pipe(
      map((users: User[]) => users.find(
        (user: User) => user.id === id
        )
      )
    );
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

  // upQuiz(quiz: Quiz) {
  //   let quizBeforModif = this.users.find((quiz1)=>quiz1.id === quiz.id)
  //   this.users[this.users.indexOf(quizBeforModif)] = quiz;
  //   this.users$.next(this.users);
  //   const copy = JSON.parse(JSON.stringify(quiz));
  //   delete copy.questions;
  //   console.log(quiz);
  //   this.httpClient.put<Quiz>(this.url + '/users/'+quiz.id, copy, httpOptions)
  //     .pipe(
  //       catchError(this.handleError)
  //     ).subscribe();
  // }
  setCurrentUser(userId: string) {
    if (this.prevUserSub) this.prevUserSub.unsubscribe();
    if (!userId) {
      this.prevUserSub = null;
      this.currentUser$.next(null);
      return
    }
    this.prevUserSub = (!userId) ? null : this.getUser(Number(userId)).subscribe((user) => {
      this.currentUser = user;
      this.currentUser$.next(user);
    });
  }
}
