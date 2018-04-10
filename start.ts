import * as fileManager from "./src/manager";
import Config from "./config";

const config = new Config();

let manager = new fileManager.Manager(new Config());

/**Video Scan */
var videoScan = manager.createVideoScan();

videoScan.start(itemScanned, endScan);

function itemScanned(videoItem: any) {
    console.log(videoItem);
}

function endScan() {
    console.log("scan finished.");
}
/**End - Video Scan */

/**Video Watcher */
var videoWatcher = manager.createVideoWatch();

videoWatcher.start(itemAdded, itemRemoved);

function itemAdded(item: any) {
    console.log(item);
    console.log("file Added");
}

function itemRemoved() {
    console.log("file Removed");
}
/**End - Video Watcher */