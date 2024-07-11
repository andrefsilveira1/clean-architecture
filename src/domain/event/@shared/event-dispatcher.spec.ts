import AddressChangedEvent from "../costumer/address-changed.event";
import CustomerCreatedEvent from "../costumer/customer-created.event";
import EnviaConsoleLogHandler from "../costumer/handlers/change-address-handler";
import EnviaConsoleLog1Handler from "../costumer/handlers/console-log-handler1";
import EnviaConsoleLog2Handler from "../costumer/handlers/console-log-handler2";
import sendEmailWhenProductIsCreatedHandler from "../product/handlers/send-email";
import ProductCreatedEvent from "../product/product-created.event";
import EventDispatcher from "./event-dispatcher";

describe("Domain Events tests", () => {
    it("Should register an event handler", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new sendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(1);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler)
    });

    it("Should unregister event handler", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new sendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        eventDispatcher.unregister("ProductCreatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(0);
    });

    it("Should unregister event handler", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new sendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        eventDispatcher.unregisterAll();

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeUndefined();
    });


    it("Should notify event handlers", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new sendEmailWhenProductIsCreatedHandler();
        const spyEvent = jest.spyOn(eventHandler, "handle");

        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        const productCreatedEvent = new ProductCreatedEvent({
            name: "Product 1",
            description: "Description from product 1",
            price: 10.0,
        });

        eventDispatcher.notify(productCreatedEvent);
        
        expect(spyEvent).toHaveBeenCalled();
    });

    it("Should register customer event", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new EnviaConsoleLog1Handler();
        eventDispatcher.register("CustomerCreatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(1);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandler)

    });

    it("Should unregister customer event handler", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new EnviaConsoleLog1Handler();

        eventDispatcher.register("CustomerCreatedEvent", eventHandler);

        eventDispatcher.unregister("CustomerCreatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(0);
    });

    it("Should unregister all customer event handler", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new EnviaConsoleLog1Handler();
        const secondEventHandler = new EnviaConsoleLog2Handler();
        const thirdEventHandler = new EnviaConsoleLogHandler();

        eventDispatcher.register("CustomerCreatedEvent", eventHandler);
        eventDispatcher.register("CustomerCreatedEvent", secondEventHandler);
        eventDispatcher.register("AddressChangedEvent", thirdEventHandler);
        eventDispatcher.unregisterAll();

        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeUndefined();
    });


    it("Should notify EnviaConsoleLog1Handler", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new EnviaConsoleLog1Handler();
        const spyEvent = jest.spyOn(eventHandler, "handle");

        eventDispatcher.register("CustomerCreatedEvent", eventHandler);

        const customerCreatedEvent = new CustomerCreatedEvent({
            name: "Customer 1",
            description: "Description from Customer 1",
        });

        eventDispatcher.notify(customerCreatedEvent);
        
        expect(spyEvent).toHaveBeenCalled();
    });

    it("Should notify EnviaConsoleLog2Handler", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new EnviaConsoleLog2Handler();
        const spyEvent = jest.spyOn(eventHandler, "handle");

        eventDispatcher.register("CustomerCreatedEvent", eventHandler);

        const customerCreatedEvent = new CustomerCreatedEvent({
            name: "Customer 1",
            description: "Description from Customer 1",
        });

        eventDispatcher.notify(customerCreatedEvent);
        
        expect(spyEvent).toHaveBeenCalled();
    });

    it("Should notify EnviaConsoleLogHandler", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new EnviaConsoleLogHandler();
        const spyEvent = jest.spyOn(eventHandler, "handle");

        eventDispatcher.register("AddressChangedEvent", eventHandler);

        const addressChangedEvent = new AddressChangedEvent({
            id: "1",
            name: "Customer 1",
            address: "Street 1, 40028922",
        });

        eventDispatcher.notify(addressChangedEvent);
        
        expect(spyEvent).toHaveBeenCalled();
    });
});