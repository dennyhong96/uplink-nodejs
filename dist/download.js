"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DownloadResultStruct = void 0;
const bindings = require("bindings");
const uplink = bindings("uplink");
const errorhandle = require("./error.js");
class DownloadResultStruct {
    constructor(download) {
        this.download = download;
    }
    /*
     * Function downloads up to len size_to_read bytes from the object's data stream.
     * It returns the data_read in bytes and number of bytes read
     * Input : Buffer (Buf), Buffer length (Int)
     * Output : ReadResult (Int)
     */
    async read(buffer, length) {
        const bytesread = await uplink.download_read(this.download, buffer, length).catch((error) => {
            errorhandle.storjException(error.error.code, error.error.message);
        });
        return bytesread;
    }
    /*
     * Function returns information about the downloaded object.
     * Input : None
     * Output : ObjectInfo (Object)
     */
    async info() {
        const objectInfo = await uplink.download_info(this.download).catch((error) => {
            errorhandle.storjException(error.error.code, error.error.message);
        });
        return objectInfo;
    }
    /*
     * Function closes the download.
     * Input : None
     * Output : None
     */
    async close() {
        await uplink.close_download(this.download).catch((error) => {
            errorhandle.storjException(error.error.code, error.error.message);
        });
    }
}
exports.DownloadResultStruct = DownloadResultStruct;
/* eslint-enable */
