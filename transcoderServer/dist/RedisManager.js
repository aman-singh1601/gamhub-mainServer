"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisManager = void 0;
const redis_1 = require("redis");
class RedisManager {
    constructor() {
        this.subscriber = (0, redis_1.createClient)();
        this.subscriber.connect();
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new RedisManager();
        }
        return this.getInstance;
    }
    publishMessage() {
    }
    sendMessageToPubSub() {
    }
}
exports.RedisManager = RedisManager;
