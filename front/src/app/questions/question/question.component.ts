import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Question} from '../../../models/question.model';

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

  constructor() {
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
