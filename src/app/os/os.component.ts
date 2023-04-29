import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { valid_systems } from './systems/systems';
import { Grub } from '../grub/grub';
import { SystemConfig } from '../utils/systemUtils';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-os',
  templateUrl: './os.component.html',
  styleUrls: ['./os.component.css']
})
export class OsComponent implements OnInit {

  public system: valid_systems | null = null;
  declare systemConfig: SystemConfig;

  constructor(private route: ActivatedRoute, private router: Router, private pageTitle: Title) {
  }

  ngOnInit(): void {
    let systemParam = this.route.snapshot.paramMap.get('system');
    this.system = systemParam as valid_systems;
    if (!Grub.GetSystems()[systemParam as valid_systems]) {
      console.log("[Error] System " + systemParam + " is not exists.")
      this.router.navigate(["/"])
    }else{
      this.system = systemParam as valid_systems;
      this.systemConfig = Grub.GetSystems()[systemParam as valid_systems];
      this.pageTitle.setTitle(this.systemConfig.name + " | Network Vision")
    }
  }

}
