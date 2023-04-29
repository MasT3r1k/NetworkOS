import { SystemConfig } from "src/app/utils/systemUtils";
import { OsComponent } from "../../os.component";
import { LoaderComponent } from "./loader/loader.component";

export const config: SystemConfig = {
    id: "NVOS",
    name: "NetworkVision OS",
    buildOs: "1.0.0 Beta, #001",
    mainComponent: OsComponent,
    loaderComponent: LoaderComponent,
    system_disk: 0,
    author: "MasTerik",
    color: "#2999ed",
    options: {}
}