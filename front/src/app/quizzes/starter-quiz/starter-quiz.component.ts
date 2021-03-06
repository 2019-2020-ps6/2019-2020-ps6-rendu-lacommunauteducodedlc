import { Component, OnInit} from '@angular/core';
import { Quiz } from '../../../models/quiz.model';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/services/quiz.service';
import { Answer, Question } from 'src/models/question.model';
import {Setting} from '../../../models/setting.model';
import { SettingService } from '../../../services/setting.service';
import { NavigationService } from 'src/services/navigation.service';

@Component({
  selector: 'app-starter-quiz',
  templateUrl: './starter-quiz.component.html',
  styleUrls: ['./starter-quiz.component.scss']
})

export class StarterComponent implements OnInit {

    private quiz: Quiz
    private index: number
    private started: boolean
    private inProgress: boolean
    private finished: boolean
    private score: number
    private questionAnswered: boolean
    private setting: Setting
    private question: Question
    private answerSelected: Answer
    private correctAnswer: Answer[]
    public nbMaxAnswerDisp = 6
    public currentFirstAnswerDisp = 0
    public currentFirstCorrectAnswerDisp = 0

    constructor(
        private quizService: QuizService,
        private route: ActivatedRoute,
        private settingService: SettingService,
        private navigation: NavigationService
    ) {
      this.index = 0
      this.started = false
      this.inProgress = false
      this.finished = false
      this.score = 0
      this.settingService.settings$.subscribe((setting) => {
        this.setting = setting
        if (setting)  this.nbMaxAnswerDisp = setting.answerNumber
      })
    }

    ngOnInit() {
        this.getQuiz();
        console.log(this.quiz);
      this.navigation.update(this.route)
    }

    getQuiz(): void {
      const id = +this.route.snapshot.paramMap.get('id');
      this.quizService.getQuiz(id).subscribe(quiz => {
        if (!quiz) return
        this.quiz = quiz
        this.question = this.quiz.questions[this.index]
        this.currentFirstAnswerDisp = 0
        this.currentFirstCorrectAnswerDisp = 0
        this.initQuestion()
      });
    }

    initQuestion() {
      this.answerSelected = undefined
      this.correctAnswer = []
      this.getCorrectAnswer()
    }

    getNext() {
      this.questionAnswered = false
      if(this.quiz.questions.length <= this.index) {
        this.finished = true
      }
    }

    startQuiz() {
      this.started = true
    }

    setAnswer(answer: Answer) {
        this.index++
        this.answerSelected = answer;
        if (!answer.isCorrect)
          this.correctAnswer.push(answer);
        this.updateScore()
        if (this.index == this.quiz.questions.length) {
          this.inProgress = true
        }
    }

    isSelectedAnswer(answer: Answer): boolean {
      return this.answerSelected === answer
    }

    getCorrectAnswer() {
      this.question.answers.forEach((answer) => {
        if (answer.isCorrect) {
          this.correctAnswer.push(answer)
        }
      })
    }

    restart() {
      this.index = 0
      this.started = false
      this.finished = false
      this.score = 0
      this.questionAnswered = false
      this.answerSelected = undefined
      this.inProgress = false
      this.ngOnInit()
    }

    half(): boolean {
      if (this.index < this.quiz.questions.length / 2) {
        return true
      }
      return false
    }

    answered(): boolean {
      return this.answerSelected !== undefined
    }

    next() {
      this.ngOnInit()
    }

    updateScore() {
      if (this.answerSelected.isCorrect || this.correctAnswer.length == 0) {
        this.score++
      }
    }

    finish() {
      this.finished = true
    }

    getCurrentAnswer() {
      let val =  this.currentFirstAnswerDisp / this.nbMaxAnswerDisp + 1
      return val
    }

    getTotalAnswer() {
      let val = (this.question.answers.length-1) / this.nbMaxAnswerDisp + 1
      return Math.floor(val)
    }

    moveMinDisp(number: number) {
      if (this.currentFirstAnswerDisp + number >= 0 && this.currentFirstAnswerDisp + number < this.question.answers.length)
        this.currentFirstAnswerDisp += number
    }

    getCurrentCorrectAnswer() {
      let val =  this.currentFirstCorrectAnswerDisp / this.nbMaxAnswerDisp + 1
      return val
    }

    getTotalCorrectAnswer() {
      let val = (this.correctAnswer.length-1) / this.nbMaxAnswerDisp + 1
      return Math.floor(val)
    }

    moveCorrectMinDisp(number: number) {
      if (this.currentFirstCorrectAnswerDisp + number >= 0 && this.currentFirstCorrectAnswerDisp + number < this.correctAnswer.length)
        this.currentFirstCorrectAnswerDisp += number
    }
}
