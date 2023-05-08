import { Component } from '@angular/core';
import { ApplicationManager } from '../manager';

@Component({
  selector: 'app-taskmanager',
  templateUrl: './taskmanager.component.html',
  styleUrls: ['./taskmanager.component.css']
})
export class TaskmanagerComponent {
  processes = ApplicationManager.processes;
}
