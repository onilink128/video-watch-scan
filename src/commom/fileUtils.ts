import * as fs from "fs";
const md5File = require('md5-file');

/**
 * a class containing commom methods to work with files
 */
export class fileUtils {
    /**
     * validate if the extension of file is a supported video file
     * @param fileName the file name
     * @return true if the file is supported 
     */
    public static isVideoFile(fileName: string): Boolean {
        return (fileName.match(".mkv") || fileName.match(".avi") || fileName.match(".mp4")) == null ? false : true;
    }

    /**
     * create a hash from the file
     * @param path the full path to the file
     * @return a string containing the hash of file
     */
    public static createFileHash(path: string): string {
        console.log("Creating hash from file", this.getFileNameFromFullPath(path));
        let hash: string = md5File.sync(path);
        console.log("Hash:", hash, "done.");
        return hash;
    }

    /**
     * get the filen name from a path
     * @param fullPath the full path to the file
     * @return a string containing the file name
     */
    public static getFileNameFromFullPath(fullPath: string): string {
        return fullPath.substr(fullPath.lastIndexOf("\\") + 1);
    }

    /**
     * get the path to the file from the full path
     * @param fullPath the full path to the file
     * @return a string containig the path to the file
     */
    public static getPathFromFullPath(fullPath: string): string {
        return fullPath.substr(0, fullPath.lastIndexOf("\\"));
    }

    /**
     * convert the image file to base64 string
     * @param fullPath the full path to the image file
     * @return the base64 string
     */
    public static getBase64FromImage(fullPath: string): string {
        var bitmap = fs.readFileSync(fullPath);
        // convert binary data to base64 encoded string
        return new Buffer(bitmap).toString("base64");
    }


    /**
     * remove the image file from temp folder
     * @param fullPath the full path to the image file
     */
    public static deleteImage(fullPath: string): void {
        fs.unlinkSync(fullPath);
    }

}