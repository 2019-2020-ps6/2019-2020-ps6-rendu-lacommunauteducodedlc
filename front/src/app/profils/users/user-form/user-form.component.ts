import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import {Setting} from '../../../../models/setting.model';
import { SettingService } from '../../../../services/setting.service';
import {User} from "../../../../models/user.model";
import {UserService} from "../../../../services/user.service";

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  @Output()
  formDone: EventEmitter<boolean> = new EventEmitter<boolean>();

  // Note: We are using here ReactiveForms to create our form. Be careful when you look for some documentation to
  // avoid TemplateDrivenForm (another type of form)

  /**
   * QuizForm: Object which manages the form in our component.
   * More information about Reactive Forms: https://angular.io/guide/reactive-forms#step-1-creating-a-formgroup-instance
   */
  public userForm: FormGroup;
  // public ICON_LIST = Object.keys(IconList).filter(k => typeof QuizTheme[k as any] === 'number');
  public setting: Setting;

  constructor(public formBuilder: FormBuilder, public userService: UserService, private settingService: SettingService) {
    // Form creation
    this.initFormBuilder();
    this.settingService.settings$.subscribe((setting) => this.setting = setting);
    // You can also add validators to your inputs such as required, maxlength or even create your own validator!
    // More information: https://angular.io/guide/reactive-forms#simple-form-validation
    // Advanced validation: https://angular.io/guide/form-validation#reactive-form-validation
  }

  ngOnInit() {
  }

  addUser() {
    // We retrieve here the quiz object from the quizForm and we cast the type "as Quiz".
    const userToCreate: User = this.userForm.getRawValue() as User;

    userToCreate.id = Date.now();

    // Do you need to log your object here in your class? Uncomment the code below
    // and open your console in your browser by pressing F12 and choose the tab "Console".
    // You will see your quiz object when you click on the create button.
    console.log('Add user: ', userToCreate);

    // Now, add your quiz in the list!
    this.userService.addUser(userToCreate);
    this.initFormBuilder();
    this.formDone.emit(true);
  }

  initFormBuilder(){
    this.userForm = this.formBuilder.group({
      userName: ['']
    });
  }
}
