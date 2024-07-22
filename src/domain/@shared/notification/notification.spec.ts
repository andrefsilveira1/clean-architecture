import Notification from "./notification";

describe("Unit test for Notification", () => {
    it("Should create some errors", () => {
        const notification = new Notification();
        const error = {
            message: "Error message",
            context: "Customer",
        }

        notification.addError(error);

        expect(notification.messages("customer")).toBe("Customer: Error message,");

        const error2 = {
            message: "Error message2",
            context: "Customer",
        }

        notification.addError(error2)

        expect(notification.messages("customer")).toBe("Customer: Error message,Customer: Error message2,");
        
    })
})