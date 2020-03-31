import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { QuizService } from '../../../services/quiz.service';
import { Quiz, QuizTheme } from '../../../models/quiz.model';

@Component({
  selector: 'app-quiz-form',
  templateUrl: './quiz-form.component.html',
  styleUrls: ['./quiz-form.component.scss']
})
export class QuizFormComponent implements OnInit {

  // Note: We are using here ReactiveForms to create our form. Be careful when you look for some documentation to
  // avoid TemplateDrivenForm (another type of form)

  /**
   * QuizForm: Object which manages the form in our component.
   * More information about Reactive Forms: https://angular.io/guide/reactive-forms#step-1-creating-a-formgroup-instance
   */
  public quizForm: FormGroup;
  public THEME_LIST = Object.keys(QuizTheme).filter(k => typeof QuizTheme[k as any] === 'number');

  constructor(public formBuilder: FormBuilder, public quizService: QuizService) {
    // Form creation
    this.initFormBuilder();
    // You can also add validators to your inputs such as required, maxlength or even create your own validator!
    // More information: https://angular.io/guide/reactive-forms#simple-form-validation
    // Advanced validation: https://angular.io/guide/form-validation#reactive-form-validation
  }

  ngOnInit() {
  }

  addQuiz() {
    // We retrieve here the quiz object from the quizForm and we cast the type "as Quiz".
    const quizToCreate: Quiz = this.quizForm.getRawValue() as Quiz;
    quizToCreate.questions = [];
    quizToCreate.date = new Date();

    let maxId = 0;
    this.quizService.quizzes$.getValue().forEach(quiz => {
      if (quiz.id > maxId) { maxId = quiz.id; }
    });
    quizToCreate.id = Math.round(maxId) + 1;

    // Do you need to log your object here in your class? Uncomment the code below
    // and open your console in your browser by pressing F12 and choose the tab "Console".
    // You will see your quiz object when you click on the create button.
    console.log('Add quiz: ', quizToCreate);

    // Now, add your quiz in the list!
    this.quizService.addQuiz(quizToCreate);

    this.initFormBuilder();
  }

  initFormBuilder(){
    this.quizForm = this.formBuilder.group({
      name: ['Nouveau Quiz ?'],
      theme: ['None']
    });
  }
}
