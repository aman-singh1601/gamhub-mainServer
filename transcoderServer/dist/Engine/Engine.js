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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Engine = void 0;
const fs_1 = __importDefault(require("fs"));
const util_1 = require("util");
const child_process_1 = require("child_process");
const exec = (0, util_1.promisify)(child_process_1.exec);
class Engine {
    constructor(streamPath, outputPath, outputFilename) {
        this.streamPath = streamPath;
        this.outputPath = outputPath;
        this.outputFileName = outputFilename;
    }
    static getInstance(streamPath, outputPath, outputFilename) {
        if (!this.instance) {
            this.instance = new Engine(streamPath, outputPath, outputFilename);
        }
        return this.instance;
    }
    transcodeStreamToHls() {
        return __awaiter(this, void 0, void 0, function* () {
            // console.log("outputpath: ", this.outputPath);
            // if the output directory doesn't exist, create it
            if (!fs_1.default.existsSync(this.outputPath)) {
                fs_1.default.mkdirSync(this.outputPath, { recursive: true });
            }
            // const command = `ffmpeg -i ${this.streamPath} -vf scale=1280:720 -c:v libx264 -crf 20 -preset fast -c:a aac -b:a 128k -f hls -hls_time 10 -hls_playlist_type event ${this.outputPath}/${this.outputFileName}`;
            const command1 = `ffmpeg -i ${this.streamPath} -codec:v libx264 -codec:a aac -hls_time 5 -hls_playlist_type event -hls_segment_filename "${this.outputPath}/segment%03d.ts" -start_number 0 ${this.outputPath}/${this.outputFileName}`;
            const ffmpegCommand = `ffmpeg -i ${this.streamPath} -codec:v libx264 -codec:a aac -hls_time 10 -hls_playlist_type vod -hls_segment_filename "${this.outputPath}/segment%03d.ts" -start_number 0 ${this.outputPath}/${this.outputFileName}`;
            const { stdout, stderr } = yield exec(command1);
        });
    }
}
exports.Engine = Engine;
// const transcodeStreamToHLS = () => {
//     return new Promise((resolve, reject) => {
//       exec(`ffmpeg -i rtmp://your-stream-url/streamkey -vf scale=1280:720 -c:v libx264 -crf 20 -preset fast -c:a aac -b:a 128k -f hls -hls_time 10 -hls_playlist_type event ${localDirectory}/${m3u8FileName}`, (error, stdout, stderr) => {
//         if (error) {
//           reject(`FFmpeg error: ${stderr}`);
//         } else {
//           resolve('Transcoding completed.');
//         }
//       });
//     });
//   };
