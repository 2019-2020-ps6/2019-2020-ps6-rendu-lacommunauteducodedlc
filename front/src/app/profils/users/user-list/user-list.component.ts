import { Component, OnInit } from '@angular/core';
import { UserService} from "../../../../services/user.service";
import { User } from '../../../../models/user.model';
import {Setting} from '../../../../models/setting.model';
import { SettingService } from '../../../../services/setting.service';
import {NavigationService} from "../../../../services/navigation.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  public userList: User[] = [];
  public setting: Setting;
  public formDisplay: boolean;

  public currentFirst =0;
  public nbMaxDisplay = 8;

  constructor(public userService: UserService,
              private settingService: SettingService,
              private route: ActivatedRoute,
              private navigation: NavigationService) {
    this.userService.users$.subscribe((users) => this.userList = users);
    this.settingService.settings$.subscribe((setting) => {
      this.setting = setting;
    });
  }

  ngOnInit() {
    this.navigation.setUserId(this.route.snapshot.paramMap.get("userId"))
  }

  userSelected(selected: boolean) {

  }

  deleteUser(user: User) {
    if (!((this.userList.indexOf(user)+1)%this.nbMaxDisplay)) this.changeCurrentFirst(-this.nbMaxDisplay+1);
    this.userList.slice(this.userList.indexOf(user), 1);
    console.log('Was deleted : ', user);
    this.userService.deleteUser(user);
  }

  setFormDisplay(b: boolean) {
    this.formDisplay = b;
  }

  changeCurrentFirst(i : number){
    if (this.currentFirst+i<0) return;
    this.currentFirst+=i;
  }
}
