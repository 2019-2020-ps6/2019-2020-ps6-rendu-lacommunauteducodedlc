import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizListComponent } from './quizzes/quiz-list/quiz-list.component';
import { EditQuizComponent } from './quizzes/edit-quiz/edit-quiz.component';
import { SpecialSettingsComponent } from './settings/specialSettings/specialSettings.component';
import { MainSettingsComponent } from './settings/mainSettings/mainSettings.component';
import { StarterComponent } from './quizzes/starter-quiz/starter-quiz.component';
import {UserListComponent} from "./profils/users/user-list/user-list.component";
import {AdminSignComponent} from "./profils/admins/admin-sign/admin-sign.component";
import { AdminHomeComponent } from './profils/admins/admin-home/admin-home.component';

const subRoutes: Routes = [
  {path: 'quiz-list', component: QuizListComponent},
  {path: 'edit-quiz/:id', component: EditQuizComponent},
  {path: 'settings', component: MainSettingsComponent},
  {path: 'specialSettings', component: SpecialSettingsComponent},
  {path: 'start-quiz/:id', component: StarterComponent}
];

let userPath;
const routes: Routes = [
  {path: '', children: subRoutes.concat(
      {path: '', redirectTo: '/admin-sign', pathMatch: 'full' })},
  userPath = {path: 'user/:userId', children: subRoutes.concat(
      {path: '', redirectTo: 'quiz-list', pathMatch: 'full' })},
  {path: 'admin/:adminId', children: subRoutes.concat(
      {path: '', redirectTo: 'user-list', pathMatch: 'full' },
      {path: 'user-list', component: UserListComponent},
      {path: 'admin-home', component: AdminHomeComponent},
      userPath)},
  {path: 'user-list', component: UserListComponent},
  {path: 'admin-home', component: AdminHomeComponent},
  {path: 'admin-sign', component: AdminSignComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
