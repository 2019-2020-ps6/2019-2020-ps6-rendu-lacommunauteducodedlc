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
  public fontSizeText: String;
  public fontSizeSubtitle: String;
  public fontSizeTitle: String;
  public fontSizeButton: String;

  public fontStyle : String;

  public colorBackground : String;
  public colorHeader : String;
  public colorYes : String;
  public colorNo : String;
  public colorButton : String;

  constructor(
    private settingService: SettingService,
    private route: ActivatedRoute,
    private location: Location
  ) {
    this.fontSizeText = "font-size-basic-text";
    this.fontSizeSubtitle = "font-size-basic-subtitle";
    this.fontSizeTitle = "font-size-basic-title";
    this.fontSizeButton = "font-size-basic-button";

    this.fontStyle = "font-style-basic";

    this.colorBackground = "color-basic-background";
    this.colorHeader = "color-basic-header";
    this.colorYes = "color-basic-yes";
    this.colorNo = "color-basic-no";
    this.colorButton = "color-basic-button";
  }

  ngOnInit() {
    this.fontSizeText = this.settingService.getFontSizeText();
    this.fontSizeSubtitle = this.settingService.getFontSizeSubtitle();
    this.fontSizeTitle = this.settingService.getFontSizeTitle();
    this.fontSizeButton = this.settingService.getFontSizeButton();

    this.fontStyle = this.settingService.getFontStyle();

    this.colorBackground = this.settingService.getColorBackground();
    this.colorHeader = this.settingService.getColorHeader();
    this.colorYes = this.settingService.getColorYes();
    this.colorNo = this.settingService.getColorNo();
    this.colorButton = this.settingService.getColorButton();
  }

  public setFont(sickness: String, checked: boolean) {
    if(checked){
      this.settingService.changeFontSize("font-size-"+sickness);
      this.settingService.changeFontStyle("font-style-"+sickness);
    }
    else {
      this.setFont("basic",true);
    }
    this.ngOnInit();
  }

  public setColors(sickness : String) {
    this.settingService.changeColors("color-"+sickness);
    this.ngOnInit();
  }

}
