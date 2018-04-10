export interface IWalkerFileStats {
    atime: Date;
    birthtime: Date;
    blksize: number;
    blocks: number;
    ctime: Date;
    dev: number;
    gid: number;
    ino: number;
    mode: number;
    mtime: number;
    name: string;
    nlink: number;
    rdev: number;
    size: number;
    type: string;
    uid: number;
}

export interface IVideoScan {
    start(callbackItemScanned: ICallbackItemFunction, callbackEndScan?: ICallbackEndFunction): void;

}
export interface ICallbackItemFunction { (mediaData: IMediaData): void }
export interface ICallbackEndFunction { (): void }

export interface IMediaData {

}