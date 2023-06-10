import { Component, ElementRef } from '@angular/core';
import { Processes } from '../../../Process';
import { WindowApp } from '../../../window/window';
import { device as System } from '../../../system';


export interface settingsData {
  active: number;
  selected_proces: Processes.Process | null;
  Procesy: Record<string, Processes.Process>;
  device: any;
}

export let data: settingsData;

@Component({
  selector: 'app-taskmanager-loader',
  templateUrl: '../../../loader/loader.component.html',
  styleUrls: ['../../../loader/loader.component.css'],

})
export class LoaderComponent {

  declare process: Processes.Process;
  declare window: WindowApp;

  constructor(private elementRef: ElementRef) { }

  ngOnInit() {
    let winEl = this.elementRef.nativeElement.offsetParent;
    this.process = Processes.processes[winEl.getAttribute("process")];
    this.window = this.process.windows[winEl.getAttribute("window")];

    data = {
      active: 0,
      selected_proces: null,
      Procesy: Processes.processes,
      device: System
    }

    this.window.makeLoaded();
  }

}
