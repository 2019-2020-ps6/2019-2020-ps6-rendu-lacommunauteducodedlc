import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { QuizService } from '../../../../services/quiz.service';
import { Quiz, QuizTheme } from '../../../../models/quiz.model';
import {Setting} from '../../../../models/setting.model';
import { SettingService } from '../../../../services/setting.service';
import {AdminService} from "../../../../services/admin.service";
import {NavigationService} from "../../../../services/navigation.service";

@Component({
  selector: 'app-sign-in',
  templateUrl: './admin-sign-in.component.html',
  styleUrls: ['./admin-sign-in.component.scss']
})
export class AdminSignInComponent implements OnInit {

  // Note: We are using here ReactiveForms to create our form. Be careful when you look for some documentation to
  // avoid TemplateDrivenForm (another type of form)

  /**
   * QuizForm: Object which manages the form in our component.
   * More information about Reactive Forms: https://angular.io/guide/reactive-forms#step-1-creating-a-formgroup-instance
   */
  public currentAdminId: string;
  public currentPassword: string;

  public setting: Setting;

  constructor(private settingService: SettingService, private adminService: AdminService, private navigation: NavigationService) {
    this.settingService.settings$.subscribe((setting) => this.setting = setting);
  }

  ngOnInit() {
  }

  askConnexion() {
    const admin = this.adminService.containIdAdmin(this.currentAdminId);
    if (!admin) {
      this.dispError("Identifiant inconnue");
      return;
    }
    if (this.currentPassword !== admin.password) {
      this.dispError("Mauvais mot de passe");
      return;
    }
    this.connexion(admin.id);
  }

  private connexion(id) {
    this.navigation.setAdminId(id);
    this.navigation.navigate("/admin-home");
  }

  private dispError(msg: string) {
    document.getElementById("errorMsg").innerHTML = msg;
  }
}
