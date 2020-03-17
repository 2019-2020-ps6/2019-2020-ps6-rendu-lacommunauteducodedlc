import {Component, Input, OnInit} from '@angular/core';
import { QuizService } from '../../../services/quiz.service';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {Question} from '../../../models/question.model';
import {Quiz} from '../../../models/quiz.model';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.scss']
})
export class QuestionFormComponent implements OnInit {

  @Input()
  quiz: Quiz;

  private questionForm: FormGroup;

  constructor(public formBuilder: FormBuilder, public quizService: QuizService) {
    this.initFormBuilder();
  }

  ngOnInit() {
  }

  private initFormBuilder() {
    this.questionForm = this.formBuilder.group({
      label: [''],
      answers: this.formBuilder.array([])
    });
  }

  get answers() {
    return this.questionForm.get('answers') as FormArray;
  }

  addAnswer() {
    this.answers.push(this.createAnswer());
  }

  private createAnswer() {
    return this.formBuilder.group({
      value: '',
      isCorrect: false,
    });
  }

  addQuestion() {
    // We retrieve here the quiz object from the quizForm and we cast the type "as Quiz".
    const questionToCreat: Question = this.questionForm.getRawValue() as Question;

    // Do you need to log your object here in your class? Uncomment the code below
    // and open your console in your browser by pressing F12 and choose the tab "Console".
    // You will see your quiz object when you click on the create button.
    console.log('Add question: ', questionToCreat);

    this.quiz.questions.push(questionToCreat);

    // Now, add your quiz in the list!
    /// this.quizService.updateQuiz(this.quiz);

    this.initFormBuilder();
  }
}
