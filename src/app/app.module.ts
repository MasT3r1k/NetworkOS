import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GrubComponent } from './grub/grub.component';
import { BiosComponent } from './bios/NVBios/bios.component';
import { OsComponent } from './os/os.component';
import { LoadComponent } from './grub/load/load.component';
import { NvosComponent } from './os/systems/nvos/nvos.component';
import { LoaderComponent } from './os/systems/nvos/loader/loader.component';
import { InstallerComponent } from './os/systems/nvos/installer/installer.component';
import { SettingsComponent } from './os/systems/nvos/apps/settings/settings.component';
import { TaskmanagerComponent } from './os/systems/nvos/apps/taskmanager/taskmanager.component';

@NgModule({
  declarations: [
    AppComponent,
    GrubComponent,
    BiosComponent,
    OsComponent,
    LoadComponent,
    NvosComponent,
    LoaderComponent,
    InstallerComponent,
    SettingsComponent,
    TaskmanagerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
