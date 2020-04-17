import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../../services/quiz.service';
import { Quiz } from '../../../models/quiz.model';
import {Setting} from '../../../models/setting.model';
import { SettingService } from '../../../services/setting.service';

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.scss']
})
export class QuizListComponent implements OnInit {

  public quizList: Quiz[] = [];
  public setting: Setting;

  public nbMaxQuizDisp = 6;
  public currentFirstQuizDisp = 0;

  constructor(public quizService: QuizService, private settingService: SettingService) {
    this.quizService.quizzes$.subscribe((quiz) => this.quizList = quiz);
    this.settingService.settings$.subscribe((setting) => this.setting = setting);
  }

  ngOnInit() {
  }

  quizSelected(selected: boolean) {
    console.log('event received from child:', selected);
  }

  deleteQuiz(quiz: Quiz) {
    this.quizList.slice(this.quizList.indexOf(quiz), 1);
    console.log('Was deleted : ', quiz);
    this.quizService.deleteQuiz(quiz);
  }

  moveMinDisp(number: number) {
    if (this.currentFirstQuizDisp+number>=0 && this.currentFirstQuizDisp+number<=this.quizList.length) this.currentFirstQuizDisp+=number;
  }
}
