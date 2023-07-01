import { Component } from '@angular/core';
import { NProcesses } from '../../../Main/Processes';

@Component({
  selector: 'app-installed',
  templateUrl: './installed.component.html',
  styleUrls: ['./installed.component.css', '../main.css']
})
export class InstalledComponent {
  public apps = NProcesses.getInstalledProcesses();
}
