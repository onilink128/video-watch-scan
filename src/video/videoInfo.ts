import * as path from "path";

const ffmpeg = require("fluent-ffmpeg");
const ffmpegBinaries = require("ffmpeg-binaries");

/**interfaces */
import { IVideoData, IVideoMetaData } from "./interfaces";

/**classes */
import { fileUtils } from "../commom/fileUtils";
/**
 * a class whith methods to get the video media attributes
 */
export class videoInfo {
    /**
     * initiate the settings of ffmpeg
     * @constructor
     */
    constructor() {
        ffmpeg().setFfmpegPath(ffmpegBinaries.ffmpegPath());
        ffmpeg().setFfprobePath(ffmpegBinaries.ffprobePath());
    }

    /**
     * generate a screenshot and returns in a callback all data from video file
     * @param videoPath the full path to video file
     * @param screenshotName the name of screenshot file
     * @param callback the calllback function called when all proccess ends
     */
    public getMediaData(videoPath: string, videoId: string, callback: Function) {
        let videoData: IVideoData;
        let screenshotPath: string = path.join(process.cwd(), "images");
        let randomTime = (Math.floor(Math.random() * 8) + 3) * 60;

        ffmpeg(videoPath)
            .takeScreenshots({
                count: 1,
                timemarks: [randomTime],
                size: "306x172",
                filename: videoId + ".png"
            },
            screenshotPath
            )
            .on("end", () => {
                console.log("Screenshot saved.");
                console.log("Video Data Created.");
                callback(videoData);

            })
            .ffprobe((err: any, metadata: IVideoMetaData) => {
                console.log("Creating metadata from video...");
                videoData = {
                    id: videoId,
                    fileName: fileUtils.getFileNameFromFullPath(videoPath),
                    addData: new Date(),
                    createdData: metadata.format.tags.creation_time,
                    videoFormat: metadata.format.format_long_name,
                    duration: metadata.format.duration,
                    size: metadata.format.size,
                    width: metadata.streams[0].width,
                    height: metadata.streams[0].height,
                    chapters: metadata.chapters
                }
            });
    }
}