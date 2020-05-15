 import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {Quiz, QuizTheme} from '../../../models/quiz.model';
import {Setting} from '../../../models/setting.model';
import { SettingService } from '../../../services/setting.service';

@Component({
  selector: 'app-quiz-sort',
  templateUrl: './quiz-sort.component.html',
  styleUrls: ['./quiz-sort.component.scss']
})
export class QuizSortComponent implements OnChanges {

  public SORT_LIST = Object.keys(QuizSort).filter(k => typeof QuizSort[k as any] === 'number');
  public THEME_LIST = Object.keys(QuizTheme).filter(k => typeof QuizTheme[k as any] === 'number');

  public setting: Setting;
  private currentList: Quiz[];

  public sortedBy: string;
  public filteredBy: string;
  public diffFilter: number =-1;

  @Input()
  quizListIn: Quiz[];

  @Output()
  quizListOut: EventEmitter<Quiz[]> = new EventEmitter<Quiz[]>();

  constructor(private settingService: SettingService) {
    this.settingService.settings$.subscribe((setting) => this.setting = setting);
  }

  ngOnChanges() {
    this.emitChanges();
  }

  private sortBy() {
    switch (this.SORT_LIST.indexOf(this.sortedBy)) {
      case QuizSort.Nom : this.currentList.sort((a, b)=> a.name.localeCompare(b.name)); break;
      case QuizSort.Date : this.currentList.sort((a, b)=> (a.date < b.date) ? -1 : 1); break;
      case QuizSort.Thème : this.currentList.sort((a, b)=> a.theme.toString().localeCompare(b.theme.toString())); break;
      case QuizSort.Difficulté : this.currentList.sort((a, b)=> a.difficulty-b.difficulty); break;
      default : this.currentList.sort((a, b)=> a.name.localeCompare(b.name)); break;
    }
  }

  private filterByTheme() {
    if (!this.filteredBy) return;
    this.currentList = this.currentList.filter((quiz,i,a)=> quiz.theme.toString()==this.filteredBy);
  }

  private filterByDifficulty() {
    if (this.diffFilter == -1) return;
    this.currentList = this.currentList.filter((quiz,i,a)=> quiz.difficulty==this.diffFilter);
  }

  emitChanges() {
    this.currentList = JSON.parse(JSON.stringify(this.quizListIn));
    this.sortBy();
    this.filterByTheme();
    this.filterByDifficulty()
    this.quizListOut.emit(this.currentList);
  }
}

enum QuizSort {
  Thème,
  Nom,
  Date,
  Difficulté
}
