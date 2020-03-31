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

  public setColors(sickness : String) {
    this.settingService.changeColors("color-"+sickness);
  }

  compareSickness(sickness : String): boolean {
    return this.setting.colorBackground.toString()==="color-"+sickness+"-background";
  }
}
