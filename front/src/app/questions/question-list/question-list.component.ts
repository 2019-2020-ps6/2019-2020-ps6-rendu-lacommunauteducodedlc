import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { QuizService } from '../../../services/quiz.service';
import {Quiz} from '../../../models/quiz.model';
import {Question} from '../../../models/question.model';
import {Setting} from '../../../models/setting.model';
import { SettingService } from '../../../services/setting.service';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})
export class QuestionListComponent implements OnInit {

  @Input()
  quiz: Quiz;

  @Output()
  questionSelected: EventEmitter<Question> = new EventEmitter<Question>();

  public setting: Setting;

  constructor(public quizService: QuizService, private settingService: SettingService) {
    // this.quizService.quizzes$.subscribe((quizzes) => this.quiz = quizzes.find(quiz => quiz.id === this.quiz.id));
    this.settingService.settings$.subscribe((setting) => this.setting = setting);
  }

  ngOnInit() {
    console.log(this.quiz.questions);
  }

  deleteQuestion(question: Question) {
    this.quiz.questions.splice(this.quiz.questions.indexOf(question), 1);
    console.log('Was deleted : ', question);
    this.quizService.deleteQuestion(question);
  }

  transferSelection(question: Question) {
    this.questionSelected.emit(question);
  }
}
