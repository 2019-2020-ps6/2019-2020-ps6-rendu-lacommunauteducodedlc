import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../../services/quiz.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {Observable} from 'rxjs';
import {Quiz, QuizTheme} from '../../../models/quiz.model';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Question} from "../../../models/question.model";
import {Setting} from '../../../models/setting.model';
import { SettingService } from '../../../services/setting.service';
import {NavigationService} from "../../../services/navigation.service";

@Component({
  selector: 'app-edit-quiz',
  templateUrl: './edit-quiz.component.html',
  styleUrls: ['./edit-quiz.component.scss']
})
export class EditQuizComponent implements OnInit {
  public quiz: Quiz;
  public question: Question;
  public THEME_LIST = Object.keys(QuizTheme).filter(k => typeof QuizTheme[k as any] === 'number');
  public quizForm: FormGroup;
  public diffSave: number;
  public setting: Setting;

  constructor(
    public formBuilder: FormBuilder,
    private quizService: QuizService,
    private route: ActivatedRoute,
    private location: Location,
    private settingService: SettingService,
    private navigation: NavigationService
  ) {
    this.settingService.settings$.subscribe((setting) => this.setting = setting);
  }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.quizService.getQuiz(id).subscribe(quiz => {
      if(!quiz) return;
      this.quiz = quiz;
      this.initForm();
    });
    this.navigation.update(this.route)
  }

  initForm(): void {
    // Form creation
    this.quizForm = this.formBuilder.group({
      name: [this.quiz.name],
      theme: [this.quiz.theme]
    });
    this.diffSave=this.quiz.difficulty;
  }

  upQuiz(): void {
    this.quiz = { ...this.quiz, ...this.quizForm.getRawValue() } as Quiz;
    this.quiz.difficulty=this.diffSave;
    document.getElementById("msg").innerHTML = "Enregistré !";
    this.quizService.upQuiz(this.quiz);
  }

  selectQuestion(question: Question) {
    this.resetForm();
    this.question = question;
  }

  resetForm(){
    this.question = null;
  }

  newQuestion() {
    let qId = Date.now();
    const defaultJson = {
      label: "Nouvelle question ?",
      quizId: this.quiz.id,
      id: qId,
      answers: [
        {value: "oui", isCorrect: true, questionId: qId, id: Date.now()+1},
        {value: "non", isCorrect: false, questionId: qId, id: Date.now()+2}
      ]
    };
    const newQuestion = defaultJson as Question;
    this.quizService.addQuestion(newQuestion, this.quiz);
  }

  deleteQuiz() {
    console.log('Was deleted : ', this.quiz);
    this.quizService.deleteQuiz(this.quiz);
  }

  resetQuestion($event: boolean) {
    this.question = null;
  }

  log(value: any) {
    console.log(value);
  }
}
