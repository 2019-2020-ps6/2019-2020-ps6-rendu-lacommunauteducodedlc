import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { QuizListComponent } from './quizzes/quiz-list/quiz-list.component';
import { QuizComponent } from './quizzes/quiz/quiz.component';
import { HeaderComponent } from './header/header.component';
import { QuizFormComponent } from './quizzes/quiz-form/quiz-form.component';
import {HttpClientModule} from '@angular/common/http';
import {EditQuizComponent} from './quizzes/edit-quiz/edit-quiz.component';
import {AppRoutingModule} from './routing.module';
import {QuestionComponent} from './questions/question/question.component';
import {QuestionFormComponent} from './questions/question-form/question-form.component';
import {QuestionListComponent} from './questions/question-list/question-list.component';
import {SpecialSettingsComponent} from './settings/specialSettings/specialSettings.component';
import {MainSettingsComponent} from './settings/mainSettings/mainSettings.component';
import {StarterComponent} from './quizzes/starter-quiz/starter-quiz.component';
import {QuizSortComponent} from "./quizzes/quiz-sort/quiz-sort.component";
import {UserComponent} from "./profils/users/user/user.component";
import {UserListComponent} from "./profils/users/user-list/user-list.component";

@NgModule({
  declarations: [
    AppComponent,
    QuizListComponent,
    QuizComponent,
    HeaderComponent,
    QuizFormComponent,
    EditQuizComponent,
    QuestionComponent,
    QuestionFormComponent,
    QuestionListComponent,
    SpecialSettingsComponent,
    MainSettingsComponent,
    StarterComponent,
    QuizSortComponent,
    UserComponent,
    UserListComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
