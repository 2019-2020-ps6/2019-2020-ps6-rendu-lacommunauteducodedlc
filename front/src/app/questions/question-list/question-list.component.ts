import {Component, Input, OnInit} from '@angular/core';
import { QuizService } from '../../../services/quiz.service';
import {Quiz} from '../../../models/quiz.model';
import {Question} from '../../../models/question.model';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})
export class QuestionListComponent implements OnInit {

  @Input()
  quiz: Quiz;

  constructor(public quizService: QuizService) {
    // this.quizService.quizzes$.subscribe((quizzes) => this.quiz = quizzes.find(quiz => quiz.id === this.quiz.id));
  }

  ngOnInit() {
    console.log(this.quiz.questions);
  }

  questionSelected(selected: boolean) {
    console.log('event received from child:', selected);
  }

  deleteQuestion(question: Question) {
    this.quiz.questions.splice(this.quiz.questions.indexOf(question), 1);
    console.log('Was deleted : ', question);
    this.quizService.updateQuiz(this.quiz);
  }
}
