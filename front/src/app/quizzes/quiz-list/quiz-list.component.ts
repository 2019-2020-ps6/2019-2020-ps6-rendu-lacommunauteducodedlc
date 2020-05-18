import {Component, OnInit, ViewChild} from '@angular/core';
import { QuizService } from '../../../services/quiz.service';
import { Quiz } from '../../../models/quiz.model';
import {Setting} from '../../../models/setting.model';
import { SettingService } from '../../../services/setting.service';
import {ActivatedRoute} from "@angular/router";
import {NavigationService} from "../../../services/navigation.service";
import {QuizSortComponent} from "../quiz-sort/quiz-sort.component";

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.scss']
})
export class QuizListComponent implements OnInit {
  // @ts-ignore
  @ViewChild(QuizSortComponent ) sort: QuizSortComponent;


  public quizListDisplay: Quiz[] = [];
  public quizListConst: Quiz[] = [];
  public setting: Setting;

  public nbMaxQuizDisp = 6;
  public currentFirstQuizDisp = 0;

  public lastNewQuiz : number;

  constructor(public quizService: QuizService,
              private settingService: SettingService,
              public route : ActivatedRoute,
              public navigation: NavigationService) {
    this.quizService.quizzes$.subscribe((quiz) => {
      this.quizListDisplay = quiz;
      this.quizListConst = quiz;
      if(this.sort) this.sort.emitChanges();
      if(this.lastNewQuiz) this.goToQuiz(this.lastNewQuiz);
    });
    this.settingService.settings$.subscribe((setting) => {
      this.setting = setting;
      if (setting)  this.nbMaxQuizDisp = setting.questionNumber;
    });
    console.log("construct")
  }

  ngOnInit() {
    this.navigation.update(this.route);
  }

  quizSelected(selected: boolean) {
    console.log('event received from child:', selected);
  }

  deleteQuiz(quiz: Quiz) {
    this.quizListDisplay.slice(this.quizListDisplay.indexOf(quiz), 1);
    console.log('Was deleted : ', quiz);
    this.quizService.deleteQuiz(quiz);
  }

  moveMinDisp(number: number) {
    if (this.currentFirstQuizDisp+number>=0 && this.currentFirstQuizDisp+number<this.quizListDisplay.length) this.currentFirstQuizDisp+=number;
  }

  getCurrentPage() {
    let val =  this.currentFirstQuizDisp/this.nbMaxQuizDisp+1;
    return val;
  }

  getTotalPage() {
    let val = (this.quizListDisplay.length-1)/this.nbMaxQuizDisp +1;
    return Math.floor(val);
  }

  sortChangeDetected(newList: Quiz[]) {
    this.quizListDisplay = newList;
  }

  private goToQuiz(id: number) {
    let quiz = this.quizListDisplay.find((quiz1) => quiz1.id == id);
    // console.log("test index = "+this.quizListDisplay.indexOf(quiz));
    // console.log("test index1 = "+this.quizListDisplay.indexOf(quiz)/this.nbMaxQuizDisp);
    // console.log("test index2 = "+this.nbMaxQuizDisp * (this.quizListDisplay.indexOf(quiz)/this.nbMaxQuizDisp));
    if (!quiz) return;
    this.currentFirstQuizDisp = this.nbMaxQuizDisp * Math.floor(this.quizListDisplay.indexOf(quiz)/this.nbMaxQuizDisp);
  }
}
