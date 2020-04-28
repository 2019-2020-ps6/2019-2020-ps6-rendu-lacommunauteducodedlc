import { Component, OnInit } from '@angular/core';
import { SettingService } from '../../../services/setting.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {Observable} from 'rxjs';
import {Setting} from '../../../models/setting.model';
import {NavigationService} from "../../../services/navigation.service";


enum checkbox {
  presbytie,
  myopie,
  astigmatie,
  hypermetropie
}

@Component({
  selector: 'app-specialSettings',
  templateUrl: './specialSettings.component.html',
  styleUrls: ['./specialSettings.component.scss']
})
export class SpecialSettingsComponent implements OnInit {
  public setting: Setting;


  //TODO !!!!!!!
  basicQuestionNumber: number = 6;
  presbyopiaQuestionNumber: number = 4;
  myopiaQuestionNumber: number = 2;
  astigmatismQuestionNumber: number = 2;
  hyperopiaQuestionNumber: number = 2;

  basicAnswerNumber: number = 6;
  presbyopiaAnswerNumber: number = 4;
  myopiaAnswerNumber: number = 3;
  astigmatismAnswerNumber: number = 2;
  hyperopiaAnswerNumber: number = 1;

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

  public setFont(sickness: String, checked: boolean) {
    if(checked){
      this.settingService.changeFontSize("font-size-"+sickness);
      this.settingService.changeFontStyle("font-style-"+sickness);
      this.adaptQuestionNumber(sickness);
      this.adaptAnswerNumber(sickness);
    }
    else {
      this.setFont("basic",true);
      this.adaptQuestionNumber("basic");
      this.adaptAnswerNumber("basic");
    }
  }

  adaptQuestionNumber(sickness: String) {
    switch (sickness) {
      case "presbyopia": this.settingService.setQuestionNumber(this.presbyopiaQuestionNumber); break;
      case "myopia": this.settingService.setQuestionNumber(this.myopiaQuestionNumber); break;
      case "astigmatism": this.settingService.setQuestionNumber(this.astigmatismQuestionNumber); break;
      case "hyperopia": this.settingService.setQuestionNumber(this.hyperopiaQuestionNumber); break;
      default: this.settingService.setQuestionNumber(this.basicQuestionNumber);
    }
  }

  adaptAnswerNumber(sickness: String) {
    switch (sickness) {
      case "presbyopia": this.settingService.setAnswerNumber(this.presbyopiaAnswerNumber); break;
      case "myopia": this.settingService.setAnswerNumber(this.myopiaAnswerNumber); break;
      case "astigmatism": this.settingService.setAnswerNumber(this.astigmatismAnswerNumber); break;
      case "hyperopia": this.settingService.setAnswerNumber(this.hyperopiaAnswerNumber); break;
      default: this.settingService.setAnswerNumber(this.basicAnswerNumber);
    }
  }

  public setColors(sickness : String) {
    this.settingService.changeColors("color-"+sickness);
  }

  compareSicknessColor(sickness : String): boolean {
    return this.setting.colorBackground.toString()==="color-"+sickness+"-background";
  }

  compareSicknessFont(sickness : String): String {
    if (this.setting.fontSizeText.toString()==="font-size-"+sickness+"-text" || sickness==="basic"){
      return "checked";
    }
    else {
      return "";
    }
  }

  setMonochromate(sickness: String, checked: boolean) {
    if(checked){
      this.setColors(sickness);
    }
    else this.setColors("basic");
  }
}
