export namespace NetworkPerms {
    export type requiredPerms = 'root' | 'admin' | 'user';
    export type appPerms = 'notifications';
    export function checkPerms(have: requiredPerms, need: requiredPerms) {
        // TODO: DÍK
    }
}