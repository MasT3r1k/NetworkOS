import { Component, ElementRef } from '@angular/core';
import { Processes } from '../../../Process';
import { WindowApp } from '../../../window/window';

@Component({
  selector: 'app-loader',
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

    this.window.makeLoaded();
  }
}
