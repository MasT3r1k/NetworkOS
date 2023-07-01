import { Component, OnInit } from '@angular/core';
import { NDevice } from '../../../Main/Device';
import { Expander } from '../../../Main/Expander';

type UsersSection = 'main' | 'userManage' | 'userCreate';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css', '../main.css']
})
export class UsersComponent implements OnInit {
  device = NDevice.System;
  public activeSection: UsersSection = 'main';
  public selectedUser: string = '';
  public toast: string = '';

  public expand: Expander = new Expander(["$#Name", "$#Password"])
  ngOnInit(): void {
    this.device.getUsers().forEach((_) => {
      this.expand.addItem(_, false)});
  }

  updateUser(user: string): void {
    setTimeout(() => {
      this.selectedUser = user;
    });
  }

  public changeSection(section: UsersSection): void {
    this.toast = '';
    this.activeSection = section;
  }

}
