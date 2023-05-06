import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Grub } from 'src/app/grub/grub';
type options = 'edition' | 'installationType' | 'text' | 'bigtext' | 'progress';
interface Section {
  title: string;
  sidebar: string;
  requirement?: Requirement[];
  items: Item[];
  disableExit?: boolean;
  buttons?: Buttons;
}

interface Buttons {
  prev?: {
    text?: string;
    hidden?: boolean;
    allowed?: boolean;
  };
  next?: {
    text?: string;
    hidden?: boolean;
    allowed?: boolean;
  }
}

interface Item {
  type: options;
  timer?: number;
  values: any[];
  selected?: any[];
}

interface Requirement {
  require: any;
  allow?: Function;
  deny?: Function;
}

@Component({
  selector: 'app-installer',
  templateUrl: './installer.component.html',
  styleUrls: ['./installer.component.css']
})
export class InstallerComponent {

  constructor(private router: Router) {}
  public active: number = 0;
  public sidebar: string[] = [];
  public errmsg: string = "";
  declare interval: any;

  editions = ['Network OS', 'NapicuOS 1.0', 'NapicuOS 2.0', 'FiloooOS-Cloud'];
  // BTW SYSTEMS LIKE NAPICUOS OR FILOOOS-CLOUD ARE NOT ACTUALLY INCLUDED! ITS ONLY FOR TESTING || BTW ITS SYSTEMS OF MY FRIENDS :)

  sections: Section[] = [];

  exitInstall(): void {
    if (this.sections[this.active].disableExit == true) return;
    this.router.navigate(['/']);
    Grub.resetGrub();
  }

  checkRequirement(requirement: Requirement[], cb?: Function): boolean | void {
    requirement.forEach(require => {
      let path = String(require.require[0]).split('/');
      let b = this as any;
      path.forEach((i) => {
        if (b && b?.[i]) {
          b = b[i];
        }
      })
      if (b.includes(require.require?.[1])) {
        if (require?.allow) { require.allow() }
        if (cb) cb(true);
        return true;
      }
      else{
        if (require?.deny) { require.deny() }
        if (cb) cb(false);
        return false;
      }
    });
  }
  async go(page: number) {
    if ((this.active + 1 == page && this.sections[this.active].buttons?.next?.allowed == false || this.errmsg != '')
    || (this.active == page + 1 && this.sections[this.active].buttons?.prev != undefined)) {
      return;
    }
    if (this.sections?.[page as number]) {
      if (this.sections[page as number]?.requirement != undefined) {
        this.errmsg = "";
        this.checkRequirement(this.sections[page as number]?.requirement as Requirement[], (boolean: boolean) => {
            if (!boolean) return;
            this.active = page;
        });
      }else{
        this.active = page;
      }
    }
    if (page == this.sections.length) {
      // TODO: Load into system
      console.log("Trying to load system")
    }
  }


  ngOnInit(): void {
    this.sections = [{
      title: 'Choose your edition',
      sidebar: 'Choose your edition',
      items: [
        {
          type: 'text',
          values: [this.editions.length + ' edition are available:']
        }, {
          type: 'edition',
          values: this.editions,
          selected: [0]
        }, {
          type: 'bigtext',
          values: ['THANK YOU', 'Thank you for choosing our Network OS. We hope you will be as satisfied as we are!']
        }
      ]
    }, {
    title: 'Installation Type',
    sidebar: 'Installation',
    requirement: [{ require: ['sections/0/items/1/selected', 0], deny: () => {
      this.errmsg = "Zadaný systém nebyl správně zpracován!";
      console.log(this.errmsg)
    }}],
    buttons: {
      next: {
        text: 'Install',
        allowed: true
      }
    },
    items: [
      {
        type: 'text',
        values: ['Select type of installation you prefer.']
      }, {
        type: 'installationType',
        values: [{
          icon: 'fa-solid fa-floppy-disks',
          title: 'Automatic System Installation (Recommend)',
          description: 'This action is completely automatic. The system will design the disk layout and install the system on the disk itself. This action is recommended.'
        }, {
          icon: 'fa-solid fa-display-code',
          title: 'Advanced System Installation',
          description: 'In this option, you can set up disks at your discretion, install the system on a specific partition of your choice.'
        }],
        selected: [0]
      }
    ]
  }, {
    title: 'Installing system',
    sidebar: 'Installation',
    disableExit: true,
    buttons: {
      prev: {
        hidden: true,
        allowed: false
      },
      next: {
        text: 'Set up',
        allowed: false
      }
    },
    requirement: [{ require: ['sections/1/items/1/selected', 0], deny: () => {
      this.errmsg = "Tato metoda instalace ještě není k dispozici!";
      console.log(this.errmsg)
    }, allow: () => {
      if (this.sections[2]?.buttons?.next?.allowed != undefined){
        this.sections[2].items[1].values[0] = 0;
        this.sections[2].buttons.next.allowed = false;
        let waiting = 0;
        this.interval = setInterval(() => {
          console.log("interval")
          if (this.sections[2]?.buttons?.next?.allowed != undefined){
            if (this.sections[2].items[1].values[0] >= 100) {
              this.sections[2].items[1].values[0] = 100;
              this.sections[2].buttons.next.allowed = true;
              this.interval = null;
            }
            if (this.sections[2].items[1].values[0] < 100) {
              if (this.sections[2].items[1].values[0] > 0 && this.sections[2].items[1].values[0] % 25 == 0 && waiting < 5) {
                waiting += 1;
                return;
              }else if (this.sections[2].items[1].values[0] % 25 == 0 && waiting == 5) {
                waiting = 0;
              }
              this.sections[2].items[1].values[0] += 1;
              this.sections[2].buttons.next.allowed = false;
            }
          }
        }, 900)
      }
    }}],
    items: [{
      type: 'text',
      values: ['System installation is in progress, do not reboot or interrupt the system installation. Wait a moment.']
    }, {
      type: 'progress',
      values: [0]
    }]
  }, {
    title: 'Set Up System',
    sidebar: 'Set Up System',
    buttons: {
      prev: {
        hidden: true,
        allowed: false
      }
    },
    requirement: [{
      require: ['sections/2/items/1/values', 100]
    }],
    items: [{
      type: 'text',
      values: ['There is where you can set your device name']
    }]
  }]

    this.sections.forEach((a) => {
      if (!this.sidebar.includes(a.sidebar)) this.sidebar.push(a.sidebar);
    });
  };


}
