import { createClient, RedisClientType } from "redis";

export class RedisManager {
    private static instance: RedisManager;
    private publisher: RedisClientType;

    private constructor() {
        this.publisher = createClient();
        this.publisher.connect();
    }

    public static getInstance() {
        if(!this.instance) {
            this.instance = new RedisManager();
        }
        return this.instance;
    }

    public sendMessage(streamKey: string) {
        this.publisher.lPush("message", streamKey);
    }
}

