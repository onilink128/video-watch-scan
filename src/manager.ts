//* Classes */
import { videoScan } from "./scan/videoScan";
import { videoWatcher } from "./watcher/videoWatcher";

/**
 * the main class of file manager
 */
export class Manager {
    private options: any;
    constructor(options?: any) {
        this.options = options;
    }

    /**
     * create a new instance of video scan
     * @param folder the folder to scan if not provided will get from config file
     * @return a instance of videoScan
     */
    public createVideoScan(folder: string): videoScan {
        return new videoScan(folder, this.options);
    }
    /**
     * create a new instance of video wacher
     * @param folder the folder to scan if not provided will get from config file
     * @return a instance fo videoWatcher
     */
    public createVideoWatch(folder: string): videoWatcher {
        return new videoWatcher(folder, this.options);
    }
}