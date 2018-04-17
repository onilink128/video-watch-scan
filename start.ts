import * as fileManager from "./src/manager";

let options = {
    withScreenShot: false,
    strongId: false
};

let manager = new fileManager.Manager(options);

/**Video Scan */
var videoScan = manager.createVideoScan("C:\\Videos\\Biblioteca");

videoScan.start(itemScanned, endScan);
    console.log("scan started.");
    console.log("time:", new Date());

function itemScanned(videoItem: any) {
    console.log("time:", new Date());
    console.log(videoItem);
}

function endScan() {
    console.log("scan finished.");
    console.log("time:", new Date());
}
/**End - Video Scan */

/**Video Watcher */
var videoWatcher = manager.createVideoWatch("C:\\Videos\\Novos");

videoWatcher.start(itemAdded, itemRemoved);

function itemAdded(item: any) {
    console.log(item);
    console.log("file Added");
}

function itemRemoved() {
    console.log("file Removed");
}
/**End - Video Watcher */