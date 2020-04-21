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
  }
}
