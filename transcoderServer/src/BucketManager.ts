import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import chokidar from "chokidar";
import fs from "fs"

import "dotenv/config";

const ACCESS_ID= process.env.ACCESS_ID || "";
const SECRET_ACCESS_KEY = process.env.SECRET_ACCESS_KEY || "";
const BUCKET = process.env.BUCKET || "";

export class BucketManager {
    private static instance: BucketManager;
    private s3Client;
    private watcher;
    private streamKey;

    private constructor(outputPath: string, streamKey: string) {
        this.s3Client = new S3Client({
            region: "ap-south-1",
            credentials: {
                accessKeyId: ACCESS_ID,
                secretAccessKey: SECRET_ACCESS_KEY
            }
        });
        this.watcher = chokidar.watch(outputPath, {
            ignored: /(^|[\/\\])\../, // ignore dotfiles
            persistent: true
        });
        this.streamKey = streamKey;
    }

    public static getIntance(outputPath: string, streamKey: string) {
        if (!this.instance) {
            this.instance = new BucketManager(outputPath, streamKey);
        }
        return this.instance;
    }

    public watchOutputh() {
        this.watcher
        .on('add', path => {
            this.sendStreamToBucket(path);
        })
        .on('change', path => {
            this.sendStreamToBucket(path);
        })
    }

    private async sendStreamToBucket(path: string) {
        let filePath = path;
        let file  = filePath.split('/')[2];
        console.log("file: ", file);

        let command = new PutObjectCommand({
            Bucket: BUCKET,
            Key: `_streams/${this.streamKey}/${file}`,
            Body: fs.createReadStream(filePath),
            ContentType: filePath.endsWith('.m3u8')?"application/vnd.apple.mpegurl": "video/mp2t"
        });
        try {
            await this.s3Client.send(command);

            console.log("file sent!!!!");

            if(filePath.endsWith(".ts")) {
                fs.unlink(filePath, (error) => {
                    if(error) {
                        console.log("error in deleting file ::", error);
                    }
                    console.log("file deleted successfully:");
                });
            }
        } catch (error) {
            console.log("error: ", error);
        }
    }
}