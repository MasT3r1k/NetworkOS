import { Component, ElementRef, OnInit } from '@angular/core';
import { TerminalClass } from './terminal';
import { device } from '../../system';
import { Processes } from '../../Process';
import { WindowApp } from '../../window/window';

@Component({
  selector: 'app-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.css']
})
export class TerminalComponent implements OnInit {

  declare process: Processes.Process;
  declare window: WindowApp;

  constructor(private elementRef: ElementRef) { }

  Terminal = new TerminalClass();
  device = device;

  ngOnInit() {
    let winEl = this.elementRef.nativeElement.offsetParent;
    this.process = Processes.processes[winEl.getAttribute("process")];
    this.window = this.process.windows[winEl.getAttribute("window")];

    setTimeout(() => {
      let _ = document.querySelectorAll("#commander");
      this.Terminal.input = _[_.length - 1] as HTMLInputElement;
    }, 1)
    Processes.processes['Terminal'].windows[Processes.processes['Terminal'].windows.length - 1].ActivatingWindowFunc = () => {
      setTimeout(() => {
        this.Terminal.input.focus();
      }, 10)
    }
  }

  public TerminalCommander(event: KeyboardEvent) {
    this.Terminal.input = event.target as HTMLInputElement;
    if (event.key == 'Enter') {
      this.Terminal.runCommand(this.Terminal.input.value);
      this.Terminal.input.value = '';
    }
  }
}
