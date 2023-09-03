import { Component } from '@angular/core';
import { NProcesses } from '../../../Main/Processes';
import { ApplicationDatabase } from '../NetworkHome';

type sections = "main" | "moreInfo";

@Component({
  selector: 'app-installed',
  templateUrl: './installed.component.html',
  styleUrls: ['./installed.component.css', '../main.css']
})
export class InstalledComponent {
  public apps = NProcesses.getInstalledProcesses();
  public declare selectedApp: NProcesses.Process;
  private section = "main";
  public getAppIcon(process: string): string {
    return ApplicationDatabase.filter(_ => _.name === process)[0].icon;
  }

  public setSection(section: sections): void {
    this.section = section;
  }

  public getSection(): string {
    return this.section;
  }

  public setSelectedApp(app: NProcesses.Process | void):void {
    if (!app) return;
    this.selectedApp = app;
  }

  public getSelectedApp(): NProcesses.Process | undefined {
    return this.selectedApp;
  }

  public showApp(app: string): void {
    this.setSection('moreInfo');
    this.setSelectedApp(this.getProcessByName(app));
  }
  
  public getProcessByName(name: string): NProcesses.Process | void {
    if (NProcesses.getProcess(name) !== undefined) return NProcesses.getProcess(name);
  }

}
