import NodeMediaServer from 'node-media-server';
import { NodeMediaServerConfig } from './types/rtmpTypes';



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
    // console.log('[NodeEvent on postPublish]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
    console.log("id: ", id);
    console.log("stream Path: ", StreamPath);
    console.log("args: ", JSON.stringify(args));
});


//done Publish  --> when stream ends
