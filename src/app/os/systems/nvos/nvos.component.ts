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
import { fromEvent } from 'rxjs/internal/observable/fromEvent';
import { debounceTime } from 'rxjs/operators';
import { Utils } from 'src/app/utils/NVUtils';
import { DiskManager } from 'src/app/utils/diskManager';

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
    this.items[0].text = "Nastavení";
    this.items[1].app = "TaskManager";
    this.items[1].text = "Správce úloh";
    this.items[2].app = "Terminal";
    this.items[2].text = "Terminál";


    this.startSystem();

    this.device.updateResolution(windowResize());
    fromEvent(window, 'resize')
    .pipe(debounceTime(200))
    .subscribe(() => {
      this.device.updateResolution(windowResize());
    });

    function windowResize()
    {
      let html = document.querySelector("html");
      return {
        width: html?.clientWidth || 0,
        height: html?.clientHeight || 0
      }
    }

  }

  public getIndex(window: WindowApp) {
    return 6 + WindowOrder.indexOf(window);
  }

  public startSystem() {
    NetworkTime.run();
    DiskManager.Disk
  }

  public UserLoginToSystem() {

    if (device.isUnlocked) return;

    let u = this.loginUser.value.username;
    let p = this.loginUser.value.password;

    if (u == undefined || p == undefined) return;
    if (!device.getUsers().includes(u as string)) return console.error("Username not found!");
    if (!device.getUser(u)?.checkPassword(p)) return console.error("Password is wrong!")
    device.isUnlocked = true;
    device.setUser(u);
  }

}
