import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizListComponent } from './quizzes/quiz-list/quiz-list.component';
import { EditQuizComponent } from './quizzes/edit-quiz/edit-quiz.component';
import { SpecialSettingsComponent } from './settings/specialSettings/specialSettings.component';
import { MainSettingsComponent } from './settings/mainSettings/mainSettings.component';
import { StarterComponent } from './quizzes/starter-quiz/starter-quiz.component';
import { Quiz } from '../models/quiz.model';

const routes: Routes = [
  {path: 'quiz-list', component: QuizListComponent},
  {path: 'edit-quiz/:id', component: EditQuizComponent},
  {path: '', redirectTo: '/quiz-list', pathMatch: 'full' },
  {path: 'settings', component: MainSettingsComponent},
  {path: 'specialSettings', component: SpecialSettingsComponent},
  {path: 'start-quiz/:id', component: StarterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
