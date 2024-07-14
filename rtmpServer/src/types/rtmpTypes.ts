export interface NodeMediaServerConfig {
    rtmp: {
        port: number;
        chunk_size: number;
        gop_cache: boolean;
        ping: number;
        ping_timeout: number;
    };
    // http: {
    //     port: number;
    //     allow_origin: string;
    // };
}