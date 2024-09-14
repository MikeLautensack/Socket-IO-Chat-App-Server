import ChatUser from "../models/ChatUser";
import StateMachine from "../models/StateMachine";
describe("state machine tests", () => {
    let stateMachine;
    beforeAll(() => {
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
//# sourceMappingURL=stateMachine.test.js.map