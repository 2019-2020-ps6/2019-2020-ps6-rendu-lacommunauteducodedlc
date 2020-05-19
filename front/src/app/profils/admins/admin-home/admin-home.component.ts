import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {Setting} from '../../../../models/setting.model';
import { SettingService } from '../../../../services/setting.service';
import {AdminService} from "../../../../services/admin.service";
import {Admin} from "../../../../models/admin.model";
import { NavigationService } from 'src/services/navigation.service';

@Component({
  selector: 'admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit {

  // Note: We are using here ReactiveForms to create our form. Be careful when you look for some documentation to
  // avoid TemplateDrivenForm (another type of form)

  private setting: Setting

  constructor(private settingService: SettingService, private navigation: NavigationService) {
    // Form creation
    this.settingService.settings$.subscribe((setting) => this.setting = setting);
    // You can also add validators to your inputs such as required, maxlength or even create your own validator!
    // More information: https://angular.io/guide/reactive-forms#simple-form-validation
    // Advanced validation: https://angular.io/guide/form-validation#reactive-form-validation
  }

  ngOnInit() {
  }
}
