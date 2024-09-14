"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ChatUser_1 = __importDefault(require("../models/ChatUser"));
const StateMachine_1 = __importDefault(require("../models/StateMachine"));
describe("state machine tests", () => {
    let stateMachine;
    beforeAll(() => {
        // Server State
        stateMachine = StateMachine_1.default.getInstance();
    });
    afterAll(() => { });
    test("getRoomMessages is working", () => {
        stateMachine.addRoom("test room", new ChatUser_1.default("test username", "test profile img", true));
        stateMachine.addMessageToRoom("test room", new Date(), "test message", "test username", "test profile img", true);
        const messages = stateMachine.getRoomMessages("test room");
        expect(messages).toBeDefined();
        expect(messages.length).toBe(1);
        expect(messages[0].getMessage()).toBe("test message");
        expect(messages[0].getUsername()).toBe("test username");
        expect(messages[0].getProfileImgURL()).toBe("test profile img");
    });
});
