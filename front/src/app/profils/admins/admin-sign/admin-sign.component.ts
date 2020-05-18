import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { QuizService } from '../../../../services/quiz.service';
import { Quiz, QuizTheme } from '../../../../models/quiz.model';
import {Setting} from '../../../../models/setting.model';
import { SettingService } from '../../../../services/setting.service';

@Component({
  selector: 'app-sign',
  templateUrl: './admin-sign.component.html',
  styleUrls: ['./admin-sign.component.scss']
})
export class AdminSignComponent implements OnInit {

  public setting: Setting;

  public inOrUp: boolean;

  constructor(private settingService: SettingService) {
    this.settingService.settings$.subscribe((setting) => this.setting = setting);
  }

  ngOnInit() {
  }

  switchUpIn(){
    this.inOrUp = !this.inOrUp;
  }
}
