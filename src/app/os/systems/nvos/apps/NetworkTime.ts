import { Processes } from "../Process";
import { BiosApi } from "../../../../bios/biosApi";

export let module = {
    name: "NetworkTime",
    windows: [],
    run: () => {
        let process = Processes.createProcess(module.name, false);
        process.setAsHidden();
        
        process.setData({
            hours: BiosApi.getTime().hours,
            minutes: BiosApi.getTime().minutes,
            seconds: BiosApi.getTime().seconds
        });

        process.execute(() => {
            setInterval(() => {
                process.setData({
                    hours: BiosApi.getTime().hours,
                    minutes: BiosApi.getTime().minutes,
                    seconds: BiosApi.getTime().seconds
                });
            }, 1000)
        })
        process.run();
    }
}
