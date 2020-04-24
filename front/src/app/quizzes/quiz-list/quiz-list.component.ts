import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../../services/quiz.service';
import { Quiz } from '../../../models/quiz.model';
import {Setting} from '../../../models/setting.model';
import { SettingService } from '../../../services/setting.service';
import {ActivatedRoute} from "@angular/router";
import {NavigationService} from "../../../services/navigation.service";

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

  constructor(public quizService: QuizService,
              private settingService: SettingService,
              public route : ActivatedRoute,
              public navigation: NavigationService) {
    this.quizService.quizzes$.subscribe((quiz) => this.quizList = quiz);
    this.settingService.settings$.subscribe((setting) => {
      this.setting = setting;
    });
    this.nbMaxQuizDisp = this.settingService.getQuestionNumber();
    console.log("construct")
  }

  ngOnInit() {
    this.navigation.setUserId(this.route.snapshot.paramMap.get("userId"))
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
    if (this.currentFirstQuizDisp+number>=0 && this.currentFirstQuizDisp+number<this.quizList.length) this.currentFirstQuizDisp+=number;
  }

  getCurrentPage() {
    let val =  this.currentFirstQuizDisp/this.nbMaxQuizDisp+1;
    return val;
  }

  getTotalPage() {
    let val = (this.quizList.length-1)/this.nbMaxQuizDisp +1;
    return Math.floor(val);
  }
}
