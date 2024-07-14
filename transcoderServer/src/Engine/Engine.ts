import fs from "fs";
import { promisify } from "util";
import { exec as execCallback } from 'child_process';

const exec = promisify(execCallback);

export class Engine {
    private static instance: Engine;
    private streamPath: string;
    private outputPath: string;
    private outputFileName: string;


    private constructor(streamPath: string, outputPath: string, outputFilename: string) {
        this.streamPath = streamPath;
        this.outputPath = outputPath;
        this.outputFileName = outputFilename;
    }

    public static getInstance(streamPath: string, outputPath: string, outputFilename: string) {
        if (!this.instance) {
            this.instance = new Engine(streamPath, outputPath, outputFilename);
        }
        return this.instance;
    }

    public async transcodeStreamToHls() {
        // console.log("outputpath: ", this.outputPath);
        // if the output directory doesn't exist, create it
        if (!fs.existsSync(this.outputPath)) {
            fs.mkdirSync(this.outputPath, { recursive: true });
        }
        // const command = `ffmpeg -i ${this.streamPath} -vf scale=1280:720 -c:v libx264 -crf 20 -preset fast -c:a aac -b:a 128k -f hls -hls_time 10 -hls_playlist_type event ${this.outputPath}/${this.outputFileName}`;
        const command1 = `ffmpeg -i ${this.streamPath} -codec:v libx264 -codec:a aac -hls_time 5 -hls_playlist_type event -hls_segment_filename "${this.outputPath}/segment%03d.ts" -start_number 0 ${this.outputPath}/${this.outputFileName}`;
        const ffmpegCommand = `ffmpeg -i ${this.streamPath} -codec:v libx264 -codec:a aac -hls_time 10 -hls_playlist_type vod -hls_segment_filename "${this.outputPath}/segment%03d.ts" -start_number 0 ${this.outputPath}/${this.outputFileName}`;

        const { stdout, stderr } = await exec(command1);

    }
}


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