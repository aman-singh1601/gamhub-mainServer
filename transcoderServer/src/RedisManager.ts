import { createClient, RedisClientType } from "redis";

export class RedisManager{
    private static instance: RedisManager;
    private subscriber: RedisClientType;

    private constructor() {
        this.subscriber = createClient();
        this.subscriber.connect();
    }

    public static getInstance() {
        if(!this.instance) {
            this.instance = new RedisManager();
        }
        return this.getInstance;
    }

    public publishMessage() {

    }

    public sendMessageToPubSub(){
        
    }
}