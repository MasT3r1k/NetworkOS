import { Component, OnInit } from '@angular/core';
import { BiosApi } from 'src/app/bios/biosApi';
import { WindowActive, unActiveWindow, moving } from './window/window';
import { Selecting } from './Selecting';
import { context } from './contextMenu';
import { device } from './system';
import { FormControl, FormGroup } from '@angular/forms';
import { fromEvent } from 'rxjs/internal/observable/fromEvent';
import { debounceTime } from 'rxjs/operators';
import { NDevice, desktopApp } from './Main/Device';
import { NProcesses } from './Main/Processes';
import { ApplicationDatabase } from './apps/networkhome/NetworkHome';

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

  /** OLD VERSION */

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

  BiosApi = BiosApi;

  loginUser = new FormGroup<LoginForm>({
    username: new FormControl('', {nonNullable: true}),
    password: new FormControl('', {nonNullable: true})
  })


  WindowActive = WindowActive;
  unActiveWindow = unActiveWindow;
  DesktopSelector = Selecting.DesktopSelector;
  WindowMoving = moving;
  ContextMenu = context;

  /** NEW VERSION */
  device = NDevice.System;
  Processes = NProcesses;
  public renaming: string = ''; 

  ngOnInit() {

    // Start system
    this.device.startSystem('NetworkOS', 'MasTerik', '');

    // On resize change display resolution
    this.device.setResolution(windowResize());
    fromEvent(window, 'resize')
    .pipe(debounceTime(200))
    .subscribe(() => {
      this.device.setResolution(windowResize());
    });

    function windowResize() {
      let html = document.querySelector("html");
      return {
        width: html?.clientWidth || 0,
        height: html?.clientHeight || 0
      }
    }

  }

  public log(any: any) {
    console.log(any);
  }

  ApplicationDatabase = ApplicationDatabase;
  public getAppIcon(process: string): string {
    return ApplicationDatabase.filter(_ => _.name === process)[0].icon;
  }
  
  setTextToRename(val: string): void {
    this.renaming = val;
  }

  public addTextToName(event: KeyboardEvent, item: desktopApp) {
    setTimeout(() => {
      this.renaming = (event.target as HTMLBaseElement)?.textContent ?? " ";
    })
    switch(event.key) {
      case "Backspace":
        item.text.slice(item.text.length - 1, item.text.length)
        break;
      case "Enter":
        this.saveItemName(item);
        break;
  }
  }

  public saveItemName(item: desktopApp) {
    if (item.editing == false) return;
    if (item.text != this.renaming) {
      console.log("App renamed to " + this.renaming)
      item.text = this.renaming;
    }
    this.renaming = '';
    item.editing = false;
  }

}
