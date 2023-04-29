export type CPUAchitecture = 32 | 64 | 86;

export interface CPUInterface {
    name: string;
    // TODO: motherboard: MotherBoardSockets; 
    speed: number;
    cache: number;
    maxMemory: number;
    tdp: number;
}