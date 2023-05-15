import { Component, OnInit } from '@angular/core';
import { BiosApi } from 'src/app/bios/biosApi';
import { appsConfig } from './appsConfig';
import { module as NetworkTime } from "./apps/NetworkTime";
import { Processes } from './Process';
import { WindowApp, WindowOrder, WindowActive, unActiveWindow, moving } from './window/window';
import { Selecting } from './Selecting';
import { context } from './contextMenu';
import { device } from './system';
import { FormControl, FormGroup } from '@angular/forms';

interface LoginForm {
  username: FormControl<string>;
  password: FormControl<string>;
}

@Component({
  selector: 'app-nvos',
  templateUrl: './nvos.component.html',
  styleUrls: ['./nvos.component.css']
})
export class NvosComponent implements OnInit {

  appsConfig = appsConfig;
  public items: any[] = [];
  BiosApi = BiosApi;

  loginUser = new FormGroup<LoginForm>({
    username: new FormControl('', {nonNullable: true}),
    password: new FormControl('', {nonNullable: true})
  })


  Processes = Processes;
  WindowActive = WindowActive;
  unActiveWindow = unActiveWindow;
  DesktopSelector = Selecting.DesktopSelector;
  WindowMoving = moving;
  ContextMenu = context;
  device = device;

  ngOnInit() {
    for(let i = 0;i < 12*25;i++) {
      this.items.push({ app: '', text: '' });
    }

    this.items[0].app = "Settings";
    this.items[1].app = "TaskManager";
    this.items[2].app = "Terminal";


    this.startSystem();

  }

  public getIndex(window: WindowApp) {
    return 6 + WindowOrder.indexOf(window);
  }

  public startSystem() {
    NetworkTime.run();
  }

  public UserLoginToSystem() {
    
    if (device.isUnlocked) return;

    let u = this.loginUser.value.username;
    let p = this.loginUser.value.password;

    if (!u || !p) return;
    if (!device.getUsers().includes(u as string)) return console.error("Username not found!");

  }

}
