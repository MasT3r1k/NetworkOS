import { Component } from '@angular/core';
import { Processes } from '../../../Process';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css', '../Settings.css']
})
export class NotificationsComponent {
  Processes = Processes;

}
