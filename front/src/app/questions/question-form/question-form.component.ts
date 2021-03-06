import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import { QuizService } from '../../../services/quiz.service';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {Answer, Question} from '../../../models/question.model';
import {Quiz} from '../../../models/quiz.model';
import {Setting} from '../../../models/setting.model';
import { SettingService } from '../../../services/setting.service';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.scss']
})
export class QuestionFormComponent implements OnChanges {
  private MAX_ANS = 6;

  public minAns: number = 0;
  public nbAns: number = 3;

  @Input()
  quiz: Quiz;

  @Input()
  question: Question;

  @Output()
  modificationEnded: EventEmitter<boolean> = new EventEmitter<boolean>();

  private questionForm: FormGroup;
  public setting: Setting;

  constructor(public formBuilder: FormBuilder, public quizService: QuizService, public settingService: SettingService) {
    this.settingService.settings$.subscribe((setting) => this.setting = setting);
  }

  ngOnInit() {
    this.initFormBuilder();
  }

  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    this.initFormBuilder();
  }

  private initFormBuilder() {
    this.questionForm = this.formBuilder.group({
      label: [this.question.label],
      answers: this.formBuilder.array([])
    });
    for (let answer of this.question.answers){
      this.answers.push(this.formBuilder.group({
        value: answer.value,
        isCorrect: answer.isCorrect,
      }))
    }
  }

  get answers() {
    return this.questionForm.get('answers') as FormArray;
  }

  addAnswer() {
    if (this.answers.length>=this.MAX_ANS) {
      this.printMessage("Nombre max de réponse atteint");
      return;
    }
    this.answers.push(this.createAnswer());
    if (this.answers.length>this.nbAns) this.minAns=this.answers.length-this.nbAns;
    this.printMessage("");
  }

  delAnswer(ansIndex: number) {
    this.answers.removeAt(ansIndex);
    if (ansIndex>=this.answers.length-this.nbAns) this.minAns--;
  }

  private createAnswer() {
    return this.formBuilder.group({
      value: 'Reponse '+this.answers.length,
      isCorrect: false,
    });
  }

  upQuestion() {
    // We retrieve here the quiz object from the quizForm and we cast the type "as Quiz".
    const questionFromForm: Question = this.questionForm.getRawValue() as Question;

    if(this.checkError(questionFromForm)) return;

    if (!questionFromForm.answers.find((ans)=> ans.isCorrect)) {
      this.printMessage("Au moins une réponse doit être correcte");
      return;
    }

    // Do you need to log your object here in your class? Uncomment the code below
    // and open your console in your browser by pressing F12 and choose the tab "Console".
    // You will see your quiz object when you click on the create button.
    console.log('Add question: ', questionFromForm);
    questionFromForm.id = this.question.id;

    // this.quiz.questions.push(questionToCreat);

    // Now, add your quiz in the list!
    this.quizService.upQuestion(questionFromForm, this.quiz);

    this.question.label = questionFromForm.label;

    this.reset();
  }


  deleteQuestion() {
    this.quiz.questions.splice(this.quiz.questions.indexOf(this.question), 1);
    console.log('Was deleted : ', this.question);
    this.quizService.deleteQuestion(this.question);

    this.reset();
  }

  reset() {
    this.modificationEnded.emit(true);
    this.initFormBuilder();
  }

  // addQuestion() {
  //   // We retrieve here the quiz object from the quizForm and we cast the type "as Quiz".
  //   const questionToCreat: Question = this.questionForm.getRawValue() as Question;
  //
  //   let maxId = 0;
  //   this.quizService.quizzes$.getValue().forEach(quiz => {
  //     quiz.questions.forEach(question =>{
  //       if (question.id > maxId) { maxId = question.id; }
  //     })});
  //   questionToCreat.id = Math.round(maxId) + 1;
  //
  //   // Do you need to log your object here in your class? Uncomment the code below
  //   // and open your console in your browser by pressing F12 and choose the tab "Console".
  //   // You will see your quiz object when you click on the create button.
  //   console.log('Add question: ', questionToCreat);
  //
  //   // this.quiz.questions.push(questionToCreat);
  //
  //   // Now, add your quiz in the list!
  //   this.quizService.addQuestion(questionToCreat, this.quiz);
  //
  //   this.initFormBuilder();
  // }
  moveMinAns(number: number) {
    if (this.minAns+number>=0 && this.minAns+number<=this.answers.length-this.nbAns) this.minAns+=number;
  }

  private printMessage(msg: string) {
    document.getElementById("msg-question-form").innerHTML = msg;
  }

  /**
   * Return True if error find, false else
   * @param question to check
   */
  private checkError(question: Question) {
    const ANS_LENGTH_LIMIT = 75;

    for(let i=0;i<this.answers.length;i++){
      if(question.answers.find((ans)=>ans.value.length>ANS_LENGTH_LIMIT)){
        this.printMessage("Les réponses ne peuvent pas dépasser "+ANS_LENGTH_LIMIT+" caractères.");
        return true;
      }
    }

    return false;
  }
}
