import { createClient } from "redis";
import { Engine } from "./Engine/Engine";



async function main() {
    const redisClient = createClient();
    redisClient.connect();
    console.log("redis client connected");



    while (true) {
        const response = await redisClient.brPop("message" as string, 0);

        
        if (!response) {
            // console.log("no message recieved");
        } else {
            // engine.process(JSON.parse(response));
            let streamKey = response.element;
            console.log(streamKey);
            let streamPath = `rtmp://localhost:1935/live/${streamKey}`;
            let outputPath = `./output/${streamKey}`;
            let outputFilename = "index.m3u8";

            Engine.getInstance(streamPath, outputPath, outputFilename).transcodeStreamToHls();

            console.log("reached....");
            
        }
    }
}

main();