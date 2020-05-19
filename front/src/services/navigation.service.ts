import { Injectable } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  public userId: string = null;
  public adminId: string = null;

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
    if (this.adminId != null) prefix += '/admin/' + this.adminId;
    if (this.userId != null) prefix += '/user/' + this.userId;
    return prefix.replace("^/","");
  }

  setUserId(userId: string) {
    this.userId = userId
    this.userService.setCurrentUser(userId);
  }

  setAdminId(adminId: string) {
    this.adminId = adminId;
  }

  update(route: ActivatedRoute){
    this.setUserId(route.snapshot.paramMap.get("userId"));
    this.setAdminId(route.snapshot.paramMap.get("adminId"));
    console.log("admin : "+this.adminId)
    console.log("user : "+this.userId)
  }
}
