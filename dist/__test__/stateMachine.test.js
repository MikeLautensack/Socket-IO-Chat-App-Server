import ChatUser from "../models/ChatUser.js";
import StateMachine from "../models/StateMachine.js";
describe("state machine tests", () => {
    let stateMachine;
    beforeAll(() => {
        // Server State
        stateMachine = StateMachine.getInstance();
    });
    afterAll(() => { });
    test("getRoomMessages is working", () => {
        stateMachine.addRoom("test room", new ChatUser("test username", "test profile img", true));
        stateMachine.addMessageToRoom("test room", new Date(), "test message", "test username", "test profile img", true);
        const messages = stateMachine.getRoomMessages("test room");
        expect(messages).toBeDefined();
        expect(messages.length).toBe(1);
        expect(messages[0].getMessage()).toBe("test message");
        expect(messages[0].getUsername()).toBe("test username");
        expect(messages[0].getProfileImgURL()).toBe("test profile img");
    });
});
