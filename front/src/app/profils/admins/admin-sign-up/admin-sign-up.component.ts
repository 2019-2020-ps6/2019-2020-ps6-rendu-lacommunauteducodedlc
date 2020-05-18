import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { QuizService } from '../../../../services/quiz.service';
import { Quiz, QuizTheme } from '../../../../models/quiz.model';
import {Setting} from '../../../../models/setting.model';
import { SettingService } from '../../../../services/setting.service';
import {AdminService} from "../../../../services/admin.service";
import {Admin} from "../../../../models/admin.model";

@Component({
  selector: 'app-sign-up',
  templateUrl: './admin-sign-up.component.html',
  styleUrls: ['./admin-sign-up.component.scss']
})
export class AdminSignUpComponent implements OnInit {

  // Note: We are using here ReactiveForms to create our form. Be careful when you look for some documentation to
  // avoid TemplateDrivenForm (another type of form)

  /**
   * QuizForm: Object which manages the form in our component.
   * More information about Reactive Forms: https://angular.io/guide/reactive-forms#step-1-creating-a-formgroup-instance
   */
  @Output()
  signUpDone: EventEmitter<boolean> = new EventEmitter<boolean>();

  public quizForm: FormGroup;
  public setting: Setting;
  public idErrorMsg: string;
  public pswErrorMsg: string;

  constructor(public formBuilder: FormBuilder, public adminService: AdminService, private settingService: SettingService) {
    // Form creation
    this.initFormBuilder();
    this.settingService.settings$.subscribe((setting) => this.setting = setting);
    // You can also add validators to your inputs such as required, maxlength or even create your own validator!
    // More information: https://angular.io/guide/reactive-forms#simple-form-validation
    // Advanced validation: https://angular.io/guide/form-validation#reactive-form-validation
  }

  ngOnInit() {
  }

  addAdmin() {
    if(this.idErrorMsg || this.pswErrorMsg) return;
    const adminToCreate: Admin = this.quizForm.getRawValue() as Admin;
    adminToCreate.id = Date.now();
    // adminToCreate.password = encode(adminToCreate.password);

    this.adminService.addAdmin(adminToCreate);

    this.initFormBuilder();
    this.signUpDone.emit(true);
  }

  initFormBuilder(){
    this.quizForm = this.formBuilder.group({
      adminId: [''],
      password: [''],
      confirmPassword: ['']
    });
  }

  checkId(idAdmin: string) {
    if(!idAdmin){
      this.idErrorMsg = "L'identifiant ne peut pas être vide"
      return;
    }
    if (this.adminService.containIdAdmin(idAdmin)){
      this.idErrorMsg = "Identifiant déjà utilisé"
      return;
    }
    this.idErrorMsg = "";
  }

  checkPsw(psw: string) {
    if(!psw){
      this.pswErrorMsg = "Le mot de passe ne peut pas être vide"
      return;
    }

    if (!this.pwdsEquals()){
      this.pswErrorMsg = "Les mots de passes doivent être identique"
      return;
    }
    this.pswErrorMsg = "";
  }

  pwdsEquals() : boolean{
    return document.getElementById("password").innerText === document.getElementById("confirmPassword").innerText;
  }
}
