import * as chokidar from "chokidar";

//* Classes */
import { videoInfo } from "../video/videoInfo";
import { fileUtils } from '../commom/fileUtils';

/**interfaces */
import { IVideoData } from "../video/interfaces";
import { Guid } from "guid-typescript";
import { IOptions } from "../commom/interfaces";

/**
 * Class responsible for watching the changes in folder
 */
export class videoWatcher {
    private withScreenShot: boolean;
    private strongId: boolean;
    private watcher: any;
    private objVideoInfo: videoInfo;
    private folder: string;

    constructor(folder: string, options?: IOptions) {
        options = options ? options : {};
        this.withScreenShot = options.withScreenShot ? options.withScreenShot : false;
        this.strongId = options.strongId ? options.strongId : false;
        this.objVideoInfo = new videoInfo();
        this.folder = folder;
    }

    /**
     * start watching a folder
     * @param folder the folder to be watched
     * @param callBackAddFile callback function to be called when a file is added.
     * @param callbackRemoveFile callback function to be called when a file is removed.
     */
    public start(callBackAddFile: Function, callbackRemoveFile: Function): void {
        console.log("Starting watcher on folder", this.folder);
        this.watcher = chokidar.watch(this.folder, {
            ignored: /(^|[\/\\])\../,
            persistent: true,
            ignoreInitial: true,
            awaitWriteFinish: true
        });
        this.watcher.on("add", (fullPath: any) => {
            try {
                console.log("File", fileUtils.getFileNameFromFullPath(fullPath), "added");
                let id: string = "";

                if (this.strongId) {
                    id = fileUtils.createFileHash(fullPath);
                } else {
                    id = Guid.create().toString();
                }

                this.objVideoInfo.getMediaData(fullPath, id, this.withScreenShot, callBackAddFile);

            } catch (err) {
                console.error(err);
            }
        });
        this.watcher.on("unlink", (fullPath: any) => {
            let fileName = fileUtils.getFileNameFromFullPath(fullPath);
            console.log("File", fileName, "removed");
            callbackRemoveFile(fileName);
        });
    }

    /**
     * stop the watcher
     */
    public stop(): void {
        this.watcher.close();
        console.log("watcher on folder", this.folder, "stopped")
    }
}