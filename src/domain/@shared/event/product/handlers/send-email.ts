import EventHandlerInterface from "../../event-handler.interface";
import ProductCreatedEvent from "../product-created.event";

export default class sendEmailWhenProductIsCreatedHandler implements
    EventHandlerInterface<ProductCreatedEvent> {
        handle(event: ProductCreatedEvent): void {
            console.log(`Sending email to: ${event.dataTimeOccurred}`)
        }
    }