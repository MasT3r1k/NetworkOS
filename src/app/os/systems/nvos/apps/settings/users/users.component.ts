import { Component } from '@angular/core';
import { device } from '../../../system';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css', '../Settings.css']
})
export class UsersComponent {
  device = device
}
