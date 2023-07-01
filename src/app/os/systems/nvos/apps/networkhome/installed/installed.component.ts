import { Component } from '@angular/core';
import { NProcesses } from '../../../Main/Processes';
import { ApplicationDatabase } from '../NetworkHome';

@Component({
  selector: 'app-installed',
  templateUrl: './installed.component.html',
  styleUrls: ['./installed.component.css', '../main.css']
})
export class InstalledComponent {
  public apps = NProcesses.getInstalledProcesses();
  public getAppIcon(process: string): string {
    return ApplicationDatabase.filter(_ => _.name === process)[0].icon;
  }
}
