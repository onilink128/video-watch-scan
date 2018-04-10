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

}