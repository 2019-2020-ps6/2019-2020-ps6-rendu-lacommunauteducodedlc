import { Component, OnInit } from '@angular/core';
import { UserService} from "../../../../services/user.service";
import { User } from '../../../../models/user.model';
import {Setting} from '../../../../models/setting.model';
import { SettingService } from '../../../../services/setting.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  public userList: User[] = [];
  public setting: Setting;

  constructor(public userService: UserService, private settingService: SettingService) {
    this.userService.users$.subscribe((users) => this.userList = users);
    this.settingService.settings$.subscribe((setting) => {
      this.setting = setting;
    });
  }

  ngOnInit() {
  }

  userSelected(selected: boolean) {

  }

  deleteUser(user: User) {
    this.userList.slice(this.userList.indexOf(user), 1);
    console.log('Was deleted : ', user);
    //TODO
    // this.userService.deleteUser(user);
  }
}
