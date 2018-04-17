import * as path from "path";
import * as fs from "fs";

import { videoInfo } from "../video/videoInfo";
import { fileUtils } from "../commom/fileUtils"
import { Guid } from "guid-typescript";


/** interfaces */
import {
    IWalkerFileStats,
    IVideoScan,
    ICallbackItemFunction,
    ICallbackEndFunction
} from "./interfaces";
import { IOptions } from "../commom/interfaces";

const walk = require('walk');

/**
 * Class responsible for scanning a directory by analyzing video files
 */
export class videoScan implements IVideoScan {
    private withScreenShot: boolean;
    private strongId: boolean;
    private walker: any;
    private objVideoInfo: videoInfo;
    private folder: string;

    /**
     * @constructor
     * @param folder The folder containing the videos to scan.
     */
    constructor(folder: string, options?: IOptions) {
        options = options ? options : {};
        this.withScreenShot = options.withScreenShot ? options.withScreenShot : false;
        this.strongId = options.strongId ? options.strongId : false;
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
                    let id: string = "";

                    videoPath = path.join(root, fileStat.name);

                    if (this.strongId) {
                        id = fileUtils.createFileHash(videoPath);
                    } else {
                        id = Guid.create().toString();
                    }

                    this.objVideoInfo.getMediaData(videoPath, id, this.withScreenShot, (mediaData: any) => {
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