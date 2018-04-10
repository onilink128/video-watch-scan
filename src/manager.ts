//* interfaces */
import { IAppConfig, IDirectoryConfig } from "./config/interfaces"

//* Classes */
import { videoScan } from "./scan/videoScan";
import { videoWatcher } from "./watcher/videoWatcher";

/**
 * the main class of file manager
 */
export class Manager {
    scanFolder = "";
    watchFolder = "";
    constructor(config: any) {
        this.scanFolder = config.scanPath;
        this.watchFolder = config.watchPath;
    }

    /**
     * create a new instance of video scan
     * @param folder the folder to scan if not provided will get from config file
     * @return a instance of videoScan
     */
    public createVideoScan(folder?: string): videoScan {
        let objVideoScan = new videoScan(folder ? folder : this.scanFolder);
        return objVideoScan;
    }
    /**
     * create a new instance of video wacher
     * @param folder the folder to scan if not provided will get from config file
     * @return a instance fo videoWatcher
     */
    public createVideoWatch(folder?: string): videoWatcher {
        let objVideoWatcher = new videoWatcher(folder ? folder : this.watchFolder);
        return objVideoWatcher;
    }
}