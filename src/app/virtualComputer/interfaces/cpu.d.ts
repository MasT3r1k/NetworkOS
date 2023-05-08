export type CPUAchitecture = 64;

export interface CPUInterface {
    name: string;
    // TODO: motherboard: MotherBoardSockets; 
    speed: number;
    type: CPUAchitecture;
    cache: number;
    maxMemory: number;
    tdp: number;
}