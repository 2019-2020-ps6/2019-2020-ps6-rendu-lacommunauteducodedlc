import { Component, OnInit } from '@angular/core';
import { SettingService } from '../../../services/setting.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {Observable} from 'rxjs';
import {Setting} from '../../../models/setting.model';
import {NavigationService} from "../../../services/navigation.service";

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

answerNumber0: number = 6;
answerNumber1: number = 3;
answerNumber2: number = 1;


  constructor(
    private settingService: SettingService,
    private route: ActivatedRoute,
    private location: Location,
    private navigation: NavigationService
  ) {
    this.settingService.settings$.subscribe((setting) => this.setting = setting);
  }

  ngOnInit() {
    this.navigation.setUserId(this.route.snapshot.paramMap.get("userId"))
  }

  changeSize(value: string) {
    if (value==="0") this.settingService.changeFontSize("font-size-basic");
    else this.settingService.changeFontSize("font-size-"+value);
    this.adaptQuestionNumber(value);
    this.adaptAnswerNumber(value);
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

  adaptAnswerNumber(value: String) {
    switch (value) {
      case "2": 
      case "3": this.settingService.setAnswerNumber(this.answerNumber1); break;
      case "4": this.settingService.setAnswerNumber(this.answerNumber2); break;
      default: this.settingService.setAnswerNumber(this.answerNumber0); 
    }
  }

  public setColors(sickness : String) {
     this.settingService.changeColors("color-"+sickness);
  }

  setDark(sickness: String, checked: boolean) {
    if(checked){
      this.setColors(sickness);
    }
    else {
      this.setColors("basic");
    }
  }

  compareSicknessColor(sickness : String): boolean {
    return this.setting.colorBackground.toString()==="color-"+sickness+"-background";
  }
}
