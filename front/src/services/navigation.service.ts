import { Injectable } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  public userId: string = null;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private userService: UserService) {
  }

  async navigate(link: string){
    let pre = this.getPrefix();
    return this.router.navigate([pre+link]);
  }

  getPrefix(): string {
    let prefix: string = '';
    if (this.userId != null) prefix += 'user/' + this.userId;
    return prefix;
  }

  setUserId(userId: string) {
    this.userId = userId
    this.userService.setCurrentUser(userId);
  }
}
