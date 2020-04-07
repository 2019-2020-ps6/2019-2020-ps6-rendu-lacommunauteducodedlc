 import {Component, Input, OnInit} from '@angular/core';
import {Quiz, QuizTheme} from '../../../models/quiz.model';
import {Setting} from '../../../models/setting.model';
import { SettingService } from '../../../services/setting.service';

@Component({
  selector: 'app-quiz-sort',
  templateUrl: './quiz-sort.component.html',
  styleUrls: ['./quiz-sort.component.scss']
})
export class QuizSortComponent implements OnInit {

  public SORT_LIST = Object.keys(QuizSort).filter(k => typeof QuizSort[k as any] === 'number');
  public setting: Setting;

  @Input()
  quizList: Quiz[];

  constructor(private settingService: SettingService) {
    this.settingService.settings$.subscribe((setting) => this.setting = setting);
  }

  ngOnInit() {
  }

  sortBy(value: any) {
    console.log(this.SORT_LIST.indexOf(value));
    console.log(QuizSort.DATE === this.SORT_LIST.indexOf(value));
    switch (this.SORT_LIST.indexOf(value)) {
      case QuizSort.NAME : this.quizList.sort((a,b)=> a.name.localeCompare(b.name)); break;
      case QuizSort.DATE : this.quizList.sort((a,b)=> (a.date < b.date) ? -1 : 1); break;
      case QuizSort.THEME : this.quizList.sort((a,b)=> a.theme.toString().localeCompare(b.theme.toString())); break;
      case QuizSort.DIFFICULTY : this.quizList.sort((a,b)=> a.difficulty-b.difficulty); break;
      default : this.quizList.sort((a,b)=> a.name.localeCompare(b.name)); break;
    }
  }
}

enum QuizSort {
  THEME,
  NAME,
  DATE,
  DIFFICULTY
}
