import { CPUInterface, CPUAchitecture } from "../interfaces/cpu";

class CPU implements CPUInterface {
    public declare name: string;
    public speed: number = 0;
    public cache: number = 0;
    public type: CPUAchitecture = 64;
    public maxMemory: number = 0;
    public tdp: number = 0;
    constructor(name: string, speed: number, cache: number, maxMemory: number, tdp: number) {
        this.name = name;
        this.speed = speed;
        this.cache = cache;
        this.maxMemory = maxMemory;
        this.tdp = tdp;
    }

    public getLoadingTime(size: number) {
        return (size / this.speed) * 1000;
    }
}


export let cpu = new CPU("NVProcesor", 6900000000, 68719476.74, 1099511627776, 40);