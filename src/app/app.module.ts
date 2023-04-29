import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GrubComponent } from './grub/grub.component';
import { BiosComponent } from './bios/NVBios/bios.component';
import { OsComponent } from './os/os.component';
import { MainComponent } from './bios/NVBios/main/main.component';
import { AdvancedComponent } from './bios/NVBios/advanced/advanced.component';
import { BootComponent } from './bios/NVBios/boot/boot.component';
import { ToolsComponent } from './bios/NVBios/tools/tools.component';
import { ExitComponent } from './bios/NVBios/exit/exit.component';
import { LoadComponent } from './grub/load/load.component';
import { NvosComponent } from './os/systems/nvos/nvos.component';
import { LoaderComponent } from './os/systems/nvos/loader/loader.component';

@NgModule({
  declarations: [
    AppComponent,
    GrubComponent,
    BiosComponent,
    OsComponent,
    MainComponent,
    AdvancedComponent,
    BootComponent,
    ToolsComponent,
    ExitComponent,
    LoadComponent,
    NvosComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
