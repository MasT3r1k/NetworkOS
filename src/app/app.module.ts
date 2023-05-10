import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GrubComponent } from './grub/grub.component';
import { BiosComponent } from './bios/NVBios/bios.component';
import { OsComponent } from './os/os.component';
import { LoadComponent } from './grub/load/load.component';
import { NvosComponent } from './os/systems/nvos/nvos.component';
import { LoaderComponent as NVOSLoader } from './os/systems/nvos/loader/loader.component';
import { InstallerComponent as NVOSInstaller } from './os/systems/nvos/installer/installer.component';
import { SettingsComponent } from './os/systems/nvos/apps/settings/settings.component';
import { LoaderComponent as SettingsComponentLoader} from './os/systems/nvos/apps/settings/loader/loader.component';
import { TaskmanagerComponent } from './os/systems/nvos/apps/taskmanager/taskmanager.component';
import { LoaderComponent as TaskmanagerComponentLoader} from './os/systems/nvos/apps/taskmanager/loader/loader.component';
import { TerminalComponent } from './os/systems/nvos/apps/terminal/terminal.component';


@NgModule({
  declarations: [
    AppComponent,
    GrubComponent,
    BiosComponent,
    OsComponent,
    LoadComponent,
    NvosComponent,
    NVOSLoader,
    NVOSInstaller,
    SettingsComponent,
    TaskmanagerComponent,
    SettingsComponentLoader,
    TaskmanagerComponentLoader,
    TerminalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
