export declare class Video {

    /**
     * constructor
     * @param options the options of data generation
     */
    constructor(options: IOptions);
    /**
     * create a new instance of video scan
     * @param folder the folder to scan if not provided will get from config file
     * @return a instance of videoScan
     */
    createVideoScan(folder: string);
    /**
    * create a new instance of video wacher
    * @param folder the folder to scan if not provided will get from config file
    * @return a instance fo videoWatcher
    */
    createVideoWatch(folder: string);
}

interface IOptions {
    withScreenShot?: boolean;
    strongId?: boolean;
}
