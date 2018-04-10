import * as chokidar from "chokidar";

//* Classes */
import { videoInfo } from "../video/videoInfo";
import { fileUtils } from '../commom/fileUtils';

/**interfaces */
import { IVideoData } from "../video/interfaces";

/**
 * Class responsible for watching the changes in folder
 */
export class videoWatcher {
    private watcher: any;
    private objVideoInfo: videoInfo;
    private folder: string;

    constructor(folder: string) {
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
                let hash: string;

                hash = fileUtils.createFileHash(fullPath);

                this.objVideoInfo.getMediaData(fullPath, hash, callBackAddFile);

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