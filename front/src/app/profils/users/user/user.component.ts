import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { User } from '../../../../models/user.model';
import {Setting} from '../../../../models/setting.model';
import { SettingService } from '../../../../services/setting.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  @Input()
  user: User;

  @Output()
  userSelected: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output()
  userDeleted: EventEmitter<boolean> = new EventEmitter<boolean>();

  public setting: Setting;

  constructor(private settingService: SettingService) {
    this.settingService.settings$.subscribe((setting) => this.setting = setting);
  }

  ngOnInit() {
  }

  selectUser() {
    this.userSelected.emit(true);
  }

  deleteUser() {
    this.userDeleted.emit(true);
  }
}
