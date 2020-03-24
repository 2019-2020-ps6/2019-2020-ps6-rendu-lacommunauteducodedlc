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
  public fontSize: String;

  constructor(
    private settingService: SettingService,
    private route: ActivatedRoute,
    private location: Location
  ) {
    this.fontSize = "font-size-small"
  }

  ngOnInit() {
    this.fontSize = this.settingService.getFontSize();
  }

  public setFontSize(fontSize: String, checked: boolean) {
    if(checked){
      this.settingService.changeFontSize(fontSize);
    }
    else {
      this.settingService.changeFontSize("font-size-small");
    }
    this.ngOnInit();
  }

}
