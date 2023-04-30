import { Component } from '@angular/core';
type options = 'edition' | 'installationType';

@Component({
  selector: 'app-installer',
  templateUrl: './installer.component.html',
  styleUrls: ['./installer.component.css']
})
export class InstallerComponent {
  public active: number = 0;
  public sections: string[] = ['Choose your edition', 'Installation Type', 'Set Up System'];

  public go(page: number) {
    if (this.sections?.[page as number]) {
      this.active = page as number;
    }
    if (page == this.sections.length) {
      // TODO: Load into system
      console.log("Trying to load system")
    }
  }


  InsllationOptions: Record<options, any> = {
    edition: ['Network OS', 'NapicuOS 1.0', 'NapicuOS 2.0'],
    installationType: ['Automatic', 'Advanced']
  };

  InstallationSelected: Record<options, number> = {
    edition: 0,
    installationType: 0
  };

}
