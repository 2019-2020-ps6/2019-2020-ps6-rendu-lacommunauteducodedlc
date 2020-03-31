import { Component, OnInit } from '@angular/core';
import {Setting} from '../../models/setting.model';
import { SettingService } from '../../services/setting.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public setting: Setting;

  constructor(private settingService: SettingService) {
    this.settingService.settings$.subscribe((setting) => this.setting = setting);
  
   }

  ngOnInit() {
  }

}
