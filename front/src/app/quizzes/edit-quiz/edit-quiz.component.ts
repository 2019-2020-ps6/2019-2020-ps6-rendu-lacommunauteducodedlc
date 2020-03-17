import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../../services/quiz.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {Observable} from 'rxjs';
import {Quiz} from '../../../models/quiz.model';

@Component({
  selector: 'app-edit-quiz',
  templateUrl: './edit-quiz.component.html',
  styleUrls: ['./edit-quiz.component.scss']
})
export class EditQuizComponent implements OnInit {
  public quiz: Quiz;

  constructor(
    private quizService: QuizService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit() {
    this.getQuiz();
  }

  getQuiz(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.quizService.getQuiz(id).subscribe(quiz => this.quiz = quiz);
    console.log('test' + this.quiz);
  }
}
