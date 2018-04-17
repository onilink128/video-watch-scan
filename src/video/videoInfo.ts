import * as path from "path";
import * as fs from "fs";

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
     * @param videoId the unique id
     * @param withScreenShot if true generate a screenshot of video
     * @param callback the calllback function called when all proccess ends
     */
    public getMediaData(videoPath: string, videoId: string, withScreenShot: boolean, callback: Function) {
        let videoData: IVideoData;
        let screenshotPath: string = path.join(process.cwd(), "tmp_images");
        let imagePath = path.join(process.cwd(), "tmp_images", videoId + ".png")
        let randomTime = (Math.floor(Math.random() * 8) + 3) * 60;

        if (withScreenShot) {
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
                    console.log("Screenshot Generated.");
                    videoData.image = fileUtils.getBase64FromImage(imagePath);
                    fileUtils.deleteImage(imagePath);
                    console.log("Video Data Created.");
                    callback(videoData);
                })
                .ffprobe((err: any, metadata: IVideoMetaData) => {
                    console.log("Creating metadata from video...");
                    videoData = {
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
                    if (videoId) {
                        videoData.id = videoId;
                    }
                });
        } else {
            ffmpeg(videoPath)
                .ffprobe((err: any, metadata: IVideoMetaData) => {
                    console.log("Creating metadata from video...");
                    videoData = {
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
                    if (videoId) {
                        videoData.id = videoId;
                    }
                    callback(videoData);
                });
        }
    }
}