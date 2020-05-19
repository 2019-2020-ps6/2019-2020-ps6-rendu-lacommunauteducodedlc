import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of, throwError} from 'rxjs';
import { Quiz } from '../models/quiz.model';
import {Answer, Question} from "../models/question.model";
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
  private answerId = 0;

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
        catchError(handleError)
      ).subscribe((quiz1) => {
        this.quizzes.push(quiz);
        this.quizzes$.next(this.quizzes);
      });
  }

  deleteQuiz(quiz: Quiz) {
    this.quizzes.splice(this.quizzes.indexOf(quiz), 1);
    this.quizzes$.next(this.quizzes);
    this.httpClient.delete<Question>(this.url + '/quizzes/'+quiz.id, httpOptions)
      .pipe(
        catchError(handleError)
      ).subscribe((question) => {

    });
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

  addQuestion(questionToCreat: Question, to: Quiz) {
    const copy = JSON.parse(JSON.stringify(questionToCreat));
    delete copy.answers;
    console.log("question added : ");
    console.log(questionToCreat);

    const quizId = to.id;

    this.httpClient.post<Question>(this.url + '/quizzes/'+quizId.toString()+'/questions', copy, httpOptions)
      .pipe(
        catchError(handleError)
      ).subscribe((question) => {
          if (copy.answers === undefined) copy.answers = [];
          this.quizzes.find((quiz) => quiz.id === to.id)
            .questions.push(copy)
      });

    questionToCreat.answers.forEach((answer) => this.addAnswer(answer, questionToCreat, to));
  }

  addAnswer(answerToCreat: Answer, to: Question, inQuiz: Quiz) {
    answerToCreat.id = Date.now() + this.answerId;
    this.answerId ++;
    const copy = JSON.parse(JSON.stringify(answerToCreat));

    const questionId = to.id;

    this.httpClient.post<Question>(this.url + '/questions/'+questionId.toString()+'/answers', copy, httpOptions)
      .pipe(
        catchError(handleError)
      ).subscribe((question) => this.quizzes.find((quiz) => quiz.id === inQuiz.id)
                                                  .questions.find((question) => question.id === to.id)
                                                      .answers.push(answerToCreat));

  }

  deleteQuestion(questionToDelete: Question) {

    this.httpClient.delete<Question>(this.url + '/questions/'+questionToDelete.id, httpOptions)
      .pipe(
        catchError(handleError)
      ).subscribe((question) => {

    });

  }

  upQuiz(quiz: Quiz) {
    let quizBeforModif = this.quizzes.find((quiz1)=>quiz1.id === quiz.id)
    this.quizzes[this.quizzes.indexOf(quizBeforModif)] = quiz;
    this.quizzes$.next(this.quizzes);
    const copy = JSON.parse(JSON.stringify(quiz));
    delete copy.questions;
    console.log(quiz);
    this.httpClient.put<Quiz>(this.url + '/quizzes/'+quiz.id, copy, httpOptions)
      .pipe(
        catchError(handleError)
      ).subscribe();
  }

  upQuestion(question: Question, inQuiz: Quiz) {
    const copy = JSON.parse(JSON.stringify(question));
    delete copy.answers;
    this.httpClient.put<Question>(this.url + '/questions/'+question.id, copy, httpOptions)
      .pipe(
        catchError(handleError)
      ).subscribe();
    this.deleteAnswers(question, inQuiz);
    question.answers.forEach((answer) => this.addAnswer(answer, question, inQuiz));
  }

  private deleteAnswers(question: Question, inQuiz: Quiz) {
    let questionBeforeDelete = this.quizzes.find((quiz) => quiz.id === inQuiz.id)
      .questions.find((question1)=>question1.id === question.id);
    questionBeforeDelete.answers.forEach((answer) => this.httpClient.delete<Array<Answer>>(this.url + '/answers/'+answer.id, httpOptions)
      .pipe(
        catchError(handleError)
      ).subscribe());
    questionBeforeDelete.answers = [];
  }
}

export function handleError(error: HttpErrorResponse) {
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


