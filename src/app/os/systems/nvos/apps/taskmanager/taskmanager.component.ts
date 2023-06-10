import { Component, ElementRef, OnInit } from '@angular/core';
import { Processes } from '../../Process';
import { data } from './loader/loader.component';
import { WindowApp } from '../../window/window';

@Component({
  selector: 'app-taskmanager',
  templateUrl: './taskmanager.component.html',
  styleUrls: ['./taskmanager.component.css']
})
export class TaskmanagerComponent implements OnInit {

  declare window: WindowApp;
  declare process: Processes.Process;

  data = data;

  constructor(private elementRef: ElementRef) { }
  
  public getProcesses(pro: Record<string, Processes.Process>, boolean: boolean) {
    return Object.values(pro).filter(a => a.hidden == boolean)
  }

  ngOnInit() {
    let winEl = this.elementRef.nativeElement.offsetParent;
    this.process = Processes.processes[winEl.getAttribute("process")];
    this.window = this.process.windows[winEl.getAttribute("window")];

    console.log(this.process.name)
  }
}
