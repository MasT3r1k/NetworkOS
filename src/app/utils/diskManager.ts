export namespace DiskManager {
    type FileTypes = 'file' | 'folder';
    interface DiskSize {
        used: number;
        max: number;
    }

    interface DiskProperties {
        hidden: boolean;
        permissions: any;
    }

    interface DiskFile {
        name: string;
        dir: string;
        fileExtension: string;
        properties: DiskProperties;
    }

    interface DiskFolders {
        name: string;
        properties: DiskProperties;
        files: DiskFile[];
        folders: DiskFolders[];
    }

    export interface DiskInterface {
        name: string;
        size: DiskSize;
        readSpeed: number;
        writeSpeed: number;
        health: number;
        files: DiskFile[];
        folders: DiskFolders[];
    }

    export class Disk implements DiskInterface {
        name: string = '';
        size: DiskSize = {
            used: 0,
            max: 16777216 // 16Mbit
        };
        readSpeed: number = 0;
        writeSpeed: number = 0;
        files: DiskFile[] = [];
        folders: DiskFolders[] = [];
        health: number = 100;
        constructor(name: string, size: DiskSize, readSpeed: number, writeSpeed: number, files?: DiskFile[], folders?: DiskFolders[], health?: number) {
            this.name = name;
            this.size = size;
            this.readSpeed = readSpeed;
            this.writeSpeed = writeSpeed;
            this.files = files || [];
            this.folders = folders || [];
            this.health = health || 100;
        }
    


        public calculateUsed(): void {
            
        }

        public usedStorage() {
            return new Blob(Object.values(localStorage)).size;
        }

        public getFiles(dir: string): DiskFile[] {
            if ('') return this.files;
            let folder = this.folders;
            dir.split('/').forEach(value => {
                folder = this.folders.filter(folder => folder.name == value);
            });
            return folder[0].files;
        }

        public createFile(name: string, dir: any, type: FileTypes): void {
            this.calculateUsed()
        }

        public checkFile(): void {

        }

        public renameFile(file: string, dir: any, renameTo: string): void {

            this.calculateUsed()
        }

        public removeFile(name: string, dir: any): void {

            this.calculateUsed()
        }


    }
}