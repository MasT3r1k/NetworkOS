import { SystemConfig } from "src/app/utils/systemUtils";
import { LoaderComponent } from "./loader/loader.component";
import { InstallerComponent } from "./installer/installer.component";
import { NvosComponent } from "./nvos.component";

export const config: SystemConfig = {
    id: "NVOS",
    name: "NetworkVision OS",
    buildOs: "1.0 #003",
    mainComponent: NvosComponent,
    loaderComponent: LoaderComponent,
    installComponent: InstallerComponent,
    system_disk: 1,
    author: "MasTerik",
    color: "#2999ed",
    options: {}
}