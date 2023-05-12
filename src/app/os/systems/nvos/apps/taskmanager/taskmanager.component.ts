import { Component, OnInit } from '@angular/core';
import { Processes } from '../../Process';
import { device as System } from '../../system';

@Component({
  selector: 'app-taskmanager',
  templateUrl: './taskmanager.component.html',
  styleUrls: ['./taskmanager.component.css']
})
export class TaskmanagerComponent implements OnInit {
  active: number = 0;
  selected_proces: Processes.Process | null = null; 
  Procesy = Processes.processes;
  device = System;
  
  public getProcesses(pro: Record<string, Processes.Process>, boolean: boolean) {
    return Object.values(pro).filter(a => a.hidden == boolean)
  }

  ngOnInit() {
  }
}
