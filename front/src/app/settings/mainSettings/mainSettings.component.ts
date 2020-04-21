import { Component, OnInit } from '@angular/core';
import { SettingService } from '../../../services/setting.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {Observable} from 'rxjs';
import {Setting} from '../../../models/setting.model';

@Component({
  selector: 'app-mainSettings',
  templateUrl: './mainSettings.component.html',
  styleUrls: ['./mainSettings.component.scss']
})

export class MainSettingsComponent implements OnInit {
  public setting: Setting;


//TODO !!!!!!!
questionNumber0: number = 6;
questionNumber1: number = 4;
questionNumber2: number = 2;
questionNumber3: number = 2;
questionNumber4: number = 2;


  constructor(
    private settingService: SettingService,
    private route: ActivatedRoute,
    private location: Location
  ) {
    this.settingService.settings$.subscribe((setting) => this.setting = setting);
  }

  ngOnInit() {
  }

  changeSize(value: string) {
    if (value==="0") this.settingService.changeFontSize("font-size-basic");
    else this.settingService.changeFontSize("font-size-"+value);
    this.adaptQuestionNumber(value);
  }

  setScrollValue(): number {
    switch (this.setting.fontSizeText.toString()) {
      case "font-size-1-text":
        return 1;
      case "font-size-2-text":
        return 2;
      case "font-size-3-text":
        return 3;
      case "font-size-4-text":
        return 4;
      default :
        return 0;
    }
  }

  setFont(font: String) {
    this.settingService.changeFontStyle("font-style-"+font);
  }

  compareFont(font: String): boolean {
    return (this.setting.fontStyle.toString()==="font-style-"+font);
  }

  adaptQuestionNumber(value: String) {
    switch (value) {
      case "1": this.settingService.setQuestionNumber(this.questionNumber1); break;
      case "2": this.settingService.setQuestionNumber(this.questionNumber2); break;
      case "3": this.settingService.setQuestionNumber(this.questionNumber3); break;
      case "4": this.settingService.setQuestionNumber(this.questionNumber4); break;
      default: this.settingService.setQuestionNumber(this.questionNumber0);
    }
  }
}