"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_media_server_1 = __importDefault(require("node-media-server"));
const RedisManager_1 = require("./RedisManager");
const config = {
    rtmp: {
        port: 1935,
        chunk_size: 60000,
        gop_cache: true,
        ping: 30,
        ping_timeout: 60
    },
    // http: {
    //     port: 8000,
    //     allow_origin: '*'
    // }
};
var nms = new node_media_server_1.default(config);
nms.run();
//post Publish --> when stream starts
nms.on('postPublish', (id, StreamPath, args) => {
    console.log("id: ", id);
    const streamKey = StreamPath.split('/').pop();
    console.log("streamKey: ", streamKey);
    if (streamKey) {
        RedisManager_1.RedisManager.getInstance().sendMessage(streamKey);
    }
});
//done Publish  --> when stream ends
