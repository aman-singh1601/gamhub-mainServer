"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateStream = void 0;
function getRandomStreamId() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}
function generateStream(req, res) {
    try {
        const streamKey = getRandomStreamId();
        const streamUrl = "rtmp://localhost:1935/live";
        res.status(200).json({
            streamKey,
            streamUrl
        });
    }
    catch (error) {
        console.log("GENERATE_STREAM_ERROR", error);
        return;
    }
}
exports.generateStream = generateStream;
