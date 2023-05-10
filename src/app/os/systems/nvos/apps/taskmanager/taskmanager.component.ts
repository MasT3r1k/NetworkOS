import { Component } from '@angular/core';
import { Processes } from '../../Process';

@Component({
  selector: 'app-taskmanager',
  templateUrl: './taskmanager.component.html',
  styleUrls: ['./taskmanager.component.css']
})
export class TaskmanagerComponent {
  Process = Processes;
}
