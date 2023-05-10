import { Component, OnInit } from '@angular/core';
import { BiosApi } from 'src/app/bios/biosApi';
import { appsConfig } from './appsConfig';
import { ApplicationManager } from './apps/manager';
import { module as NetworkTime } from "./apps/NetworkTime";
import { Processes } from './Process';

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

  public startSystem() {
    NetworkTime.run();
  }


  // public closeApp(app: string) {
  //   if (appsConfig[app]) {
  //     let config = appsConfig[app];
  //     if (config.Windows.length > 0) {
  //       config.Windows.forEach(index => {
  //         this.windows[index].disable();
  //       })
  //       config.Windows = [];
  //     }else{
  //       console.error("[Error] Application is not running.");
  //     }
  //   }
  // }

  // public runApp(app: string) {
  //   if (appsConfig[app]) {
  //     let config = appsConfig[app];
  //     if (!config.maxWindows) { config.maxWindows = 1 }
  //     if (config.maxWindows && config.Windows.length >= config.maxWindows) {
  //       config.Windows.forEach(window => {
  //         if (this.windows[window].minimazed) this.windows[window].minimaze();
  //       });
  //       // TODO: select window
  //       return;
  //     }
  //     let window = new WindowApp(config.id, config.loader);
  //     let index = this.windows.push(window);
  //     window.component = config.component;
  //     config.Windows?.push(index - 1);
  //     window.loaded = true;
  //   }else{
  //     console.error("[Error] Application is not installed.");
  //   }
  // }
}
