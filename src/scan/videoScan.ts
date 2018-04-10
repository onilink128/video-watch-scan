import * as path from "path";
import * as fs from "fs";

import { videoInfo } from "../video/videoInfo";
import { fileUtils } from "../commom/fileUtils"

/** interfaces */
import {
    IWalkerFileStats,
    IVideoScan,
    ICallbackItemFunction,
    ICallbackEndFunction
} from "./interfaces";

const walk = require('walk');

/**
 * Class responsible for scanning a directory by analyzing video files
 */
export class videoScan implements IVideoScan {
    private walker: any;
    private objVideoInfo: videoInfo;
    private folder: string;
    /**
     * @constructor
     * @param folder The folder containing the videos to scan.
     */
    constructor(folder: string) {
        this.folder = folder;
        this.walker = walk.walk(folder, { followLinks: true });
        this.objVideoInfo = new videoInfo();
    }

    /**
     * start a scan on videos in configured folder
     * @param callbackItemScanned a callback function called every time a video item is scanned
     * @param callbackEndScan a callback function called when the scan ends.
     */
    start(callbackItemScanned: ICallbackItemFunction, callbackEndScan?: ICallbackEndFunction | undefined) {
        console.log("Starting scan on folder", this.folder);
        this.walker.on("file", (root: string, fileStat: IWalkerFileStats, next: Function) => {
            try {
                if (fileUtils.isVideoFile(fileStat.name)) {
                    console.log("File", fileStat.name, "found");
                    let videoPath: string;
                    let hash: string;

                    videoPath = path.join(root, fileStat.name);
                    hash = fileUtils.createFileHash(videoPath);

                    this.objVideoInfo.getMediaData(videoPath, hash, (mediaData: any) => {
                        callbackItemScanned(mediaData);
                        next();
                    });
                } else {
                    console.log("file", fileStat.name, "not supported.");
                    next();
                }
            } catch (err) {
                console.error(err);
                next();
            }
        });

        this.walker.on("end", () => {
            console.log("Folder scan successfully completed.");
            if (callbackEndScan) {
                callbackEndScan();
            }
        });

    }
}