import { Component, OnInit } from '@angular/core';
import { NProcesses } from '../../../Main/Processes';
import { ApplicationDatabase } from '../NetworkHome';

@Component({
  selector: 'app-processes',
  templateUrl: './processes.component.html',
  styleUrls: ['./processes.component.css', '../main.css']
})
export class ProcessesComponent implements OnInit {
  public apps = NProcesses.getRunningProcesses();
  public getProcess = NProcesses.getProcess;

  public getAppIcon(process: string): string {
    return ApplicationDatabase.filter(_ => _.name === process)[0].icon;
  }

  public tempExpandes: [[string, boolean]] = [[this.apps[0], false]];
  ngOnInit(): void {
    this.apps.forEach((_, index) => {
      if (index === 0) return;
      this.tempExpandes.push([_, false])});
  }

  expandThis(app: string) {
    this.tempExpandes.filter(_ => _[0] === app)[0][1] = !this.tempExpandes.filter(_ => _[0] === app)[0][1];
  }

  isExpand(app: string): boolean {
    return this.tempExpandes.filter(_ => _[0] === app)?.[0]?.[1] || false;
  }

}
