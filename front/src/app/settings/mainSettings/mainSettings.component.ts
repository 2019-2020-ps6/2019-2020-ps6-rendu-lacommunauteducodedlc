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

  constructor(
    private settingService: SettingService,
    private route: ActivatedRoute,
    private location: Location
  ) {
    this.settingService.settings$.subscribe((setting) => this.setting = setting);
  }

  ngOnInit() {
  }


}