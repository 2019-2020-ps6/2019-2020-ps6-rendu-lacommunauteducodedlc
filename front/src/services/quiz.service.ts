import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of, throwError} from 'rxjs';
import { Quiz } from '../models/quiz.model';
import { QUIZ_LIST } from '../mocks/quiz-list.mock';
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
export class QuizService {
  /**
   * Services Documentation:
   * https://angular.io/docs/ts/latest/tutorial/toh-pt4.html
   */

   /**
    * The list of quiz.
    * The list is retrieved from the mock.
    */
  private quizzes: Quiz[] = [];
  private url = 'http://localhost:9428/api';

  /**
   * Observable which contains the list of the quiz.
   * Naming convention: Add '$' at the end of the variable name to highlight it as an Observable.
   */
  public quizzes$: BehaviorSubject<Quiz[]> = new BehaviorSubject(this.quizzes);

  constructor(private httpClient: HttpClient) {
    this.getQuizzes();
  }

  addQuiz(quiz: Quiz) {
    // You need here to update the list of quiz and then update our observable (Subject) with the new list
    // More info: https://angular.io/tutorial/toh-pt6#the-searchterms-rxjs-subject
    const copy = JSON.parse(JSON.stringify(quiz));
    delete copy.questions;
    console.log(quiz);
    this.httpClient.post<Quiz>(this.url + '/quizzes', copy, httpOptions)
      .pipe(
        catchError(this.handleError)
      ).subscribe((quiz1) => this.quizzes.push(quiz));
  }

  deleteQuiz(quiz: Quiz) {
    this.quizzes.splice(this.quizzes.indexOf(quiz), 1);
    this.quizzes$.next(this.quizzes);
  }

  getQuizzes() {
    this.httpClient.get<Quiz[]>(this.url + '/quizzes').subscribe((quizzes) => {
      this.quizzes = quizzes;
      this.quizzes$.next(this.quizzes);
      console.log(this.quizzes);
    });
  }

  getQuiz(id: number): Observable<Quiz> {
    return this.quizzes$.pipe(
      map((quizzes: Quiz[]) => quizzes.find(
        (quiz: Quiz) => quiz.id === id
        )
      )
    );
  }

  updateQuiz(quiz: Quiz) {
    const currentQuiz = this.quizzes.find(quizToCompare => quizToCompare.id === quiz.id);
    this.deleteQuiz(currentQuiz);
    this.quizzes.push(quiz);
    this.quizzes$.next(this.quizzes);
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
