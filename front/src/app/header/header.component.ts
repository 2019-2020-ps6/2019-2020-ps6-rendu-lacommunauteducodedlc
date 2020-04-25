import { Component, OnInit } from '@angular/core';
import {Setting} from '../../models/setting.model';
import { SettingService } from '../../services/setting.service';
import {ActivatedRoute} from "@angular/router";
import {NavigationService} from "../../services/navigation.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public isConnected: boolean;

  public setting: Setting;
  public preRouterLink:  string;

  constructor(private settingService: SettingService,
              private route: ActivatedRoute,
              private navigation: NavigationService) {
    console.log(route)
    this.settingService.settings$.subscribe((setting) => this.setting = setting);

   }

  ngOnInit() {
    // this.preRouterLink = this.route.firstChild.
  }

}
