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

  constructor(
    private settingService: SettingService,
    private route: ActivatedRoute,
    private location: Location
  ) {
    this.fontSizeText = "font-size-basic-text";
    this.fontSizeSubtitle = "font-size-basic-subtitle";
    this.fontSizeTitle = "font-size-basic-title";
    this.fontSizeButton = "font-size-basic-button";
  }

  ngOnInit() {
    this.fontSizeText = this.settingService.getFontSizeText();
    this.fontSizeSubtitle = this.settingService.getFontSizeSubtitle();
    this.fontSizeTitle = this.settingService.getFontSizeTitle();
    this.fontSizeButton = this.settingService.getFontSizeButton();
  }

  public setFontSize(fontSize: String, checked: boolean) {
    if(checked){
      this.settingService.changeFontSize(fontSize);
    }
    else {
      this.settingService.changeFontSize("font-size-basic");
    }
    this.ngOnInit();
  }

}
