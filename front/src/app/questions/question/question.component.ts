import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Question} from '../../../models/question.model';
import {Setting} from '../../../models/setting.model';
import { SettingService } from '../../../services/setting.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  @Input()
  question: Question;

  @Output()
  questionSelected: EventEmitter<Question> = new EventEmitter<Question>();

  @Output()
  questionToDeleted: EventEmitter<Question> = new EventEmitter<Question>();
  
  public setting: Setting;

  constructor() {
    this.settingService.settings$.subscribe((setting) => this.setting = setting);
   }

  ngOnInit() {
  }

  selectQuestion() {
    this.questionSelected.emit(this.question);
  }

  rmQuestion() {
    this.questionToDeleted.emit(this.question);
  }
}
