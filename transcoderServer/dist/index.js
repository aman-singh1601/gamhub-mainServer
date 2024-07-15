"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("redis");
const Engine_1 = require("./Engine/Engine");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const redisClient = (0, redis_1.createClient)();
        redisClient.connect();
        console.log("redis client connected");
        while (true) {
            const response = yield redisClient.brPop("message", 0);
            if (!response) {
                // console.log("no message recieved");
            }
            else {
                // engine.process(JSON.parse(response));
                let streamKey = response.element;
                console.log(streamKey);
                let streamPath = `rtmp://localhost:1935/live/${streamKey}`;
                let outputPath = `./output/${streamKey}`;
                let outputFilename = "index.m3u8";
                Engine_1.Engine.getInstance(streamPath, outputPath, outputFilename).transcodeStreamToHls();
                console.log("reached....");
            }
        }
    });
}
main();
