import { Component, OnInit } from '@angular/core';
import { BiosApi } from 'src/app/bios/biosApi';
import { appsConfig } from './appsConfig';
import { ApplicationManager } from './apps/manager';
import { module as NetworkTime } from "./apps/NetworkTime";
import { Processes } from './Process';
import { WindowApp, WindowOrder, WindowActive, unActiveWindow } from './window/window';

@Component({
  selector: 'app-nvos',
  templateUrl: './nvos.component.html',
  styleUrls: ['./nvos.component.css']
})
export class NvosComponent implements OnInit {

  appsConfig = appsConfig;
  public items: any[] = [];
  BiosApi = BiosApi;

  Processes = Processes;
  WindowActive = WindowActive;
  unActiveWindow = unActiveWindow;

  public getZIndex(app: string, window: number): number {
    let process = Object.values(ApplicationManager.processes).filter((value) => value.name == app)[0];
    return Object.keys(ApplicationManager.processesOrder).length - ApplicationManager.processesOrder[process + '-' + window];
  }

  ngOnInit() {
    for(let i = 0;i < 12*25;i++) {
      this.items.push({ app: '' });
    }

    this.items[0].app = "Settings";
    this.items[1].app = "TaskManager";
    this.items[2].app = "Terminal";


    this.startSystem();

  }

  public getIndex(window: WindowApp) {
    return WindowOrder.indexOf(window);
  }

  public startSystem() {
    NetworkTime.run();
  }

}
