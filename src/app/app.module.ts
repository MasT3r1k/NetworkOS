import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

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
import { DisplayComponent } from './os/systems/nvos/apps/settings/display/display.component';
import { ApperanceComponent } from './os/systems/nvos/apps/settings/apperance/apperance.component';
import { SoundComponent } from './os/systems/nvos/apps/settings/sound/sound.component';
import { NotificationsComponent } from './os/systems/nvos/apps/settings/notifications/notifications.component';
import { StorageComponent } from './os/systems/nvos/apps/settings/storage/storage.component';
import { LanguageComponent } from './os/systems/nvos/apps/settings/language/language.component';
import { UpdatesystemComponent } from './os/systems/nvos/apps/settings/updatesystem/updatesystem.component';
import { AboutsystemComponent } from './os/systems/nvos/apps/settings/aboutsystem/aboutsystem.component';
import { ManageComponent } from './os/systems/nvos/apps/settings/manage/manage.component';
import { MultitaskComponent } from './os/systems/nvos/apps/settings/multitask/multitask.component';
import { SourcecodeComponent } from './os/systems/nvos/apps/settings/sourcecode/sourcecode.component';
import { LockscreenComponent } from './os/systems/nvos/apps/settings/lockscreen/lockscreen.component';
import { WeatherComponent } from './os/systems/nvos/apps/weather/weather.component';
import { LoaderComponent } from './os/systems/nvos/apps/weather/loader/loader.component';
import { HttpClientModule } from '@angular/common/http';
import { NetworkappsComponent } from './os/systems/nvos/apps/networkhome/networkhome.component';
import { ClockComponent } from './os/systems/nvos/apps/clock/clock.component';
import { SearchComponent } from './os/systems/nvos/apps/networkhome/search/search.component';
import { InstalledComponent } from './os/systems/nvos/apps/networkhome/installed/installed.component';
import { ProcessesComponent } from './os/systems/nvos/apps/networkhome/processes/processes.component';
import { UsersComponent as NetworkHomeUsers } from './os/systems/nvos/apps/networkhome/users/users.component';



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
    DisplayComponent,
    ApperanceComponent,
    SoundComponent,
    NotificationsComponent,
    StorageComponent,
    LanguageComponent,
    UpdatesystemComponent,
    AboutsystemComponent,
    ManageComponent,
    MultitaskComponent,
    SourcecodeComponent,
    LockscreenComponent,
    WeatherComponent,
    LoaderComponent,
    NetworkappsComponent,
    ClockComponent,
    SearchComponent,
    InstalledComponent,
    ProcessesComponent,
    NetworkHomeUsers
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
