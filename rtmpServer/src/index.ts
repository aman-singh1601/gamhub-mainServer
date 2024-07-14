import NodeMediaServer from 'node-media-server';
import { NodeMediaServerConfig } from './types/rtmpTypes';

import { RedisManager } from './RedisManager';



const config: NodeMediaServerConfig = {
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

var nms = new NodeMediaServer(config);
nms.run(); 


//post Publish --> when stream starts
nms.on('postPublish', (id, StreamPath, args) => {
    console.log("id: ", id);
    const streamKey = StreamPath.split('/').pop();
    console.log("streamKey: ", streamKey);
    if(streamKey) {
        RedisManager.getInstance().sendMessage(streamKey);
    }

});


//done Publish  --> when stream ends
