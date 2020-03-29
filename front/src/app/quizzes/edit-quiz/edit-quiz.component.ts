import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../../services/quiz.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {Observable} from 'rxjs';
import {Quiz, QuizTheme} from '../../../models/quiz.model';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Question} from "../../../models/question.model";

@Component({
  selector: 'app-edit-quiz',
  templateUrl: './edit-quiz.component.html',
  styleUrls: ['./edit-quiz.component.scss']
})
export class EditQuizComponent implements OnInit {
  public quiz: Quiz;
  public question: Question;
  public THEME_LIST = Object.keys(QuizTheme).filter(k => typeof QuizTheme[k as any] === 'number');
  public quizForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private quizService: QuizService,
    private route: ActivatedRoute,
    private location: Location
  ) {
  }

  ngOnInit() {
    this.getQuiz();
    // Form creation
    this.quizForm = this.formBuilder.group({
      name: [this.quiz.name],
      theme: [this.quiz.theme]
    });
  }

  getQuiz(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.quizService.getQuiz(id).subscribe(quiz => this.quiz = quiz);
    console.log('test' + this.quiz);
  }

  upQuiz(): void {
    this.quiz = { ...this.quiz, ...this.quizForm.getRawValue() } as Quiz;
    document.getElementById("msg").innerHTML = "Enregistré !";
    this.quizService.upQuiz(this.quiz);
  }

  selectQuestion(question: Question) {
    this.resetForm();
    this.question = question;
  }

  resetForm(){
    this.question = null;
  }

  newQuestion() {
    let qId = Date.now();
    const defaultJson = {
      label: "Nouvelle question ?",
      quizId: this.quiz.id,
      id: qId,
      answers: [
        {value: "oui", isCorrect: true, questionId: qId, id: Date.now()+1},
        {value: "non", isCorrect: false, questionId: qId, id: Date.now()+2}
      ]
    };
    const newQuestion = defaultJson as Question;
    this.quizService.addQuestion(newQuestion, this.quiz);
  }

  deleteQuiz() {
    console.log('Was deleted : ', this.quiz);
    this.quizService.deleteQuiz(this.quiz);
  }

  resetQuestion($event: boolean) {
    this.question = null;
  }
}
