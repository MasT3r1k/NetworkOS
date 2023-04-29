import { Component } from '@angular/core';
import { BiosConfig } from '../bios/config';
import { Router } from '@angular/router';

@Component({
  selector: 'app-grub',
  templateUrl: './grub.component.html',
  styleUrls: ['./grub.component.css']
})
export class GrubComponent {

  public keys: any = {accessBios: BiosConfig.EnterBiosKeys};
  eventKeydown = (e: KeyboardEvent, keys = this.keys) => {
    if (keys.accessBios.includes(e.key)) { this.router.navigate(["/bios"], { skipLocationChange: true }); }
    else console.log(e.key)
  }

  systemLoad: boolean = true;

  constructor(private router: Router) { 
  }

  public formatKeys(keys: Array<string>) {
    if (keys.length > 0) return keys.join(' or ');
    else return "Can't be accessed.";
  }

  ngOnInit(): void {
    document.addEventListener('keydown', this.eventKeydown, false);
    setTimeout(() => {
      if (this.systemLoad !== true) { console.log("System was not loaded..");return; }
      this.router.navigate(["grub"], { skipLocationChange: true});
      
    }, BiosConfig.BootBiosScreen)
  }

  ngOnDestroy() {
    this.systemLoad = false;
    document.removeEventListener('keydown', this.eventKeydown, false);
  }
}
