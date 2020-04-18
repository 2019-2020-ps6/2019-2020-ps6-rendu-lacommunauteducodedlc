import { Component, OnInit } from '@angular/core';
import { SettingService } from '../../../services/setting.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {Observable} from 'rxjs';
import {Setting} from '../../../models/setting.model';


enum checkbox {
  presbytie,
  myopie,
  astigmatie,
  hypermetropie
}

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {
  public setting: Setting;


  //TODO !!!!!!!
  BasicQuestionNumber: Number = 8;
  presbyopiaQuestionNumber: Number = 6;
  myopiaQuestionNumber: Number = 5;
  astigmatismQuestionNumber: Number = 4;
  hyperopiaQuestionNumber: Number = 3;


  constructor(
    private settingService: SettingService,
    private route: ActivatedRoute,
    private location: Location
  ) {
    this.settingService.settings$.subscribe((setting) => this.setting = setting);
  }

  ngOnInit() {
  }

  public setFont(sickness: String, checked: boolean) {
    if(checked){
      this.settingService.changeFontSize("font-size-"+sickness);
      this.settingService.changeFontStyle("font-style-"+sickness);
    }
    else {
      this.setFont("basic",true);
    }
  }

  adaptQustionNumber(sickness: String) {
    switch (sickness) {
      case "presbyopia": this.setQuestionNumber(this.presbyopiaQuestionNumber);
      case "myopia": this.setQuestionNumber(this.myopiaQuestionNumber);
      case "astigmatism": this.setQuestionNumber(this.astigmatismQuestionNumber);
      case "hyperopia": this.setQuestionNumber(this.hyperopiaQuestionNumber);
      default: this.setQuestionNumber(this.BasicQuestionNumber);
    }
  }

  setQuestionNumber(number: Number) {
    this.settingService.setQuestionNumber(number);
  }

  public setColors(sickness : String) {
    this.settingService.changeColors("color-"+sickness);
  }

  compareSicknessColor(sickness : String): boolean {
    return this.setting.colorBackground.toString()==="color-"+sickness+"-background";
  }

  compareSicknessFont(sickness : String): String {
    if (this.setting.fontSizeText.toString()==="font-size-"+sickness+"-text"){
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
