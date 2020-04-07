import { Component, OnInit} from '@angular/core';
import { Quiz } from '../../../models/quiz.model';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/services/quiz.service';
import { Answer } from 'src/models/question.model';
import {Setting} from '../../../models/setting.model';
import { SettingService } from '../../../services/setting.service';

@Component({
  selector: 'app-starter-quiz',
  templateUrl: './starter-quiz.component.html',
  styleUrls: ['./starter-quiz.component.scss']
})

export class StarterComponent implements OnInit {

    public quiz: Quiz;
    public index: number;
    public started: boolean;
    public finished: boolean;
    public score: number;
    public questionAnswered: boolean;
    public answer: Answer;
    public police: string;
    public setting: Setting;

    constructor(
        private quizService: QuizService,
        private route: ActivatedRoute,
        private settingService: SettingService
    ) {
      this.index = 0;
      this.started = true;
      this.finished = false;
      this.score = 0;
      this.questionAnswered = false;
      this.answer = null;
      this.settingService.settings$.subscribe((setting) => this.setting = setting);
    }

    ngOnInit() {
        this.getQuiz();
        console.log(this.quiz);
    }
  
    getQuiz(): void {
      const id = +this.route.snapshot.paramMap.get('id');
      this.quizService.getQuiz(id).subscribe(quiz => this.quiz = quiz);
    }

    getNext() {
      this.questionAnswered = false;
      if(this.quiz.questions.length <= this.index) {
        this.finished = true;
      }
    }

    startQuiz() {
      this.started = true;
    }

    questionAnswer(id: number) {
      this.quiz.questions[this.index].answers.forEach(answer => {
          if(answer.id === id) {
              if(answer.isCorrect) {
                this.score ++;
              }
              this.answer = answer;
              this.questionAnswered = true;
          }
      })
      this.index++;
    }

    checkAnswer(id: number): boolean {
        if (this.answer.id === id) {
            return false;
        }
        return true;
    }

    restart() {
      this.index = 0;
      this.started = false;
      this.finished = false;
      this.score = 0;
      this.questionAnswered = false;
      this.answer = null;
    }

    half(): boolean {
      if (this.index < this.quiz.questions.length / 2) {
        return true;
      }
      return false;
    }
}
