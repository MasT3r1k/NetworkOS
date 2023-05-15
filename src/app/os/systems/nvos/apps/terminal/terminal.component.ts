import { Component, OnInit } from '@angular/core';
import { TerminalClass } from './terminal';
import { device } from '../../system';
import { Processes } from '../../Process';

@Component({
  selector: 'app-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.css']
})
export class TerminalComponent implements OnInit {
  Terminal = new TerminalClass();
  device = device;

  ngOnInit() {
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
