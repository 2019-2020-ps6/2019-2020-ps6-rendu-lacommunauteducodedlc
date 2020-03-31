import { Component } from '@angular/core';

import { Setting } from '../models/setting.model';
import { SettingService } from '../services/setting.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'starter-quiz';
  
  public setting: Setting;

  constructor(private settingService: SettingService) {
    this.settingService.settings$.subscribe((setting) => this.setting = setting);
  
   }
}

